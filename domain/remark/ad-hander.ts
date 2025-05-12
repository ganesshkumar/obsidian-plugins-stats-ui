import { visit } from 'unist-util-visit';

export const remarkAdHandler = () => {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'cust-ad') {
        const type = node.value.trim();
        // as of now only type === 'line' is supported
        node.type = 'html';
        node.value = 'Test'; //`<div data-ea-publisher="obsidianstatscom" data-ea-type="text"></div>`;
      }
    });
  };
};
