import { visit } from 'unist-util-visit';

export const remarkPluginImageHandler = () => {
  return (tree) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'plugin-image') {
        const value = (node.value || '').trim();
        const data: Record<string, string> = {};
        value.split('\n').forEach((line) => {
          const idx = line.indexOf(':');
          if (idx !== -1) {
            const key = line.slice(0, idx).trim();
            const val = line.slice(idx + 1).trim();
            data[key] = val;
          }
        });

        const description = data['description'] || '';
        const url = data['url'] || '';
        const source = (data['source'] || '').toLowerCase();

        // Build HTML: description (if any), image centered, and optional attribution for github
        let html = `<div class="plugin-image-container mt-8">`;
        if (description) {
          html += `<div class="text-center text mb-2">${description}</div>`;
        }

        html += `<div class="text-center"><img src="${url}" alt="${escapeHtml(
          description || 'plugin image'
        )}" class="mx-auto"/></div>`;

        if (source === 'github' || source === 'gh') {
          html += `<div class="text-center text-sm text-gray-700 mt-2 italic">Image from the plugin's source github repo</div>`;
        }

        html += `</div>`;

        node.type = 'html';
        node.value = html;
      }
    });
  };
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
