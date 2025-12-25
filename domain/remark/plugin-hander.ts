import { PluginsCache } from '../../cache/plugins-cache';
import { visit } from 'unist-util-visit';
import moment from 'moment';

export const remarkPluginHandler = () => {
  return async (tree) => {
    const plugins = await PluginsCache.get();
    visit(tree, 'code', (node) => {
      if (node.lang === 'plugin') {
        const value = node.value.trim();

        const data: Record<string, string> = {};
        value.split('\n').forEach((line) => {
          const [key, value] = line.split('=');
          if (key && value) {
            data[key.trim()] = value.trim();
          }
        });

        const index = data['index'];
        const pluginId = data['pluginId'];
        const plugin = plugins.find((p) => p.pluginId === pluginId);
        const authorUrl = `https://github.com/${plugin?.repo?.split('/')[0] || ''}`;
        const { avg: avgRating, count: ratingCount } = getPluginRating(plugin);

        node.type = 'html';
        if (plugin) {
          const header = buildPluginHeader(
            plugin,
            index,
            avgRating,
            ratingCount
          );

          const images =
            plugin.osImages && plugin.osImages.length > 0
              ? `<div class="plugin-images mt-2 mb-2 flex flex-col items-center">
                ${plugin.osImages
                  .map(
                    (img) =>
                      `<img src="${img.url}" alt="${img.description + ' screenshot' || plugin.name} " class="inline-block border border-gray-300 rounded mb-2" />`
                  )
                  .join('\\n')}
              </div>`
              : '';

          node.value = `<div class="plugin-container" data-plugin-id="${plugin.name}">
            ${header}
            <div class="plugin-content">
              <div class="plugin-details">
                <div class="text-sm text-gray-600">
                  Released on ${moment(plugin.createdAt).format('YYYY-MM-DD')} by <a href="${authorUrl}">${plugin.author}</a>
                </div>
                <p>${plugin.osDescription.replace('**', '<b>').replace('**', '</b>')}</p>
                ${images}
              </div>
              <div class="plugin-links mt-4">
                <a href="/plugins/${plugin.pluginId}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-center no-underline">
                  View Plugin Details
                </a>
                <a href="https://github.com/${plugin.repo}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-gray-700 border-gray-700 hover:bg-gray-800 hover:border-gray-800 text-gray-200 px-2 py-1 rounded text-center no-underline ml-2">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>`;
        }
      } else if (node.lang === 'plugin-list') {
        const value = node.value.trim();
        const data: Record<string, string> = {};
        value.split('\n').forEach((line) => {
          const [key, value] = line.split('=');
          if (key && value) {
            data[key.trim()] = value.trim();
          }
        });

        const pluginIds = data['pluginIds'].split(',').map((id) => id.trim());
        const filteredPlugins = plugins.filter((p) =>
          pluginIds.includes(p.pluginId)
        );

        node.type = 'html';
        node.value = `<div class="plugin-list-container">
          ${filteredPlugins
            .map((plugin, index) => {
              const { avg: avgRating, count: ratingCount } =
                getPluginRating(plugin);
              return `
            <div class="plugin-container" data-plugin-id="${plugin.name}">
              <div class="plugin-header">
                <h3><span class="text-gray-500">${index + 1}.</span> <span class="text-red-700 font-bold text-2xl tracking-tight">${plugin.name}</span></h3>
                ${
                  avgRating !== null
                    ? `<div class="flex items-center gap-2 mt-1 text-sm text-gray-800 font-semibold">
                        <button type="button" class="flex items-center gap-2 hover:opacity-80" onclick="window.location.href='/plugins/${plugin.pluginId}#rate-plugin'">
                          <span class="flex items-center" aria-hidden="true">${renderStarIcons(avgRating)}</span>
                          <span>${avgRating.toFixed(1)} / 5 ${
                            ratingCount
                              ? `<span class="text-gray-600 font-normal">(${ratingCount} review${ratingCount > 1 ? 's' : ''})</span>`
                              : ''
                          }</span>
                        </button>
                        <button type="button" class="text-xs px-2 py-0.5 rounded border border-violet-700 text-violet-700 hover:bg-violet-50" onclick="window.location.href='/plugins/${plugin.pluginId}#rate-plugin'">Rate</button>
                      </div>`
                    : ''
                }
              </div>
              <div class="plugin-content">
                <div class="plugin-details">
                  <div class="text-sm text-gray-600">
                    Released on ${moment(plugin.createdAt).format('YYYY-MM-DD')} by <a href="${`https://github.com/${plugin.repo.split('/')[0]}`}">${plugin.author}</a>
                  </div>
                  <p>${plugin.osDescription.replace('**', '<b>').replace('**', '</b>')}</p>
                  <a href="/plugins/${plugin.pluginId}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-yellow-300 hover:bg-amber-300 text-voilet-700 px-2 py-1 rounded text-center no-underline">
                    View Plugin Details
                  </a>
                </div>
              </div>
            </div>
            <hr />
          `;
            })
            .join('\n')}
          </div>
        `;
      }
    });
  };
};

