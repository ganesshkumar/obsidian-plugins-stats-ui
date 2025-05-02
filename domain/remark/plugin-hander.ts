import { PluginsCache } from "../../cache/plugins-cache";
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

        const index = data['index']
        const pluginId = data['pluginId'];
        const plugin = plugins.find((p) => p.pluginId === pluginId);
        const authorUrl = `https://github.com/${plugin.repo.split('/')[0]}`;

        node.type = 'html';
        node.value = `<div class="plugin-container" data-plugin-id="${plugin.name}">
          <div class="plugin-header">
            <h3><span class="text-gray-500">${index}.</span> <span class="text-red-700 font-bold text-2xl tracking-tight">${plugin.name}</span></h3>
          </div>
          <div class="plugin-content">
            <div class="plugin-details">
              <div class="text-sm text-gray-600">
                Released on ${moment(plugin.createdAt).format("YYYY-MM-DD")} by <a href="${authorUrl}">${plugin.author}</a>
              </div>
              <p>${plugin.osDescription.replace('**', '<b>').replace('**', '</b>')}</p>
              <a href="/plugins/${plugin.pluginId}" target="_blank" rel="noopener noreferrer" class="font-medium w-fit border bg-yellow-300 hover:bg-amber-300 text-voilet-700 px-2 py-1 rounded text-center no-underline">
                View Plugin Details
              </a>
            </div>
          </div>
        </div>`;
      }
    });
  };
}
