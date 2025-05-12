---
title: Obsidian Plugin Updates 2025-02-09 to 2025-02-15
description: 'new obsidian plugins from 2025-02-09 to 2025-02-15 - Media Companion, New Note Fixer, Data Files Editor, Spacekeys, Tag Tactician, InlineAI, WhatsApp export note, YouTube Video Summarizer, Plugin REPL, NetClip, Context Command Hider, WhatsApp backup importer, Hephaistos Importer, Clone Vault, Image Preview on Icon Hover, Dataview Autocompletion, Kikijiki Habit Tracker, Plugin Update Locker, AI Revisionist, BibDesk Integration'
excerpt: There are 20 new plugins and 85 plugin updates in the last one week's time.
publishedDate: '2025-02-16'
modifiedDate: '2025-02-16'
tags:
  - weekly-plugin-updates
---

![Weekly Updates](/images/2025-01-12-weekly-plugin-updates.webp)

> There are 20 new plugins and 85 plugin updates in the last one week's time.

After a week of rest, the Obsidian plugin ecosystem is back in action with 20 brand-new plugins! Last week saw no fresh additions, but this week makes up for it with a wave of innovative tools designed to enhance note-taking, automation, media management, and even AI-powered assistance. Whether you're looking to streamline workflows, improve organization, or experiment with new features, there’s plenty to explore. Let’s dive into this week’s latest arrivals!

## ⭐ New Plugins: We have 20 new plugins.

### 1. [Media Companion](/plugins/media-companion)

