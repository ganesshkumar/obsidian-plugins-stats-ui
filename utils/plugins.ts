export const tagDenyList = ['obsidian', 'obsidian-plugin', 'obsidian-md', 'plugin', 'hacktoberfest', 'obsidianmd', 'typescript'];

export const getDescription = (plugin) => {
  if (!plugin) {
    return '';
  }

  const { aiDescription } = plugin;

  if (aiDescription) {
    if (!aiDescription.startsWith('I apologize') && !aiDescription.startsWith('Here is a 100-word summary') && getWordCount(aiDescription) < 500) {
      return aiDescription.replaceAll('**', '');
    }
  }

  return plugin.description || '';
}

const getWordCount = (text) => {
  if (!text) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
}