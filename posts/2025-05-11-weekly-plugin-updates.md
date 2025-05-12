---
title: Obsidian Plugin Updates 2025-05-04 to 2025-05-10
description: 'new obsidian plugins from 2025-05-04 to 2025-05-10 - Backlink Settings, Custom Commands, Easy Keep View, logos-refs, Checkbox Sort, Inline Callouts, Byte Field Diagrams, DataCards, Title-Only Tab, Note Status, Another Name, LawList: Custom List Styles, Water Tracker, Reactive Notes, Draw Steel Retainer, VCF Contacts, Rainbow-Colored Sidebar, Limitless Lifelogs, YTSummarizer, Textfresser, aDHL'
excerpt: There are 21 new plugins and 79 plugin updates in the last one week's time.
publishedDate: '2025-05-11'
modifiedDate: '2025-05-11'
tags:
  - weekly-plugin-updates
---

It's been a vibrant week in the Obsidian plugin universe, with 21 fresh additions ready to supercharge your workflow! From customizable commands and card-style views to inline callouts and contact management, these new plugins bring both power and personality to your vault. The excitement doesn't stop there, 79 plugins received updates, including big releases like Task Genius and Advanced Canvas. We've also spotted a promising beta tool Python Bridge - which lets developers write Obsidian plugin in python (Have to wait and watch if and how these plugins can be included to the official community plugins). And for the style-savvy among us, 6 new themes have landed, offering everything from retro vibes to elegant calligraphy. Let's dive into the highlights!

![Weekly Updates](/images/2025-05-11-weekly-plugin-updates.webp)

> There are 21 new plugins and 79 plugin updates in the last one week's time.

## ⭐ New Plugins: We have 21 new plugins.

### 1. [Backlink Settings](/plugins/backlink-settings)

