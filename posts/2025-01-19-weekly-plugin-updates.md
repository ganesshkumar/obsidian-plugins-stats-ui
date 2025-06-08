---
title: Obsidian Plugin Updates 2025-01-12 to 2025-01-18
description: 'new obsidian plugins from 2025-01-12 to 2025-01-18 - New Filename, External Rename Handler, Type Chinese Like English, Christmas, Circuit Sketcher, Tengwar, Tencent COS for Imgur, Hoarder Sync, Confluence Space Sync, Clojure Plugin Host, MoreDraw, Publish to Discourse, Local Any Files, KoReader Highlight Importer, Simple Disguise, Syncthing status icon, Dynamic Outline, AI-AnkiSync, BuJo Bullets'
excerpt: There are 19 new plugins and 82 plugin updates in the last one week's time.
publishedDate: '2025-01-19'
modifiedDate: '2025-01-19'
tags:
  - weekly-updates
---

![Weekly Updates](/images/2025-01-19-weekly-plugin-updates.webp)

> There are 19 new plugins and 82 plugin updates in the last one week's time.

🚀 **Timeline view**

This week, I am thrilled to unveil a brand-new way to explore Obsidian plugins: the Timeline! Now, you can visually track changes over time, seeing the exact dates when plugins were added, updated, or removed.

You can check out the [Timeline View](/timeline) here.

## ⭐ New Plugins: We have 19 new plugins.

### 1. [New Filename](/plugins/new-file-name)

