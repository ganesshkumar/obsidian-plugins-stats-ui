---
title: Obsidian Plugin Updates 2025-06-08 to 2025-06-14
description: "new obsidian plugins from 2025-06-08 to 2025-06-14 - Course Module Loader, OpenWords, Pure Chat LLM, Vim Marker Sharpener, Template Filename, Yearly Glance, Macros, NoteMover shortcut, Timelive, Countdown To"
excerpt: There are 10 new plugins and 83 plugin updates in the last one week's time.
publishedDate: "2025-06-15"
modifiedDate: "2025-06-15"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 11 new plugins and 83 plugin updates in the last one week's time. We also have 2 new themes and 1 theme got added back after policy violation has been fixed.

## ⭐ New Plugins

### 1. [UID Generator](/plugins/note_uid_generator)

Released on 2025-06-14 by [Valentin Pelletier](https://github.com/Netajam)

The **UID Generator** plugin helps with assigning and managing unique identifiers in your notes' frontmatter, making it easier to track, reference, or integrate notes with external workflows. It supports manual and automatic UID generation, including the ability to apply UIDs only when missing or to update them forcefully. Users can define custom metadata keys, format how UIDs are copied alongside note titles, and apply bulk operations across folders.

[View Details](/plugins/note_uid_generator), [Github](https://github.com/Netajam/obsidian_note_uid_generator)

---

### 2. [Course Module Loader](/plugins/course-module-loader)

Released on 2025-06-13 by [Sebastian Kamilli](https://github.com/QuintSmart)

The **Course Module Loader** plugin simplifies the process of importing structured course materials into your vault by downloading and unzipping content from a direct URL. It supports services like Dropbox (with direct download links) and extracts the archive into a user-defined folder while preserving existing files. Users can choose the target location via a searchable folder selector, and the plugin takes care of creating subfolders automatically.

[View Details](/plugins/course-module-loader), [Github](https://github.com/QuintSmart/obsidian-course-module-loader)

---

### 3. [OpenWords](/plugins/openwords)

Released on 2025-06-13 by [insile](https://github.com/insile)

The **OpenWords** plugin offers an integrated word memorization system using SuperMemo 2 spaced repetition logic, tailored for learners managing vocabulary through the OpenText wordbank. It supports generating structured word indexes by level and alphabet, marking words as 'mastered', and tracking metadata like repetition count, ease factor, and due dates via YAML. You can review words, take spelling quizzes, or add backlinks to related notes. The plugin reads and caches all word files at startup, syncs metadata changes in real-time, and allows you to reset progress when needed. All scheduling relies solely on local word file data, with no external storage or history tracking. This makes it ideal for learners who prefer to manage their vocabulary through files and metadata within their own vault.

[View Details](/plugins/openwords), [Github](https://github.com/insile/OpenWords)

---

### 4. [Pure Chat LLM](/plugins/pure-chat-llm)

Released on 2025-06-13 by [Justice Vellacott](https://github.com/TheJusticeMan)

The **Pure Chat LLM** plugin turns your notes into interactive chat interfaces powered by large language models from providers like OpenAI, Gemini, Anthropic, and more. You can engage in structured conversations using Markdown, link context from other notes, and configure model parameters directly within the note using a JSON block. Each note becomes its own self-contained chat session, complete with Markdown-rendered replies and flexible role-based messaging. The plugin supports multiple providers, system prompt customization, and per-note settings for things like model type or token limits. It doesn't edit your notes-it simply wraps them in a smart interface for focused AI conversations.

[View Details](/plugins/pure-chat-llm), [Github](https://github.com/TheJusticeMan/pure-chat-llm)

---

### 5. [Vim Marker Sharpener](/plugins/vim-marker-sharpener)

Released on 2025-06-13 by [Artem Dvoryadkin](https://github.com/artemDvoryadkin)

The **Vim Marker Sharpener** plugin brings reliable markdown formatting to users working in Vim mode, especially in VISUAL and VISUAL LINE modes. It provides a set of commands for toggling bold, italic, highlight, strikethrough, code blocks, and comments, with the ability to combine or remove formatting cleanly. The plugin integrates well with custom `.vimrc` configurations through the Vimrc Support plugin, allowing precise control via leader-key mappings or ex commands. Even non-Vim users can benefit by binding formatting actions to hotkeys. Designed to solve formatting inconsistencies in Vim mode, it streamlines the editing experience for those who rely on modal workflows.

[View Details](/plugins/vim-marker-sharpener), [Github](https://github.com/artemDvoryadkin/obsidian-vim-marker-sharpener)

---

### 6. [Template Filename](/plugins/template-filename)

Released on 2025-06-13 by [Callum Alpass](https://github.com/callumalpass)

The **Template Filename** plugin enables you to create notes with fully customizable filenames based on dynamic variables like timestamps, counters, and system info. It supports an extensive set of placeholders for date and time formatting, random strings, base-converted Unix timestamps, and sequential counters. You can also inject system values like username or device name, and apply text transformations such as slugifying or changing case. A live preview helps visualize the final filename before creation, and default templates can be saved for faster note generation. This is especially useful for users managing structured logs, journal entries, or autogenerated content based on repeatable naming schemes.

[View Details](/plugins/template-filename), [Github](https://github.com/callumalpass/obsidian-template-filename)

---

### 7. [Yearly Glance](/plugins/yearly-glance)

Released on 2025-06-13 by [Moy & RavenHogWarts](https://github.com/Moyf)

The **Yearly Glance** plugin offers a clean, interactive calendar interface to track and manage key dates across the entire year. It supports multiple event types like birthdays, holidays, and custom entries, all shown in a single view. With options for classic or list layouts, users can filter events, hide empty days, and customise appearance using colors and emojis. Each event is clickable, allowing quick edits or detailed views. It also includes birthday attributes like age and zodiac, and provides support for lunar calendar formats. Designed for flexibility, the plugin makes annual planning and review both visual and efficient, especially for users who prefer a bird's eye view of their timelines.

[View Details](/plugins/yearly-glance), [Github](https://github.com/Moyf/yearly-glance)

---

### 8. [Macros](/plugins/macros)

Released on 2025-06-13 by [James Clifford Spratt](https://github.com/JamesCliffordSpratt)

The **Macros Plugin** plugin enables seamless food and nutrition tracking inside your notes by integrating with the FatSecret API. It allows users to search for food items, generate markdown entries with nutritional breakdowns, and organize meals using interactive macro blocks. You can define custom serving sizes, reuse meal templates, and even visualize daily intake with pie charts. For broader insights, the plugin supports aggregating data from multiple days or meals into combined summaries. It's a solid choice for users focused on diet tracking or meal planning directly within their vault, blending structured data with visual summaries for better clarity.

[View Details](/plugins/macros), [Github](https://github.com/JamesCliffordSpratt/macros)

---

### 9. [NoteMover shortcut](/plugins/note-mover-shortcut)

Released on 2025-06-13 by [Lars Bücker](https://github.com/bueckerlars)

The **NoteMover Shortcut** plugin automates and streamlines the process of organizing notes using shortcuts, tags, and scheduled rules. It enables quick movement of the active note or bulk relocation from an 'Inbox' to target folders based on preconfigured tag-based rules or filters. Users can set periodic auto-movement with custom intervals, apply blacklist or whitelist filtering, and define detailed rules mapping specific tags to destination paths. The plugin also features a history panel where all movements are logged with the option to undo past actions individually or in batches. This makes it ideal for users who work with a central inbox workflow and want to automate their folder structure without relying on manual effort every time.

[View Details](/plugins/note-mover-shortcut), [Github](https://github.com/bueckerlars/obsidian-note-mover-shortcut)

---

### 10. [Timelive](/plugins/timelive)

Released on 2025-06-13 by [aNNiMON](https://github.com/aNNiMON)

The **Timelive** plugin transforms plain lists of dates into interactive, visually structured timelines without relying on code blocks. It automatically detects various date formats, supports time spans between two dates, and allows for rich content like links, images, videos, and even code snippets within each timeline entry. Users can mark an event as 'live' using keywords like now or today, making it ideal for tracking ongoing projects. The plugin simplifies timeline creation by integrating directly with regular markdown formatting.

[View Details](/plugins/timelive), [Github](https://github.com/aNNiMON/obsidian-timelive)

---

### 11. [Countdown To](/plugins/countdown-to)

Released on 2025-06-13 by [Gui Cattani](https://github.com/guicattani)

The **CountdownTo** plugin lets you visualize progress toward upcoming events or deadlines using customizable countdown bars. You can choose between various styles like line, circle, semicircle, and square, with full control over colors, update intervals, and date formatting. It also provides flexible display options using placeholders that show percentages, dates, and durations, all powered by Luxon formatting.

[View Details](/plugins/countdown-to), [Github](https://github.com/guicattani/obsidian-countdown-to)

---

### 🅱️ Beta Plugins

There are few new plugins in beta stage (accessible via [BRAT](https://github.com/TfTHacker/obsidian42-brat))

- [Linear Integration for Obsidian](https://github.com/casals/obsidian-linear-integration-plugin)
- [OneiroMetrics](https://github.com/banisterious/obsidian-oneirometrics) v0.16.1 
- [Scratchpad](https://github.com/kvh03/obsidian-scratchpad) v0.1.1

---

## 🔁 Plugin Updates

We got 83 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **BRAT** - v1.1.7 - [Changelog](https://github.com/TfTHacker/obsidian42-brat)
- **Note Toolbar** - v1.24.01 - [Changelog](https://github.com/chrisgurney/obsidian-note-toolbar/releases/tag/1.24.01)
- **TaskNotes** - v3.3.0 - [Changelog](https://github.com/callumalpass/tasknotes/releases/tag/3.3.0)
- **Advanced Progress Bar** - v1.1.2 - [Changelog](https://github.com/cactuzhead/Advanced-Progress-Bars/releases/tag/1.1.2)
- **Performium** - v1.5.0 - [Changelog](https://github.com/ruikurenaii/performium/releases/tag/1.5.0)
- **File Creator** - v1.1.0 - [Changelog](https://github.com/DudeThatsErin/FileCreator/releases/tag/1.1.0)

---

## 🎨 New Themes

- **Dashboard** - A pastel theme with many colors and patterns, with the feel of a bullet journal. (light mode only) - [Github](https://github.com/incantatem2/Obsidian-dashboard)
- **Minimalists Paradise** - Minimal, but not too simple. Card layout with customization features. - [Github](https://github.com/BelleBasso/MinimalistsParadise)
- **Typomagical** - The plugin that was removed last week due to `Developer policies violation: Remote resources` got added back after the developer [fixed](https://github.com/hungsu/typomagical-obsidian/commit/0e3220ca13cca02a8a9969ca65056a5aa926288f) the issues (fonts loaded over network ) - [Github](https://github.com/hungsu/typomagical-obsidian).

---
