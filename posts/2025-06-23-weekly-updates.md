---
title: Obsidian Plugin Updates 2025-06-15 to 2025-06-21
description: "new obsidian plugins from 2025-06-15 to 2025-06-21 - Text Autocomplete, CJK Count, Tree Diagram, Move Files, Todo.txt Mode, Layout Manager, Streams, Log Keeper, LLM docs, LaTeX Math, Google Contacts, Custom Selected Word Count, Folder Filelist, Ace Code Editor"
excerpt: There are 14 new plugins and 91 plugin updates in the last one week's time.
publishedDate: "2025-06-23"
modifiedDate: "2025-06-23"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 14 new plugins and 91 plugin updates in the last one week's time. Also, there are 3 new themes.

## ⭐ New Plugins

### 1. [Text Autocomplete](/plugins/text-autocomplete)

Released on 2025-06-20 by [Christ Degni](https://github.com/c-degni)

The **Text Autocomplete** plugin enhances your writing speed by offering real-time word suggestions as you type. It displays a dropdown of potential completions based on the current input, which you can navigate using arrow keys and select using Enter or Tab. Suggestions can also be dismissed with Esc, and Shift+Enter allows default Enter behaviour when the dropdown is active. A custom dictionary lets you add or remove your own words, either through plugin settings or by right-clicking selected text. You can control the number of suggestions shown and manage all plugin behaviour from the settings. Currently, it supports only English and disables itself inside code blocks for clean separation.

[View Details](/plugins/text-autocomplete), [Github](https://github.com/c-degni/text-autocomplete)

---

### 2. [CJK Count](/plugins/cjk-count)

Released on 2025-06-20 by [Louie Kurenai](https://github.com/vrabe)

The **CJK Count** plugin adds a focused word count feature that tracks only Chinese, Japanese, and Korean (CJK) characters, displaying the count directly in the status bar. This is particularly useful for writers, students, or translators who work specifically with CJK scripts and want a more accurate metric for language-specific output. The plugin filters characters using a dedicated regex library, ensuring precise counts without interference from Latin or other non-CJK content.

[View Details](/plugins/cjk-count), [Github](https://github.com/vrabe/obsidian-cjk-count)

---

### 3. [Tree Diagram](/plugins/tree-diagram)

Released on 2025-06-20 by [limpido](https://github.com/limpido)

The **Tree Diagram** plugin converts tab-indented text blocks into clean, visual tree diagrams directly within your notes. By using a simple code block with a `tree` tag, users can represent hierarchical structures like file systems, outlines, or organisational charts without needing complex syntax. The plugin parses indentation levels to define node relationships and renders them in a visual format, making it much easier to interpret nested data at a glance.

[View Details](/plugins/tree-diagram), [Github](https://github.com/limpido/obsidian-tree-diagram)

---

### 4. [Move Files](/plugins/move-files)

Released on 2025-06-20 by [Nitish Khurana](https://github.com/nitishkhurana)

The **Move Files Plugin** plugin helps you organise notes by automatically relocating all linked files—such as images and PDFs—into a dedicated subfolder named after the note. When triggered via the command palette, it scans the note for linked resources, moves those files into a "{filename} files" folder, and updates all relevant links within the note to reflect the new paths. This is particularly useful for users who want to keep their vault tidy and maintain clear separation between notes and their associated media. It simplifies housekeeping without breaking references or requiring manual file edits.

[View Details](/plugins/move-files), [Github](https://github.com/nitishkhurana/obsidian-move-files-plugin)

---

### 5. [Todo.txt Mode](/plugins/todo-txt-mode)

Released on 2025-06-20 by [rioskit](https://github.com/rioskit)

The **Todo.txt Mode** plugin adds robust support for the todo.txt task format, blending plain text task management with enhanced visual and functional features. It highlights task elements such as priorities, projects, contexts, due dates, and completed status using colour-coded decorations, which can be further customised via the Style Settings plugin. Users can move completed tasks to a dedicated file and sort tasks by priority, project, context, or due date. A boundary marker can be defined to exclude parts of the file from sorting. This plugin is ideal for those who prefer the todo.txt methodology but want smoother visual feedback and better task organisation within their notes.

[View Details](/plugins/todo-txt-mode), [Github](https://github.com/rioskit/obsidian-todo-txt-mode)

---

### 6. [Layout Manager](/plugins/layout-manager)

Released on 2025-06-19 by [Lucy Dryaeva](https://github.com/ShadiestGoat)

The **Layout Manager** plugin allows you to define and automatically apply custom layouts based on the file you open. Layouts can include split configurations, tab order, editor mode, and even non-markdown views like graph view. It's ideal for workflows where you want different layouts for specific files—like a read-only homepage, an editing dashboard, or a templating workspace. Layouts are triggered using glob-based file matching and can be saved or applied on demand. Unlike static workspace snapshots, this plugin adapts dynamically to context, offering a smoother and more personalised navigation experience across devices and platforms.

[View Details](/plugins/layout-manager), [Github](https://github.com/ShadiestGoat/obsidian-layout-manager)

---

### 7. [Streams](/plugins/streams)

Released on 2025-06-19 by [Floyd](https://github.com/bfloydd)

The **Streams** plugin lets you manage multiple parallel daily note streams, offering a flexible alternative to the default Daily Notes plugin. Each stream can be configured with its own folder and naming pattern, making it easy to separate contexts like work, school, or personal life. It includes a dedicated calendar per stream, quick access to the current day's note, and a full stream view to navigate note history. There's also a handy view for missing notes, helping you stay consistent with your journaling or tracking. Ideal for users who maintain different workflows within the same vault.

[View Details](/plugins/streams), [Github](https://github.com/bfloydd/streams)

---

### 8. [Log Keeper](/plugins/log-keeper)

Released on 2025-06-19 by [James Sonneveld](https://github.com/JimJamBimBam)

The **Log Keeper** plugin tracks and records the last modification time of notes by updating a timestamp in the YAML frontmatter whenever content changes. The timestamps follow the ISO 8601 format and get updated automatically as you type, ensuring precise and consistent metadata for each note. This metadata can be used with plugins like Dataview and Contribution Graph to visualise your editing habits over time, much like a GitHub contribution calendar. The plugin is designed to work silently in the background.

[View Details](/plugins/log-keeper), [Github](https://github.com/JimJamBimBam/obsidian-log-keeper)

---

### 9. [LLM docs](/plugins/llm-docs)

Released on 2025-06-19 by [Shane Lamb](https://github.com/shane-lamb)

The **LLM docs** plugin lets you interact with large language models directly within your markdown files, treating conversations as editable documents rather than separate chat windows. It integrates with the OpenAI API and is also compatible with self-hosted models like Ollama via an OpenAI-compatible interface. Prompts can include content from linked notes or embedded images, allowing for richer context. The plugin enhances usability with overlays like a 'complete' button and visual loading indicators, and clearly formatted user/assistant response headings make conversations easier to follow. Everything stays local in your vault, blending AI interaction naturally with your existing notes.

[View Details](/plugins/llm-docs), [Github](https://github.com/shane-lamb/obsidian-llm-docs)

---

### 10. [LaTeX Math](/plugins/latex-math)

Released on 2025-06-18 by [Zarstensen](https://github.com/zarstensen)

The **LaTeX Math** plugin adds symbolic math evaluation directly inside LaTeX math blocks using Sympy. It supports a range of commands for evaluating, expanding, factoring, and solving equations, as well as unit conversions and symbolic assumptions. You can define variables or functions, assign assumptions like 'real' or 'positive', and even convert LaTeX expressions into Sympy code blocks for advanced workflows. Evaluation is context-aware, with support for persistent definitions and scoped assumptions. All operations are triggered through commands or hotkeys, giving users a fast and flexible way to perform symbolic math inside notes.

[View Details](/plugins/latex-math), [Github](https://github.com/zarstensen/obsidian-latex-math)

---

### 11. [Google Contacts](/plugins/google-contacts)

Released on 2025-06-18 by [aleksejs1](https://github.com/aleksejs1)

The **Google Contacts Sync** plugin imports your Google contacts into your vault as individual markdown notes, complete with metadata in YAML frontmatter and space for free-form annotations. It supports multiple fields like names, emails, phone numbers, addresses, and birthdays, with customisable prefixes to prevent conflicts. You can filter synced contacts by Google labels, choose a specific folder for storing them, and define a naming pattern for the files. It only updates the frontmatter on re-sync, preserving any manual edits below. Advanced users can also configure how metadata keys are named. This makes it especially useful for users who want to maintain a lightweight personal CRM or keep contact records alongside their notes.

[View Details](/plugins/google-contacts), [Github](https://github.com/aleksejs1/obsidian-contact-sync-plugin)

---

### 12. [Custom Selected Word Count](/plugins/custom-selected-word-count)

Released on 2025-06-17 by [banisterious](https://github.com/banisterious)

The **Custom Selected Word Count** plugin adds precise and flexible word counting for selected text across all editing modes. It goes far beyond the default functionality by allowing users to exclude specific file paths, file types, and even URL-like strings from counts. Advanced users can define their own regex patterns for detecting words, with an interactive test area to validate and refine these patterns. It also logs word count history with timestamps, making it useful for writing sessions or progress tracking. The detailed settings give fine control over behaviour, from path exclusion rules to UI preferences, making it highly customisable for both casual users and power users alike.

[View Details](/plugins/custom-selected-word-count), [Github](https://github.com/banisterious/obsidian-custom-selected-word-count)

---

### 13. [Folder Filelist](/plugins/folder-filelist)

Released on 2025-06-16 by [Bill Anderson](https://github.com/band)

The **Simple Folder Filelist** plugin automatically generates markdown index files listing all notes within specified folders. It creates lists using wiki links, sorted by modification date so the most recently updated files appear first. You can finetune its behaviour through settings, like defining which folders to include, ignoring specific file extensions or filenames, and even customising the naming pattern of the list file. This is useful for users who want lightweight, auto-updating file overviews without relying on complex queries or dataview plugins.

[View Details](/plugins/folder-filelist), [Github](https://github.com/band/obsidian-folder-filelist)

---

### 14. [Ace Code Editor](/plugins/ace-code-editor)

Released on 2025-06-16 by [RavenHogWarts](https://github.com/RavenHogWarts)

The **ACE Code Editor** plugin replaces the default editing experience with an advanced code editor powered by the Ace editor. It brings syntax highlighting, code folding, and live previews directly into your workflow, making it much easier to write and manage code blocks within notes. It also lets you manage and edit CSS snippets from a dedicated panel and supports quick previews of full code files. Whether you're jotting down small scripts or maintaining full snippet libraries, this plugin adds practical flexibility for anyone dealing with code inside their notes.

[View Details](/plugins/ace-code-editor), [Github](https://github.com/RavenHogWarts/obsidian-ace-code-editor)

---

## 🔁 Plugin Updates

We got 91 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats > Updates](/updates).

### Notable Updates

- **3D Graph for Obsidian** - v2.1.0 - [Changelog](https://github.com/Apoo711/obsidian-3d-graph/releases/tag/2.1.0)
- **Anki Integration** - v1.4.3 - [Changelog](https://github.com/NoahBoos/obsidian-anki-integration/releases/tag/1.4.3)
- **Task Genius** - v9.0.0 - [Changelog](https://taskgenius.md/changelog/2025-06-19-desktop-v9.0.0)
- **QuickAdd** - v1.14.0 - [Changelog](https://github.com/chhoumann/quickadd/releases/tag/1.14.0)
- **Enhanced Copy** - v1.0.0 - [Changelog](https://github.com/Mara-Li/obsidian-enhanced-copy/releases/tag/1.0.0)
- **Workflow Tracer** - v1.4.2 - [Changelog](https://github.com/LeCheenaX/WordFlow-Tracker/releases/tag/1.4.2)

---

## 🎨 New Themes

- **SpectrumPlus** - An improved version of the Spectrum theme. (light mode only) - [Github](https://github.com/anotherlusitano/SpectrumPlus)
- **Radiance** - A sleek, modern Obsidian theme inspired by the Raycast macOS application. - [Github](https://github.com/JabariD/obsidian-radiance)
- **Iridium** - A pretty, colorful theme for Obsidian - [Github](https://github.com/kyffa/Iridium)

---
