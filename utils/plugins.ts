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
  return tag.toLowerCase().trim().replace(/\s+/g, '-'); //.replaceAll('-', '');
};

export const getDescription = (plugin) => {
  if (!plugin) {
    return '';
  }

  const { aiDescription } = plugin;

  if (aiDescription) {
    if (
      !aiDescription.startsWith('I apologize') &&
      !aiDescription.startsWith('Here is a 100-word summary of the') &&
      !aiDescription.startsWith('A Summary in 100 Words') &&
      !aiDescription.startsWith('Here is a brief summary of') &&
      !aiDescription.startsWith("You're an Obsidian plugin developer") &&
      !aiDescription.startsWith('This is a blog post about an Obsidian plugin') &&
      !aiDescription.startsWith("I'm afraid I have some bad news") &&
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