Released on 2025-01-17 by [Amin Sennour](https://github.com/TheLoneWanderer4)

The **New Filename** plugin allows users to customize the default filename for new files in Obsidian. Instead of the generic 'Undefined,' users can specify a preferred default name format to better suit their workflow and organizational preferences. Alternatively, leaving the setting blank enables the plugin to automatically generate a unique identifier (UUID) for each new file. This feature is particularly useful for maintaining consistency or ensuring unique file names without manual effort.

[View Details](/plugins/new-file-name), [Github](https://github.com/TheLoneWanderer4/obsidian-uuid-title)

---

### 2. [External Rename Handler](/plugins/external-rename-handler)

Released on 2025-01-17 by [mnaoumov](https://github.com/mnaoumov)

The **External Rename Handler** plugin enhances Obsidian's ability to manage file renames performed outside the application. By default, external renames are processed as separate creation and deletion events in Obsidian, which can disrupt workflows and lead to inconsistencies. This plugin resolves the issue by detecting and treating such changes as a single rename event, ensuring a seamless integration with your file organization. To function, Obsidian must be running during external rename operations, making it a practical tool for users managing files across different environments.

[View Details](/plugins/external-rename-handler), [Github](https://github.com/mnaoumov/obsidian-external-rename-handler)

---

### 3. [Type Chinese Like English](/plugins/type-chinese-like-english)

Released on 2025-01-17 by [Hwenyi](https://github.com/Hwenyi)

The **Type Chinese Like English** plugin simplifies the process of typing Chinese and Mathjax/LaTeX formulas in Obsidian without frequently switching input methods. Users can input pinyin directly in English mode and have it converted into Chinese characters or mathematical expressions seamlessly. This is especially useful for those using full-pinyin input methods or needing quick, accurate math notation without mastering LaTeX syntax. The plugin supports mixed English and pinyin input for enhanced versatility and allows customization of APIs and model selection to improve conversion accuracy.

[View Details](/plugins/type-chinese-like-english), [Github](https://github.com/Hwenyi/obsidian-type-chinese-like-english)

---

### 4. [Christmas](/plugins/christmas)

Released on 2025-01-17 by [MatseVH](https://github.com/Matse2005)

The **Christmas** plugin adds a festive touch to Obsidian by displaying a countdown to Christmas within the editor. It includes a command to check the days remaining until Christmas and a status bar button that shows the countdown. Users can customize the visibility of the countdown, toggle large text next to the icon, and adjust the date settings for Christmas based on their location.

[View Details](/plugins/christmas), [Github](https://github.com/Matse2005/Obsidian-Christmas)

---

### 5. [Circuit Sketcher](/plugins/circuit-sketcher)

Released on 2025-01-17 by [Code Forge Temple](https://github.com/code-forge-temple)

The **Circuit Sketcher** plugin allows users to create and edit circuit diagrams directly within Obsidian. With a responsive canvas interface, it supports saving and loading designs, customizing circuit elements, and managing a reusable library of components. Users can easily connect nodes, add ports, and label elements for detailed circuit layouts.

[View Details](/plugins/circuit-sketcher), [Github](https://github.com/code-forge-temple/circuit-sketcher-obsidian-plugin)

---

### 6. [Tengwar](/plugins/tengwar)

Released on 2025-01-17 by [mikevetkin](https://github.com/mikevetkin)

The **Tengwar** plugin enables users to incorporate Tengwar script into their Obsidian notes, enhancing the creative possibilities for fans of Tolkien's languages. It allows users to create code blocks with Tengwar text and supports customizing fonts within these blocks to suit different styles, such as Annatar, Eldamar, or Telcontar. Users can also modify the keyword for defining these blocks based on their preferences. The plugin supports both ISO 8859-1 and ConScript Unicode Registry encodings, ensuring compatibility with various Tengwar-related tools.

[View Details](/plugins/tengwar), [Github](https://github.com/mikevetkin/obsidian-tengwar)

---

### 7. [Tencent COS for Imgur](/plugins/imgur-tencent-cos)

Released on 2025-01-17 by [bobostudio](https://github.com/bobostudio)

The **Tencent COS for Imgur** plugin enhances image management in Obsidian by enabling seamless upload of images to Tencent Cloud Object Storage (COS). Users can drag and drop, copy and paste, or batch upload images directly from their notes to the cloud. The plugin automatically replaces local image links with cloud-hosted links and can delete local copies post-upload to save storage space. It supports custom region selection for storage buckets, ensuring flexibility for different user needs. This plugin simplifies image handling and helps users maintain efficient, centralized cloud storage for their Obsidian content.

[View Details](/plugins/imgur-tencent-cos), [Github](https://github.com/bobostudio/obsidian-imgur-plugin)

---

### 8. [Hoarder Sync](/plugins/hoarder-sync)

Released on 2025-01-17 by [Jordan Hofker](https://github.com/jhofker)

The **Hoarder Sync** plugin integrates Hoarder bookmarks with Obsidian by creating markdown notes for each bookmark in a specified folder. It offers automated synchronization at customizable intervals, ensuring that bookmarks are always up-to-date. Users can configure the sync folder, API settings, and additional options like excluding archived or non-favorited bookmarks. The plugin also supports updating existing notes when bookmarks are modified. With seamless integration, this tool simplifies the process of organizing and managing bookmarks within Obsidian, enhancing productivity and knowledge management.

[View Details](/plugins/hoarder-sync), [Github](https://github.com/jhofker/obsidian-hoarder)

---

### 9. [Confluence Space Sync](/plugins/confluence-space-sync)

Released on 2025-01-17 by [Pwnyprod](https://github.com/pwnyprod)

The **Confluence Space Sync** plugin enables seamless synchronization of Confluence spaces into an Obsidian vault, converting pages into Markdown files while maintaining the original folder hierarchy. It supports customizable synchronization intervals, allowing automatic updates of Confluence content. The plugin also handles Confluence-specific elements like tables, task lists, and panels, ensuring smooth integration with Obsidian workflows. Ideal for teams and individuals, it facilitates local backups of Confluence content and enhances accessibility for collaboration or personal knowledge management.

[View Details](/plugins/confluence-space-sync), [Github](https://github.com/pwnyprod/obsidian-confluence-space-sync-plugin)

---

### 10. [Clojure Plugin Host](/plugins/clojure-plugin-host)

Released on 2025-01-17 by [Vladimir "farcaller" Pouzanov](https://github.com/farcaller)

The **Clojure Plugin Host** plugin enables users to write simple plugins directly in Clojure within Obsidian. By leveraging the SCI (Small Clojure Interpreter) framework, this plugin allows users to define and execute custom functionality via Clojure scripts embedded in notes. Tagged notes containing Clojure code can define functions, such as those for UI elements or event handling, which are automatically initialized and executed. This plugin enhances flexibility for users familiar with Clojure who want to extend Obsidian's capabilities programmatically.

[View Details](/plugins/clojure-plugin-host), [Github](https://github.com/farcaller/obsidian-clojure-plugin-host)

---

### 11. [MoreDraw](/plugins/moredraw)

Released on 2025-01-15 by [webceoboy2011](https://github.com/webceoboy)

The **MoreDraw for Obsidian** plugin integrates a dynamic infinite canvas whiteboard into Obsidian, enabling users to create and edit diagrams such as flowcharts, mind maps, to-do lists, and timetables. With built-in AI capabilities, it simplifies the process of designing visual content. Additional features include a chart maker, QR code generator, and freehand drawing tools. Users can export their work in formats like PDF, PNG, and PPT for broader usability. Some advanced features, such as saving and syncing files, require a MoreDraw account, and certain functionalities may incur a fee.

[View Details](/plugins/moredraw), [Github](https://github.com/webceoboy/moredraw-obsidian)

---

### 12. [Publish to Discourse](/plugins/publish-to-discourse)

Released on 2025-01-15 by [woodchen](https://github.com/woodchen-ink)

The **Publish to Discourse** plugin simplifies the process of sharing content from Obsidian directly to a Discourse forum. Users can configure their forum URL, API key, and username within the plugin's settings. Once set up, the plugin allows seamless publishing of notes or documents by selecting a category and posting them to the desired forum. This tool is ideal for streamlining collaboration and sharing ideas or discussions with Discourse communities.

[View Details](/plugins/publish-to-discourse), [Github](https://github.com/woodchen-ink/obsidian-publish-to-discourse)

---

### 13. [Local Any Files](/plugins/local-any-files)

Released on 2025-01-15 by [ShermanTsang](https://github.com/ShermanTsang)

The **Local Any Files** plugin enhances Obsidian by enabling users to manage external links and attachments efficiently. It supports extracting external links, downloading files locally, and replacing links with local paths. Compatible with a wide range of file types, including images, documents, media, code files, and more, it offers flexible configuration options for storage paths and file naming conventions. With smart processing tools, users can manage files at different scopes, from single files to the entire vault, and track progress with detailed logs and visual indicators. This plugin is ideal for organizing and integrating diverse file types within your notes.

[View Details](/plugins/local-any-files), [Github](https://github.com/ShermanTsang/obsidian-local-any-files)

---

### 14. [KoReader Highlight Importer](/plugins/koreader-highlights-importer)

Released on 2025-01-15 by [Tahsin Kocaman](https://github.com/t5k6)

The **KoReader Highlight Importer** plugin enables seamless integration between KoReader and Obsidian by importing highlights and annotations directly into your vault. It scans `.sdr` directories, parses metadata files, and organizes highlights into Markdown notes with YAML frontmatter for easy reference. Users can customize settings like the mount point, target folder for highlights, and file type filters. With options for scanning and importing, it provides flexibility and automation for managing reading highlights, making it a valuable tool for avid readers and researchers.

[View Details](/plugins/koreader-highlights-importer), [Github](https://github.com/t5k6/obsidian-koreader-highlights)

---

### 15. [Simple Disguise](/plugins/simple-disguise)

Released on 2025-01-15 by [slow-groovin](https://github.com/slow-groovin)

The **Simple Disguise** plugin provides an easy way to obscure the content in your editing area, making it less visible to others in public spaces. By toggling a button in the sidebar, users can switch between normal and disguise modes. The plugin alters the background and text colors of the editor using CSS to reduce the clarity of displayed content. While it does not support reading mode or command-based controls, users can manually adjust styles by editing the plugin's CSS file. This tool is ideal for enhancing privacy during note editing in shared environments.

[View Details](/plugins/simple-disguise), [Github](https://github.com/slow-groovin/simple-disguise)

---

### 16. [Syncthing status icon](/plugins/syncthing-status-icon)

Released on 2025-01-15 by [Diego Viero](https://github.com/Diego-Viero)

The **Syncthing status icon** plugin provides a visual indicator in Obsidian's status bar to show the operational status of Syncthing. It displays a green dot when Syncthing is running and a red dot when it is not, offering quick and continuous feedback. The plugin allows users to customize the frequency of status checks through its settings, ensuring it meets individual monitoring preferences. This is particularly useful for users relying on Syncthing for file synchronization.

[View Details](/plugins/syncthing-status-icon), [Github](https://github.com/Diego-Viero/Syncthing-status-icon-Obsidian-plugin)

---

### 17. [Dynamic Outline](/plugins/dynamic-outline)

Released on 2025-01-15 by [theopavlove](https://github.com/theopavlove)

The **Dynamic Outline** plugin provides a floating table of contents for Obsidian notes, offering an efficient way to navigate and organize your content. This dynamic tool frees up space in the sidebar and allows users to toggle its visibility directly from the note toolbar. It includes a search function for quick navigation to specific headings and can automatically show or hide based on the number of headings in the file, enhancing the note-taking experience.

[View Details](/plugins/dynamic-outline), [Github](https://github.com/theopavlove/obsidian-dynamic-outline)

---

### 18. [AI-AnkiSync](/plugins/ai-enhanced-anki-sync)

Released on 2025-01-15 by [goev](https://github.com/jannusgoe)

The **AI-AnkiSync** plugin streamlines the process of creating, enhancing, and synchronizing flashcards between Obsidian and Anki. It detects flashcards in notes, uses AI to refine their content, and syncs them with Anki via AnkiConnect. The plugin supports automatic deck assignment based on file names, hierarchical tags derived from note structures, and customizable prompts for AI enhancements. This tool is ideal for users who want to integrate seamless flashcard management into their learning workflows.

[View Details](/plugins/ai-enhanced-anki-sync), [Github](https://github.com/jannusgoe/obsidian-ankisync)

---

### 19. [BuJo Bullets](/plugins/bujo-bullets)

Released on 2025-01-15 by [Will Olson](https://github.com/frankolson)

The **BuJo Bullets** plugin enhances checkboxes in Obsidian by introducing custom checkbox types inspired by Bullet Journal rapid logging. Users can create and organize tasks with unique symbols for irrelevant tasks, migrated tasks, scheduled tasks, and events.

[View Details](/plugins/bujo-bullets), [Github](https://github.com/frankolson/obsidian-bujo-bullets)

---

## 🔁 Plugin Updates

We got 82 plugin updates in the last one week’s time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

A small list of my favorite plugin updates

### 1. [Pexels Banner](/plugins/pexels-banner) v2.20.3

### 2. [Vertical Tabs](/plugins/vertical-tabs) v0.14.0

### 3. [Advanced Canvas](/plugins/advanced-canvas) v3.4.0

### 4. [Meta Bind](/plugins/obsidian-meta-bind-plugin) v1.3.0

### 5. [Iconic](/plugins/iconic) v1.1.0
