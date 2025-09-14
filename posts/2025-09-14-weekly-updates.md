---
title: Obsidian Plugin Updates 2025-09-07 to 2025-09-13
description: "From 2025-09-07 to 2025-09-13 there are 17 newly released plugins, 4 new themes, and 67 plugin updates. Also, 10 plugins and 3 themes got removed."
excerpt: There are 17 new plugins, 4 new themes and 67 plugin updates during the week 2025-09-07 to 2025-09-13. Also, 10 plugins and 3 themes got removed.
publishedDate: "2025-09-14"
modifiedDate: "2025-09-14"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 17 new plugins, 4 new themes and 67 plugin updates during the week 2025-09-07 to 2025-09-13. Also, 10 plugins and 3 themes got removed.

Obsidian's new **Bases** feature lets you treat your notes like a structured database - filter, sort and organize properties with ease. To kick things off, I've put together an _**experimental list of plugins and themes that already support Bases**_, along with the versions where support was added. This is just a starting point and I'd love your help in making it more complete. If you know of any plugins or themes with Bases support that aren't listed yet, please let me know so I can add them. Check it out here: [obsidianstats.com/bases-support](https://www.obsidianstats.com/bases-support).

The week was buzzing with fresh energy in the Obsidian world-seventeen brand new plugins landed, alongside four fresh themes and a wave of sixty-seven updates. From smarter linking workflows to AI-powered note assistance, the new releases cover both practical enhancements and experimental ideas. It wasn't just about arrivals though. Ten plugins and three themes bid farewell - reminding us that the ecosystem is always evolving.

## ⭐ New Plugins

### 1. [URL Formatter](/plugins/url-formatter)

Released on 2025-09-12 by [Thomas Snoeck](https://github.com/thomassnoeck)

The **URL Formatter** plugin automatically converts long or complex URLs into neat, human readable Markdown links as soon as you paste them into a note. By defining your own regex patterns and output formats, you can turn cluttered links from tools like Jira, company documentation or blogs into concise references that highlight only the meaningful parts, such as ticket IDs or article slugs. This keeps your notes cleaner, improves readability and saves you from repeatedly reformatting links manually. The flexibility to apply different formatting rules for different sites means you can tailor it to your exact workflow, whether you're managing projects, documenting processes or curating reading lists.

[View Details](/plugins/url-formatter), [Github](https://github.com/thomassnoeck/url-formatter-obsidian)

---

### 2. [QuickLink](/plugins/quicklink)

Released on 2025-09-12 by [Jamba Hailar](https://github.com/Jamailar)

The **QuickLink** plugin enhances linking workflows by introducing intelligent file suggestions, automatic scans and customizable completion rules. By default, typing `@` triggers a global search with the option to exclude specific folders, while custom rules allow different trigger symbols, folder scopes, regex patterns and tag based filtering. You can designate main folders to restrict where scans and completions apply, helping keep results focused and tidy. An auto scan feature can parse the current document and replace matching words with links, supporting both standard wikilinks and advanced URI formats tied to frontmatter fields like `uid`. Tags and folder paths have autocomplete support and multiple triggers can be defined to create structured links for people, places or other categories.

[View Details](/plugins/quicklink), [Github](https://github.com/Jamailar/QuickLink-Obsidian)

---

### 3. [HTTP Link Maker](/plugins/http-link-maker)

Released on 2025-09-12 by [Kenneth Christensen](https://github.com/kennethac)

The **Obsidian HTTP Link** plugin solves the problem of sharing vault links across devices and platforms that do not support the native `obsidian://` scheme. Instead of generating app specific links that sometimes fail to open, it creates standard `https://` links that are recognised universally as clickable links. These links redirect properly to your vault and file as long as the recipient already has access to that vault, without exposing any sensitive information. By default, the plugin uses a lightweight, Cloudflare hosted redirect service with no analytics or tracking but you can also deploy your own instance for complete control.

[View Details](/plugins/http-link-maker), [Github](https://github.com/kennethac/obsidian-http-links-plugin)

---

### 4. [Note Codes](/plugins/note-codes)

Released on 2025-09-12 by [Ezhik](https://github.com/SilverEzhik)

The **Note Codes** plugin assigns unique 4 character codes to every note in our vault, making it easy to reference and retrieve notes quickly. These codes appear in the status bar on desktop and in the metadata sidebar on mobile devices and can be clicked or right clicked for actions like searching, copying or generating an obsidian:// URL for the note. A built in search function lets you find notes directly by their code using a quick switcher, while command palette actions extend this workflow with one click copying of codes or code URLs. The codes are derived from the note's path using a hashing scheme, ensuring consistency and uniqueness across your vault.

[View Details](/plugins/note-codes), [Github](https://github.com/SilverEzhik/obsidian-note-codes)

---

### 5. [Tab File Path](/plugins/tab-file-path)

Released on 2025-09-12 by [John Burnett](https://github.com/johnburnett)

The **Tab File Path** plugin enhances navigation by displaying the full vault relative path of each note directly in its tab. Instead of seeing just the filename, you get clear context on where the file resides within your folder structure. This is particularly useful for users managing large vaults with similarly named notes spread across different folders, as it reduces confusion and improves orientation. With this added clarity, you can quickly distinguish between files without hovering or opening them, making multitasking smoother and file management more efficient.

[View Details](/plugins/tab-file-path), [Github](https://github.com/johnburnett/obsidian-tab-file-path)

---

### 6. [NotePix](/plugins/notepix)

Released on 2025-09-12 by [Ayush Parkara](https://github.com/AyushParkara)

The **NotePix** plugin automates the process of handling images inside your notes by uploading them directly to a GitHub repository. When you paste or drag an image into a note, it is instantly uploaded and the local link is replaced with either a fast CDN hosted URL for public repos or a secure internal link for private ones. This keeps your vault lightweight while ensuring your images remain accessible anywhere. It supports both desktop and mobile, provides AES-GCM encryption for your GitHub Personal Access Token and allows you to configure repository details, branches and folder paths. In private mode, images are displayed seamlessly in Reading View through secure token based fetching.

[View Details](/plugins/notepix), [Github](https://github.com/AyushParkara/NotePix)

---

### 7. [The Spirit's Book](/plugins/spirits-book)

Released on 2025-09-12 by [Antonio Henrique](https://github.com/ahlrodrigues)

The **The Spirit's Book** plugin allows you to study and explore Allan Kardec's foundational work of Spiritism directly inside your notes. It provides structured access to the book's parts, chapters and over a thousand questions with answers, enabling quick navigation and in depth study. You can search by keyword or question number, mark passages as favourites for later reference and even pull a random question for daily reflection. The plugin supports multiple languages including Portuguese, English, Spanish and French making it suitable for a wide audience. It is designed specifically for desktop use and is not compatible with mobile devices due to technical constraints.

[View Details](/plugins/spirits-book), [Github](https://github.com/ahlrodrigues/spirits-book)

---

### 8. [Always Color Text](/plugins/always-color-text)

Released on 2025-09-12 by [Kazi Aidah Haque](https://github.com/Kazi-Aidah)

The **Note Minimap** plugin brings a compact overview of your entire note directly into the editor pane, inspired by the minimap feature in modern code editors. It generates a scaled-down live view that updates automatically as you scroll or edit, making it easier to navigate long Markdown files with spatial awareness. A draggable slider inside the minimap allows instant scrolling to any part of the note, while a toggle button in the note header gives per note control over its visibility. The minimap adapts to both light and dark themes, resizes with the editor pane, and provides smooth realtime updates. This makes it especially helpful for writers, coders or researchers working with lengthy documents who want a quick sense of structure without losing their place.

[View Details](/plugins/always-color-text), [Github](https://github.com/Kazi-Aidah/always-color-text)

---

### 9. [Note Minimap](/plugins/minimap)

Released on 2025-09-12 by [Yair Segel](https://github.com/YairSegel)

The **Note Minimap** plugin brings a compact overview of your entire note directly into the editor pane, inspired by the minimap feature in modern code editors. It generates a scaled-down live view that updates automatically as you scroll or edit, making it easier to navigate long Markdown files with spatial awareness. A draggable slider inside the minimap allows instant scrolling to any part of the note, while a toggle button in the note header gives per note control over its visibility. The minimap adapts to both light and dark themes, resizes with the editor pane, and provides smooth real-time updates. This makes it especially helpful for writers, coders, or researchers working with lengthy documents who want a quick sense of structure without losing their place.

[View Details](/plugins/minimap), [Github](https://github.com/YairSegel/ObsidianMinimap)

---

### 10. [VaultAI](/plugins/vault-ai)

Released on 2025-09-12 by [Tharushka Dinujaya](https://github.com/0xneobyte)

The **VaultAI** plugin brings a Gemini-powered chatbot directly into your workspace with a sleek floating interface. It can summarize notes, generate fresh content, answer contextual questions, and even translate text into multiple languages. Using @mentions, you can reference other notes in your queries, making the AI aware of more than just the current page. Conversations are neatly organized with history, quick actions, and export options so that useful responses can be saved as new notes. The design is modern, resizable, and can switch between compact and full page views, giving flexibility based on your workflow. All chat records remain in your vault for privacy, while your Gemini API key is encrypted locally.

[View Details](/plugins/vault-ai), [Github](https://github.com/0xneobyte/VaultAI)

---

### 11. [Ghost Text](/plugins/hidden-hyperlinks)

Released on 2025-09-12 by [lawrencefeng17](https://github.com/lawrencefeng17)

The **Hidden Hyperlinks** plugin lets you conceal text behind a custom display string while keeping it instantly retrievable. By defining a hidden payload and linking it to visible text, you can click once to copy the concealed content directly to your clipboard. This is useful for managing sensitive commands, long file paths, or unwieldy URLs without cluttering your notes. The plugin also supports hover tooltips to preview hidden text, customizable delimiters for flexible syntax, and subtle notifications to confirm successful copying. Its styling adapts automatically to your theme, ensuring that hidden links blend neatly with the rest of your writing.

[View Details](/plugins/hidden-hyperlinks), [Github](https://github.com/lawrencefeng17/obsidian-hidden-hyperlinks)

---

### 12. [SafeLearn Formatter](/plugins/safelearn-formatter)

Released on 2025-09-12 by [UnterrainerInformatik](https://github.com/UnterrainerInformatik)

The **SafeLearn** plugin improves the editing experience when working with SafeLearn specific Markdown tags by adding clear visual cues. It highlights fragments that will appear incrementally in Reveal.js slides, making it easier to design step by step presentations. Permission blocks, marked for roles such as teachers or specific groups, are visually wrapped so they stand out while writing, helping authors keep track of content visibility. The plugin also enables side by side layouts for creating multicolumn slides, which is particularly useful for wide or comparative presentations. While it does not enforce permissions itself, it mirrors how SafeLearn will render content, giving authors immediate visual feedback inside their notes.

[View Details](/plugins/safelearn-formatter), [Github](https://github.com/UnterrainerInformatik/safeLearn-Obsidian-plugin)

---

### 13. [Custom Comments](/plugins/custom-comment)

Released on 2025-09-12 by [Jack Chronicle](https://github.com/jack-chronicle)

The **Custom Comments** plugin provides a flexible way to insert personalized comment markers into your notes using keyboard shortcuts. Instead of being limited to built-in HTML or Markdown comment styles, you can define your own templates with `{cursor}` as a placeholder to control where the cursor lands after insertion. The plugin supports multiple marker sets, each with its own toggle and command, allowing you to maintain different types of comment formats for different contexts. It also offers a word-only mode that quickly toggles comments for a single word at the cursor position. For advanced setups, you can reload marker commands without restarting the plugin, making it easier to experiment with multiple formats.

[View Details](/plugins/custom-comment), [Github](https://github.com/jack-chronicle/custom-comment)

---

### 14. [Papers](/plugins/papers)

Released on 2025-09-10 by [William Liang](https://github.com/willjhliang)

The **Papers** plugin simplifies the process of bringing academic research into your notes by connecting directly with the arXiv API. With a single query, you can search using either a paper title or a direct arXiv link, then generate a note populated with key details like the title, author list, publication year, and source URL. Beyond metadata, it can also fetch the corresponding PDF and embed it within the note, making both references and full texts easily accessible in one place. This allows researchers, students, or anyone exploring scientific literature to maintain a structured and well-organised collection of papers inside their vault without juggling external tools.

[View Details](/plugins/papers), [Github](https://github.com/willjhliang/obsidian-papers)

---

### 15. [Datacore](/plugins/datacore)

Released on 2025-09-09 by [Michael Brenan](https://github.com/blacksmithgu)

The **Datacore** plugin is a modern reimagining of Dataview, designed to deliver faster queries, smoother rendering, and fully interactive views. It introduces a React-based JavaScript API with stateful, flicker-free updates and a more efficient query system. Instead of static results, Datacore offers WYSIWYG table views that can be edited directly, making data handling closer to the experience of tools like Notion or Airtable. It also enhances task management with richer metadata handling, enables live editing of values, and supports embeds for Markdown, images, and videos within views. Another standout feature is its ability to query not just pages but also sections and blocks, including attachments and PDFs. This makes it highly flexible for users managing structured knowledge across large vaults while benefiting from a streamlined interface and improved performance.

[View Details](/plugins/datacore), [Github](https://github.com/blacksmithgu/datacore)

---

### 16. [Keyboard Formatter](/plugins/keyboard-formatter)

Released on 2025-09-09 by [Lauloque](https://github.com/Lauloque)

The **Keyboard Formatter** plugin makes it easy to present keyboard shortcuts and mouse inputs clearly in your notes. It detects common keys like Ctrl, Shift, Alt, Cmd, function keys, arrows, and even numpad inputs, then wraps them in HTML `<kbd>` tags for a clean, consistent look. Mouse buttons such as left, right, middle, and scroll wheel are also supported, turning plain text into readable symbols. Case-insensitive matching ensures keys are recognized regardless of how you type them, while single letters get automatically capitalized to highlight keystrokes.

[View Details](/plugins/keyboard-formatter), [Github](https://github.com/Lauloque/Keyboard-Formatter)

---

### 17. [Paste as file link](/plugins/paste-as-file-link)

Released on 2025-09-09 by [Matthias Büge](https://github.com/mbedded)

The **Paste as File Link** plugin simplifies the process of turning selected text into a link to another file within your vault. Instead of manually creating links with aliases, you can copy the name of a note, select any text, and paste. The plugin automatically converts the selection into either a wiki link or a markdown link, depending on your vault’s link settings. If there are multiple files with the same name, it prompts you to choose the correct one, and if the clipboard has no valid match, it simply falls back to the normal paste action.

[View Details](/plugins/paste-as-file-link), [Github](https://github.com/mbedded/obsidian-paste-file-link)

---

## 🔁 Plugin Updates

We got 67 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **Pretty properties** - v1.6.0 - [Changelog](https://github.com/anareaty/pretty-properties/releases/tag/1.6.0)
- **Task Notes** - v3.23.0 - [Changelog](https://github.com/callumalpass/tasknotes/releases/tag/3.23.0)
- **Agile Board** - v0.7.3 - [Changelog](https://github.com/a198h/agile-board/releases/tag/v0.7.3)

---

## 🫡 Plugins Removed

- Metacopy & URL - repository archived
- RSS Reader - repository archived
- DB Folder - repository archived
- MathLinks - repository archived
- Frontmatter Links - repository archived
- Kindle CSV Converter - repositor deleted
- Studier - repository deleted
- Post Medium Draft - repository archived
- Emera - repository archived
- Reference Link Render - repository archived

---

## 🎨 New Themes

- **Vesnea** - based on Seavalanche's Project Sea Web theme colors - [Github](https://github.com/seavalanche/vesnea-obsidian-theme)
- **Retroma** - blends nostalgic, classic design with an intelligent color scheme algorithm. - [Github](https://github.com/emarpiee/Retroma)
- **Noctilux** - dark minimalist theme - [Github](https://github.com/rastgame/obsidian-Noctilux)
- **Blood Rush** - a decorative dark theme inspired by the "Embiggen" layout for insanejournal - [Github](https://github.com/incantatem2/Obsidian-blood-rush)

---

## 🫡 Themes Removed

- Minimal-Resources - account deleted
- Simple Color - account deleted
- 🔔 Chime - Developer policies violation: Remote resources

---
