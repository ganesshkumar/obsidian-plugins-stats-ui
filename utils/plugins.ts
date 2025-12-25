import { Plugin } from '@prisma/client';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';

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
  'dataview-compatible',
];

// Tag normalization mapping
const tagNormalizationMap = {
  // Basic normalization
  index: 'indexing',

  // Publishing-related tags
  publish: 'publish',
  publisher: 'publish',
  publishing: 'publish',

  // Recipe-related tags
  recipe: 'recipe',
  recipes: 'recipe',
  'recipe-import': 'recipe',

  // Import tags - merge to their base form
  'bookmark-import': 'bookmark',
  'character-import': 'character',
  'chat-import': 'chat',
  'conversation-import': 'conversation',
  'csv-import': 'csv',
  'data-import': 'data',
  'file-import': 'file',
  'highlight-import': 'highlight',
  'json-import': 'json',
  'markdown-import': 'markdown',
  'metadata-import': 'metadata',
  'note-import': 'note',
  'notes-import': 'note',
  'task-import': 'task',
  'template-import': 'template',
  'zip-import': 'zip',

  // Recordings
  recording: 'recording',
  recordings: 'recording',

  // Callouts
  callout: 'callouts',
  callouts: 'callouts',

  // Charts
  chartjs: 'chart',
  chart: 'chart',
  charts: 'chart',

  // Pomodoro
  pomodoro: 'pomodoro',
  'pomodoro-mode': 'pomodoro',

  // Plurals to singular
  '3d-models': '3d-model',
  admonitions: 'admonition',
  'ai-models': 'ai-model',
  alerts: 'alert',
  algorithms: 'algorithm',
  animations: 'animation',
  annotations: 'annotation',
  articles: 'article',
  assistants: 'assistant',
  attachments: 'attachment',
  backgrounds: 'background',
  backlinks: 'backlink',
  banners: 'banner',
  birthdays: 'birthday',
  blockquotes: 'blockquote',
  books: 'book',
  bookmarks: 'bookmark',
  breadcrumbs: 'breadcrumb',
  bullets: 'bullet',
  calculations: 'calculation',
  captions: 'caption',
  cards: 'card',
  checkboxes: 'checkbox',
  'chemical-structures': 'chemical-structure',
  chords: 'chord',
  citations: 'citation',
  collections: 'collection',
  colors: 'color',
  commands: 'command',
  comments: 'comment',
  contacts: 'contact',
  contents: 'content',
  cursors: 'cursor',
  'daily-notes': 'daily-note',
  databases: 'database',
  dates: 'date',
  definitions: 'definition',
  diagrams: 'diagram',
  documents: 'document',
  downloads: 'download',
  drafts: 'draft',
  'due-dates': 'due-date',
  duplicates: 'duplicate',
  'dynamic-filters': 'dynamic-filter',
  'editor-enhancements': 'editor-enhancement',
  embeds: 'embed',
  embeddings: 'embedding',
  emojis: 'emoji',
  emotions: 'emotion',
  equations: 'equation',
  events: 'event',
  fields: 'field',
  files: 'file',
  'file-paths': 'file-path',
  filters: 'filter',
  fixes: 'fix',
  flashcards: 'flashcard',
  flowcharts: 'flowchart',
  folders: 'folder',
  'folder-notes': 'folder-note',
  fonts: 'font',
  footnotes: 'footnote',
  forms: 'form',
  formulas: 'formula',
  'grammar-checker': 'grammar-check',
  graphs: 'graph',
  groups: 'group',
  'guitar-tabs': 'guitar-tab',
  habits: 'habit',
  headers: 'header',
  headings: 'heading',
  highlights: 'highlight',
  hotkeys: 'hotkey',
  hyperlinks: 'hyperlink',
  icons: 'icon',
  'icons-support': 'icon',
  ids: 'id',
  iframes: 'iframe',
  'image-embedder': 'image-embedding',
  images: 'image',
  'image-previews': 'image-preview',
  issues: 'issue',
  js: 'javascript',
  journals: 'journal',
  'keyboard-shortcuts': 'keyboard-shortcut',
  'language-models': 'language-model',
  links: 'link',
  lists: 'list',
  llms: 'llm',
  'local-models': 'local-model',
  macros: 'macro',
  maps: 'map',
  'markdown-enhancements': 'markdown-enhancement',
  meetings: 'meeting',
  memos: 'memo',
  mentions: 'mention',
  'movie-tracker': 'movie-tracking',
  movies: 'movie',
  nodes: 'node',
  notations: 'notation',
  notes: 'note',
  'note-enhancements': 'note-enhancement',
  'note-templates': 'note-template',
  'note-titles': 'note-title',
  notifications: 'notification',
  'openai-integration': 'openai',
  'ordered-lists': 'ordered-list',
  panels: 'panel',
  para: 'para-method',
  'pdf-annotations': 'pdf-annotation',
  placeholders: 'placeholder',
  podcasts: 'podcast',
  presentations: 'presentation',
  prompts: 'prompt',
  properties: 'property',
  queries: 'query',
  quotes: 'quote',
  'random-notes': 'random-note',
  randonized: 'randomness',
  'recurring-tasks': 'recurring-task',
  references: 'reference',
  'relative-paths': 'relative-path',
  reminders: 'reminder',
  routines: 'routine',
  rss: 'rss-feeds',
  scheduling: 'schedule',
  screenshots: 'screenshot',
  scripts: 'script',
  scriptures: 'scripture',
  shortcuts: 'shortcut',
  snippets: 'snippet',
  spoilers: 'spoiler',
  spreadsheets: 'spreadsheet',
  statblocks: 'statblock',
  summaries: 'summary',
  tabs: 'tab',
  tables: 'table',
  tags: 'tag',
  tasks: 'task',
  'task-lists': 'task-list',
  templates: 'template',
  'text-annotations': 'text-annotation',
  themes: 'theme',
  timelines: 'timeline',
  timestamps: 'timestamp',
  titles: 'title',
  todos: 'todo',
  tooltips: 'tooltip',
  transcripts: 'transcript',
  'ui-adjustments': 'ui-adjustment',
  'ui-enhancements': 'ui-enhancement',
  updates: 'update',
  urls: 'url',
  utilities: 'utility',
  values: 'value',
  videos: 'video',
  'view-modes': 'view-mode',
  visuals: 'visual',
  'visual-enhancements': 'visual-enhancement',
  'visual-indicators': 'visual-indicator',
  webhooks: 'webhook',
  workflows: 'workflow',
  workspaces: 'workspace',
  'workspaces-management': 'workspace',
  'workspace-aesthetics': 'workspace',
  'workspace-organization': 'workspace',
  'workspace-setup': 'workspace',
  'workspace-ui': 'workspace',
  'writing-tools': 'writing-tool',
  'youtube-support': 'youtube',

  // Special normalizations
  autocompletion: 'auto-completion',
  bidirectional: 'bi-directional',
  'code-blocks': 'code-block',
  codeblock: 'code-block',
  codeblocks: 'code-block',
  darkmode: 'dark-mode',
  daynight: 'day-night',
  frontmatter: 'front-matter',
  fuzzysearch: 'fuzzy-search',
  journaling: 'journal',
  'language-tools': 'language-tool',
  languagetool: 'language-tool',
  lightmode: 'light-mode',
  'mind-mapping': 'mind-map',
  mindmap: 'mind-map',
  orgmode: 'org-mode',
  outlines: 'outline',
  readonly: 'read-only',
  roleplaying: 'role-playing',
  spellcheck: 'spell-check',
  'todo-management': 'to-do-management',
  virustotal: 'virus-total',
  voicenotes: 'voice-notes',
  webpage: 'web-page',
  worldbuilding: 'world-building',
  zenmode: 'zen-mode',

  // Multi-variant normalizations
  'markdown-outline': 'outline',
  'outline-creation': 'outline',
  'visual-outline': 'outline',
  outliner: 'outline',

  toc: 'table-of-contents',
  'automatic-toc': 'table-of-contents',
  'floating-toc': 'table-of-contents',
  'toc-generator': 'table-of-contents',
  'table-of-contents': 'table-of-contents',

  'custom-colours': 'custom-colors',

  'wiki-linking': 'wiki-links',
  wikilinks: 'wiki-links',

  'collapse-folders': 'collapse',
  'ai-assistance': 'ai-assistant',
  schedule: 'scheduling',
  select: 'selection',
  'pane-customization': 'pane-management',
  fuzzy: 'fuzzy-search',
  'fuzzy-matching': 'fuzzy-search',
  'game-master': 'game-mastering',
  habit: 'habit-tracking',
  importer: 'import',
};

