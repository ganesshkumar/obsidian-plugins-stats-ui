---
title: Obsidian Plugin Updates 2025-07-27 to 2025-08-02
description: "From 2025-07-26 to 2025-08-01 there are 15 newly released plugins and 78 plugin updates"
excerpt: There are 15 new plugins and 78 plugin updates during the week 2025-07-27 to 2025-08-02 and 1 plugin got removed.
publishedDate: "2025-08-03"
modifiedDate: "2025-08-03"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 15 new plugins and 78 plugin updates during the week 2025-07-27 to 2025-08-02 and 1 plugin got removed.

Last week brought a wave of fresh energy to the Obsidian community with fifteen new plugins landing in style. Pixel Pets adds cute animated cats to your notes, while Cloud Sync keeps everything safe and in sync across devices. Writers will love tools like Variant Editor, and organizers can tidy things up with Discrete and Vault Stats. On top of that, 78 plugin updates kept things moving, making this one of the busiest and most exciting weeks yet.

## ⭐ New Plugins

### 1. [Pixel Pets](/plugins/pixel-pets)

Released on 2025-08-02 by [Lucas Jin](https://github.com/LucasHJin)

The **Pixel Pets** plugin adds a playful twist to your workspace by letting you adopt pixelated pets that live inside a movable view in your vault. You can choose from thirteen animated cats, each with its own set of charming movements, and more pet types are planned for the future. Ten different pixel art backgrounds set the scene, and you can freely drag, resize, and arrange the pet view to fit your layout. Commands let you add and name pets, swap out scenes, or clear them all with a click.

[View Details](/plugins/pixel-pets), [Github](https://github.com/LucasHJin/obsidian-pets)

---

### 2. [Checkbox Autochecker](/plugins/checkbox-autochecker)

Released on 2025-08-02 by [Klaas Klee](https://github.com/klaasklee)

The **Checkbox Autochecker** plugin keeps parent and child checkboxes in sync, making task management inside Markdown lists far smoother. It can automatically mark a parent as complete when all its children are checked, or cascade changes downward when toggling the parent. Three propagation modes - Loose, Partial Strict, and Strict - give you control over how aggressively changes flow, whether only syncing upward or overwriting all children. It works instantly while typing, supports deeply nested lists, and respects standard Markdown formatting, so there's no lock in.

[View Details](/plugins/checkbox-autochecker), [Github](https://github.com/klaasklee/checkbox-autochecker-obsidian)

---

### 3. [Auto Close Tags](/plugins/auto-close-tags)

Released on 2025-08-02 by [k0src](https://github.com/k0src)

The **Auto Close Tags** plugin streamlines writing HTML by inserting closing tags the moment you type an opening one. It reacts in real time to keystrokes and even when you paste code, saving you from repetitive edits. The plugin handles nested structures, self closing elements, and lets you manually close the last unclosed tag with a simple command if needed. Its settings are flexible - you can exclude certain tags, choose whether the cursor lands inside or after the tag, and decide if code blocks or inline code should be ignored.

[View Details](/plugins/auto-close-tags), [Github](https://github.com/k0src/Obsidian-Auto-Close-Tags-Plugin)

---

### 4. [Variant Editor](/plugins/variant-editor)

Released on 2025-08-02 by [Kunal Jain](https://github.com/kunalJa)

The **Variant Editor** plugin helps writers explore different ways to express the same idea without losing earlier drafts. It lets you create multiple variations of a word, phrase, or entire sentence, then compare them directly in context. You can drag variants to reorder them, switch between options with a click, and finally commit to the one that works best, replacing the placeholder syntax with clean text. All variants are stored inline using a simple markup format, so they remain portable even if the plugin isn't active.

[View Details](/plugins/variant-editor), [Github](https://github.com/kunalJa/VariantEditor)

---

### 5. [Efficient Word Count](/plugins/efficient-word-count)

Released on 2025-08-01 by [Blue Heron](https://github.com/blueheron786)

The **Efficient Word Count** plugin keeps track of word counts across your entire vault without slowing you down. It builds a cache of every Markdown file's count, listens for changes like edits, renames, or deletions, and updates instantly, so the data is always fresh. That cache is stored on disk, which means even big vaults start up quickly with accurate totals already ready. You can fine tune which folders get skipped like Templates or trash and even tap into the global API to pull counts into DataviewJS or your own scripts.

[View Details](/plugins/efficient-word-count), [Github](https://github.com/blueheron786/obsidian-efficient-word-count)

---

### 6. [Cloud sync](/plugins/cloud-sync)

Released on 2025-08-01 by [Bing](https://github.com/ai-bytedance)

The **Cloud Sync** plugin brings multi-cloud synchronization to your vault with built-in end-to-end AES-256 encryption, keeping your notes secure while syncing across devices. It already offers full WebDAV support, letting you connect services like Nutstore or Nextcloud, with options for two-way, upload-only, or download only sync. The plugin handles file changes automatically, supports incremental updates for efficiency, and allows scheduled or selective syncing to avoid unwanted uploads. Though GitHub, iCloud, Google Drive, and OneDrive integrations are still in development, the structure is in place for broader coverage.

[View Details](/plugins/cloud-sync), [Github](https://github.com/ai-bytedance/obsidian-cloud-sync)

---

### 7. [Publish Note to Mowen Note](/plugins/publish-note-to-mowen)

Released on 2025-08-01 by [ziyou](https://github.com/zhuSilence)

The **Publish Note to Mowen Note** plugin connects your vault with the Mowen note platform, making publishing and managing notes across the two systems seamless. You can push entire notes or selected text straight to Mowen with a right click or command, and the plugin handles all the formatting work - from converting markdown to rich text to uploading embedded images. It also includes an AI powered assistant (currently supporting DeepSeek) that can autogenerate titles, tags, and summaries, writing them back into frontmatter for easy reuse. Configurations are flexible, letting you define custom keys for note IDs and titles, manage privacy settings, and finetune how published notes behave.

[View Details](/plugins/publish-note-to-mowen), [Github](https://github.com/zhuSilence/obsidian-mowen-plugin)

---

### 8. [Related Notes by Tag](/plugins/related-notes-by-tag)

Released on 2025-07-31 by [Chris Howard](https://github.com/chrishoward-projects)

The **Related Notes by Tag** plugin helps you uncover connections across your vault by surfacing notes that share common tags with the one you're viewing. It quietly runs in the background, updating in real time as you switch between notes, and shows the results in a clean sidebar panel. You can sort related notes by name or date, filter them based on how many tags they share, and even see exactly which tags link them together. Notes open instantly with a click, or in new tabs with a modifier key, making navigation fluid. 

[View Details](/plugins/related-notes-by-tag), [Github](https://github.com/chrishoward-projects/related-notes-by-tag)

---

### 9. [Custom File Viewer](/plugins/custom-file-viewer)

Released on 2025-07-31 by [peabody28](https://github.com/peabody28)

The **Custom File Viewer** plugin adds the ability to open non markdown files directly in external applications of your choice. You can map specific file extensions - like .py, .yaml, or .sh to different programs, and even set a fallback app for anything that isn't explicitly mapped. An ignore list keeps certain file types, such as markdown, images, or videos, from triggering the feature, giving you fine control over what opens externally. Once configured, clicking a file in the explorer hands it off to the designated app without extra steps.

[View Details](/plugins/custom-file-viewer), [Github](https://github.com/peabody28/obsidian-extension-custom-file-viewer)

---

### 10. [WebDAV Image Uploader](/plugins/webdav-image-uploader)

Released on 2025-07-31 by [ste](https://github.com/Koishiiko)

The **WebDAV Image Uploader** plugin streamlines how images are handled by moving them from local storage to a connected WebDAV server and swapping them with clean preview links. It intercepts pasted or dragged images, uploads them automatically, and inserts the corresponding link right into your note. You can also right click to upload, download, or delete individual files, and even run batch operations to process every image across your vault. There's flexibility to keep or remove local copies, and while authentication quirks mean previews sometimes behave differently, the plugin provides options to manage that too.

[View Details](/plugins/webdav-image-uploader), [Github](https://github.com/Koishiiko/obsidian-webdav-image-uploader)

---

### 11. [Citation Callouts](/plugins/citation-callouts)

Released on 2025-07-31 by [Michael Marvive](https://github.com/Marvive)

The **Citation Callouts** plugin transforms copied quotes with citations into neatly formatted callouts, giving referenced material a polished, book like presentation. It automatically pulls the source name from the citation and uses it as the callout title, while preserving rich text elements like bold, italics, and hyperlinks. The resulting callout includes a book icon for visual clarity, making cited passages stand out cleanly in your notes. Access is flexible you can trigger the feature via the command palette, ribbon icon, or a custom hotkey.

[View Details](/plugins/citation-callouts), [Github](https://github.com/Marvive/Citation-Callouts)

---

### 12. [.md Merge](/plugins/md-merge)

Released on 2025-07-31 by [Tosatur](https://github.com/tosatur)

The **.md Merge** plugin simplifies the process of consolidating multiple markdown files into one neatly combined document. It scans a chosen folder and, if needed, dives into subfolders to collect every .md file, then merges them into a single output file. Users can fine tune the process by excluding specific files with glob patterns, skipping hidden notes, or even customizing the output filename with date based templates. The plugin quietly handles folder creation if the destination doesn't exist and offers quick access through a sidebar button, command palette, or hotkeys.

[View Details](/plugins/md-merge), [Github](https://github.com/tosatur/obsidian-md-merge)

---

### 13. [Discrete](/plugins/discrete)

Released on 2025-07-31 by [shkarlsson](https://github.com/shkarlsson)

The **Discrete** plugin adds powerful metadata based filtering directly to the file explorer, letting you control exactly which notes you see. It works by reading frontmatter and applying a range of operators - equals, contains, exists, includes, and even greater or less than comparisons - to hide or display files dynamically. You can combine multiple filters using AND or OR logic, target different data types like text, numbers, lists, or booleans, and even create quick filters from the right click menu. This makes it easy to surface only the notes that matter, whether you're hiding completed tasks, isolating high priority items, or filtering by tags for a project view. By shifting the focus to what's relevant, Discrete streamlines vault navigation and helps keep clutter out of the way.

[View Details](/plugins/discrete), [Github](https://github.com/shkarlsson/obsidian-discrete)

---

### 14. [Vault Stats](/plugins/vault-stats)

Released on 2025-07-29 by [Blue Heron](https://github.com/blueheron786)

The **Vault Stats** plugin adds simple but powerful functions that let you see an overview of your entire vault at a glance. It provides two global calls - one to generate a markdown summary of note counts, word counts, links, and tags, and another to list the most recently modified notes, with the option to skip certain folders like Templates. These functions are designed for use with DataviewJS or custom scripts, making it easy to weave live stats into dashboards, reports, or daily notes.

[View Details](/plugins/vault-stats), [Github](https://github.com/blueheron786/obsidian-stats-plugin)

---

### 15. [Sonkil](/plugins/sonkil)

Released on 2025-07-28 by [ohyoungpark](https://github.com/ohyoungpark)

The **Sonkil** plugin introduces Emacs inspired text editing capabilities, making precise text manipulation faster and more fluid. It brings a powerful kill ring that stores up to 120 entries, enabling users to cut, copy, and paste with context aware memory. Clipboard sync ensures anything cut or copied is instantly available system wide, while multicursor support lets you cut or paste text across several positions at once. The visual mark selection highlights text regions for better focus, and a subtle status bar indicator keeps you aware of current operations. Its flexibility lies in user defined hotkeys, allowing you to map familiar Emacs commands or create your own workflow.

[View Details](/plugins/sonkil), [Github](https://github.com/ohyoungpark/obsidian-sonkil)

---

## 🅱️ Beta Plugins

- Pochoir - a simple, no‑code plugin for effortless note templating with minimal setup - [Github](https://github.com/FuriouZz/obsidian-pochoir/)
- Blueprint - a powerful Obsidian templating plugin that enforces per‑note templates with Nunjucks-based syntax, frontmatter interpolation, and repeatable template application - [github](https://github.com/madx/blueprint-obsidian-plugin)
- Task Roles - assign tasks to people or companies. Designate DACI-style roles ("Driver, Approver, Contributor, Informed"), or roll out your own and track them all in a powerful Task Center - [Github](https://github.com/lc0rp/obsidian-task-roles)
- Adapt to Current View - allows to set different accent colors for Reading view, Live Preview and Source - [Github](https://github.com/greetclammy/adapt-to-current-view)


---

## 🔁 Plugin Updates

We got 78 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **TaskNotes** - v3.16.0 to 3.16.4 - [Changelog](https://github.com/callumalpass/tasknotes/releases)
- **Task Board** - v1.6.0 - [Changelog](https://github.com/tu2-atmanand/Task-Board/releases/tag/1.6.0)

---

## 🫡 Plugins Removed

- Note Companion AI (Fileorganizer2000) - Abandoned, users are not receving answers from plugin support team, refund requests are not being replied to

---
