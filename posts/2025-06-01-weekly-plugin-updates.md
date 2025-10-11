---
title: Obsidian Weekly Updates 2025-05-25 to 2025-05-31
description: 'new obsidian plugins from 2025-05-25 to 2025-05-31 - Create Note with Date in This Directory, Auto Note Importer, Markdown Hijacker, Simple Tab Indent, Vault LLM Assistant, Opener: New Tab by Default, Japanese note taking helper, TickTick Quick Add Task, Themed Discord RPC, Images to Notes, Live Background, Monokakido Copilot, PDF Printer, Come Through, Status.lol Publisher, Sync Emails'
excerpt: There are 16 new plugins and 116 plugin updates in the last one week's time.
publishedDate: '2025-06-01'
modifiedDate: '2025-06-01'
bannerImage: '/images/obsidian-weekly-updates.webp'
tags:
  - weekly-updates
---

> There are 16 new plugins and 116 plugin updates in the last one week's time. There is 1 new theme. Also, it's time to say good bye to 3 community plugins and 1 theme.

Before we dive into this week's update, a quick heads up: the [/favorites](/favorites) page on ObsidianStats now includes an **Import From Obsidian** button. Drop in the content of `community-plugins.json` file from `<vault>/.obsidian/` folder and you will have your entire plugin list marked as favorites in a second. No manual hunting.

This week Obsidian community introduced 16 new plugins that cater to diverse user needs - from simplifying creating TickTick tasks to integrating advanced AI capabilities for content generation. There are 116 updates to the existing plugins (time to check if the plugins you use got any updates).

## ⭐ New Plugins

### 1. [Auto Note Importer](/plugins/auto-note-importer)

