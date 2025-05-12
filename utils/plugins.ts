export const tagDenyList = [
  '',
  'obsidian',
  'obsidianmd',
  'obsidianplugin',
  'obsidianplugins',
  'plugin',
  'plugins',
  'hacktoberfest',
  'obsidianmd',
];

export const sanitizeTag = (tag) => {
  if (!tag) {
    return tag;
  }

  tag = tag.toLowerCase().trim().replace(/\s+/g, '-'); //.replaceAll('-', '');

  // index tag page will conflict with the tags page
  if (tag == 'index') {
    tag = 'indexing';
  }

  if (
    tag == 'publish' ||
    tag == 'publisher' ||
    tag == 'publishing' ||
    tag.includes('publishing')
  ) {
    tag = 'publish';
  } else if (tag == 'recipe' || tag == 'recipes' || tag == 'recipe-import') {
    tag = 'recipe';
  } else if (tag == 'recording' || tag == 'recordings') {
    tag = 'recording';
  }

  return tag;
};

export const getDescription = (plugin) => {
  if (!plugin) {
    return '';
  }

  const { osDescription } = plugin;

  if (osDescription) {
    if (
      !osDescription.startsWith('I apologize') &&
      !osDescription.startsWith('Here is a 100-word summary of the') &&
      !osDescription.startsWith('A Summary in 100 Words') &&
      !osDescription.startsWith('Here is a brief summary of') &&
      !osDescription.startsWith("You're an Obsidian plugin developer") &&
      !osDescription.startsWith(
        'This is a blog post about an Obsidian plugin'
      ) &&
      !osDescription.startsWith("I'm afraid I have some bad news") &&
      getWordCount(osDescription) < 500
    ) {
      return osDescription.replaceAll('**', '');
    }
  }

  return plugin.description || '';
};

const getWordCount = (text) => {
  if (!text) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
};