Released on 2025-02-13 by [Nick de Bruin](https://github.com/Nick-de-Bruin)

The **Media Companion** plugin enhances media file management in Obsidian by automatically generating sidecar files for each media file. These sidecar files enable users to add notes, tags, and metadata, making it easier to organize and retrieve media content. The plugin also includes a gallery view, allowing users to visually browse their media collection. Advanced search features enable filtering by folders, tags, file types, and even colors without relying on AI. Future updates aim to expand file compatibility to video, audio, and 3D objects while improving the gallery interface and metadata editing capabilities.

[View Details](/plugins/media-companion), [Github](https://github.com/Nick-de-Bruin/obsidian-media-companion)

---

### 2. [New Note Fixer](/plugins/new-note-fixer)

Released on 2025-02-13 by [mnaoumov](https://github.com/mnaoumov)

The **New Note Fixer** plugin ensures consistent behavior when creating new notes from links in Obsidian. By default, Obsidian follows a specific setting for placing new notes, but this behavior changes when links include folder paths or relative paths. This can lead to unexpected note placements or even errors when trying to access notes outside the vault. The plugin resolves these inconsistencies by enforcing the configured default location for new notes, preventing errors and ensuring a predictable workflow when linking to non-existent files.

[View Details](/plugins/new-note-fixer), [Github](https://github.com/mnaoumov/obsidian-new-note-fixer)

---

### 3. [Data Files Editor](/plugins/data-files-editor)

Released on 2025-02-13 by [ZukTol](https://github.com/ZukTol)

The **Data Files Editor** plugin enables users to create and edit `.txt`, `.json`, and `.xml` files directly within Obsidian. It provides a seamless way to manage non-markdown data files, allowing customization through settings that enable or disable editing and creation for each supported file type. Users can create new data files through the file tree’s context menu, ensuring flexible file placement. While the plugin currently supports plain text and JSON with syntax highlighting, future updates aim to enhance XML editing capabilities. This tool enhances Obsidian’s functionality for users who work with structured and unstructured data files alongside their notes.

[View Details](/plugins/data-files-editor), [Github](https://github.com/ZukTol/obsidian-data-files-editor)

---

### 4. [Spacekeys](/plugins/spacekeys)

Released on 2025-02-13 by [Jared Lumpe](https://github.com/jlumpe)

The **Spacekeys** plugin enhances keyboard navigation in Obsidian by introducing a Spacemacs-inspired key sequence system. Instead of memorizing multiple complex hotkey combinations, users can activate a single leader key, followed by intuitive key sequences to execute commands. The plugin organizes commands into logical groups, making them easier to learn and remember. A pop-up menu helps users discover available key sequences dynamically. Spacekeys is fully customizable, allowing users to define their own key mappings, integrate commands from other plugins, and extend or modify the default keymap using a YAML configuration file. It improves workflow efficiency by offering a structured and scalable approach to keyboard shortcuts.

[View Details](/plugins/spacekeys), [Github](https://github.com/jlumpe/obsidian-spacekeys)

---

### 5. [Tag Tactician](/plugins/tag-tactician)

Released on 2025-02-13 by [Scott Tomaszewski](https://github.com/scottTomaszewski)

The **Tag Tactician** plugin simplifies bulk editing of frontmatter tags in Obsidian, allowing users to add or remove tags across multiple notes simultaneously. It provides a preview of changes before applying them and offers selective updates to ensure precise tag management. The plugin also features a Related Notes view, which helps users find notes with similar tags, titles, or paths based on customizable weighting. Additionally, it includes a Tag Navigation sidebar that organizes notes using a hierarchical tag structure, functioning as an alternative to traditional folders. With options for customizing tag formats and filtering related notes, this plugin enhances tag-based organization and discovery within Obsidian.

[View Details](/plugins/tag-tactician), [Github](https://github.com/scottTomaszewski/obsidian-tag-tactician)

---

### 6. [InlineAI](/plugins/inlineai)

Released on 2025-02-13 by [FBarrca](https://github.com/FBarrca)

The **InlineAI** plugin integrates AI-powered writing assistance directly into Obsidian, enabling users to generate, refine, and transform text with ease. It provides context-aware suggestions, summarization, and rewriting features through customizable prompts. The plugin supports various AI models, including OpenAI and local alternatives, ensuring flexibility and privacy-conscious workflows. Users can visualize AI-generated changes with inline diff markers and accept or discard suggestions seamlessly. Hotkey-based activation allows quick interaction, making AI-assisted writing more efficient. With customizable prompts and integration with multiple AI providers, InlineAI enhances both creative and technical writing within Obsidian.

[View Details](/plugins/inlineai), [Github](https://github.com/FBarrca/obsidian-inlineAI)

---

### 7. [WhatsApp export note](/plugins/whatsapp-export-note)

Released on 2025-02-13 by [JoaoEmanuell](https://github.com/JoaoEmanuell)

The **WhatsApp export note** plugin simplifies sharing Obsidian notes on WhatsApp by converting markdown formatting into a WhatsApp-compatible text format. It preserves key text elements such as bold, italics, blockquotes, and strikethrough while adapting headings and highlights into bold text. Equations are reformatted as code, while horizontal lines, images, and unsupported links are removed to ensure compatibility. This plugin streamlines the process of transferring structured notes into WhatsApp without requiring manual reformatting, making it easier to share content seamlessly across platforms.

[View Details](/plugins/whatsapp-export-note), [Github](https://github.com/JoaoEmanuell/obsidian-whatsapp-export-note)

---

### 8. [YouTube Video Summarizer](/plugins/yt-video-summarizer)

Released on 2025-02-13 by [mbramani](https://github.com/mbramani)

The **YouTube Video Summarizer** plugin allows users to generate AI-powered summaries of YouTube videos directly within Obsidian. It extracts transcripts from videos and processes them using Google's Gemini AI to create structured notes. The plugin identifies key points, explains technical terms, and formats summaries with metadata for better organization. Users can generate summaries by pasting a YouTube URL in a note or using the command palette. Customization options include selecting AI models and modifying the summary prompt, making it a useful tool for capturing insights from video content efficiently.

[View Details](/plugins/yt-video-summarizer), [Github](https://github.com/mbramani/obsidian-yt-video-summarizer)

---

### 9. [Plugin REPL](/plugins/plugin-repl)

Released on 2025-02-13 by [readwithai](https://github.com/talwrii)

The **Plugin REPL** plugin enables users to execute JavaScript code directly within Obsidian, providing an interactive scripting environment for automating tasks and developing custom commands. It allows access to Obsidian’s plugin API, making it possible to manipulate files, control the editor, and create new commands without developing a full plugin. Inspired by Emacs, it includes convenience functions for interacting with the vault, executing scripts, and modifying content dynamically. Users can define persistent commands, run startup scripts, and explore Obsidian’s internal API, making it a powerful tool for developers and advanced users seeking greater automation and control over their workspace.

[View Details](/plugins/plugin-repl), [Github](https://github.com/talwrii/plugin-repl)

---

### 10. [NetClip](/plugins/net-clip)

Released on 2025-02-13 by [Elhary](https://github.com/Elhary)

The **NetClip** plugin enables users to browse the web and clip webpages directly into their Obsidian vault as Markdown files. It extracts key metadata, including the article title, author, publication date, and reading time. Clipped content can be categorized and organized into folders for better management. The plugin also features an integrated webview for browsing within Obsidian, allowing users to save pages instantly or select a category before clipping. Additional tools include search and filtering options, search suggestions, and quick-access commands to manage saved content efficiently.

[View Details](/plugins/net-clip), [Github](https://github.com/Elhary/Obsidian-NetClip)

---

### 11. [Context Command Hider](/plugins/context-command-hider)

Released on 2025-02-12 by [Mara-Li](https://github.com/mara-li)

The **Context Command Hider** plugin allows users to customize their right-click menu in Obsidian by hiding unwanted commands, including those from community plugins. Commands can be hidden by name or using regex patterns, and changes take effect immediately without requiring a restart. This applies across all context menus, such as the file explorer and note menu, ensuring a cleaner and more focused interface. Users can also apply custom styling to hidden commands if needed. The plugin enhances menu management by reducing clutter and improving workflow efficiency.

[View Details](/plugins/context-command-hider), [Github](https://github.com/mara-li/obsidian-context-menu-hider)

---

### 12. [WhatsApp backup importer](/plugins/whatsapp-backup)

Released on 2025-02-12 by [Luigi Cerone](https://github.com/LuigiCerone)

The **WhatsApp backup importer** plugin allows users to import exported WhatsApp chat archives into their Obsidian vault. It extracts messages from `.zip` files, processes attachments such as images and videos, and organizes the content into a specified folder. Imported chats are converted into Markdown files, with embedded links to media files for seamless navigation. Users can customize the destination folder within their vault, ensuring better organization of imported conversations. This plugin provides a structured way to store and access WhatsApp chat history within Obsidian for reference or documentation.

[View Details](/plugins/whatsapp-backup), [Github](https://github.com/LuigiCerone/obsidian-whatsapp-backup-importer)

---

### 13. [Hephaistos Importer](/plugins/hephaistos-importer)

Released on 2025-02-12 by [Skallaturi](https://github.com/Skallaturi)

The **Hephaistos Importer** plugin allows users to import Starfinder RPG character data from Hephaistos into Obsidian. By providing a character's public ID, the plugin creates or updates notes with structured frontmatter containing attributes such as abilities, race, and class. It preserves existing frontmatter entries and offers optional compatibility with Initiative Tracker and Fantasy Statblocks for enhanced gameplay organization. Additionally, the plugin can generate Obsidian hyperlinks for spell names and other key elements, facilitating quick navigation within a vault. Designed primarily for Game Masters, it streamlines character management within Obsidian.

[View Details](/plugins/hephaistos-importer), [Github](https://github.com/Skallaturi/hephaistos-importer)

---

### 14. [Clone Vault](/plugins/clone-vault)

Released on 2025-02-12 by [Sebastian Baroni](https://github.com/laantorchaweb)

The **Clone Vault** plugin allows users to create a duplicate of their existing Obsidian vault while preserving its settings and folder structure. It copies the `.obsidian` settings folder and enables selective duplication of specific folders, such as templates, without copying all content. Users can configure the default location for new vaults and name them through a convenient modal prompt. This plugin is useful for setting up new vaults with pre-configured settings and structures, ensuring consistency across different workspaces.

[View Details](/plugins/clone-vault), [Github](https://github.com/laantorchaweb/clone-vault)

---

### 15. [Image Preview on Icon Hover](/plugins/image-preview-on-icon-hover)

Released on 2025-02-12 by [rama1997](https://github.com/rama1997)

The **Image Preview on Icon Hover** plugin enhances the Obsidian user experience by allowing users to assign custom image previews to various interface icons. Users can configure images for icons such as the vault switcher, settings, help, sidebar toggles, ribbon bar, and status bar. The plugin provides interactive management options, enabling users to add, remove, and customize icons with ease. Image paths can be set using relative links from the vault, ensuring seamless integration. This tool offers a visually enriched UI experience by adding dynamic image previews to key interface elements.

[View Details](/plugins/image-preview-on-icon-hover), [Github](https://github.com/rama1997/Image-Preview-On-Icon-Hover)

---

### 16. [Dataview Autocompletion](/plugins/dataview-autocompletion)

Released on 2025-02-12 by [Daniel Bauer](https://github.com/dnlbauer)

The **Dataview Autocompletion** plugin enhances the Dataview experience in Obsidian by providing real-time autocomplete suggestions for metadata fields. This feature helps users quickly reference existing fields, reducing typing errors and improving consistency across notes. Users can customize ignored fields and files to refine the suggestion list, making the workflow more efficient. By streamlining metadata input, the plugin supports better organization and data retrieval within Obsidian.

[View Details](/plugins/dataview-autocompletion), [Github](https://github.com/dnlbauer/obsidian-dataview-autocompletion)

---

### 17. [Kikijiki Habit Tracker](/plugins/kikijiki-habit-tracker)

Released on 2025-02-12 by [KIKIJIKI](https://github.com/kikijiki)

The **Kikijiki Habit Tracker** plugin helps users track their daily habits within Obsidian. Users can configure custom habits, each represented as a tag in their notes. The plugin includes a habit panel that can be placed anywhere in the workspace for easy access. By integrating habit tracking directly into the note-taking workflow, it allows users to monitor their progress without switching to external tools. The plugin is designed for both desktop and mobile use, making it a convenient solution for tracking personal goals and routines.

[View Details](/plugins/kikijiki-habit-tracker), [Github](https://github.com/kikijiki/obsidian-habit-tracker)

---

### 18. [Plugin Update Locker](/plugins/plugin-update-locker)

Released on 2025-02-12 by [Lemon695](https://github.com/Lemon695)

The **Plugin Update Locker** plugin allows users to prevent specified plugins in Obsidian from updating, ensuring they remain on a stable version. This helps avoid compatibility issues or unwanted feature changes caused by updates. The plugin achieves this by modifying the version number in the plugin’s `manifest.json` file, bypassing Obsidian's update detection. Users can lock or unlock updates for individual plugins through a configuration page, enabling greater control over their plugin versions. This is particularly useful for users who rely on specific plugin functionalities and want to delay updates until stability is confirmed.

[View Details](/plugins/plugin-update-locker), [Github](https://github.com/Lemon695/obsidian-plugin-update-locker)

---

### 19. [AI Revisionist](/plugins/revisionist)

Released on 2025-02-12 by [Synaptic Labs](https://github.com/ProfSynapse)

The **AI Revisionist** plugin enhances writing in Obsidian by providing AI-powered text revision. Users can highlight text and request refinements with a single click, using customizable instructions to tailor revisions to their needs. The plugin integrates seamlessly with the ribbon, command palette, and context menu for quick access. It offers word count guidance to optimize AI performance and provides error notifications for incorrect inputs. Users can configure settings such as AI provider, temperature, and model preferences. This tool helps streamline editing by making text clearer, more concise, and polished based on user-defined goals.

[View Details](/plugins/revisionist), [Github](https://github.com/ProfSynapse/obsidian-revisionist)

---

### 20. [BibDesk Integration](/plugins/bibdesk-integration)

Released on 2025-02-12 by [Andrea Alberti](https://github.com/alberti42)

The **BibDesk Integration** plugin connects Obsidian with the macOS BibDesk application, allowing users to manage and open PDFs linked to BibTeX entries. It works with external BibTeX files and uses BibDesk’s macOS bookmark system, ensuring seamless file access even if files are moved or renamed. The plugin features an optimized BibTeX parser designed for speed and efficiency, processing data on a separate thread to minimize performance impact. It integrates with the PDF++ plugin, enabling users to open PDFs stored outside their vault. The plugin also provides a fuzzy search modal for selecting papers and supports large external libraries without requiring them to be stored in the Obsidian vault.

[View Details](/plugins/bibdesk-integration), [Github](https://github.com/alberti42/obsidian-bibdesk-integration)

---

## 🔁 Plugin Updates

We got 85 plugin updates in the last one week’s time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).
