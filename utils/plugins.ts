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
  'dataview-compatible'
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

  if (tag == 'publish' || tag == 'publisher' || tag == 'publishing' || tag.includes('publishing')) {
    tag = 'publish';
  } else if (tag == 'recipe' || tag == 'recipes' || tag == 'recipe-import') {
    tag = 'recipe';
  // Merge semantically equivalent "import" tags to their base form.
  } else if (tag == 'bookmark-import') {
    tag = 'bookmark';
  } else if (tag == 'character-import') {
    tag = 'character';
  } else if (tag == 'chat-import') {
    tag = 'chat';
  } else if (tag == 'conversation-import') {
    tag = 'conversation';
  } else if (tag == 'csv-import') {
    tag = 'csv';
  } else if (tag == 'data-import') {
    tag = 'data';
  } else if (tag == 'file-import') {
    tag = 'file';
  } else if (tag == 'highlight-import') {
    tag = 'highlight';
  } else if (tag == 'json-import') {
    tag = 'json';
  } else if (tag == 'markdown-import') {
    tag = 'markdown';
  } else if (tag == 'metadata-import') {
    tag = 'metadata';
  } else if (tag == 'note-import' || tag == 'notes-import') {
    tag = 'note';
  } else if (tag == 'task-import') {
    tag = 'task';
  } else if (tag == 'template-import') {
    tag = 'template';
  } else if (tag == 'zip-import') {
    tag = 'zip';
  } else if (tag == 'recording' || tag == 'recordings') {
    tag = 'recording';
  } else if (tag == 'callout' || tag == 'callouts') {
    tag = 'callouts';
  } else if (tag == 'chartjs' || tag == 'chart' || tag == 'charts') {
    tag = 'chart';
  } else if (tag == 'pomodoro' || tag == 'pomodoro-mode') {
    tag = 'pomodoro';
  } else if (tag == '3d-models') {
    tag = '3d-model';
  } else if (tag == 'admonitions') {
    tag = 'admonition';
  } else if (tag == 'ai-models') {
    tag = 'ai-model';
  } else if (tag == 'alerts') {
    tag = 'alert';
  } else if (tag == 'algorithms') {
    tag = 'algorithm';
  } else if (tag == 'animations') {
    tag = 'animation';
  } else if (tag == 'annotations') {
    tag = 'annotation';
  } else if (tag == 'articles') {
    tag = 'article';
  } else if (tag == 'assistants') {
    tag = 'assistant';
  } else if (tag == 'attachments') {
    tag = 'attachment';
  } else if (tag == 'autocompletion') {
    tag = 'auto-completion';
  } else if (tag == 'backgrounds') {
    tag = 'background';
  } else if (tag == 'backlinks') {
    tag = 'backlink';
  } else if (tag == 'banners') {
    tag = 'banner';
  } else if (tag == 'bidirectional') {
    tag = 'bi-directional';
  } else if (tag == 'birthdays') {
    tag = 'birthday';
  } else if (tag == 'blockquotes') {
    tag = 'blockquote';
  } else if (tag == 'books') {
    tag = 'book';
  } else if (tag == 'bookmarks') {
    tag = 'bookmark';
  } else if (tag == 'breadcrumbs') {
    tag = 'breadcrumb';
  } else if (tag == 'bullets') {
    tag = 'bullet';
  } else if (tag == 'calculations') {
    tag = 'calculation';
  } else if (tag == 'captions') {
    tag = 'caption';
  } else if (tag == 'cards') {
    tag = 'card';
  } else if (tag == 'checkboxes') {
    tag = 'checkbox';
  } else if (tag == 'chemical-structures') {
    tag = 'chemical-structure';
  } else if (tag == 'chords') {
    tag = 'chord';
  } else if (tag == 'citations') {
    tag = 'citation';
  } else if (tag == 'code-blocks' || tag == 'codeblock' || tag == 'codeblocks') {
    tag = 'code-block';
  } else if (tag == 'collections') {
    tag = 'collection';
  } else if (tag == 'colors') {
    tag = 'color';
  } else if (tag == 'commands') {
    tag = 'command';
  } else if (tag == 'comments') {
    tag = 'comment';
  } else if (tag == 'contacts') {
    tag = 'contact';
  } else if (tag == 'contents') {
    tag = 'content';
  } else if (tag == 'cursors') {
    tag = 'cursor';
  } else if (tag == 'daily-notes') {
    tag = 'daily-note';
  } else if (tag == 'darkmode') {
    tag = 'dark-mode';
  } else if (tag == 'dates') {
    tag = 'date';
  } else if (tag == 'daynight') {
    tag = 'day-night';
  } else if (tag == 'definitions') {
    tag = 'definition';
  } else if (tag == 'diagrams') {
    tag = 'diagram';
  } else if (tag == 'documents') {
    tag = 'document';
  } else if (tag == 'downloads') {
    tag = 'download';
  } else if (tag == 'drafts') {
    tag = 'draft';
  } else if (tag == 'due-dates') {
    tag = 'due-date';
  } else if (tag == 'duplicates') {
    tag = 'duplicate';
  } else if (tag == 'dynamic-filters') {
    tag = 'dynamic-filter';
  } else if (tag == 'editor-enhancements') {
    tag = 'editor-enhancement';
  } else if (tag == 'embeds') {
    tag = 'embed';
  } else if (tag == 'embeddings') {
    tag = 'embedding';
  } else if (tag == 'emojis') {
    tag = 'emoji';
  } else if (tag == 'emotions') {
    tag = 'emotion';
  } else if (tag == 'equations') {
    tag = 'equation';
  } else if (tag == 'events') {
    tag = 'event';
  } else if (tag == 'fields') {
    tag = 'field';
  } else if (tag == 'files') {
    tag = 'file';
  } else if (tag == 'file-paths') {
    tag = 'file-path';
  } else if (tag == 'filters') {
    tag = 'filter';
  } else if (tag == 'fixes') {
    tag = 'fix';
  } else if (tag == 'flashcards') {
    tag = 'flashcard';
  } else if (tag == 'flowcharts') {
    tag = 'flowchart';
  } else if (tag == 'folders') {
    tag = 'folder';
  } else if (tag == 'folder-notes') {
    tag = 'folder-note';
  } else if (tag == 'fonts') {
    tag = 'font';
  } else if (tag == 'footnotes') {
    tag = 'footnote';
  } else if (tag == 'forms') {
    tag = 'form';
  } else if (tag == 'formulas') {
    tag = 'formula';
  } else if (tag == 'frontmatter') {
    tag = 'front-matter';
  } else if (tag == 'fuzzysearch') {
    tag = 'fuzzy-search';
  } else if (tag == 'graphs') {
    tag = 'graph';
  } else if (tag == 'groups') {
    tag = 'group';
  } else if (tag == 'guitar-tabs') {
    tag = 'guitar-tab';
  } else if (tag == 'habits') {
    tag = 'habit';
  } else if (tag == 'headers') {
    tag = 'header';
  } else if (tag == 'headings') {
    tag = 'heading';
  } else if (tag == 'highlights') {
    tag = 'highlight';
  } else if (tag == 'hotkeys') {
    tag = 'hotkey';
  } else if (tag == 'hyperlinks') {
    tag = 'hyperlink';
  } else if (tag == 'icons') {
    tag = 'icon';
  } else if (tag == 'ids') {
    tag = 'id';
  } else if (tag == 'iframes') {
    tag = 'iframe';
  } else if (tag == 'images') {
    tag = 'image';
  } else if (tag == 'image-previews') {
    tag = 'image-preview';
  } else if (tag == 'issues') {
    tag = 'issue';
  } else if (tag == 'journals') {
    tag = 'journal';
  }
  // Normalize journaling variations to the canonical "journal"
  else if (tag == 'journaling') {
    tag = 'journal';
  } else if (tag == 'keyboard-shortcuts') {
    tag = 'keyboard-shortcut';
  } else if (tag == 'language-models') {
    tag = 'language-model';
  } else if (tag == 'language-tools' || tag == 'languagetool') {
    tag = 'language-tool';
  } else if (tag == 'lightmode') {
    tag = 'light-mode';
  } else if (tag == 'links') {
    tag = 'link';
  } else if (tag == 'lists') {
    tag = 'list';
  } else if (tag == 'llms') {
    tag = 'llm';
  } else if (tag == 'local-models') {
    tag = 'local-model';
  } else if (tag == 'macros') {
    tag = 'macro';
  } else if (tag == 'maps') {
    tag = 'map';
  } else if (tag == 'markdown-enhancements') {
    tag = 'markdown-enhancement';
  } else if (tag == 'meetings') {
    tag = 'meeting';
  } else if (tag == 'memos') {
    tag = 'memo';
  } else if (tag == 'mentions') {
    tag = 'mention';
  } else if (tag == 'mind-mapping' || tag == 'mindmap') {
    tag = 'mind-map';
  } else if (tag == 'nodes') {
    tag = 'node';
  } else if (tag == 'notations') {
    tag = 'notation';
  } else if (tag == 'notes') {
    tag = 'note';
  } else if (tag == 'note-enhancements') {
    tag = 'note-enhancement';
  } else if (tag == 'note-templates') {
    tag = 'note-template';
  } else if (tag == 'note-titles') {
    tag = 'note-title';
  } else if (tag == 'notifications') {
    tag = 'notification';
  } else if (tag == 'ordered-lists') {
    tag = 'ordered-list';
  } else if (tag == 'orgmode') {
    tag = 'org-mode';
  } else if (tag == 'outlines') {
    tag = 'outline';
  }
  // Merge various outline-related tags into a single canonical tag
  else if (tag == 'markdown-outline' || tag == 'outline-creation' || tag == 'visual-outline' || tag == 'outliner') {
    tag = 'outline';
  } else if (tag == 'panels') {
    tag = 'panel';
  } else if (tag == 'pdf-annotations') {
    tag = 'pdf-annotation';
  } else if (tag == 'placeholders') {
    tag = 'placeholder';
  } else if (tag == 'podcasts') {
    tag = 'podcast';
  }
  // Merge Table-of-contents related tags into a single canonical tag
  else if (tag == 'toc' || tag == 'automatic-toc' || tag == 'floating-toc' || tag == 'toc-generator' || tag == 'table-of-contents') {
    tag = 'table-of-contents';
  }
  // Normalize British and American spellings for color/colour
  else if (tag == 'custom-colours') {
    tag = 'custom-colors';
  } else if (tag == 'presentations') {
    tag = 'presentation';
  } else if (tag == 'prompts') {
    tag = 'prompt';
  } else if (tag == 'properties') {
    tag = 'property';
  } else if (tag == 'queries') {
    tag = 'query';
  } else if (tag == 'quotes') {
    tag = 'quote';
  } else if (tag == 'random-notes') {
    tag = 'random-note';
  } else if (tag == 'readonly') {
    tag = 'read-only';
  } else if (tag == 'recurring-tasks') {
    tag = 'recurring-task';
  } else if (tag == 'references') {
    tag = 'reference';
  } else if (tag == 'relative-paths') {
    tag = 'relative-path';
  } else if (tag == 'reminders') {
    tag = 'reminder';
  } else if (tag == 'roleplaying') {
    tag = 'role-playing';
  } else if (tag == 'routines') {
    tag = 'routine';
  } else if (tag == 'screenshots') {
    tag = 'screenshot';
  } else if (tag == 'scripts') {
    tag = 'script';
  } else if (tag == 'scriptures') {
    tag = 'scripture';
  } else if (tag == 'shortcuts') {
    tag = 'shortcut';
  } else if (tag == 'snippets') {
    tag = 'snippet';
  } else if (tag == 'spellcheck') {
    tag = 'spell-check';
  } else if (tag == 'spoilers') {
    tag = 'spoiler';
  } else if (tag == 'spreadsheets') {
    tag = 'spreadsheet';
  } else if (tag == 'statblocks') {
    tag = 'statblock';
  } else if (tag == 'summaries') {
    tag = 'summary';
  } else if (tag == 'tabs') {
    tag = 'tab';
  } else if (tag == 'tables') {
    tag = 'table';
  } else if (tag == 'tags') {
    tag = 'tag';
  } else if (tag == 'tasks') {
    tag = 'task';
  } else if (tag == 'task-lists') {
    tag = 'task-list';
  } else if (tag == 'templates') {
    tag = 'template';
  } else if (tag == 'text-annotations') {
    tag = 'text-annotation';
  } else if (tag == 'themes') {
    tag = 'theme';
  } else if (tag == 'timelines') {
    tag = 'timeline';
  } else if (tag == 'timestamps') {
    tag = 'timestamp';
  } else if (tag == 'titles') {
    tag = 'title';
  } else if (tag == 'todo-management') {
    tag = 'to-do-management';
  } else if (tag == 'todos') {
    tag = 'todo';
  } else if (tag == 'tooltips') {
    tag = 'tooltip';
  } else if (tag == 'transcripts') {
    tag = 'transcript';
  } else if (tag == 'ui-adjustments') {
    tag = 'ui-adjustment';
  } else if (tag == 'ui-enhancements') {
    tag = 'ui-enhancement';
  } else if (tag == 'updates') {
    tag = 'update';
  } else if (tag == 'urls') {
    tag = 'url';
  } else if (tag == 'utilities') {
    tag = 'utility';
  } else if (tag == 'values') {
    tag = 'value';
  } else if (tag == 'videos') {
    tag = 'video';
  } else if (tag == 'view-modes') {
    tag = 'view-mode';
  } else if (tag == 'virustotal') {
    tag = 'virus-total';
  } else if (tag == 'visuals') {
    tag = 'visual';
  } else if (tag == 'visual-enhancements') {
    tag = 'visual-enhancement';
  } else if (tag == 'visual-indicators') {
    tag = 'visual-indicator';
  } else if (tag == 'voicenotes') {
    tag = 'voice-notes';
  } else if (tag == 'webpage') {
    tag = 'web-page';
  } else if (tag == 'webhooks') {
    tag = 'webhook';
  } else if (tag == 'wiki-linking' || tag == 'wikilinks') {
    tag = 'wiki-links';
  } else if (tag == 'workflows') {
    tag = 'workflow';
  } else if (tag == 'workspaces') {
    tag = 'workspace';
  } else if (tag == 'worldbuilding') {
    tag = 'world-building';
  } else if (tag == 'writing-tools') {
    tag = 'writing-tool';
  } else if (tag == 'zenmode') {
    tag = 'zen-mode';
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
