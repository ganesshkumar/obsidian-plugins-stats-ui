---
title: Obsidian Weekly Updates 2025-07-05 to 2025-07-11
description: "From 2025-07-05 to 2025-07-11 there are 26 newly released plugins, 5 new themes and 94 plugin updates."
excerpt: There are 26 newly released plugins, 5 new themes and 94 plugin updates in the last one week's time.
publishedDate: "2025-07-13"
modifiedDate: "2025-07-13"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 26 new plugins, 5 new themes and 94 plugin updates during the week 2025-07-05 to 2025-07-11.

This week, the Obsidian community brings tools that help you visualise your notes as mind maps, sync flashcards directly with Anki, and even add neat interface touches like animated cursors. Along with these, there are updates to popular plugins and some beautifully crafted themes that give your vault a whole new feel. 

## ⭐ New Plugins

### 1. [Better Mind Map](/plugins/better-mindmap)

Released on 2025-07-11 by [Utkarsh Raj](https://github.com/linem-davton)

The **Better Mindmap** plugin transforms Markdown outlines into interactive mind maps, offering a dynamic visual representation of your notes. It supports live updates as you edit, allowing seamless navigation between content and mind map view. Users can switch between vertical and horizontal layouts, adjust spacing with rank and node separation sliders, and interact directly with nodes to collapse, expand, or highlight sections. Clicking linked text within nodes opens related notes instantly.

[View Details](/plugins/better-mindmap), [Github](https://github.com/linem-davton/obsidian-better-mindmap)

---

### 2. [Insert Arknights URL Banner](/plugins/insert-arknights-url-banner)

Released on 2025-07-11 by [Rerurate_514](https://github.com/Rerurate514)

The **Insert Arknights URL to banner** plugin allows users to select an image from a predefined Arknights collection and insert its network URL into the `banner` property of the active note's frontmatter. This plugin itself does not provide banner display functionality and requires a separate banner plugin, such as Pixel Banner, to render the images. Users trigger the feature via a command that opens a modal for image selection.

[View Details](/plugins/insert-arknights-url-banner), [Github](https://github.com/Rerurate514/insert_ArknightsURL_banners)

---

### 3. [Frontmatter Metadata Link Classes](/plugins/frontmatter-link-classes)

Released on 2025-07-11 by [Varvara Zmeeva / zmeeva.io](https://github.com/zmeeeeeva)

The **Metadata Link Classes** plugin automatically applies CSS classes to internal links based on a note's frontmatter metadata. It supports boolean, string, and array values, converting them into targeted classes like `.link-publish-true`, `.link-tags-todo`, or `.link-type-example`. This allows users to style links dynamically using custom CSS, making it easier to visually distinguish notes by their metadata properties such as status, tags, or type.

[View Details](/plugins/frontmatter-link-classes), [Github](https://github.com/zmeeeeeva/obsidian-plugin-metadata-link-classes)

---

### 4. [Simple Anki Sync](/plugins/simple-anki-sync)

Released on 2025-07-11 by [Lukas Mayr](https://github.com/lukmay)

The **Simple Anki Sync** plugin provides an efficient way to push Markdown-based flashcards directly into Anki using AnkiConnect. It supports syncing individual files or entire vaults with a single command, handling deck and subdeck structures via tags like `#anki/MyDeck/Subdeck`. Flashcards are written as minimal Markdown tables and can include LaTeX math, images with size adjustments, and line breaks. Quality-of-life features include automatic deck renaming, backlinks to source notes, and tag assignment for easy filtering in Anki. Deleted cards in Obsidian are also removed from Anki during sync, keeping both systems aligned.

[View Details](/plugins/simple-anki-sync), [Github](https://github.com/lukmay/simple-anki-sync)

---

### 5. [Animated Cursor](/plugins/animated-cursor)

Released on 2025-07-11 by [Kotaindah55](https://github.com/kotaindah55)

The **Animated Cursor** plugin adds smooth motion and blinking animations to the text cursor, bringing a subtle yet polished effect while navigating and editing notes. It supports multi-cursor setups and works consistently across page previews and canvas. Users can adjust speed, blink duration, and enable infinite blinking through the Style Settings plugin.

[View Details](/plugins/animated-cursor), [Github](https://github.com/kotaindah55/animated-cursor)

---

### 6. [Timeline Canvas Creator](/plugins/timeline-canvas-creator)

Released on 2025-07-11 by [chris-codes1](https://github.com/chris-codes1)

The **Timeline Canvas Creator** plugin simplifies the process of building timeline-structured canvases by automating the placement of cards. Instead of manually arranging each element, you can generate a full timeline by specifying a start date, end date, and interval. This functionality is especially useful for visualising chronological data, planning projects, or outlining historical events without the repetitive task of positioning cards one by one. The plugin integrates directly with the canvas feature, enabling quick setup through a command palette action or the ribbon. It caters to users who need organised visual timelines for workflows, research, or storytelling.

[View Details](/plugins/timeline-canvas-creator), [Github](https://github.com/chris-codes1/timeline-canvas-creator)

---

### 7. [Symbol linking](/plugins/symbol-linking)

Released on 2025-07-11 by [Evan Bonsignori ; Mara-Li](https://github.com/Mara-Li)

The **Symbol Linking** plugin enhances your note-linking workflow by letting you use custom trigger symbols like @ to quickly create links to notes, folders, or even specific headings within a file. It supports restricting triggers to defined directories or files, making it ideal for organized setups like People/ or Projects.md. The plugin respects aliases set in metadata, ensuring links resolve to nicknames if configured. It integrates with Obsidian's existing Wikilinks setting and offers a compatibility mode for smoother interaction with other suggestion-based plugins.

[View Details](/plugins/symbol-linking), [Github](https://github.com/Mara-Li/obsidian-symbol-linking)

---

### 8. [Copy Path](/plugins/copy-path)

Released on 2025-07-10 by [shumadrid](https://github.com/shumadrid)

The **Copy Path** plugin adds convenient context menu actions to quickly copy either the full system path or the vault-relative path of any file or folder in your workspace. It also provides an option to append a trailing slash to folder paths, helping distinguish directories from files during copying. With simple toggle settings, users can enable or disable these actions as per their workflow. This lightweight utility is particularly useful for managing links, organizing references, or sharing precise file locations without manually navigating the filesystem.

[View Details](/plugins/copy-path), [Github](https://github.com/shumadrid/obsidian-copy-path)

---

### 9. [Markdown Calendar Generator](/plugins/md-cal-gen)

Released on 2025-07-10 by [Zach Russell](https://github.com/zachatrocity)

The **Markdown Calendar Generator** plugin provides a quick and intuitive way to create formatted table calendars directly in your notes. It supports both month and week views, letting users insert clean, markdown-based calendar tables with a few commands. Designed for simplicity, the plugin allows you to specify a target month or week and instantly generate structured tables for planning, journaling, or task management. You can also set a default view and quickly insert the current date's calendar.

[View Details](/plugins/md-cal-gen), [Github](https://github.com/zachatrocity/md-cal-gen)

---

### 10. [Korean Spellchecker](/plugins/korean-spellchecker)

Released on 2025-07-10 by [dldisud](https://github.com/dldisud)

The **Korean Spellchecker** plugin offers an integrated Korean spell and grammar checker directly within the editor. It highlights errors in selected text, provides correction suggestions, and enables users to apply changes through an interactive modal interface. A custom noun dictionary allows exclusion of proper nouns and domain-specific terms from checks, reducing false positives. The plugin supports large documents by splitting text for stable processing and adapts its UI to Obsidian's light or dark themes. Designed for writers, students, and professionals, it streamlines editing workflows for Korean content in Obsidian.

[View Details](/plugins/korean-spellchecker), [Github](https://github.com/dldisud/obsidian-korean-spellchecker)

---

### 11. [Sidebar Highlights](/plugins/sidebar-highlights)

Released on 2025-07-10 by [trevware](https://github.com/trevware)

The **Sidebar Highlights** plugin enhances note-taking by providing a sidebar to view and manage text highlights and comments across your vault. It supports creating highlights with color coding using `==highlight==` syntax and native comments with `%%comment%%`. The sidebar organizes these elements by file, collection, tags, or color, making it easier to navigate and filter key insights. Users can create collections for cross-file highlights, quickly jump to specific highlights, and group them dynamically. It also integrates footnote-based comments for in-line annotations and offers commands for managing collections efficiently.

[View Details](/plugins/sidebar-highlights), [Github](https://github.com/trevware/obsidian-sidebar-highlights)

---

### 12. [Simple Vault Importer](/plugins/simple-vault-importer)

Released on 2025-07-10 by [WebInspectInc](https://github.com/WebInspectInc)

The **Simple Template Importer** plugin simplifies the process of installing template vaults into your existing workspace by allowing direct import from ZIP files. It automatically places markdown files, CSS snippets, and other template elements in their correct locations within your vault, eliminating the need for manual file management. This is especially useful for users frustrated with the multi-step process of setting up templates, CSS, and configurations manually. The plugin also supports optional import folders and file overwriting to handle conflicts more efficiently, aiming to bring a Notion-style one-click experience to Obsidian.

[View Details](/plugins/simple-vault-importer), [Github](https://github.com/WebInspectInc/obsidian-simple-template-importer)

---

### 13. [SOC Toolkit](/plugins/soc-toolkit)

Released on 2025-07-10 by [Michael Massoni](https://github.com/michaelmassoni)

The **SOC Toolkit** plugin provides cybersecurity professionals and SOC analysts with tools for IP reputation analysis and defanging directly within their notes. It scans IPv4 and IPv6 addresses, including defanged variants, and queries VirusTotal and AbuseIPDB APIs for reputation data. Results are cached locally to reduce API calls and displayed in a customizable format. Users can defang IPs in notes via commands or right-click menus, preserving original formatting. The plugin supports both full and last-dot defanging and integrates with the command palette and context menus for quick access.

[View Details](/plugins/soc-toolkit), [Github](https://github.com/michaelmassoni/obsidian-soc-toolkit)

---

### 14. [TaskNotes](/plugins/tasknotes)

Released on 2025-07-09 by [Callum Alpass](https://github.com/callumalpass)

The **TaskNotes** plugin transforms task management by treating each task as an individual Markdown note enriched with YAML frontmatter. It supports extensive metadata like due dates, statuses, priorities, contexts, and project links, allowing users to create deeply connected and highly customizable workflows. With multiple views including calendar, kanban boards, filtered lists, and daily agendas, it fits both simple to-do tracking and complex project planning. Time tracking features like start/stop timers, session history, and an integrated pomodoro timer help monitor productivity. Tasks can also recur with per-instance tracking, and the plugin supports ICS feed subscriptions for syncing with external calendars. The ability to extend frontmatter for custom fields enhances compatibility with other Obsidian tools like Bases.

[View Details](/plugins/tasknotes), [Github](https://github.com/callumalpass/tasknotes)

---

### 15. [Sidecars](/plugins/sidecars)

Released on 2025-07-09 by [Albert O'Shea](https://github.com/Alb-O)

The **Sidecars** plugin automates the creation and management of companion 'sidecar' notes for attachments and other files within your vault. It monitors user-defined file types, allowing automatic or on-demand sidecar generation via the File Explorer context menu. Features include visual styling for sidecars in the explorer, orphaned sidecar detection with cleanup prompts, and folder scoping using wildcards or regular expressions. Advanced users can integrate it with external tools like Blend Vault for managing linked relationships.

[View Details](/plugins/sidecars), [Github](https://github.com/Alb-O/obsidian-sidecars)

---

### 16. [Diary ICS](/plugins/diary-ics)

Released on 2025-07-09 by [Mousebomb](https://github.com/mousebomb)

The **Diary ICS** plugin synchronizes your Obsidian diary entries with system calendar applications like macOS Calendar or Windows Calendar by generating an ICS subscription link. It parses diary notes based on user-configured heading levels, creating calendar events with titles, descriptions, and deep links back to the original Obsidian files. Frontmatter fields can also be included as part of the event description using custom templates. A local HTTP server hosts the ICS file, enabling real-time updates and cross-device subscriptions within the same network.

[View Details](/plugins/diary-ics), [Github](https://github.com/mousebomb/obsidian-diary-ics)

---

### 17. [Scratchpad](/plugins/scratchpad)

Released on 2025-07-09 by [KVH](https://github.com/kvh03)

The **Scratchpad** plugin adds a lightweight sidebar panel for jotting down quick text notes and making freehand drawings without leaving your current workflow. It features a simple text area for typing and a canvas with customizable brush size and color for sketches or annotations. Content can be manually saved to disk but remains temporary by default, clearing when Obsidian closes. The plugin focuses on minimalism and speed, ideal for capturing fleeting ideas or visual notes during active sessions.

[View Details](/plugins/scratchpad), [Github](https://github.com/kvh03/obsidian-scratchpad)

---

### 18. [Yandex Wiki Integration](/plugins/yandex-wiki-integration)

Released on 2025-07-08 by [Pavel Sokolov](https://github.com/CubieProg)

The **Yandex Wiki Integration** plugin connects your Obsidian vault with Yandex Wiki, enabling seamless export and synchronization of notes to a chosen directory in the Yandex Wiki knowledge base. Users can log in directly from Obsidian, browse their Yandex Wiki structure, and set a working directory for exports. The plugin supports full vault uploads, selective file or folder exports, and custom export formats. Additional features include session management, display mode toggling between HTML and Markdown, and command palette shortcuts for quick actions. It requires a configured browser path and Yandex Wiki account for authentication.

[View Details](/plugins/yandex-wiki-integration), [Github](https://github.com/CubieProg/Obsidian-Yandex-Wiki-Integration)

---

### 19. [Calculite](/plugins/calculite)

Released on 2025-07-08 by [Holo](https://github.com/gfxholo)

The **Calculite** plugin adds a lightweight calculator directly into your workspace for quick math operations like adding shopping lists, calculating averages, or working out reps. It supports basic arithmetic and remembers the current equation even if you close and reopen Obsidian. You can access it through a ribbon icon, command palette, sidebar toggle, or as a floating window on desktop that works system-wide. Hotkeys are mapped to match Windows and macOS calculators, offering a familiar experience.

[View Details](/plugins/calculite), [Github](https://github.com/gfxholo/calculite)

---

### 20. [Alpha Bullet](/plugins/alpha-bullet)

Released on 2025-07-08 by [Mara-Li](https://github.com/Mara-Li)

The **AlphaBullet** plugin brings natural order sorting to unordered markdown lists, making it easier to organize items like inventories, glossaries, and worldbuilding content. It supports ascending and descending sort options and can group items under headings based on their initial letters. Users can trigger sorting manually via commands or set up YAML frontmatter for per-file auto-sorting. The plugin also allows configuration of group and item sort orders independently, offering flexibility for complex workflows like reverse glossaries.

[View Details](/plugins/alpha-bullet), [Github](https://github.com/Mara-Li/obsidian-alpha-bullet)

---

### 21. [Replace Pencil](/plugins/replace-pencil)

Released on 2025-07-08 by [penyt](https://github.com/penyt)

The **Replace Pencil** plugin allows dynamic text replacement within code blocks by using placeholders. Users can define a custom prefix in the settings and wrap any text they want to replace in the chosen placeholder format, such as angle brackets. In Reading Mode, an input field and a clear button appear beside the code block, enabling on-the-fly updates. A copy button simplifies exporting the modified content to the clipboard, while a sidebar eraser button resets all changes instantly.

[View Details](/plugins/replace-pencil), [Github](https://github.com/penyt/replace-pencil)

---

### 22. [Current View](/plugins/current-view)

Released on 2025-07-08 by [Lucas Ostmann](https://github.com/LucEast)

The **current-view** plugin lets you control the default view mode for notes by applying rules based on folder paths, file name patterns, or frontmatter metadata. It can automatically switch between Reading, Live Preview, and Source modes when opening a note, making the experience more consistent for different contexts like templates, daily notes, or drafts.

[View Details](/plugins/current-view), [Github](https://github.com/LucEast/obsidian-current-view)

---

### 23. [Coalesce](/plugins/coalesce)

Released on 2025-07-08 by [Floyd](https://github.com/bfloydd)

The **Coalesce** plugin streamlines the process of viewing and managing backlinked notes in a single, unified interface. Inspired by tools like Roam and Logseq, it enhances Obsidian's native Backlinks in Document feature by offering a more comprehensive and configurable view. This is particularly useful for users who capture quick notes in daily streams without immediately sorting them into folder hierarchies. Aliases can be applied to narrow down the displayed backlinks, making it easier to locate related content during review.

[View Details](/plugins/coalesce), [Github](https://github.com/bfloydd/coalesce)

---

### 24. [Table List](/plugins/table-list)

Released on 2025-07-08 by [Akaswan](https://github.com/Akaswan)

The **Table List** plugin provides a grid-based interface for managing tasks, ideal for organizing projects across days or weeks. Each row represents a project, while columns map to dates, allowing users to assign and track tasks visually. Tasks can be marked as Haven't Started, In Progress, or Completed, making it easier to monitor progress at a glance. This layout is suitable for project planning, workload management, and keeping multiple initiatives on track without clutter.

[View Details](/plugins/table-list), [Github](https://github.com/Akaswan/table-list)

---

### 25. [RTL Math Text](/plugins/rtl-math-text)

Released on 2025-07-08 by [orelby](https://github.com/orelby)

The **RTL Math Text** plugin enables seamless integration of right-to-left (RTL) languages like Hebrew into MathJax expressions. It provides custom LaTeX commands to embed RTL text within mathematical formulas and allows nesting of left-to-right (LTR) text or math expressions inside RTL contexts. Users can even customise command names for flexibility. However, it currently lacks support for languages with combining letters such as Arabic, pending improvements in MathJax 4.0.

[View Details](/plugins/rtl-math-text), [Github](https://github.com/orelby/obsidian-rtl-math-text-plugin)

---

### 26. [Eccirian Encrypt](/plugins/eccirian)

Released on 2025-07-08 by [Entropiex](https://github.com/Enthalpiex)

The **Eccirian Encrypt** plugin adds file-level encryption and decryption to your vault, using AES-256-GCM and ECC-P-256 password-based encryption. It introduces a dedicated `.eccirian` file extension and replaces the editor view of locked files with a read-only message until the correct password is entered. Users can quickly toggle encryption via the command palette or UI controls, making it practical for managing sensitive notes without leaving the app. The plugin does not store passwords, so forgotten credentials mean permanent data loss.

[View Details](/plugins/eccirian), [Github](https://github.com/Enthalpiex/Eccirian-Encrypt)

---

## 🔁 Plugin Updates

We got 94 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **Custom Selected Word Count** - v1.5.0 - [Changelog](https://github.com/banisterious/obsidian-custom-selected-word-count/releases/tag/1.5.0)
- **Sidebar Highlights** - v1.10.0 - [Changelog](https://github.com/trevware/obsidian-sidebar-highlights/releases/tag/1.10.0)

---

## 🎨 New Themes

- **Flat Cap** - a dark, minimalist, and eye-friendly theme meticulously crafted to provide a comfortable and focused note-taking experience in Obsidian - [Github](https://github.com/cheycron/flat-cap-obsidian)
- **Mushin** - embodies the Japanese zen concept of "no-mind" - a state of mental clarity, effortless flow, and pure focus - [Github](https://github.com/Vlad3Design/Mushin)
- **Avatar** - a vibrant dark theme for Obsidian inspired by the four elements, featuring a carefully crafted color palette of aqua, purple, gold, and pink accents - [Github](https://github.com/cxj05h/obsidian-avatar)
- **Robsi** - a modern theme for Obsidian with beautiful blur effects, purple accents, and a clean, minimalist aesthetic - [Github](https://github.com/Riffaells/Robsi)
- **Coffee** - a theme based on Coffee color aesthetics - [Github](https://github.com/regawaras/Coffee)

---
