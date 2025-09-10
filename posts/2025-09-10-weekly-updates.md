---
title: Obsidian Plugin Updates 2025-08-31 to 2025-09-06
description: "From 2025-08-31 to 2025-09-06 there are 20 newly released plugins and 67 plugin updates"
excerpt: There are 20 new plugins, 2 new themes and 67 plugin updates during the week 2025-08-31 to 2025-09-06.
publishedDate: "2025-09-10"
modifiedDate: "2025-09-10"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 20 new plugins, 2 new themes and 67 plugin updates during the week 2025-08-31 to 2025-09-06.

The first week of September didn't just bring rain to my hometown, it also poured down a flood of fresh plugins into Obsidian. There are 20 new plugins, 2 new themes and 67 plugin updates. From AI-powered note companions to a fully interactive Chinese chess engine, the range is astonishing. Let's walk through the highlights and see which of these innovations deserve a spot in your daily workflow.

## ⭐ New Plugins

### 1. [Yandex Tracker Issue](/plugins/yandex-tracker-issue)

Released on 2025-09-07 by [Pavel Sokolov](https://github.com/CubieProg)

The **Yandex Tracker Issue** plugin connects your notes to Yandex Tracker and renders tracker data inline. It can display issues, boards, projects, queues, sprints, and users either as configurable tables or as a Gantt chart, using dedicated code blocks (e.g., issue lists or query-driven views). Columns are fully controlled via attribute strings and modifiers, so you can trim text, show initials, format dates or times, and turn IDs into direct links to the tracker. Display presets can be reset, re-rendered on demand, and tuned with custom "done" statuses for accurate Gantt completion. An authorization section helps validate credentials before use. If a block references multiple entities, the plugin fetches rich details but shows only what your attribute configuration requests keeping views focused.

[View Details](/plugins/yandex-tracker-issue), [Github](https://github.com/CubieProg/Obsidian-Yandex-Tracker-Issue)

---

### 2. [Chinese chess](/plugins/xiangqi)

Released on 2025-09-07 by [weshell](https://github.com/west-shell)

The **Chinese Chess (Xiangqi)** plugin brings a fully interactive Chinese chess engine into your notes. It supports both FEN and PGN formats, letting you render games, review moves, and even create new variations directly within code blocks. The plugin registers a dedicated view for `.pgn` files, enabling real-time editing where any changes to moves, comments, or branches are saved back to the file automatically. You can customise almost every aspect, from board size and theme to whether move lists or notations are displayed. Extra features include saving and restoring positions, speech playback of moves, rotation of the board, and ICCS-compatible PGN handling. Mobile users can adjust the layout for smaller screens, while advanced users can embed parameters like protected mode or rotated view.

[View Details](/plugins/xiangqi), [Github](https://github.com/west-shell/obsidian-xiangqi)

---

### 3. [Remote Fetch](/plugins/remote-fetch)

Released on 2025-09-06 by [Shaharyar](https://github.com/Shaharyar-developer)

The **Remote Fetch** plugin makes it possible to pull files directly from any HTTP or HTTPS link into your vault. It automatically extracts filenames from URLs, detects file types, and applies the right extension, while also letting you rename files and choose the destination folder with type-ahead suggestions. Supported formats range from documents and spreadsheets to images, media, archives, and plain text, so you can collect resources without leaving your workspace. Built-in safety checks block harmful file types and enforce size restrictions, reducing risks when importing from external sources. If something goes wrong, the plugin shows clear error messages covering common issues like invalid links, connectivity problems, or duplicate files.

[View Details](/plugins/remote-fetch), [Github](https://github.com/Shaharyar-developer/remote-fetch)

---

### 4. [Accounting Journal and Ledger](/plugins/accounting-journal-ledger)

Released on 2025-09-06 by [Javier Ribal del Río](https://github.com/JavierRibaldelRio)

The **Accounting Journal and Ledger** plugin provides a lightweight way to practice and document double-entry bookkeeping inside your notes. It supports three custom block formats: a modern journal style, a traditional Spanish-style journal, and a T-account ledger layout. Entries are written in Markdown blocks with simple tags, then converted into clear HTML previews for better readability and presentations. You can register transactions with dates, concepts, debits, and credits, split them into phases, and view balances in a ledger format. The plugin also accepts a custom chart of accounts via CSV, so account names can be displayed consistently in both journal and ledger exports.

[View Details](/plugins/accounting-journal-ledger), [Github](https://github.com/JavierRibaldelRio/accounting-journal-ledger)

---

### 5. [NoteSmith](/plugins/notesmith)

Released on 2025-09-06 by [csteamengine](https://github.com/csteamengine)

The **NoteSmith** plugin streamlines the process of refining unstructured notes by sending their content to an OpenAI-compatible model for cleanup. It corrects grammar, punctuation, and structure while improving Markdown formatting and applying proper heading hierarchy. Lists can be converted into actionable tasks, and optional tag annotations like #todo or #idea can be inserted automatically. Users can further tailor results by adding their own prompt instructions in the settings. The plugin integrates with the command palette and context menu, making it quick to run the refine action on any note. Security is handled locally, with the API key stored only on your device and requests sent exclusively to the configured endpoint.

[View Details](/plugins/notesmith), [Github](https://github.com/csteamengine/notesmith)

---

### 6. [Open in Cursor](/plugins/open-in-cursor)

Released on 2025-09-06 by [awaken233](https://github.com/awaken233)

The **Open in Cursor** plugin adds a command and configurable hotkey to open the active file in Cursor IDE and position the caret at the same spot. It works across Windows, macOS, and Linux, making the handoff from note-taking to code editing quick and consistent. You can launch it from the command palette or bind your own shortcut, avoiding context switches and manual scrolling in large files. Settings include a custom path for the Cursor executable (handy when it's not on PATH), notification toggles for success and errors, and a debug mode for troubleshooting.

[View Details](/plugins/open-in-cursor), [Github](https://github.com/awaken233/open-in-cursor)

---

### 7. [Zettelkasten Branch Tracker](/plugins/zettelkasten-branch-tracker)

Released on 2025-09-06 by [James Cussen](https://github.com/thelivingphilosophy)

The **Zettelkasten Branch Tracker** plugin introduces a dedicated graph view tailored for notes that follow Zettelkasten ID numbering. Instead of showing a generic network, it parses hierarchical and linear continuations like `1114a`, `1114.1`, or mixed formats, then displays them as a clear four-tier structure. Parents, siblings, continuations, and children are colour-coded and sized dynamically to reflect depth and content, with dotted or solid lines distinguishing sequence and hierarchy. Users can pan, zoom, or adjust spacing, depth, and branch limits for better navigation. Interactive controls allow toggling counts, enabling auto-update, or focusing on specific levels. This makes it easier to see how notes branch out, trace ancestry, or explore continuations in large collections.

[View Details](/plugins/zettelkasten-branch-tracker), [Github](https://github.com/thelivingphilosophy/zettelkasten-branch-tracker)

---

### 8. [Tiny Habits](/plugins/tiny-habits)

Released on 2025-09-06 by [Diego Nazoa](https://github.com/nazoadiego)

The **Tiny Habits** plugin helps you track personal routines directly inside your notes, storing all data within frontmatter so nothing leaves your vault. It displays a heatmap-style table similar to GitHub or Anki, making it easy to visualise progress over time. Each habit entry can be marked as completed, failed, skipped, or not started, giving a clear picture of consistency. You can create multiple habit blocks in a file, collapse large tables, and even navigate past and future entries. Keyboard support is included, with both arrow keys and vim-style hjkl shortcuts for moving around and marking entries. Configuration is simple, using code blocks that point to a folder path and optional display names. By blending habit tracking into Markdown, it combines accountability with the flexibility of your existing note-taking workflow.

[View Details](/plugins/tiny-habits), [Github](https://github.com/nazoadiego/tiny-habits)

---

### 9. [JuliaPlots](/plugins/juliaplots)

Released on 2025-09-06 by [Iván Mansilla](https://github.com/ivnmansi)

The **JuliaPlots** plugin lets you render mathematical graphs directly in your notes using the Julia programming language and the Plots.jl package. It supports both 2D and 3D functions with simple syntax, allowing you to plot multiple equations, overlay scatter points, and control ranges on each axis. Users can customise colours, line width, labels, titles, and even adapt plots for dark mode vaults. The plugin also provides default parameters that can be overridden per plot, making it flexible for quick sketches or detailed visualisations. Because everything is generated through Julia, you get smooth and precise rendering of functions, though large datasets may take longer to process.

[View Details](/plugins/juliaplots), [Github](https://github.com/ivnmansi/juliaplots)

---

### 10. [Startpage](/plugins/start-page)

Released on 2025-09-06 by [kuzzh](https://github.com/kuzzh)

The **StartPage** plugin creates a modern homepage for your vault, showing key information the moment you launch the app or open a new tab. It combines a clean, card-based design with real-time vault statistics like total notes, today's edits, and storage usage. You can pin important notes for quick access, view recently modified files, and adjust how many entries appear. Navigation is smooth with search, context menu integration, and one-click actions like creating a new note. The interface adapts automatically to light or dark themes and supports both English and Chinese, with instant language switching. Smart refresh ensures updates appear promptly when files change, while toolbar and right-click menu options give multiple ways to interact with the dashboard.

[View Details](/plugins/start-page), [Github](https://github.com/kuzzh/obsidian-startpage)

---

### 11. [Code Blocks commands](/plugins/code-blocks-commands)

Released on 2025-09-06 by [dragonish](https://github.com/dragonish)

The **Code Blocks commands** plugin streamlines inserting and managing code blocks by providing dedicated commands and a quick backtick-triggered menu. Instead of manually typing markup, you can pick from a list of supported languages, which the plugin sorts based on your usage patterns. It also supports custom syntax highlighting, letting you define new markups along with optional language names or titles for better retrieval. This reduces friction when documenting snippets, writing technical notes, or sharing examples. With intuitive keyboard interaction and personalized markup lists, it makes handling multi-language code snippets inside your vault faster and more consistent, especially for users who frequently switch between languages or need clear highlighting.

[View Details](/plugins/code-blocks-commands), [Github](https://github.com/dragonish/code-blocks-commands)

---

### 12. [Shell Path Copy](/plugins/shell-path-copy)

Released on 2025-09-06 by [Charles Kelsoe (ckelsoe)](https://github.com/ckelsoe)

The **Shell Path Copy** plugin makes it easier to copy file and folder paths in formats that match your target system, whether you're working on Windows, macOS, Linux, or even a mobile device connected to a remote server. It integrates directly into the right-click menu and command palette, offering relative paths, absolute paths, and file:// URLs, all formatted appropriately for the platform. You can configure which options appear, choose how paths are wrapped to handle spaces, and get visual confirmation when a path is copied. This helps avoid manual edits when pasting into terminals, scripts, or AI assistants like Claude Code or Gemini CLI.

[View Details](/plugins/shell-path-copy), [Github](https://github.com/ckelsoe/obsidian-shell-path-copy)

---

### 13. [Long sentence highlighter](/plugins/long-sentence-highlighter)

Released on 2025-09-06 by [Robert Meißner](https://github.com/RobertMeissner)

The **Long Sentence Highlighter** plugin helps writers maintain clarity by automatically marking sentences that exceed a chosen word limit. You can set your own threshold, and the plugin highlights overly long sentences in real time while you type, working in both editing and reading modes. Two styles are available - background shading or underlining - with customizable colors, so the highlights can fit neatly into your workflow without being distracting. Commands in the palette allow you to toggle highlighting, apply it manually, or clear it from the current note. Since it updates dynamically, you can immediately see when a sentence grows too long, making it easier to refine text into shorter, more readable forms.

[View Details](/plugins/long-sentence-highlighter), [Github](https://github.com/RobertMeissner/obsidian-long-sentence-highlighter)

---

### 14. [X Post Saver](/plugins/x-post-saver)

Released on 2025-09-06 by [Tanaka Mambinge](https://github.com/tanaka-mambinge)

The **X Post Saver** plugin lets you capture and archive content from X (formerly Twitter) directly into your vault. By copying a post's URL or text, you can save it as a new note or send it to a designated folder, keeping social media snippets neatly organized. It supports both desktop and mobile, making it convenient to build collections of references, quotes, or ideas while browsing on any device. The plugin allows customization of default save locations and note formats, so you can adapt it to your preferred workflow. Commands through the palette make the process quick and frictionless, reducing the need for manual copying and pasting.

[View Details](/plugins/x-post-saver), [Github](https://github.com/tanaka-mambinge/x-post-saver)

---

### 15. [Version Control](/plugins/version-control)

Released on 2025-09-05 by [Yuichi-Aragi](https://github.com/Yuichi-Aragi)

The **Version Control** plugin provides a structured way to create, manage, and restore different versions of your notes. Instead of relying solely on automatic backups, it lets you take intentional snapshots at key points, assign meaningful names, and keep track of your creative process in real time. You can preview older drafts, restore them with confidence, or even branch off into new notes without cluttering your workspace. A built-in diff view highlights changes between versions, while smart cleanup rules ensure history stays organized. With options for both card and list interfaces, it adapts to different working styles, whether you want a detailed overview or a minimal sidebar. Exporting histories to Markdown, JSON, or text is also supported, making it easy to back up or repurpose past work.

[View Details](/plugins/version-control), [Github](https://github.com/Yuichi-Aragi/Version-Control)

---

### 16. [Content OS](/plugins/content-os)

Released on 2025-09-05 by [eharris128](https://github.com/eharris128)

The **Content OS** plugin streamlines the process of drafting and publishing LinkedIn posts directly from your notes. It eliminates context switching by providing an integrated modal where you can compose content, monitor character count in real time, and push updates straight to LinkedIn. Tokens are handled securely with OAuth 2.0 and stored locally, ensuring privacy while maintaining authentication reliability. The interface is simple, offering both a ribbon button and command palette access for quick posting. Settings allow you to configure save locations, enable dev mode, and adjust logging detail when troubleshooting. Behind the scenes, the plugin uses LinkedIn's v2 API for user verification and content publishing, supporting full token validation before every request.

[View Details](/plugins/content-os), [Github](https://github.com/eharris128/obsidian-content-os)

---

### 17. [GitHub Tasks](/plugins/github-tasks)

Released on 2025-09-05 by [Mike Thicke](https://github.com/Epistemic-Technology)

The **GitHub tasks** plugin lets you bring issues and pull requests from GitHub directly into your notes as tasks. It can import items assigned to you or opened by you, convert them into either Tasks Emoji or Dataview format, and mark closed items as completed automatically. Labels and repository names can be imported as tags, making it easier to filter or organise your work. The plugin supports periodic refreshes at configurable intervals and offers commands to manually refresh or clear completed tasks. It also provides options to display created and completed dates, while keeping any additional edits you make intact during refresh.

[View Details](/plugins/github-tasks), [Github](https://github.com/Epistemic-Technology/obsidian-github-tasks)

---

### 18. [LiteCite](/plugins/litecite)

Released on 2025-09-05 by [ras0q](https://github.com/ras0q)

The **LiteCite** plugin offers a lightweight way to generate citation notes directly from a BibTeX or BibLaTeX file. Built as a simpler and faster alternative to the older Citations plugin, it focuses on minimal overhead while retaining essential functionality. It uses a custom BibTeX parser and the Eta templating engine, allowing notes to be created quickly with consistent formatting. Once configured with a BibTeX file path, you can invoke a command to produce a new note tied to a selected reference, making it handy for researchers and writers who prefer streamlined workflows.

[View Details](/plugins/litecite), [Github](https://github.com/ras0q/obsidian-litecite)

---

### 19. [Drag To Scroll](/plugins/drag-to-scroll)

Released on 2025-09-02 by [Constantine Sazonov](https://github.com/constsz)

The **Drag To Scroll** plugin makes navigating long notes more fluid by letting you scroll simply by holding the mouse button and dragging, much like on a touch device. It works consistently in both editing and reading modes, providing a natural and intuitive way to move through content without relying on scroll bars or the mouse wheel. Inspired by the smooth interactions found in PDF viewers and browser extensions, this feature is particularly handy when dealing with lengthy documents or dense research material.

[View Details](/plugins/drag-to-scroll), [Github](https://github.com/constsz/obsidian-drag-to-scroll)

---

### 20. [Note Companion AI](/plugins/fileorganizer2000)

Released on 2025-09-02 by [Benjamin Ashgan Shafii](https://github.com/different-ai)

The **Note Companion** plugin brings AI-powered organization and enhancement to your vault by automatically classifying, formatting, and enriching notes. It supports intelligent filing of documents into appropriate folders, transcription of audio, OCR for handwritten notes, and even summarizing YouTube videos. Beyond organization, it allows you to interact with your notes using context-aware AI chat and generate atomic notes with custom prompt templates. Users can opt for the hosted cloud service, which requires a subscription, or run a self-hosted setup with their own API keys for providers like OpenAI or Anthropic. The plugin also integrates with external APIs such as YouTube for transcripts and GitHub for prompt templates.

[View Details](/plugins/fileorganizer2000), [Github](https://github.com/different-ai/file-organizer-2000)

---

## 🔁 Plugin Updates

We got 67 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **Task Notes** - v3.22.0 - [Changelog](https://github.com/callumalpass/tasknotes/releases/tag/3.22.0)
- **Task Genius** - v9.8.0 - [Changelog](https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/9.8.0/)

---

## 🫡 Plugins Removed

- **Markdown Flip** - no longer maintained

---

## 🎨 New Themes

- **Nord** - An enhanced Nord theme for Obsidian, based on Insanum's original work - [Github](https://github.com/Lucas-Haux/Nord)
- **Velocity** - modernist theme for Obsidian - subtle on the surface, but dares to reimagine what the Obsidian user interface experience can be - [Github](https://github.com/Gonzalo-D-Sales/obsidian-velocity)

---
