export const tagDenyList = ['obsidian', 'obsidian-plugin', 'obsidian-md', 'plugin', 'hacktoberfest', 'obsidianmd', 'typescript'];

export const getDescription = (plugin) => {
  if (!plugin) {
    return '';
  }

  if (plugin.aiDescription) {
      if (!plugin.aiDescription.startsWith('I apologize, but it seems that there is no README file provided') || plugin.aiDescription.length < 500) {
      return plugin.aiDescription.replaceAll('**', '');
      }
  }
  
  return plugin.description || '';
}