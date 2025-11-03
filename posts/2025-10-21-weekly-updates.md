---
title: Obsidian Plugin Updates 2025-10-12 to 2025-10-18
description: "From 2025-10-12 to 2025-10-18 there are 14 newly released plugins, 13 new plugins and 65 plugin updates. "
excerpt: "There are 14 new plugins, 13 new themes and 65 plugin updates during the week 2025-10-11 to 2025-10-18."
publishedDate: "2025-10-21"
modifiedDate: "2025-11-01"
bannerImage: "/images/obsidian-weekly-updates.webp"
tags: 
  - weekly-updates
---

> There are 14 new plugins, 13 new themes and 65 plugin updates during the week 2025-10-12 to 2025-10-18.

This week's update is a visual treat for theme lovers. Fourteen new plugins landed, but the spotlight clearly belongs to the thirteen fresh themes that redefine how Obsidian can look and feel. From pitch-black minimalism to soft pastels and warm vintage tones, there's something for every kind of workspace. Alongside the aesthetic upgrades, new tools like Note Navigator, Tezcat, and TODOseq add real muscle to daily workflows. It's a perfect mix of beauty and function - time to refresh your vault and make it truly your own.

## ⭐ New Plugins

### 1. [Granola Sync](/plugins/granola-sync)

Released on 2025-10-18 by [Tom Elliot](https://github.com/tomelliot)

The **Granola Sync** plugin lets you automatically import notes and transcripts from your Granola account directly into your vault. It converts content from Granola's ProseMirror JSON format into Markdown and offers flexible options for storing synced data either in dedicated folders or within a daily note structure. You can also enable links between notes and their corresponding transcripts. With support for periodic syncing, granular destination settings, and customization of sync intervals, this plugin is ideal for users relying on Granola for capturing and organizing thoughts. However, it is only compatible with **macOS** and does not work on iOS. 

[View Details](/plugins/granola-sync), [Github](https://github.com/tomelliot/obsidian-granola-sync)

---

### 2. [Tezcat](/plugins/tezcat)

Released on 2025-10-18 by [Max Margenot](https://github.com/mmargenot)

The **Tezcat** plugin brings AI-powered semantic search to your notes using local or cloud-based embedding models. Inspired by the remembrance agent concept, it surfaces related content in real time-both at the note and section level-while you write. Results can be used to insert links, inject text or jump to the source note. It supports both vector and hybrid search (combining vector similarity and full-text match) to improve relevance. Tezcat integrates best with [Ollama](https://ollama.com/download), letting you run local models privately. It also supports OpenAI embeddings for those preferring cloud-based setups. By indexing your thoughts intelligently, Tezcat enhances creative flow and contextual recall during writing. 

[View Details](/plugins/tezcat), [Github](https://github.com/mmargenot/tezcat)


---

### 3. [Chatty](/plugins/chatty)

Released on 2025-10-18 by [Sadnan Saquif](https://github.com/SSaquif)

The **Chatty** plugin adds text-to-speech capabilities to your notes by leveraging your system's built-in voices through the browser's speech synthesis API. Without relying on any external services or internet connection, it allows you to listen to selected text via a right-click menu or a configurable hotkey. It's especially useful for auditory learners or for proofreading notes by ear. Voice and language preferences can be adjusted in the plugin settings, provided your operating system has the required language packs installed. It has been tested on Windows, where new voices can be added through language settings. 

[View Details](/plugins/chatty), [Github](https://github.com/SSaquif/obsidian-chatty)


```plugin-image
description: 
url: https://github.com/SSaquif/obsidian-chatty/raw/master/images/chatty-speak-selection.png
source:github
```

---

### 4. [Local RSS](/plugins/local-rss)

Released on 2025-10-17 by [onikun94](https://github.com/onikun94)

The **Local RSS** plugin lets you pull content from your favourite RSS feeds directly into your vault as markdown files. It supports managing multiple feeds, scheduled background updates, and customising how the articles are saved using templates with variables like title, author, image, and publication date. You can also define front matter and include tags for better organisation. The plugin ensures that each feed has its own configuration, making it easier to track and archive external reading material locally. 

[View Details](/plugins/local-rss), [Github](https://github.com/onikun94/obsidian-local-rss)

---

### 5. [Adapt to Current View](/plugins/adapt-to-current-view)

Released on 2025-10-17 by [greetclammy](https://github.com/greetclammy)

The **Adapt to Current View** plugin helps visually distinguish between Reading, Live Preview, and Source views by assigning each one a unique accent colour. This subtle yet effective visual cue prevents confusion, like trying to edit while still in Reading mode or wondering why interactive elements behave unexpectedly. It works especially well with themes that prominently highlight accent colours, such as Minimal, Border, and Iridium. The plugin is purely cosmetic but improves your navigation and focus while switching between modes. 

[View Details](/plugins/adapt-to-current-view), [Github](https://github.com/greetclammy/adapt-to-current-view)


```plugin-image
description: 
url: https://private-user-images.githubusercontent.com/183069544/502802258-57bdfc56-f769-462c-accd-66ab889259c1.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjA4NTg4ODYsIm5iZiI6MTc2MDg1ODU4NiwicGF0aCI6Ii8xODMwNjk1NDQvNTAyODAyMjU4LTU3YmRmYzU2LWY3NjktNDYyYy1hY2NkLTY2YWI4ODkyNTljMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAxOVQwNzIzMDZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yYzIyZThiYTE2YWYxMWM5NmQyZGViY2RhZDI5Yjg1N2NjN2RmNGM3Y2M1NWQyOTAzYTUzZTNjYjk0ZTllOWE4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.RaoghKikQXoa3NtIQDTrNd5AxgC3YGOTDGqJNV9ZeVs
source:github
```

---

### 6. [Personal Development Plan](/plugins/personal-development-plan)

Released on 2025-10-17 by [Artem Korsakov](https://github.com/artemkorsakov)

The **Personal Development Plan** plugin offers a structured workspace for managing your long-term personal or professional growth. It organises tasks into seven clear tabs: in progress, planned, knowledge base, sources, statistics, history, and examples. This visual layout mirrors a full task lifecycle-starting from collecting ideas to executing and finally archiving them. You can set up periodic goals using built-in templates for daily to yearly intervals, ensuring steady progress through automatic task generation. The plugin also includes helpful alerts for task overload and approaching deadlines. A statistics panel tracks progress over time, giving you clarity on what's working and where you lag. 

[View Details](/plugins/personal-development-plan), [Github](https://github.com/artemkorsakov/personal-development-plan)


```plugin-image
description: 
url: https://github.com/artemkorsakov/personal-development-plan/raw/master/docs/images/main_interface.png
source:github
```

---

### 7. [Local Bible Ref](/plugins/local-bible-ref)

Released on 2025-10-17 by [Caleb Campbell](https://github.com/camelChief)

The **Local Bible Ref** plugin enables seamless offline Bible referencing by pulling passages from locally stored markdown files within your vault. Users can fetch verses, chapters, or ranges using a simple `--` prefix syntax, like `--John 1:1`, and enhance the output with format options such as `+quote`, `+paragraph`, or `+callout`. It supports multiple Bible versions through a folder-based structure, letting you switch between translations like ESV or WEB. Each Bible must follow a defined markdown format where each chapter is stored as an individual file and verses are marked using `<sup>` tags. While the setup may take some initial effort, the result is a fast, flexible, and entirely offline Bible referencing experience. 

[View Details](/plugins/local-bible-ref), [Github](https://github.com/camelChief/local-bible-ref)


```plugin-image
description: 
url: https://private-user-images.githubusercontent.com/109765584/466855141-b8b5440b-8f47-4462-987e-a52791d758be.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjA4NTg3NDEsIm5iZiI6MTc2MDg1ODQ0MSwicGF0aCI6Ii8xMDk3NjU1ODQvNDY2ODU1MTQxLWI4YjU0NDBiLThmNDctNDQ2Mi05ODdlLWE1Mjc5MWQ3NThiZS5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAxOVQwNzIwNDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yNDY3NDliOGUzZWM2NzBlYTUzMmUyYmM2ZGU1OTJlMTU0MDVhOWY0MTViOWI2NGI0ZTA2NTcwYjliNDAzOGRmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.HiVt7VSjRNcJ52OTBC_9sFSE69NCf9rKPdNvhhpMVt8
source:github
```

---

### 8. [TODOseq](/plugins/todoseq)

Released on 2025-10-17 by [Stephen Cross](https://github.com/scross01)

The **TODOseq** plugin offers a lightweight, keyword-driven alternative to traditional checkbox task management. It scans your entire vault for lines beginning with task state keywords like TODO, DOING, or DONE and displays them in a unified Task View. Tasks remain in their original Markdown format, supporting both plain keyword-based entries and checkbox combinations. The interface lets you update task states with a click, filter tasks live, and sort them by priority, schedule, or deadline. Inspired by Logseq, it fully supports priority tokens, scheduled/deadline tags, and preserves list formatting. It even syncs checkbox states with task keywords for consistency. 

[View Details](/plugins/todoseq), [Github](https://github.com/scross01/obsidian-todoseq)


```plugin-image
description: 
url: https://github.com/scross01/obsidian-todoseq/raw/main/screenshot.png
source:github
```

---

### 9. [Custom Theme Studio](/plugins/custom-theme-studio)

Released on 2025-10-17 by [@gapmiss](https://github.com/gapmiss)

The **Custom Theme Studio** plugin provides an all-in-one toolkit for designing, editing, and managing Obsidian themes visually. It combines a CSS variable manager, live CSS rule editor, and powerful export features-all accessible from a dedicated studio interface. Users can modify colors, fonts, and layout styles using real-time previews and selector-based styling tools. The integrated Ace editor supports syntax highlighting, auto-completion, Prettier formatting, and embedded color pickers for precise control. It also enables users to import fonts, define custom selectors, and export their themes as shareable packages with manifest files. 

[View Details](/plugins/custom-theme-studio), [Github](https://github.com/gapmiss/custom-theme-studio)

---

### 10. [Fix Line Endings on Copy](/plugins/line-ending-copyfix)

Released on 2025-10-17 by [KiwiJanus](https://github.com/KiwiJanus)

The **Fix Line Endings on Copy** plugin ensures that copied text uses the correct line-ending format expected by Windows applications. It automatically converts Unix-style line feeds (`\n`) to Windows-style carriage return plus line feed (`\r\n`) only during the copy action, without altering the original markdown files in your vault. The plugin supports copying via manual selections, code block copy buttons, and even handles pop-out windows and no-selection copy behaviour. This is especially useful for users who often paste content into older Windows tools that mishandle line endings. Currently targeted at Windows environments, it runs quietly in the background, improving compatibility without interfering with how you write or store your notes. 

[View Details](/plugins/line-ending-copyfix), [Github](https://github.com/KiwiJanus/obsidian-line-ending-copyfix)

---

### 11. [Web viewer Bookmarks](/plugins/webviewer-bookmarks)

Released on 2025-10-17 by [Stefan Danzl](https://github.com/stefandanzl)

The **Web viewer Bookmarks** plugin simplifies access to frequently visited websites by letting you create, organise, and launch bookmarks directly from within your vault. It integrates with Obsidian's built-in web viewer, allowing one-click access through the ribbon or via commands in the palette. Each bookmark can be customised with a visual icon from the Lucide icon set, giving a personalised feel to your setup. Bookmark management is handled via a dedicated settings pane where you can add, edit, or remove entries and control their visibility in the UI. 

[View Details](/plugins/webviewer-bookmarks), [Github](https://github.com/stefandanzl/webviewer-bookmarks)

---

### 12. [Horizontal Blocks](/plugins/horizontal-blocks)

Released on 2025-10-16 by [iCodeAlchemy](https://github.com/iCodeAlchemy)

The **Horizontal Blocks** plugin introduces a Notion-style layout experience, allowing you to arrange markdown content into resizable side-by-side blocks. It uses a special code block (`horizontal`) where content is split using `---` separators to form multiple columns. You can add any valid markdown including headings, lists, links, and embeds, and the plugin supports auto-scaling images for better visual alignment. It also remembers column widths between sessions for layout consistency. However, since it operates within a code block, task checkboxes and dataview queries won't function inside it. 

[View Details](/plugins/horizontal-blocks), [Github](https://github.com/iCodeAlchemy/horizontal-blocks)


```plugin-image
description: 
url: https://github.com/iCodeAlchemy/horizontal-blocks/raw/main/images/preview3.png
source:github
```

---

### 13. [Visited Countries](/plugins/visited-countries)

Released on 2025-10-16 by [Ivan Peshykov](https://github.com/IvanPeshykov)

The **Visited Countries Map** plugin offers an elegant way to visually track the countries you've been to using an interactive map embedded directly within your vault. It supports manual selection of countries, links each country to notes or travel logs, and calculates basic travel stats like total visits and coverage percentage. The map is responsive and works across desktop and mobile, including iOS and Android. With everything functioning locally and no reliance on external APIs or services, it keeps your travel data private while still being interactive and visually appealing. 

[View Details](/plugins/visited-countries), [Github](https://github.com/IvanPeshykov/obsidian-visited-countries)


```plugin-image
description: 
url: https://github.com/IvanPeshykov/obsidian-visited-countries/raw/main/img/demo.gif
source:github
```

---

### 14. [HiWords](/plugins/hi-words)

Released on 2025-10-16 by [Kai](https://github.com/CatMuse)

The **HiWords - Vocabulary Manager** plugin transforms vocabulary building into a seamless part of your reading flow. It uses Obsidian's Canvas files to visually manage and categorise words, enabling users to create multiple vocabulary books with flexible layouts and colour-coded word cards. As you read, the plugin highlights known words from your collections, adapts highlight colours from the Canvas settings, and lets you instantly access definitions via hover popups that support markdown formatting. A sidebar panel shows all relevant words in the current note for quick navigation, while a right-click or command palette action makes adding new words effortless. 

[View Details](/plugins/hi-words), [Github](https://github.com/CatMuse/HiWords)


```plugin-image
description: 
url: https://private-user-images.githubusercontent.com/154716620/471885782-359f874d-299c-4dd6-9fa1-bacd4664fb42.jpg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjA4NTc1NDMsIm5iZiI6MTc2MDg1NzI0MywicGF0aCI6Ii8xNTQ3MTY2MjAvNDcxODg1NzgyLTM1OWY4NzRkLTI5OWMtNGRkNi05ZmExLWJhY2Q0NjY0ZmI0Mi5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAxOVQwNzAwNDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZTZiNTBkNzU4OGVjNGIyMWRiNmNhZDM4ZmE3NTFkZjJiYzdhMTNjOGYyZTNiNWIyZjQ1MWE2YTU3NTQ0Y2VjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.jtQEH3f6siDRnq4N0fJ81DzX9L9PpTL99RSpk91Xqf8
source:github
```

```plugin-image
description: 
url: 
source:
```

---


## 🔁 Plugin Updates

We got 65 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

## 🎨 New Themes

- **True Black** - A truly pitch-black theme for Obsidian. - [Github](https://github.com/kraasch/true-black)
- **Blur** - A Blur Theme Obsidian With Custom Wallpaper - [Github](https://github.com/Jawuj/Blur-Theme)
- **Xscriptor** - for coders and writers with beautiful EB Garamond typography - [Github](https://github.com/xscriptordev/obsidian)
- **Museifu Basic** - the basic version of Museifu Theme - [Github](https://github.com/account-not-relevant/museifu-basic-theme)
- **NightlyWolf** - this theme keeps it simple: no flashy distractions or eye-searing colors - [Github](https://github.com/codejota/NightlyWolf_ObsidianTheme)
- **Antique Flowers** - [Github](https://github.com/incantatem2/Obsidian-antique-flowers)
- **Desserts** - Parfait and Cocoa merged into one light/dark theme - [Github](https://github.com/incantatem2/Obsidian-desserts)
- **Hidden-Grotto** - The base color palette is inspired by the Pokemon, Clobbopus - [Github](https://github.com/HotAndCold245/Hidden-Grotto)
- **Oscura** - A dark, elegant theme for Obsidian, ported from the oscura-vim colorscheme. - [Github](https://github.com/vinitkumar/oscura-obsidian)
- **Minimalist Studio** - aims to improve the styles of callouts, blockquotes and lists - [Github](https://github.com/david-troyer/obsidian-theme-minimalist-studio)
- **Universitario** - A theme made for color lovers - [Github](https://github.com/wulflo/obsidian-3Sumaq)
- **Dedication** - [Github](https://github.com/modigaphemelo/Dedication-obsidian-theme)
- **Monokai Ristretto** - A warm, dark theme for Obsidian, ported from the Monokai Pro Ristretto vim colorscheme. - [Github](https://github.com/vinitkumar/monokai-ristretto-obsidian)


---