Released on 2025-05-30 by [uppinote](https://github.com/uppinote20)

The **Auto Note Importer** plugin streamlines the process of syncing notes from Airtable (support for more database is planned) directly into your vault. It fetches records and turns them into Markdown files with structured YAML frontmatter, letting you define where the notes should go, how they’re named, and what template they should follow. Notes can be synced manually or on a recurring schedule, with options to prevent duplicates by tracking a primary field. It also handles a wide variety of Airtable field types, including nested data like attachments and user references, with support for dot notation in templates. Whether you’re logging YouTube summaries or managing structured data, this plugin provides a powerful bridge between external databases and your note system.

[View Details](/plugins/auto-note-importer), [Github](https://github.com/uppinote20/obsidian-auto-note-importer)

---

### 2. [Markdown Hijacker](/plugins/markdown-hijacker)

Released on 2025-05-30 by [Yongmini](https://github.com/especialkim)

The **Markdown Hijacker** plugin enables seamless synchronization between your vault and external folders, supporting markdown and other user defined file types. It allows one-way or bidirectional syncs, with real-time monitoring and offline change detection to ensure files stay updated even if edited outside the app. You can map multiple folder pairs, control how deletions are handled, and finetune inclusion based on subfolders, file extensions, or hidden files. Sync status is visible in the status bar, and metadata is managed via frontmatter. This setup is especially useful for integrating existing notes, working across devices, or collaborating with other tools without being locked into a single workspace.

[View Details](/plugins/markdown-hijacker), [Github](https://github.com/especialkim/markdown-hijacker)

---

### 3. [Simple Tab Indent](/plugins/simple-tab-indent)

Released on 2025-05-30 by [Thiago Frias](https://github.com/hoomersinpsom)

The **Simple Tab Indent** plugin redefines how the Tab key behaves by inserting a zero-width space followed by a real tab character. This workaround prevents lines from being misinterpreted as code blocks in markdown while preserving the visual indentation in the editor. It works seamlessly in both source mode and live preview, offering a smooth writing experience without markdown quirks. Users can also customise the tab rendering width through plugin settings using CSS `tab-size`, which takes effect instantly. It’s a minimalist plugin with no build steps or dependencies, ideal for those who want clean, consistent indentation without unexpected formatting changes.

[View Details](/plugins/simple-tab-indent), [Github](https://github.com/hoomersinpsom/simple-tab-indent)

---

### 4. [Vault LLM Assistant](/plugins/vault-llm-assistant)

Released on 2025-05-30 by [Brians Tjipto](https://github.com/brianstm)

The **Vault LLM Assistant** plugin lets you query your vault's content or generate new content using large language models. It offers two modes 1. query for asking questions and 2. create for drafting full notes with the option to include context from selected folders. Responses come with citations linking back to your source files and can be copied as plain text or markdown. You can also save them directly as notes with AI generated titles. The plugin supports both OpenAI and Google Gemini, with flexible model settings and folder level control for scanning. It's especially useful for summarising scattered notes, exploring complex ideas, or drafting new content faster.

[View Details](/plugins/vault-llm-assistant), [Github](https://github.com/brianstm/obsidian-vault-llm-assistant)

---

### 5. [Opener: New Tab by Default](/plugins/opener)

Released on 2025-05-30 by [LukeMT, Aidan Gibson](https://github.com/lukemt)

The **Opener: New Tab by Default** plugin changes how files open by forcing every note or document to launch in its own tab, similar to modern code editors. It detects if a file is already open and switches to that tab, avoiding duplicates. You can override this behaviour using modifier keys to force a new tab. It also offers optional support for opening non-markdown files like PDFs with your system's default app.

[View Details](/plugins/opener), [Github](https://github.com/lukemt/obsidian-opener)

---

### 6. [Japanese note taking helper](/plugins/japanese-helper)

Released on 2025-05-30 by [OverFitter](https://github.com/OverFitted)

The **Japanese Helper for Obsidian** plugin simplifies the process of converting romaji into Japanese scripts directly within your notes. With just a shortcut or command palette entry, selected Latin text can be transformed into either hiragana or katakana. It smartly handles nuances like small kana, long vowels, particles, and double consonants, making it more accurate for everyday usage. The plugin is lightweight and works seamlessly in the editor, supporting custom hotkeys for quick access and optional notifications after conversion.

[View Details](/plugins/japanese-helper), [Github](https://github.com/OverFitted/obsidian-japanese-helper)

---

### 7. [TickTick Quick Add Task](/plugins/ticktick-quickadd-task)

Released on 2025-05-30 by [Muxin Li](https://github.com/muxinli)

The **TickTick Quickadd Plugin** allows you to turn any paragraph from your notes into a TickTick task with a single command or hotkey. It automatically tags the paragraph, adds a unique block anchor, and creates a task in TickTick with a deep link back to that exact spot using the Advanced URI plugin. Ideal for those who manage tasks within a structured writing environment, it brings clarity and traceability to your note-driven workflows.

[View Details](/plugins/ticktick-quickadd-task), [Github](https://github.com/muxinli/ticktick-quick-add-obsidian)

---

### 8. [Themed Discord RPC](/plugins/themed-discord-rpc)

Released on 2025-05-27 by [Mouadhbendjedidi](https://github.com/Mouadhbendjedidi)

The **Themed Discord RPC** plugin enhances your Discord profile by displaying real-time information about your note-taking activity. It shows details such as the currently open note, the name of your vault, and how long you've been active in the session. Users can customise status messages and switch between themes like Catppuccin to match their aesthetic preferences. The plugin is lightweight and optimised, with support for custom icons and visual tweaks. Ideal for those who enjoy blending productivity with a touch of personal flair, especially when sharing presence updates with friends or communities on Discord.

[View Details](/plugins/themed-discord-rpc), [Github](https://github.com/Mouadhbendjedidi/themed-obsidian-discord-rpc)

---

### 9. [Images to Notes](/plugins/images-to-notes)

Released on 2025-05-27 by [Rodolfo Terriquez](https://github.com/Rodolfo-Terriquez)

The **Image to notes** plugin helps convert handwritten or printed documents into Markdown notes using AI transcription. When you drop image files like JPG, PNG, or HEIC into a specified folder, the plugin processes each one by sending it to an external AI provider and then creates a new note with the transcribed content. It also appends the original image at the bottom of the note for reference. Users can choose from multiple AI providers such as OpenAI, Anthropic, or Google and select a preferred model. There are flexible naming conventions for the resulting notes and options to customise system and user prompts for better transcription output. It's a handy tool for digitising physical notes efficiently, especially for students or professionals handling paper-based material.

[View Details](/plugins/images-to-notes), [Github](https://github.com/Rodolfo-Terriquez/images-to-notes)

---

### 10. [Live Background](/plugins/live-wallpaper)

Released on 2025-05-27 by [Rememememe :3](https://github.com/remememe)

The **Live Background Plugin** adds dynamic animated wallpapers to your workspace, allowing you to use videos (MP4, WebM), GIFs, or static images as your background. It offers customisation options such as adjusting opacity, blur, brightness, and contrast, making it easy to blend effects with your preferred theme. Users can either apply their own media files or choose from bundled templates. Despite the visual richness, the plugin is designed to run with low CPU usage for a smooth experience. It's best suited for users on desktop (Windows, macOS, or Linux) who want a more immersive and aesthetic note-taking environment, especially when using a dark theme.

[View Details](/plugins/live-wallpaper), [Github](https://github.com/remememe/Obsidian-Live-Wallpaper)

---

### 11. [Monokakido Copilot](/plugins/monokakido-copilot)

Released on 2025-05-27 by [NoHeartPen](https://github.com/NoHeartPen)

The **Monokakido Copilot** plugin adds a quick lookup feature for users working with Japanese or multilingual content. By simply double-pressing the Option key, it triggers a search in the Monokakido Dictionaries app, which needs to be installed separately. This integration can be particularly helpful for language learners, translators, or researchers who frequently need to reference dictionary entries without breaking their writing flow. The plugin is lightweight and designed for a minimal distraction workflow, making it a useful tool for users who want fast access to trusted language resources without leaving the editor.

[View Details](/plugins/monokakido-copilot), [Github](https://github.com/NoHeartPen/obsidian-monokakido-copilot-plugin)

---

### 12. [PDF Printer](/plugins/pdf-printer)

Released on 2025-05-27 by [cubexy](https://github.com/cubexy)

The **PDF Printer** plugin helps you convert PDF documents in your vault into WEBP images. It supports batch conversion of multi-page PDFs and replaces the original PDF embed with links to the generated images, streamlining visual integration into your workflow. Users can adjust image quality for a balance between clarity and storage size, and optionally define a folder to organise these output images. This is especially useful for researchers, students, or anyone who frequently works with visual references from PDFs and wants more control over how they appear within notes.

[View Details](/plugins/pdf-printer), [Github](https://github.com/cubexy/obsidian-pdf-printer)

---

### 13. [Come Through](/plugins/come-through)

Released on 2025-05-27 by [mntno](https://github.com/mntno)

The **Come Through** plugin enables users to create and review flashcards using the FSRS (Free Spaced Repetition Scheduler) algorithm. It introduces a unique way to define flashcard fronts and backs using custom code blocks inside note sections, with each side linked via a shared ID. This structure allows cards to span across multiple notes while maintaining clear pairings. Users can organise cards into decks, initiate reviews from the ribbon or command palette, and enjoy a minimal YAML-based syntax for flexibility. It’s especially useful for learners, students, or professionals who rely on spaced repetition to retain information over time.

[View Details](/plugins/come-through), [Github](https://github.com/mntno/obsidian-come-through)

---

### 14. [Status.lol Publisher](/plugins/statuslol-post)

Released on 2025-05-27 by [Eric Walker](https://github.com/ericmwalk)

The **Status.lol Plugin for Obsidian** allows users to post quick status updates to their status.lol profile and optionally cross-post to social.lol. Each update can also be logged locally to either a custom note or integrated with Daily Notes or Periodic Notes, offering a seamless way to track mood, activity, or personal check-ins. Even if posting fails due to connectivity issues, the plugin ensures your entry is saved in the vault. It's ideal for users who enjoy microblogging or status journaling alongside their regular note-taking routines, keeping both online presence and personal records in sync.

[View Details](/plugins/statuslol-post), [Github](https://github.com/ericmwalk/obsidian-statuslol)

---

### 15. [Sync Emails](/plugins/taskrobin)

Released on 2025-05-27 by [taskrobin](https://github.com/taskrobin)

The **TaskRobin Email Sync for Obsidian** plugin allows users to archive emails and attachments directly into their vault for better organisation and long-term reference. It works by setting up a secure email forwarding alias that sends selected messages to TaskRobin’s servers, which then syncs them to a configurable folder in your vault. Each email is saved as a dated markdown note, and attachments are automatically downloaded into the same folder. The plugin supports both automatic and manual sync, making it useful for professionals who manage project communications or client interactions through email and want everything accessible inside their notes.

[View Details](/plugins/taskrobin), [Github](https://github.com/taskrobin/Obsidian-Plugin)

---

### 16. [Create Note with Date in This Directory](/plugins/create-note-with-date)

Released on 2025-05-30 by [Sangrak Choi](https://github.com/kargnas)

The **Create Note with Date** plugin simplifies the process of generating a new note with today’s date as the filename, formatted as YYYY-MM-DD. It places the file directly in the currently open directory and opens it automatically, making it ideal for daily journaling. The command is easily accessible via the palette. It also supports multiple languages including Korean, Japanese, Spanish, Arabic, and Chinese. Core plugin Daily Notes and community plugins like Calendar, Periodic Notes etc. do the same but if you are looking for language support you can use this instead.

[View Details](/plugins/create-note-with-date), [Github](https://github.com/kargnas/obsidian-create-note-with-date)

---

## 🔁 Plugin Updates

We got 116 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **Task Genius** - v8.7.0 - [Changelog](https://taskgenius.md/changelog/2025-05-26-desktop-v8.7.0)
- **Personal OS** - v3.0.0 - [Changelog](https://github.com/GengAd/obsidian-personal-os/releases/tag/3.0.0)
- **Open Tab Settings** - v1.1.0 - [Changelog](https://github.com/jesse-r-s-hines/obsidian-open-tab-settings/releases/tag/1.1.0)
- **Linter** - v1.29.1 - [Changelog](https://github.com/platers/obsidian-linter/releases/tag/1.29.1)
- **BibLib** - v1.7.0 - [Changelog](https://discord.com/channels/686053708261228577/855181471643861002/1377654510817902684)

---

## 🫡 Plugins Removed

It's time to big goodbye to three plugins

- **Card Navigator** - the plugin's Github repository is active. There was a change of id in manifest and no response from developer. If the developer responds, this plugin might become active once again.
- **Open Sidebar on Hover** - the plugin's Github repository has been archived.
- **Projects** - the plugin's Github repository has been archived.

---

## 🎨 New Themes

- **Modern GenZ Vibedose** - a clean, modern yet expressive environment for thinking and writing. - [Github](https://github.com/omkar-4/Modern-GenZ-Vibedose)

---

## 🫡 Themes Removed

- **Creature** - the theme's Github repository has been archived.

---
