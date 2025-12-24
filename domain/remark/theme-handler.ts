import { ThemesCache } from '../../cache/themes-cache';
import { visit } from 'unist-util-visit';
import moment from 'moment';

export const remarkThemeHandler = () => {
  return async (tree) => {
    const themes = await ThemesCache.get();

    visit(tree, 'code', (node) => {
      if (node.lang !== 'theme') return;

      const value = typeof node.value === 'string' ? node.value.trim() : '';

      const data: Record<string, string> = {};
      value.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          data[key.trim()] = value.trim();
        }
      });

      const index = data['index'];
      const themeIdentifier = data['themeId'];
      const theme =
        themes.find((t) => t.name === themeIdentifier) ||
        themes.find((t) => t.repo.split('/')[1] === themeIdentifier);

      node.type = 'html';

      if (!theme) {
        node.value = `<div class="theme-container border border-red-200 bg-red-50 text-red-700 px-3 py-2 rounded">Theme "${themeIdentifier}" not found.</div>`;
        return;
      }

      const { avg: avgRating, count: ratingCount } = getThemeRating(theme);
      const author = theme.repo.split('/')[0];
      const themeSlug = theme.repo.split('/')[1];
      const header = buildThemeHeader(theme, index, avgRating, ratingCount, themeSlug);

      let modeBlock = '';
      if (theme.isDark && theme.isLight) {
        modeBlock = `<div class="text-sm text-gray-700 mt-1">This theme supports both <b>Dark and Light</b> Mode</div>`;
      } else if (theme.isDark) {
        modeBlock = `<div class="text-sm text-gray-700 mt-1">This theme supports <b>Dark Mode</b></div>`;
      } else if (theme.isLight) {
        modeBlock = `<div class="text-sm text-gray-700 mt-1">This theme supports <b>Light Mode</b></div>`;
      }

      const imageBlock = theme.screenshot
        ? `<div class="theme-image mt-3 mb-2 flex flex-col items-start">
            <img
              src="${`https://raw.githubusercontent.com/${author}/${themeSlug}/HEAD/${theme.screenshot}`}"
              alt="${theme.name} screenshot"
              class="w-120 aspect-video border border-gray-300 rounded mb-2 self-start"
              style="margin-left: 0; margin-right: auto;"
            />
          </div>`
        : '';

      node.value = `<div class="theme-container" data-theme-id="${theme.name}">
        ${header}
        <div class="theme-content">
          <div class="theme-details">
            <div class="text-sm text-gray-600">
              Released on ${moment(theme.createdAt).format('YYYY-MM-DD')} by <a href="https://github.com/${author}" class="text-violet-700 hover:underline">${author}</a>
            </div>
            ${modeBlock}
            ${imageBlock}
          </div>
          <div class="theme-links mt-4">
            <a href="/themes/${themeSlug}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-center no-underline">
              View Theme Details
            </a>
            <a href="https://github.com/${theme.repo}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-gray-700 border-gray-700 hover:bg-gray-800 hover:border-gray-800 text-gray-200 px-2 py-1 rounded text-center no-underline ml-2">
              View on GitHub
            </a>
          </div>
        </div>
      </div>`;
    });
  };
};

function getThemeRating(theme: any): { avg: number | null; count: number } {
  const avg = theme?.ratingInfo?.avgRating ?? null;
  const count = theme?.ratingInfo?.ratingCount ?? 0;
  return { avg: typeof avg === 'number' ? avg : null, count };
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
  themeSlug: string,
  avgRating: number | null,
  ratingCount: number
): string {
  if (avgRating === null) return '';

  const reviewsLabel = ratingCount
    ? `<span class="text-gray-600 font-normal hover:cursor-pointer">(${ratingCount} review${ratingCount > 1 ? 's' : ''})</span>`
    : `<span class="text-gray-600 font-normal hover:cursor-pointer">(Be the first to rate!)</span>`;

  const starIcons = renderStarIcons(avgRating);

  return `<div class="flex items-center gap-2 mt-1 text-sm text-gray-800 font-semibold">
    <button type="button" class="flex items-center gap-2 hover:opacity-80" onclick="window.location.href='/themes/${themeSlug}#rate-theme'">
      <span class="flex items-center" aria-hidden="true">${starIcons}</span>
      <span>${avgRating.toFixed(1)} / 5 ${reviewsLabel}</span>
    </button>
    <button type="button" class="text-xs px-2 py-0.5 rounded border border-violet-700 text-violet-700 hover:bg-violet-50 hover:cursor-pointer" onclick="window.location.href='/themes/${themeSlug}#rate-theme'">Rate</button>
  </div>`;
}

function buildThemeHeader(
  theme: any,
  index: string | undefined,
  avgRating: number | null,
  ratingCount: number,
  themeSlug: string
): string {
  const indexPrefix = index
    ? `<span class="text-red-700 font-bold text-2xl tracking-tight hover:text-red-800">${index}.&nbsp;</span>`
    : '';

  const ratingSummary = buildRatingSummary(themeSlug, avgRating, ratingCount);

  return `<div class="theme-header">
    <h3>
      ${indexPrefix}
      <a href="/themes/${themeSlug}" target="_blank" rel="noopener noreferrer" class="text-red-700 font-bold text-2xl tracking-tight hover:text-red-800 underline decoration-2 underline-offset-4">${theme.name}</a>
    </h3>
    ${ratingSummary}
  </div>`;
}
