---
title: Obsidian Plugin Updates 2025-05-11 to 2025-05-17
description: "There are 29 new plugins, 79 plugin updates and 5 new themes in the last one week's time"
excerpt: "There are 29 new plugins, 79 plugin updates and 5 new themes in the last one week's time"
publishedDate: "2025-05-18"
modifiedDate: "2025-05-18"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 29 new plugins, 79 plugin updates and 5 new themes in the last one week's time.

Another week, another wave of powerful new tools for your Obsidian vault! From academic reference managers and voice-powered automation to visual folder theming and timeline visualization, the 29 new plugins released this week bring a rich variety of enhancements. We've also seen 79 exciting plugin updates and 5 fresh themes to give your workspace a whole new vibe. Whether you're a researcher, productivity nerd, or customization enthusiast, there's something in here for you. Let's explore what's new and noteworthy this week!

## ⭐ New Plugins

### 1. [BibLib](/plugins/biblib)

Released on 2025-05-15 by [Callum Alpass](https://github.com/callumalpass)

The **BibLib** plugin transforms your note vault into a comprehensive academic reference manager by representing each bibliographic entry as a Markdown file with CSL-JSON metadata stored in the YAML frontmatter. It integrates seamlessly with Zotero for one-click importing, supports DOI/ISBN lookups, and manages attachments like PDFs within your vault. Researchers can customize citekey generation, templates, and export citations as BibTeX or CSL-JSON for tools like Pandoc.

[View Details](/plugins/biblib), [Github](https://github.com/callumalpass/obsidian-biblib)

---

### 2. [SolidTime Integration](/plugins/solidtime-integration)

Released on 2025-05-15 by [proniclabs](https://github.com/pronicx)

The **SolidTime Integration** plugin brings time tracking directly into your workflow by connecting your vault with your SolidTime.io account. It offers a sidebar tracker where you can view and control active timers, edit descriptions, switch projects, toggle billable status, and manage tags—all without leaving your notes. The plugin also supports status bar updates, modal-based commands to start or stop timers, and automatic syncing of your SolidTime data like projects, tasks, and tags. It’s designed for users who want to track focused work sessions while staying within their note-taking environment. With real-time updates and customisable settings, this plugin makes it easy to maintain productivity logs alongside your work notes.

[View Details](/plugins/solidtime-integration), [Github](https://github.com/pronicx/obsidian-solidtime-integration)

---

### 3. [Zhongwen Reader](/plugins/zhongwen-reader)

Released on 2025-05-15 by [natipt](https://github.com/natipt)

The **Zhongwen Reader** plugin helps users build their Chinese vocabulary directly within their notes using hover-based translations and integrated vocab management. When enabled, hovering over Chinese text shows pinyin, simplified and traditional forms, and definitions using the CC-CEDICT dictionary. Users can highlight HSK-level vocabulary, save words and their context into a vocab list, and view this list via a dedicated sidebar. Example sentences are automatically captured when saving a word and can be added to existing entries if found in new contexts. The plugin also supports generating spaced repetition flashcards from saved vocab for use with compatible plugins.

[View Details](/plugins/zhongwen-reader), [Github](https://github.com/natipt/obsidian-zhongwen-reader)

---

### 4. [GitHub Integration](/plugins/github)

Released on 2025-05-14 by [Kirill Zhuravlev](https://github.com/kazhuravlev)

The **GitHub Integration** plugin brings your starred GitHub repositories into your vault as structured notes, making it easier to track and reference useful projects within your knowledge base. It fetches metadata like repository language, topics, creation date, and star count, and organizes them using automatic tagging. With incremental updates, the plugin ensures only new stars are added without overwriting existing notes. Users can customize where these notes are stored, and using a GitHub token allows for higher API usage limits. This is especially helpful for developers, researchers, or anyone curating open-source tools for long-term learning or documentation.

[View Details](/plugins/github), [Github](https://github.com/kazhuravlev/obsidian-github)

---

### 5. [Performium](/plugins/performosu)

Released on 2025-05-14 by [Louie Kurenai](https://github.com/ruikurenaii)

The **Performium** plugin introduces a fun, gamified approach to note-taking by calculating performance points (PP) inspired by the osu! game system. It analyzes your vault based on factors like readability, complexity, and informational content to generate a score reflecting the quality of your notes. A dedicated ribbon icon and command trigger the scoring process, which displays results in a modal once analysis is complete. Users can also choose between different PP system versions from the settings, which may affect the scoring outcome.

[View Details](/plugins/performosu), [Github](https://github.com/ruikurenaii/performium)

---

### 6. [Theme by Folder](/plugins/theme-by-folder)

Released on 2025-05-14 by [Jinmu Go](https://github.com/JinmuGo)

The **Theme by Folder** plugin allows users to automatically switch themes based on the folder of the currently opened note. You can assign different visual themes to specific folders, enabling a more contextual and personalised workspace. It also supports a fallback theme when no folder match is found, ensuring a consistent appearance across the vault. The configuration is straightforward and accessible through a user-friendly settings panel. This lightweight plugin is ideal for those who manage diverse content types and want a visual cue or separation based on their vault’s structure.

[View Details](/plugins/theme-by-folder), [Github](https://github.com/JinmuGo/obsidian-theme-by-folder)

---

### 7. [OpenAugi](/plugins/openaugi)

Released on 2025-05-14 by [Chris Lettieri](https://github.com/bitsofchris)

The **OpenAugi** plugin transforms voice transcripts into a structured and self-organizing knowledge system using AI-powered workflows. By parsing voice notes or any freeform text, it breaks content down into atomic notes, extracts tasks, and generates summaries with contextual links. Users can also distill groups of linked notes into concise insights, making it ideal for synthesizing research or complex projects. With support for custom processing instructions, it offers flexibility in how information is extracted and organized. This plugin is especially useful for those who think out loud, prefer voice capture, or want to automate second-brain workflows using OpenAI models.

[View Details](/plugins/openaugi), [Github](https://github.com/bitsofchris/openaugi-obsidian-plugin)

---

### 8. [Inboxer](/plugins/inboxer)

Released on 2025-05-14 by [Eoin Hurrell](https://github.com/eoinhurrell)

The **Inboxer** plugin adds simple yet effective tools to help structure your notes with dedicated inbox and timeline sections. It introduces two core commands—one to add new entries under a configurable 'INBOX' heading, and another to append timestamped events under a 'TIMELINE' heading. These sections are either found or created automatically within a note, making it easy to capture thoughts, tasks, or chronological updates without disrupting your workflow. Designed for use with daily or project notes, this plugin streamlines note-taking for users who prefer lightweight organization without complex setups.

[View Details](/plugins/inboxer), [Github](https://github.com/eoinhurrell/obsidian-inboxer)

---

### 9. [MatchSyntax](/plugins/match-syntax)

Released on 2025-05-14 by [Eda](https://github.com/rivea0)

The **MatchSyntax** plugin enables advanced text searches within your notes using a flexible, regex-like query system based on the `compromise` natural language processing library. It highlights matching parts of the currently active note using a wide range of match types including part-of-speech tags, wildcard patterns, fuzzy matches, and regular expressions. With support for grammatical tags like #Noun, #Verb, #Adjective, and contextual filters like punctuation or casing, it allows precise and nuanced lookups tailored for English content. Ideal for linguists, researchers, and power users who want to dissect or annotate text more intelligently, MatchSyntax offers a unique grammar-aware search capability inside your vault.

[View Details](/plugins/match-syntax), [Github](https://github.com/rivea0/obsidian-match-syntax)

---

### 10. [Virtual Footer](/plugins/virtual-footer)

Released on 2025-05-14 by [Signynt](https://github.com/Signynt)

The **Virtual Footer** plugin allows you to append dynamic markdown content—such as dataview queries—to the bottom of all notes within a specified folder, without modifying the actual file content. This virtual rendering approach keeps your notes clean and avoids repetitive code blocks while enabling consistent display across related notes. You can define custom rules for each folder, making it ideal for cases like automatically adding summary tables or linked content below author profiles or project notes.

[View Details](/plugins/virtual-footer), [Github](https://github.com/Signynt/virtual-footer)

---

### 11. [Comments](/plugins/comments)

Released on 2025-05-14 by [Jasper Surmont](https://github.com/jaspersurmont)

The **Comments** plugin introduces a lightweight comment system that enables collaborative note-taking through inline callouts. Comments follow a structured format with author name and date, and can be quickly added via command or managed through a side panel. This dedicated view displays all comments in the current note and allows users to navigate to, reply to, or delete comments with simple clicks. Comments remain hidden in Reading mode and during exports like PDF, making them ideal for internal feedback or collaborative editing without cluttering the final output. It's particularly useful for teams or individuals reviewing notes together.

[View Details](/plugins/comments), [Github](https://github.com/jaspersurmont/obsidian-comments)

---

### 12. [Vertical Timeline List](/plugins/vertical-timeline-list)

Released on 2025-05-14 by [Jalad](https://github.com/Jalad25)

The **Vertical Timeline List** plugin allows you to visually represent timelines using specially formatted task lists. By placing a 't' inside task brackets and nesting dates with corresponding descriptions, you can create structured vertical timelines that display cleanly in Reading View. This format is ideal for capturing chronological events such as project milestones, historical notes, or personal journals. While it integrates well with the Tasks and Dataview plugins, there are some limitations in Live Preview and Dataview queries involving collapsible sections.

[View Details](/plugins/vertical-timeline-list), [Github](https://github.com/Jalad25/vertical-timeline-list)

---

### 13. [Wakatime / Wakapi](/plugins/wakatime-kvh)

Released on 2025-05-14 by [Kevin Woblick](https://github.com/Kovah)

The **Wakatime / Wakapi Plugin** plugin helps you track the time you spend working in Obsidian by integrating with either Wakatime or a self-hosted Wakapi instance. It sends activity heartbeats to record your editing sessions and supports Markdown, PDFs, and images. You can set a default project or map specific folders and files to different projects, while also excluding certain paths using an ignore list. This plugin doesn't require the separate wakatime-cli client, making it lightweight and easy to set up. It's useful for anyone who wants detailed time tracking and productivity insights tailored to their Obsidian usage.

[View Details](/plugins/wakatime-kvh), [Github](https://github.com/Kovah/obsidian-wakatime)

---

### 14. [Image Border Style](/plugins/image-border-style)

Released on 2025-05-13 by [Anurag Shenoy](https://github.com/shenoy-anurag)

The **Image Border Style** plugin adds customizable border radii to images, offering a visually polished look for your notes. It includes nine preset options ranging from no border to extra-large rounded corners, with the default mimicking Notion’s styling. The plugin is designed to be lightweight with negligible performance impact, making it ideal for users who want aesthetic improvements without slowing down their workflow.

[View Details](/plugins/image-border-style), [Github](https://github.com/shenoy-anurag/obsidian-image-border-style)

---

### 15. [Simple Password](/plugins/simple-password)

Released on 2025-05-13 by [Lucy Dryaeva](https://github.com/ShadiestGoat)

The **Simple Password** plugin adds a lightweight privacy layer to your vault by allowing you to lock specific folders or files with a password. It prevents unauthorized access without modifying or encrypting your files. You can trigger the lock manually via commands, hotkeys, ribbon button, or custom URLs, and the vault auto-locks after inactivity. The plugin offers two privacy modes—blur or tab closing—for flexible display protection. It also blocks file previews, embeds, and search results in locked areas, with an option to exclude certain paths. Although it doesn’t offer real encryption, it’s ideal for casual protection when working in shared or public environments.

[View Details](/plugins/simple-password), [Github](https://github.com/ShadiestGoat/obsidian-simple-password)

---

### 16. [Simple Colored Folder](/plugins/simple-colored-folder)

Released on 2025-05-13 by [Mara-Li](https://github.com/Mara-Li)

The **Simple Colored Folder** plugin enhances the visual organisation of your vault by automatically adding custom colours to root-level folders. It integrates with the Style Settings plugin, allowing you to define and modify folder colours through a user-friendly interface. Real-time updates ensure that style changes are immediately reflected, and the plugin supports both light and dark themes. You can also use CSS templates for advanced customisation or export styles as snippets. It’s especially helpful for users who want a more visually intuitive file structure without cluttering their notes or folder names.

[View Details](/plugins/simple-colored-folder), [Github](https://github.com/Mara-Li/obsidian-simple-colored-folder)

---

### 17. [Cut The Fluff](/plugins/cut-the-fluff)

Released on 2025-05-13 by [Adam Fletcher](https://github.com/adamfletcher)

The **Cut The Fluff** plugin helps you improve your writing by highlighting filler words, clichés, and overly complex phrases that reduce clarity. It identifies common issues like weak qualifiers (e.g., 'very', 'really'), jargon, redundant expressions, and unnecessarily complicated wording. The plugin offers four built-in rule categories that can be toggled individually, and also supports custom rules and exceptions to tailor suggestions to your style. Matches can be visually marked using options like dim, strikethrough, or underline, or styled via CSS for more control.

[View Details](/plugins/cut-the-fluff), [Github](https://github.com/adamfletcher/obsidian-cut-the-fluff)

---

### 18. [YouTrack Fetcher](/plugins/youtrack-fetcher)

Released on 2025-05-13 by [Forketyfork](https://github.com/forketyfork)

The **YouTrack Fetcher** plugin streamlines issue tracking by allowing you to fetch YouTrack tickets directly into your vault as structured notes. With keyboard shortcut support and a simple fetch dialog, you can retrieve issue details using just the ID. Notes are created using a default format or a custom template of your choice, and stored in a configurable folder. The plugin supports authentication via API token and works with both cloud and self-hosted YouTrack instances.

[View Details](/plugins/youtrack-fetcher), [Github](https://github.com/forketyfork/obsidian-youtrack-fetcher)

---

### 19. [JIRA links shortener](/plugins/jira-links-shortener)

Released on 2025-05-13 by [Ruslans Platonovs](https://github.com/rplatonovs)

The **JIRA Links Shortener** plugin simplifies pasted JIRA URLs by automatically converting them into clean, readable markdown links using the issue key as the title. Instead of cluttering your notes with long URLs, the plugin shortens them to a more concise format like `[PRJ-1234](...)`, making project references easier to scan and manage. This is especially helpful for teams or individuals frequently dealing with JIRA tickets in their workflow, offering a neater way to track and reference issues directly within notes.

[View Details](/plugins/jira-links-shortener), [Github](https://github.com/rplatonovs/obsidian-jira-links-shortener)

---

### 20. [FileName Styler](/plugins/filename-styler)

Released on 2025-05-13 by [Marc Feininger](https://github.com/marc-f)

The **FileName Styler** plugin enhances how file names appear in the sidebar by allowing you to hide, modify, and decorate them based on patterns or folder-specific rules. It’s especially useful for setups that use timestamp-based or Zettelkasten-style IDs, offering options to hide these identifiers or move them to the end of filenames. You can apply custom prefixes, suffixes, colors, and even emoji icons without altering the actual file names. The plugin supports multiple styling profiles that can be independently configured and scoped to particular folders, making it a flexible solution for organizing large vaults with visual cues.

[View Details](/plugins/filename-styler), [Github](https://github.com/marc-f/obsidian-file-name-styler)

---

### 21. [Format Automatically with Prettier](/plugins/prettier-format)

Released on 2025-05-13 by [Dylan Armstrong](https://github.com/dylanarmstrong)

The **Obsidian Prettier Plugin** automatically formats your Markdown files using Prettier, aligning with the tab and spacing settings defined in the Editor preferences. It supports format-on-save and includes a manual command to format the current file. Unlike other Prettier integrations, it avoids extra configuration and keeps things simple by only respecting tab width and tab usage from the editor. This minimalist approach is ideal for users who want consistent formatting without managing complex rules or settings.

[View Details](/plugins/prettier-format), [Github](https://github.com/dylanarmstrong/obsidian-prettier-plugin)

---

### 22. [Mark Open Files](/plugins/mark-open-files)

Released on 2025-05-13 by [Michael Schrauzer](https://github.com/gasparschott)

The **mark-open-files** plugin helps you visually track which files are currently open in your workspace by adding markers next to them in the File Explorer. Each marker represents an open instance of that file, and clicking on a marker brings the associated tab into focus. This is especially handy for users who juggle multiple tabs and want a quick way to switch between them without losing context. Unlike typical file-reveal features, it provides a persistent overview of all open notes, offering a smoother navigation experience for multitaskers.

[View Details](/plugins/mark-open-files), [Github](https://github.com/gasparschott/obsidian-mark-open-files)

---

### 23. [Tasks Cleaner](/plugins/tasks-cleaner)

Released on 2025-05-13 by [lowit](https://github.com/lowitea)

The **Tasks Cleaner** plugin helps you automatically tidy up your notes by removing old completed tasks after a configurable number of days. Designed for users who log tasks with completion dates, it scans your files for matching patterns using a customizable regular expression and deletes both the task and its associated indented description lines. You can limit cleanup to specific files using filename filters and review a summary of tasks before confirming deletion.

[View Details](/plugins/tasks-cleaner), [Github](https://github.com/lowitea/obsidian-tasks-cleaner)

---

### 24. [Enhanced Publisher](/plugins/enhanced-publisher)

Released on 2025-05-12 by [Cube](https://github.com/chararch)

The **Enhanced Publisher** plugin streamlines the process of preparing and sharing notes by automating image handling and enabling direct publishing to content platforms. When users paste images into a Markdown file, the plugin automatically saves them into a hidden folder named after the note and updates the document with the correct image links. It also offers an HTML preview feature, allowing users to view and copy cleanly formatted versions of their notes for web publishing. The plugin currently supports direct publishing to WeChat Official Accounts via API, with plans to expand support to more platforms. Custom settings allow toggling image management options and configuring WeChat credentials. This tool is particularly useful for writers or content creators who frequently repurpose their notes for online publication.

[View Details](/plugins/enhanced-publisher), [Github](https://github.com/chararch/obsidian-enhanced-publisher)

---

### 25. [Paste Image Rename and Convert](/plugins/paste-image-rename-convert)

Released on 2025-05-12 by [iaos](https://github.com/Yiaos)

The **Paste Image Rename Convert** plugin simplifies image handling by renaming and compressing images when they are pasted into notes. It supports manual naming of images and reduces file size by converting them (PNG) to JPG or WebP formats. Ideal for those managing many images in their notes, especially when space optimization is important.

[View Details](/plugins/paste-image-rename-convert), [Github](https://github.com/Yiaos/obsidian-paste-image-rename-convert)

---

### 26. [MemoChron](/plugins/memochron)

Released on 2025-05-12 by [Michalis Efstratiadis](https://github.com/formax68)

The **MemoChron** plugin connects time-based planning with note-taking by integrating public iCalendar (.ics) feeds into your workspace. It provides a sidebar calendar view where users can browse events by day or month, and clicking on an event automatically creates a note with customizable templates. Notes can include dynamic fields such as title, date, description, and location, making it easy to document meetings, appointments, or activities. The plugin supports multiple calendar sources, lets users configure note storage locations and naming formats, and refreshes calendar data at set intervals. Though limited to public calendars and basic views, it offers a seamless way to turn scheduled events into structured notes, which is ideal for those who like to link planning with documentation.

[View Details](/plugins/memochron), [Github](https://github.com/formax68/memoChron)

---

### 27. [Convert Base64 to PNG](/plugins/convert-base64-to-png)

Released on 2025-05-12 by [Nykko Lin](https://github.com/nykkolin)

The **Convert Base64 to PNG** plugin helps streamline note organization by converting base64-encoded images into local PNG files. It detects embedded base64 image data within your notes, decodes and saves them as image files in a user-defined folder, and updates the note links accordingly. This conversion can be done manually per note or across the entire vault, with optional auto-conversion upon pasting. Customizable settings let users define file names, output folders, and automation preferences. By replacing bulky base64 data with external PNG files, the plugin reduces file size, improves note readability, and enhances portability for sharing or exporting.

[View Details](/plugins/convert-base64-to-png), [Github](https://github.com/nykkolin/obsidian-convert-base64-to-png)

---

### 28. [Markdown Flip](/plugins/markdown-flip)

Released on 2025-05-12 by [Jinmu Go](https://github.com/JinmuGo)

The **Markdown Flip** plugin offers a fast and intuitive way to switch between common Markdown block types while writing. By typing specific characters like `-`, `1.`, `>`, or `#` at the beginning of a line and hitting space, users can instantly apply bullet lists, numbered lists, blockquotes, or headings. Additionally, typing `~` allows you to clear the current block formatting, making it easy to reset the structure of a note without manually deleting syntax. This plugin is particularly useful for those who prefer keyboard-driven formatting.

[View Details](/plugins/markdown-flip), [Github](https://github.com/JinmuGo/obsidian-markdown-flip)

---

### 29. [Notes Explorer](/plugins/notes-explorer)

Released on 2025-05-12 by [Atmanand Gauns](https://github.com/tu2-atmanand)

The **Notes Explorer** plugin offers a visually rich way to browse and organize notes by displaying them as cards in either a masonry or gallery layout. Users can sort notes based on modification date, creation time, or filename, and apply filters to hide empty notes or focus on specific folders, including subfolders. Clicking on a folder in the file explorer opens an explorer board tailored to that folder’s contents. The plugin also supports visual tagging using background or sidebar color indicators. Originally a fork of the Cards View plugin, Notes Explorer has evolved with additional customization options, making it ideal for users who prefer a more visual approach to navigating their vault.

[View Details](/plugins/notes-explorer), [Github](https://github.com/tu2-atmanand/obsidian-notes-explorer)

---

## 🔁 Plugin Updates

We got 79 plugin updates in the last one week’s time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **Note Toolbar** v1.23.0 - [Changelog](https://github.com/chrisgurney/obsidian-note-toolbar/releases/tag/1.23.01)
- **Enhanced Read Mode Control** v1.0.0 - [Changelog](https://github.com/mathe00/obsidian-enhanced-read-mode-control/releases)
- **screen.garden** - v1.3.2 - [Changelog](https://github.com/screendotgarden/screengarden-obsidian/releases/tag/1.3.2)
- **NetClip** - v1.3.8 - [Changelog](https://github.com/Elhary/Obsidian-NetClip/releases/tag/1.3.8)
- **Obsidian Complements** - v10.4.0 - [Changelog](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/releases/tag/10.4.0)

---

## 🎨 New Themes

- **Handwriting (Kalam)** - Clean, expressive theme powered by the handwritten styled Kalam font - [Github](https://github.com/kmranrg/obsidian-handwriting-theme)
- **Vesper** - based on the original Vesper VS Code theme - [Github](https://github.com/omarrashad/obsidian-vesper)
- **Powered-By-Lancer** - based heavily on the aesthetics of the Lancer TTRPG, and Wasp theme - [Github](https://github.com/SourTarte/Powered-By-Lancer)
- **Terminal2K** - Retro terminal look - [Github](https://github.com/isax785/Terminal2K)
- **Meridian** - A sleek and minimal theme for Obsidian - [Github](https://github.com/mvahaste/meridian)