export const sanitizeTag = (tag) => {
  if (!tag) {
    return tag;
  }

  tag = tag.toLowerCase().trim().replace(/\s+/g, '-');

  // Handle special case for publishing with includes check
  if (tag.includes('publishing')) {
    return 'publish';
  }

  // Use the normalization map
  return tagNormalizationMap[tag] || tag;
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

export const toPluginItem = (plugin: Plugin) => {
  return {
    pluginId: plugin.pluginId,
    name: plugin.name,
    author: plugin.author,
    createdAt: plugin.createdAt,
    totalDownloads: plugin.totalDownloads,
    repo: plugin.repo,
    osCategory: plugin.osCategory,
    osTags: plugin.osTags,
    osDescription: plugin.osDescription,
    description: plugin.description,
  };
};

export const toPluginsListItem = (plugin: Plugin): IPluginsListItem => {
  return {
    pluginId: plugin.pluginId,
    name: plugin.name,
    author: plugin.author,
    description: plugin.description,
    osDescription: plugin.osDescription,
    osCategory: plugin.osCategory,
    osTags: plugin.osTags,
    repo: plugin.repo,
    createdAt: plugin.createdAt,
    latestReleaseAt: plugin.latestReleaseAt,
    latestRelease: plugin.latestRelease,
    totalDownloads: plugin.totalDownloads,
    zScoreTrending: plugin.zScoreTrending,
    score: plugin.score,
    scoreReason: plugin.scoreReason,
    closedIssues: plugin.closedIssues,
    openIssues: plugin.openIssues,
    totalIssues: plugin.totalIssues,
    mergedPR: plugin.mergedPR,
    closedPR: plugin.closedPR,
    openPR: plugin.openPR,
    totalPR: plugin.totalPR,
    commitCountInLastYear: plugin.commitCountInLastYear,
    stargazers: plugin.stargazers,
    subscribers: plugin.subscribers,
    forks: plugin.forks,
    ratingInfo: (plugin as unknown as { ratingInfo?: IPluginsListItem['ratingInfo'] })
      .ratingInfo,
  };
};

const getWordCount = (text) => {
  if (!text) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
};
