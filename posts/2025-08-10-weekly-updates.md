---
title: Obsidian Plugin Updates 2025-08-03 to 2025-08-09
description: "From 2025-08-03 to 2025-08-09 there are 12 newly released plugins, 4 new themes released and 100 plugin updates"
excerpt: There are 12 new plugins, 4 new themes, and 100 plugin updates during the week 2025-08-02 to 2025-08-09.
publishedDate: "2025-08-10"
modifiedDate: "2025-08-10"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 12 new plugins, 4 new themes, and 100 plugin updates during the week 2025-08-02 to 2025-08-09.

This past week brought in a strong lineup of plugins that hit both the productivity and creativity sides of our Obsidian workflow. Handwriting OCR steps in for anyone with stacks of handwritten notes, turning them into clean, searchable text in seconds. Linked Note Exporter feels like that reliable teammate who packs every linked note and attachment neatly before sharing. LLM Shortcut and Mini-RAG add serious AI muscle right inside your vault, while Custom Slides and Sortable Tables keep presentations and data viewing smooth. And with Private AI guarding your conversations on-device, it's been a week of powerful upgrades without compromising privacy.

## ⭐ New Plugins

### 1. [Handwriting OCR](/plugins/handwriting-ocr)

Released on 2025-08-09 by [ikmolbo](https://github.com/ikmolbo)

The **Handwriting OCR** plugin converts handwritten or printed content from images and PDFs into editable text using HandwritingOCR's AI-powered recognition service. It supports a wide range of image formats, multi-page PDFs, and files up to 20MB, making it suitable for digitising notes, archival documents, or scanned material. Extracted text can be copied to the clipboard, appended to an existing note, or saved as a new note, with options accessible via the command palette or right-click menus in both the editor and file explorer. The plugin requires an API key from HandwritingOCR, validates it within the settings, and displays your remaining credits.

[View Details](/plugins/handwriting-ocr), [Github](https://github.com/ikmolbo/handwriting-ocr-obsidian-plugin)

---

### 2. [Linked Note Exporter](/plugins/linked-note-exporter)

Released on 2025-08-09 by [the-c0d3r](https://github.com/the-c0d3r)

The **Linked Note Exporter** plugin lets you export a note as a complete, self-contained package along with all its linked notes and attachments. You can specify how many levels of linked notes to include, choose whether to keep the original folder structure, and optionally compress the export into a zip file. Filters allow excluding certain folders or tags, making it easy to avoid sharing private or irrelevant content. Internal links are automatically updated so the exported copy works seamlessly outside your vault. The export can be triggered from the right-click context menu or via the command palette, providing a fast and organised way to share rich, interconnected notes without broken links or missing files.

[View Details](/plugins/linked-note-exporter), [Github](https://github.com/the-c0d3r/obsidian-linked-note-exporter)

---

### 3. [umbPublisher](/plugins/umbpublisher)

Released on 2025-08-09 by [Owain Williams](https://github.com/owainwilliams)

The **umbPublisher** plugin enables direct publishing of your notes to an Umbraco 15+ CMS instance as content items. It streamlines the process of transferring written material from your vault to a live site, removing the need for manual copy-paste or external export tools. This can be useful for content editors, developers, or teams who maintain documentation, articles, or structured content in Markdown but want to manage and display it through Umbraco. By integrating your note - taking and content management workflows, it helps maintain consistency between your local drafts and the published site.

[View Details](/plugins/umbpublisher), [Github](https://github.com/owainwilliams/umbpublisher)

---

### 4. [Sortable Tables](/plugins/sortable-tables)

Released on 2025-08-09 by [filippov112](https://github.com/filippov112)

The **Sortable Tables** plugin enhances table usability by allowing sorting directly in preview mode without altering the underlying note content. Clicking on a column header toggles between ascending and descending order, and multiple levels of sorting can be applied by holding Shift while selecting additional columns. This makes it easy to reorganise and view data in different ways on the fly, all while keeping the original markdown table intact.

[View Details](/plugins/sortable-tables), [Github](https://github.com/filippov112/obsidian-sortable-tables)

---

### 5. [Bibtex Entry View](/plugins/bibtex-entry-view)

Released on 2025-08-09 by [Kyoungdeuk](https://github.com/awfrok)

The **Bibtex Entry View** plugin renders formatted bibliographic entries from a `.bib` file directly in your notes by replacing `bibkey` code blocks with detailed reference information. It detects the matching entry, displaying the citation key, author or editor names, and other fields in a customisable order defined in the settings. If the key is not found, it highlights the block in red with a strike-through to signal an invalid reference. While typing a `bibkey`, the plugin suggests matches based on partial keyword searches of selected fields, improving speed and accuracy when adding citations. Users can select or import a `.bib` file into their vault, set preferred display fields, and have the plugin sort and present them neatly.

[View Details](/plugins/bibtex-entry-view), [Github](https://github.com/awfrok/obsidian-plugin-bibtex-entry-view)

---

### 6. [Clipboard Manager](/plugins/clipboard-manager)

Released on 2025-08-09 by [Ayush Raj](https://github.com/ayu5h-raj)

The **Clipboard Manager** plugin captures and organises your clipboard history automatically while Obsidian is running, offering fast retrieval of text snippets, code blocks, and other frequently reused content. It stores entries persistently across sessions, supports configurable history limits, and allows instant search through both content and previews. A quick paste modal with hotkey support enables direct insertion into notes, while export tools save selected or all entries as properly formatted Markdown in a chosen folder. You can adjust monitoring intervals, enable notifications, and preview long text for easier identification. All data stays local in your vault with no external transmission, and the plugin is optimised for desktop use on macOS, Windows, and Linux.

[View Details](/plugins/clipboard-manager), [Github](https://github.com/ayu5h-raj/clipboard-manager)

---

### 7. [LLM Shortcut](/plugins/llm-shortcut)

Released on 2025-08-09 by [Viktor Chernodub](https://github.com/chernodub)

The **LLM Shortcut** plugin streamlines prompt management by converting a folder of saved prompts into instantly accessible commands. Each file in the prompt directory becomes a command that can be triggered directly, with the current open note automatically passed as context to the chosen LLM provider. It supports any OpenAI -compatible API, giving flexibility in selecting your AI backend while keeping all activity local without external logging. The tree-like folder structure is preserved as a navigable list, making it easy to organize and access prompts for different use cases.

[View Details](/plugins/llm-shortcut), [Github](https://github.com/chernodub/obsidian-llm-shortcut)

---

### 8. [Mini-RAG](/plugins/mini-rag)

Released on 2025-08-08 by [John Wheatley](https://github.com/jjwheatley)

The **Mini-RAG** plugin enables local retrieval augmented generation by connecting your notes to a locally running LLM through Ollama. You can start a chat in the context of a specific note or folder, allowing the model to reference only relevant content when generating responses. It supports any Ollama-installed model and provides controls for model selection, temperature adjustment, and even context-free chatting when you want unconstrained responses. Interactions can be initiated directly from right-click menus in the editor or sidebar, and conversations can be saved for later reference.

[View Details](/plugins/mini-rag), [Github](https://github.com/jjwheatley/mini-rag)

---

### 9. [Scrolls To Nav Top](/plugins/scroll-to-nav-top)

Released on 2025-08-08 by [mario](https://github.com/mariomui)

The **Scroll To Nav Top** plugin adds a simple but useful command to instantly jump to the top of the file explorer. It is designed for users who navigate without relying on folder structures and may find themselves deep within nested files. Instead of manually scrolling through hundreds of items, you can trigger a command from the palette or use a toolbar button to return to the starting point of your navigation pane.

[View Details](/plugins/scroll-to-nav-top), [Github](https://github.com/mariomui/scroll-to-nav-top)

---

### 10. [Custom Slides](/plugins/custom-slides)

Released on 2025-08-08 by [David V. Kimball](https://github.com/davidvkimball)

The **Custom Slides** plugin extends the functionality of the core Slides feature by offering more control over the presentation experience. It lets you toggle the visibility of navigation arrows to reduce on-screen distractions and adjust the progress bar height for better visual balance. Lists in presentation mode can be left-aligned for improved readability, maintaining proper spacing for both bulleted and numbered items. The plugin also streamlines navigation by automatically enabling keyboard input when entering Slides mode, so you can use the spacebar and arrow keys immediately without clicking the presentation window. When you exit, it restores your previous editing mode, keeping your workflow intact.

[View Details](/plugins/custom-slides), [Github](https://github.com/davidvkimball/obsidian-custom-slides)

---

### 11. [Private AI](/plugins/private-ai)

Released on 2025-08-08 by [GB](https://github.com/gabosgab)

The **Private AI Chat** plugin enables secure, local AI-powered conversations with your notes using a privacy-first approach. It connects to a locally running LM Studio server, ensuring that all processing happens on your own device without sending data to external services. You can query your vault naturally, with the plugin automatically searching relevant notes and citing them in responses. It allows narrowing the AI's focus to specific open notes for targeted insights and supports performance tuning through adjustable models, search parameters, and token limits. Cross-platform compatibility for Mac and Windows makes it widely accessible, while easy setup and model swapping simplify usage.

[View Details](/plugins/private-ai), [Github](https://github.com/gabosgab/ObsidianPrivateAI)

---

### 12. [Quick Emoji](/plugins/quick-emoji)

Released on 2025-08-03 by [Alec Sibilia](https://github.com/asibilia)

The **Quick Emoji** plugin adds an instant emoji picker right into your editor, making it easy to add personality to notes without breaking your flow. Typing a colon triggers a responsive search bar that suggests emojis by name or description, with results updating smoothly thanks to debounced searching and lazy loading. It keeps a history of your most used emojis for quick reuse and even lets you pick a default skin tone for supported icons. The plugin stays lightweight by loading data only when needed, so it won't slow down your workspace.

[View Details](/plugins/quick-emoji), [Github](https://github.com/asibilia/obsidian-quick-emoji)

---

## 🔁 Plugin Updates

We got 100 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **TaskNotes** - v3.17.0 - [Changelog](https://github.com/callumalpass/tasknotes/blob/main/docs/releases/3.17.0.md)
- **Pretty Properties** - v1.4.4 - [Changelog](https://discord.com/channels/686053708261228577/855181471643861002/1402025096784384210)
 - Quick Add** - v2.0.0 - [Changelog](https://github.com/chhoumann/quickadd/releases/tag/2.0.0)

---

## 🎨 New Themes

- **Baseline** -  sleek, familiar, and effortlessly minimal, offering endless ways to make it yours - [Github](https://github.com/aaaaalexis/obsidian-baseline)
- **Azure** - no-frills Obsidian theme designed for long writing sessions - [Github](https://github.com/annagracedev/obsidian-azure)
- **Noctis** - dark theme for Obsidian inspired by the night sky - [Github](https://github.com/konnta0/obsidian-noctis-theme)
- **Matric** - a neon-green, cyberpunk Matrix-inspired theme for Obsidian - [Github](https://github.com/dubefab/Matrix)

---