Released on 2025-05-07 by [calvinwyoung](https://github.com/calvinwyoung)

The **Backlink Settings** plugin enhances the backlinks or 'Linked mentions' pane by allowing users to save their preferred view settings. Normally, each time a new file is opened, users need to manually adjust the sort order, context display, and whether backlink results are collapsed. With this plugin, these preferences are saved and automatically applied whenever a note is opened, streamlining the experience for those who rely heavily on backlinks to navigate and understand their note connections.

[View Details](/plugins/backlink-settings), [Github](https://github.com/calvinwyoung/obsidian-backlink-settings)

---

### 2. [Custom Commands](/plugins/custom-commands)

Released on 2025-05-07 by [Staaaaaaaaaan](https://github.com/Staaaaaaaaaan)

The **Custom Commands** plugin lets users define personalized commands to speed up common workflows like opening specific notes, creating templated files, inserting dynamic text snippets, or chaining multiple actions together. Each command type-Open, Create, Insert, and Sequence-can be customized with placeholders like date and time, and even configured to open notes in a new tab or window. This is particularly useful for recurring tasks such as journaling, note-taking for meetings, or setting up a morning routine. By centralizing these repetitive actions into named commands accessible from the command palette, the plugin helps users save time and maintain consistency in their workflows.

[View Details](/plugins/custom-commands), [Github](https://github.com/Staaaaaaaaaan/obsidian-custom-commands)

---

### 3. [Easy Keep View](/plugins/easy-keep-view)

Released on 2025-05-07 by [@tazihad](https://github.com/tazihad)

The **Easy Keep View** plugin provides a visually rich, card-style interface for browsing and managing notes, inspired by the layout of Google Keep. It displays notes with their titles, short previews, and optional image thumbnails, making it easier to scan through content quickly. Users can open notes by clicking on the cards or create new ones directly from the view. The interface supports both light and dark themes and can be adjusted based on system settings.

[View Details](/plugins/easy-keep-view), [Github](https://github.com/tazihad/obsidian-easy-keep-view)

---

### 4. [logos-refs](/plugins/logos-refs)

Released on 2025-05-07 by [Joey Kilgore](https://github.com/joey-kilgore)

The **Logos-refs** plugin streamlines the process of importing and managing citations from Logos Bible Software into your vault. By copying a passage in Logos and using the plugin's paste command, users can automatically generate or link to a formatted reference note, especially useful when working with BibTeX citation style. It helps keep biblical references organized in a designated folder and simplifies the workflow for those regularly working with theological or academic material sourced from Logos.

[View Details](/plugins/logos-refs), [Github](https://github.com/joey-kilgore/logos-refs)

---

### 5. [Checkbox Sort](/plugins/checkbox-sort)

Released on 2025-05-07 by [mattang687](https://github.com/mattang687)

The **Checkbox Sorter** plugin automatically moves completed checklist items to the bottom of their respective groups while maintaining the original structure of nested lists. When a checkbox is marked as done, the plugin intelligently reorders only its immediate peers, keeping child items correctly nested and unrelated lists unaffected. It offers flexible control through global settings, YAML frontmatter, or inline list markers, so you can fine-tune behavior at the vault, file, or list level.

[View Details](/plugins/checkbox-sort), [Github](https://github.com/mattang687/obsidian-checkbox-sort)

---

### 6. [Inline Callouts](/plugins/inline-callouts)

Released on 2025-05-07 by [@gapmiss](https://github.com/gapmiss)

The **Inline Callouts** plugin adds a clean and efficient way to create inline callouts using simple custom syntax. Users can display small visual highlights with icons, labels, and colours directly within text lines. It includes modals to create or modify callouts, auto-suggestions for Lucide icons, and a search interface for existing callouts. The plugin is compatible with the Style Settings plugin and supports full customization via CSS variables.

[View Details](/plugins/inline-callouts), [Github](https://github.com/gapmiss/inline-callouts)

---

### 7. [Byte Field Diagrams](/plugins/bytefield)

Released on 2025-05-07 by [natri0](https://github.com/natri0)

The **bytefield** plugin allows users to create visual byte-field diagrams directly within their notes using simple code blocks. These diagrams are useful for illustrating data layouts in structured formats like network packets or binary files, with each field mapped to a specific byte length. Users can define fields with names and sizes, specify starting offsets, add unnamed padding bytes, and even allow fields to wrap across rows if they exceed available space. It's a lightweight and practical tool for developers, reverse engineers, or protocol designers who need to represent low-level data structures in a clear, visual format.

[View Details](/plugins/bytefield), [Github](https://github.com/natri0/obsidian-bytefield)

---

### 8. [DataCards](/plugins/data-cards)

Released on 2025-05-07 by [Sophokles187](https://github.com/Sophokles187)

The **DataCards** plugin transforms Dataview query results into elegant, customizable card layouts, offering a more visual and user-friendly way to present structured note data. Instead of plain tables, users can display content like books, tasks, or any tagged data as cards with properties such as images, ratings, and excerpts. It supports multiple layout presets like portrait, compact, and grid, along with mobile-friendly settings and lazy loading for better performance. Each code block can be fine-tuned with its own display settings, giving users flexibility to design card views tailored to their vault content.

[View Details](/plugins/data-cards), [Github](https://github.com/Sophokles187/data-cards)

---

### 9. [Title-Only Tab](/plugins/title-only-tab)

Released on 2025-05-07 by [tristone13th](https://github.com/tristone13th)

The **Title-only Tab** plugin customizes how note tabs are displayed by replacing the default filename with the `title` value defined in the YAML frontmatter. This is especially useful for users following a Jekyll-style workflow where the actual filename might include dates or slugs, but a cleaner, human-readable title is preferred for display. By aligning tab names with the content title, it improves readability and reduces clutter when working with multiple open tabs..

[View Details](/plugins/title-only-tab), [Github](https://github.com/tristone13th/obsidian-title-only-tab)

---

### 10. [Note Status](/plugins/note-status)

Released on 2025-05-07 by [Aleix Soler](https://github.com/devonthesofa)

The **Note Status** plugin introduces a flexible system for tracking the progress and state of your notes using customizable statuses like active, completed, or on hold. It integrates directly into the toolbar, status bar, file explorer, and a dedicated status pane, giving users multiple ways to assign, view, and manage statuses. You can batch-update files, apply multiple statuses to a single note, and organize your workflow with built-in or user-defined templates. The plugin also supports YAML frontmatter integration and deep customization.

[View Details](/plugins/note-status), [Github](https://github.com/devonthesofa/obsidian-note-status)

---

### 11. [Another Name](/plugins/another-name)

Released on 2025-05-06 by [Jiyuan Wang](https://github.com/EurFelux)

The **Another Name** plugin lets you add an alternative display name just below the inline title of a note. By defining an `another-name` attribute in the Properties section of a file, users can show an additional label under the main title. The attribute key is configurable in the plugin settings, offering some flexibility. It's a simple but thoughtful enhancement that improves the clarity and aesthetic of notes involving dual-language or alias use.

[View Details](/plugins/another-name), [Github](https://github.com/EurFelux/obsidian-another-name-plugin)

---

### 12. [LawList: Custom List Styles](/plugins/lawlist)

Released on 2025-05-06 by [Willem Schlieter](https://github.com/willem-schlieter)

The **LawList: Custom List Styles** plugin enhances the appearance of ordered lists by allowing users to customize numbering formats for up to 10 indentation levels. It supports various list styles such as Roman numerals, uppercase or lowercase letters, and even patterns like (1) or i). Users can set global styles through plugin settings or apply inline custom styles to specific items using curly braces. Importantly, the plugin only changes how lists are displayed-it doesn't alter the underlying Markdown. This is especially useful for users who need structured formatting, such as those working in academic, legal, or documentation-heavy contexts.

[View Details](/plugins/lawlist), [Github](https://github.com/willem-schlieter/lawlist)

---

### 13. [Water Tracker](/plugins/water-tracker)

Released on 2025-05-06 by [Luigi Cerone](https://github.com/LuigiCerone)

The **Water Tracker** plugin helps you monitor your daily water intake by logging each drinking event directly from a command or ribbon icon. You can customise the volume of your drinking container and choose where the data gets saved - either as a property or a timestamped log in the current or daily note. This gives users flexibility in how they record and summarise hydration habits. The plugin keeps the original note format intact and works well with Dataview for generating daily summaries.

[View Details](/plugins/water-tracker), [Github](https://github.com/LuigiCerone/obsidian-water-tracker)

---

### 14. [Reactive Notes](/plugins/reactive-notes)

Released on 2025-05-06 by [Elias Noesis](https://github.com/prodigist)

The **ReactiveNotes** plugin lets you embed interactive React components directly into your notes, transforming them into dynamic and programmable documents. It supports full React 18 features including hooks, state management, lifecycle handling, and integration with Obsidian's file system and theme. Users can persist state in frontmatter, render charts with libraries like Recharts or Lightweight Charts, manipulate canvas elements, and even import libraries from CDN. Each note can maintain its own independent state, enabling reusable component templates. This plugin is ideal for developers, data analysts, and tinkerers looking to combine note-taking with interactivity, custom tooling, or rich visualizations.

[View Details](/plugins/reactive-notes), [Github](https://github.com/prodigist/ReactiveNotes)

---

### 15. [Draw Steel Retainer](/plugins/draw-steel-retainer)

Released on 2025-05-06 by [Martin Dampier](https://github.com/MartinDampier)

The **Draw Steel Retainer** plugin adds a dedicated initiative tracker tailored for managing combat encounters in the TTRPG Draw Steel by MCDM. It provides a scroll ribbon button that opens a special tracker view, allowing the DM to manage two separate initiative tables in line with Draw Steel mechanics. The plugin also supports automatic inclusion of predefined player characters into new trackers, simplifying session prep. While currently focused on combat tracking, the roadmap hints at future support for negotiation, montage tests, and class-based utilities, making it a helpful tool for GMs running immersive campaigns.

[View Details](/plugins/draw-steel-retainer), [Github](https://github.com/MartinDampier/draw-steel-retainer)

---

### 16. [VCF Contacts](/plugins/vcf-contacts)

Released on 2025-05-06 by [Roland Broekema](https://github.com/broekema41)

The **VCF Contacts** plugin enables you to manage and organize contact information directly within your vault, using structured vCard (VCF) fields. You can import or export `.vcf` files, add avatars, and maintain detailed records for each contact-like phone numbers, emails, birthdays, addresses, and social profiles. Each contact is stored as a markdown file, making it easy to link notes and use existing Obsidian workflows. Features like click-to-call, quick copy, and avatar processing add convenience, while Quick Switcher support ensures fast navigation. Ideal for users who want to integrate personal or professional networks into their knowledge management system.

[View Details](/plugins/vcf-contacts), [Github](https://github.com/broekema41/obsidian-vcf-contacts)

---

### 17. [Rainbow-Colored Sidebar](/plugins/rainbow-colored-sidebar)

Released on 2025-05-06 by [Kevin Woblick](https://github.com/Kovah)

The **Rainbow-Colored Sidebar** plugin adds automatic, theme-based colouring to your vault's sidebar folders and files without needing any CSS tweaks or file naming conventions. It supports nine color schemes, including rainbow-based gradients, blue-themed palettes, random mixes, and an accessibility-friendly mode with higher contrast. Colours are applied based on A-Z folder order and cycle infinitely, making it suitable for vaults with many folders. Active files are visually marked, and users can easily switch themes or enable contrast options from the settings. It's a simple yet aesthetic enhancement for users who want visual clarity and customisation in their workspace.

[View Details](/plugins/rainbow-colored-sidebar), [Github](https://github.com/Kovah/obsidian-rainbow-colored-sidebar)

---

### 18. [Limitless Lifelogs](/plugins/limitless-lifelogs)

Released on 2025-05-06 by [Maclean Dunkin](https://github.com/Maclean-D)

The **Limitless Lifelogs** plugin allows you to sync your lifelog entries from Limitless AI directly into your vault as well-organized markdown files. Entries are saved with date-based filenames and preserve original formatting, including headings, timestamps, and speaker tags. The plugin supports incremental syncing, so only new or updated logs are pulled in each time you sync. You can set a custom folder and initial sync date, and trigger updates either via the ribbon icon or command palette. This is especially useful for users who use Limitless AI for journaling, tracking conversations, or recording personal insights and want seamless integration with their notes.

[View Details](/plugins/limitless-lifelogs), [Github](https://github.com/Maclean-D/obsidian-limitless-lifelogs)

---

### 19. [YTSummarizer](/plugins/yt-summarizer)

Released on 2025-05-06 by [Arda Kalaycı](https://github.com/ardakalayci)

The **YTSummarizer** plugin helps you bring YouTube content into your vault by fetching video transcripts and generating AI-powered summaries using OpenAI models. You can view transcripts in a sidebar or save them as full notes, complete with clickable timestamps for easy navigation. The plugin supports custom prompts, multilingual transcripts, and configurable timestamp intervals. It's especially useful for researchers, students, or content consumers who want to capture and summarise key ideas from videos without watching them in full. All summaries are generated locally with your own OpenAI API key, giving you flexibility and control over the output.

[View Details](/plugins/yt-summarizer), [Github](https://github.com/ardakalayci/ytsummarizer)

---

### 20. [Textfresser](/plugins/cbcr-text-eater-de)

Released on 2025-05-06 by [clockblocker](https://github.com/clockblocker)

The **Textfresser** plugin helps German language learners build a structured vocabulary network by transforming any selected word into a detailed dictionary entry within your vault. It detects if a word is in its normal form and either generates a new entry or links it to the root form. Each word entry includes pronunciation, translation, conjugation or declension tables, and links to related grammatical or semantic variants. The plugin also supports automatic backlinking, helping you navigate between word forms like reisen, gereist, and reisender. Designed for deep linguistic exploration, it works best in a dedicated vault due to the large number of files it generates.

[View Details](/plugins/cbcr-text-eater-de), [Github](https://github.com/clockblocker/filler-de)

---

### 21. [aDHL](/plugins/another-dynamic-highlights)

Released on 2025-05-06 by [tine-schreibt](https://github.com/tine-schreibt)

The **Another Dynamic Highlights** plugin offers a powerful and highly customizable way to highlight text dynamically using user-defined search terms, regular expressions, and styles. You can group highlighters with tags, assign colors and decorations, and control whether matches or their parent lines are highlighted. Highlights persist across sessions and can be toggled globally or per tag. The plugin also supports selection-based highlighting, where words under the cursor or selected text are highlighted on the fly with a delay option and an ignore list for common words.

[View Details](/plugins/another-dynamic-highlights), [Github](https://github.com/tine-schreibt/aDHL)

---

## 🅱️Beta Plugins

Some of the cool plugins that are in beta (accessible via [BRAT](https://github.com/TfTHacker/obsidian42-brat)) are

- [Python Bridge](https://github.com/mathe00/obsidian-plugin-python-bridge) - Develop Obsidian plugins in Python
- [DayFrame](https://github.com/ganesshkumar/obsidian-dayframe) - like a picture frame but for your daily notes.
- [Layout Manager](https://github.com/ShadiestGoat/obsidian-layout-manager) - An obsidian plugn that manages the layouts of your leaves

---

## 🔁 Plugin Updates

We got 79 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

Notable Updates

- Task Genius v8.6.0 - [Changelog](https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/8.6.0)
- Task Board v1.4.0 - [Changelog](https://github.com/tu2-atmanand/Task-Board/releases/tag/1.4.0)
- Dynamic Outline v1.19.0 - [Changelog](https://github.com/theopavlove/obsidian-dynamic-outline/releases/tag/1.19.0)
- Easy Copy v1.2.2 - [Changelog](https://github.com/Moyf/easy-copy/releases/tag/1.2.2)
- Advanced Canvas v5.0.0 - [Changelog](https://github.com/Developer-Mike/obsidian-advanced-canvas/releases/tag/5.0.0)

---

## 🎨 Themes

We got 6 new themes added during last week.

- Hojicha - Obsidian port of neomodern's hojicha theme - [Github](https://github.com/pr0methevs/Hojicha)
- Quillcode - An Obsidian theme for both writers and coders, for the storytellers and for the logical builders - [Github](https://github.com/theaayushpatel/quillcode)
- Myst - Myst theme for Obsidian (IntelliJ color schemes) - [Github](https://github.com/mulder3062/Myst)
- Soli Deo Gloria - inspiration is from old German bibles and Gothic Style of calligraphy - [Github](https://github.com/GodlyMan-bit/SoliDeoGloria)
- RetroOS 98 - Experience the Windows 95/98 in Obisidian MD - [Github](https://github.com/ThePharaohArt/Obsidian-RetroOS98)
- Ribbons Theme - Allows separating special Callouts in Ribbons. - [Github](https://github.com/ddspog/obsidian-ribbons-theme)