function getPluginRating(plugin: any): { avg: number | null; count: number } {
  const avg =
    plugin?.ratingInfo?.avgRating ?? plugin?.ratingInfo?.averageRating ?? null;
  const count =
    plugin?.ratingInfo?.ratingCount ??
    plugin?.ratingInfo?.reviewsCount ??
    plugin?.ratingInfo?.totalReviews ??
    plugin?.reviews?.length ??
    0;
  return { avg: typeof avg === 'number' ? avg : 0, count };
}

function renderStarIcons(avgRating: number): string {
  const uid = Math.random().toString(36).slice(2, 8);

  return Array.from({ length: 5 })
    .map((_, idx) => {
      const fill = Math.min(1, Math.max(0, avgRating - idx));
      const clipId = `star-clip-${uid}-${idx}`;

      return `
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" class="inline-block hover:cursor-pointer">
          <defs>
            <clipPath id="${clipId}" clipPathUnits="objectBoundingBox">
              <rect x="0" y="0" width="${fill}" height="1" />
            </clipPath>
          </defs>
          <path fill="#d1d5db" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.171L12 18.896l-7.335 3.867 1.401-8.171L.132 9.21l8.2-1.192z" />
          <path fill="#facc15" clip-path="url(#${clipId})" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.171L12 18.896l-7.335 3.867 1.401-8.171L.132 9.21l8.2-1.192z" />
        </svg>`;
    })
    .join('');
}

function buildRatingSummary(
  pluginId: string,
  avgRating: number | null,
  ratingCount: number
): string {
  if (avgRating === null) return '';

  const reviewsLabel = ratingCount
    ? `<span class="text-gray-600 font-normal hover:cursor-pointer">(${ratingCount} review${ratingCount > 1 ? 's' : ''})</span>`
    : `<span class="text-gray-600 font-normal hover:cursor-pointer">(Be the first to rate!)</span>`;

  const starIcons = renderStarIcons(avgRating);

  return `<div class="flex items-center gap-2 mt-1 text-sm text-gray-800 font-semibold">
    <button type="button" class="flex items-center gap-2 hover:opacity-80" onclick="window.location.href='/plugins/${pluginId}#rate-plugin'">
      <span class="flex items-center" aria-hidden="true">${starIcons}</span>
      <span>${avgRating.toFixed(1)} / 5 ${reviewsLabel}</span>
    </button>
    <button type="button" class="text-xs px-2 py-0.5 rounded border border-violet-700 text-violet-700 hover:bg-violet-50 hover:cursor-pointer" onclick="window.location.href='/plugins/${pluginId}#rate-plugin'">Rate</button>
  </div>`;
}

function buildPluginHeader(
  plugin: any,
  index: string | undefined,
  avgRating: number | null,
  ratingCount: number
): string {
  const indexPrefix = index
    ? `<span class="text-red-700 font-bold text-2xl tracking-tight hover:text-red-800">${index}.&nbsp;</span>`
    : '';

  const ratingSummary = buildRatingSummary(
    plugin.pluginId,
    avgRating,
    ratingCount
  );

  return `<div class="plugin-header">
    <h3>
      ${indexPrefix}
      <a href="/plugins/${plugin.pluginId}" target="_blank" rel="noopener noreferrer" class="text-red-700 font-bold text-2xl tracking-tight hover:text-red-800 underline decoration-2 underline-offset-4">${plugin.name}</a>
    </h3>
    ${ratingSummary}
  </div>`;
}
