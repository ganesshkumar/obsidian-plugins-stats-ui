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
  return tag.toLowerCase().trim().replaceAll(' ', ''); //.replaceAll('-', '');
};

export const getDescription = (plugin) => {
  if (!plugin) {
    return '';
  }

  const { aiDescription } = plugin;

  if (aiDescription) {
    if (
      !aiDescription.startsWith('I apologize') &&
      !aiDescription.startsWith('Here is a 100-word summary') &&
      getWordCount(aiDescription) < 500
    ) {
      return aiDescription.replaceAll('**', '');
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
