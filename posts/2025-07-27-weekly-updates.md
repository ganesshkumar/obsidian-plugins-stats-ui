---
title: Obsidian Plugin Updates 2025-07-20 to 2025-07-26
description: 'From 2025-07-20 to 2025-07-26 there are 17 newly released plugins and 4 new themes, 68 plugins got updated and 1 plugin got removed'
excerpt: 'There are 17 new plugins and 4 new themes, 68 plugins got updated and 1 plugin was moved during the week 2025-07-20 to 2025-07-26.'
publishedDate: '2025-07-27'
modifiedDate: '2025-07-27'
bannerImage: '/images/obsidian-weekly-updates.webp'
tags:
  - weekly-updates
---

> There are 17 new plugins and 4 new themes, 68 plugins got updated and 1 plugin was moved during the week 2025-07-20 to 2025-07-26.

This week's updates bring a fresh mix of ideas that feel both practical and a bit playful. A striking 3D graph view now lets you wander through your vault like a map, while EasyLink and PhraseSync make linking notes effortless. There's even a plugin that drops random Wikipedia articles into your day, the kind of nudge that sparks curiosity without trying too hard. Writers, developers, and tinkerers all get something useful, and with a wave of updates and new themes, the whole setup feels sharper and more alive.

## ⭐ New Plugins

### 1. [New 3D Graph](/plugins/new-3d-graph)

Released on 2025-07-23 by [Aryan Gupta](https://github.com/Apoo711)

The **3D Graph** plugin delivers a fully interactive, deeply customizable 3D force directed graph view for your entire vault. You can pan, zoom, and rotate to explore connections from every angle, with instant updates as you tweak appearance or physics. Node shapes, sizes, and colors for notes, attachments, and tags can be set independently, and color-coded groups are easy to define using path, tag, or file queries. Live search and filtering help you spotlight the links that matter, while advanced settings let you fine tune the graph's layout. Click nodes to focus or open them, and enjoy smooth performance thanks to real-time caching.

[View Details](/plugins/new-3d-graph), [Github](https://github.com/Apoo711/obsidian-3d-graph)

---

### 2. [EasyLink](/plugins/easylink)

Released on 2025-07-23 by [isitwho](https://github.com/isitwho)

The **EasyLink ** plugin streamlines the process of linking related notes by providing instant, ranked suggestions when you select text and trigger its command. Instead of searching manually, you get a pop up with similar content based on contextual keyword matching and relevance scoring. You can link directly to headings or blocks, not just files, and insert formatted wiki-links right where you need them. Results are customisable - you can exclude certain folders, set a minimum similarity score, and control how many results you see.

[View Details](/plugins/easylink), [Github](https://github.com/isitwho/EasyLink)

---

### 3. [Similar Notes](/plugins/similar-notes)

Released on 2025-07-23 by [Young Lee](https://github.com/joybro)

The **Similar Notes** plugin finds and recommends notes that are semantically related to what you're currently writing, using language models for real-time analysis. It displays up to five similar notes at the bottom of your note, making it easier to spot hidden connections in your ideas without relying on exact keyword matches. The plugin is self-contained with its own vector database and gives you the choice between built in Hugging Face models or connecting to Ollama for custom embeddings. No external cloud API is needed, and it smartly ignores notes already linked from your current document.

[View Details](/plugins/similar-notes), [Github](https://github.com/joybro/obsidian-similar-notes)

---

### 4. [PhraseSync](/plugins/phrasesync)

Released on 2025-07-23 by [Digvijay S. Todiwal](https://github.com/digvijay-s-todiwal)

The **PhraseSync** plugin brings smart, automatic internal linking to your notes by suggesting links as you type - no special triggers or prefixes required. It works anywhere in your writing, instantly recognising and recommending links to note titles, headings, and even block references, including multi word phrases and matches that aren't case sensitive. The suggestions adapt in real time as your vault changes, so you always have up-to-date linking options.

[View Details](/plugins/phrasesync), [Github](https://github.com/digvijay-s-todiwal/phrasesync)

---

### 5. [Github Issues](/plugins/github-issues)

Released on 2025-07-23 by [LonoxX](https://github.com/LonoxX)

The **GitHub Issues** plugin connects your notes with GitHub by tracking issues and pull requests from specified repositories. It automatically syncs data on startup, lets you filter tracked items by assignee or reviewer, and can generate Markdown notes for each issue or PR right in your vault. With custom repository configuration and a choice of repositories to follow, it brings your development workflow and project tracking directly into your documentation environment.

[View Details](/plugins/github-issues), [Github](https://github.com/LonoxX/obsidian-github-issues)

---

### 6. [Random Wikipedia Article](/plugins/random-wikipedia-article)

Released on 2025-07-23 by [SpencerF718](https://github.com/SpencerF718)

The **Random Wikipedia Article** plugin fetches a random Wikipedia article and creates a neatly formatted note right inside your vault. It's designed to encourage curiosity, daily writing, and spontaneous learning by surfacing unexpected topics. You can set rules for what makes an article suitable, such as requiring a minimum number of headers or filtering out articles with certain headers. The plugin allows control over how many times it retries fetching, where new notes are saved, and whether they open automatically.

[View Details](/plugins/random-wikipedia-article), [Github](https://github.com/SpencerF718/obsidian-random-wikipedia)

---

### 7. [DevOps Companion](/plugins/devops-companion)

Released on 2025-07-23 by [Jobelin Kom](https://github.com/jkom4)

The **DevOps Companion** plugin brings context awareness for DevOps workflows directly into your workspace by scanning, parsing, and monitoring common configuration files like Dockerfiles, YAML, and Terraform. You can specify a folder for it to watch, and the plugin will keep an eye on changes, even supporting manual scans for immediate feedback. It works with files not natively handled by the platform and lays groundwork for future features like automated markdown documentation.

[View Details](/plugins/devops-companion), [Github](https://github.com/jkom4/obsidian-devops-compagnon)

---

### 8. [.url WebView Opener](/plugins/url-webview-opener)

Released on 2025-07-22 by [Kieirra](https://github.com/Kieirra)

The **.url WebView Opener** plugin lets you open, view, and even edit `.url` files natively inside your workspace using a built in webview. Instead of always sending you to an external browser, it displays web documents or webapps right within your notes, while still allowing quick access to open links in your browser when needed. You get full screen mode for distraction-free browsing and can quickly toggle interface elements. The plugin recognises both plain and Windows-format `.url` files, so linking to web resources is flexible and direct.

[View Details](/plugins/url-webview-opener), [Github](https://github.com/Kieirra/obsidian-url-extension)

---

### 9. [Simple Columns](/plugins/simple-columns)

Released on 2025-07-22 by [Josie](https://github.com/Josie1902)

The **Simple Columns** plugin makes it easy to organise content into resizable, responsive columns directly inside your notes. With a straightforward markdown syntax and unique IDs for each column, you can split tasks, ideas, or code across columns that adapt to any screen size. The plugin supports both global and per column settings, so you can tweak border style, colour, resizer appearance, background, and text alignment as you wish. Adjust layouts for visual clarity or personal style and reset everything in a click if needed.

[View Details](/plugins/simple-columns), [Github](https://github.com/Josie1902/Simple-Columns)

---

### 10. [UnLime](/plugins/unlime)

Released on 2025-07-22 by [shandyba](https://github.com/shandyba)

The **UnLime** plugin brings a straightforward way to declutter your workspace by letting you toggle the visibility of 'Unlinked mentions' in the Backlinks and Outgoing Links panels. Especially useful for those with large or messy vaults, it cuts down on irrelevant noise and false positives, so you can focus only on the links that matter. You decide, panel by panel, whether these unlinked mentions are shown, giving you more control over how you navigate and explore your notes.

[View Details](/plugins/unlime), [Github](https://github.com/shandyba/obsidian-lime)

---

### 11. [Storyteller Suite](/plugins/storyteller-suite)

Released on 2025-07-22 by [Maws](https://github.com/SamW7140)

The **Storyteller Suite** plugin provides a structured environment for writers to organise every aspect of their stories. It brings together character profiles, location histories, event timelines, and a gallery - all accessible from a single dashboard with tabbed navigation. You can create, edit, and filter detailed entries for characters, locations, and events, attaching images, notes, affiliations, relationships, and custom fields as needed. The gallery makes it easy to upload and link images throughout your narrative elements. Every record is saved as a markdown file with YAML frontmatter, making your data portable and future-proof.

[View Details](/plugins/storyteller-suite), [Github](https://github.com/SamW7140/obsidian-storyteller-suite)

---

### 12. [T4: Task Tree Time Totaler](/plugins/t4-task-tree-time-totaler)

Released on 2025-07-22 by [Evan Story](https://github.com/estory1)

The **T4: Task Tree Time Totaler** plugin automatically calculates and updates time estimate sums across nested task lists, saving you from manual calculations as your task hierarchies grow. By scanning your note for tasks and subtasks formatted with checkboxes and time brackets, it recursively totals up estimates for each parent, converting units and reporting sums in the most relevant scale whether minutes, hours, days, or even business weeks. The plugin handles mixed time units, overwrites existing sum fields to keep everything accurate, and supports deep nesting.

[View Details](/plugins/t4-task-tree-time-totaler), [Github](https://github.com/estory1/t4-task-tree-time-totaler)

---

### 13. [Template Folder](/plugins/template-folder)

Released on 2025-07-22 by [LucasOe](https://github.com/LucasOe)

The **Template Folder** plugin gives you more control over where your notes land when using templates. Instead of simply inserting content, it moves new notes to a target folder defined in the template's frontmatter. This replaces the usual 'Insert Template' behaviour by fully overwriting the note with your template, not just adding to it. You can specify which frontmatter property sets the folder path and decide if the property should be removed after moving the note.

[View Details](/plugins/template-folder), [Github](https://github.com/LucasOe/obsidian-template-folder)

---

### 14. [Dataview (to) Properties](/plugins/dataview-properties)

Released on 2025-07-22 by [Mara-Li](https://github.com/Mara-Li)

The **Dataview (to) Properties** plugin synchronises your Dataview inline fields and queries with frontmatter properties, keeping metadata up to date across your notes. It converts both Dataview Query Language (DQL) and DataviewJS results into frontmatter, handles block and inline queries, and evaluates calculated values before syncing. You can set up automatic or manual sync, with granular controls for field naming, ignored fields, value cleanup, and list handling. The plugin is careful to avoid property conflicts by using a configurable prefix. Cleanup happens automatically if you remove a field, and accent or case mismatches are handled smoothly.

[View Details](/plugins/dataview-properties), [Github](https://github.com/Mara-Li/obsidian-dataview-properties)

---

### 15. [Zhihu](/plugins/zhihu)

Released on 2025-07-21 by [dgg](https://github.com/dongguaguaguagua)

The **Zhihu** plugin lets you draft, publish, and manage Zhihu articles and answers directly from your notes. Once logged in via web authentication, you can turn markdown files into Zhihu ready posts, attach relevant topics, and sync content as either articles or answers tied to specific questions. The plugin supports cover images, card-style links, LaTeX, automatic image handling, and generates tables of contents if needed. You can browse Zhihu recommendations, followings, and trending lists right inside your workspace, saving interesting content for future reference. Mentioning Zhihu users is seamless with @ syntax, and editing published articles or answers is just as easy.

[View Details](/plugins/zhihu), [Github](https://github.com/dongguaguaguagua/zhihu_obsidian)

---

### 16. [PDF Emojis](/plugins/pdf-emojis)

Released on 2025-07-21 by [Marcel Marusiak](https://github.com/mmarusiak)

The **PDF Emojis** plugin makes it possible to export notes as PDFs while keeping emojis intact, no matter where they appear - headings, bold text, or throughout your content. This solves the usual problem of emojis vanishing during PDF exports, ensuring that your exported documents look exactly how you intend. Whether you're using emojis for visual cues, tone, or emphasis, the plugin preserves their placement and style in the final PDF. There's no need to adjust your notes before exporting; it simply works, even with emojis embedded in complex formatting.

[View Details](/plugins/pdf-emojis), [Github](https://github.com/mmarusiak/pdf-emojis-plugin)

---

### 17. [Send to Canvas](/plugins/send-to-canvas)

Released on 2025-07-21 by [wenlzhang](https://github.com/wenlzhang)

The **Send to Canvas** plugin streamlines how you move tasks, text blocks, or entire notes into Canvas files. It lets you send content in multiple formats - plain text, links, or embeds - while keeping your original formatting intact. You can customise open tasks by adding extra text and decide how block IDs are generated, choosing between date based or random formats. Timestamp features let you keep track of when links or embeds are created, with options to tweak the format as needed. Node sizing is flexible, so you can adjust how links and content appear visually on your Canvas. The plugin remembers your last-used Canvas file, shows a quick-access status indicator, and has smart defaults for working in large vaults.

[View Details](/plugins/send-to-canvas), [Github](https://github.com/wenlzhang/obsidian-send-to-canvas)

---

## 🔁 Plugin Updates

We got 68 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

### Notable Updates

- **TaskNotes** - v3.15.0 - [Changelog](https://github.com/callumalpass/tasknotes/releases/tag/3.15.0)
- **Iconic** - v1.1.3 - [Changelog](https://github.com/gfxholo/iconic/releases/tag/1.1.3)
- **Discord Rich Presence** - v - [Changelog](https://github.com/Apoo711/obsidian-discordrpc/releases/tag/3.1.0)
- **Task Board** - v1.6.0 - [Changelog](https://github.com/tu2-atmanand/Task-Board/releases/tag/1.6.0)

---

## 🫡 Plugins Removed

- **Privacy Glasses** - The Github account has been deleted.

---

## 🎨 New Themes

- **Nostromo** - An 80's retro-futuristic theme with comfortable, muted colors. Perfect for space-age note-taking without the eye strain - [Github](https://github.com/gvorbeck/Nostromo)
- **Ravenloft** - Parchment‑warm gothic dual‑mode theme - [Github](https://github.com/circkumflexx/obsidian-ravenloft-theme)
- **Tokyo Night Simple** - Tokyo Night Simple is an Obsidian theme based on the Tokyo Night colors used in folke/tokyonight.nvim aiming for simplicity - [Github](https://github.com/danarnold/tokyonight-simple)
- **Omega** - Omega is a dark mode-only Obsidian theme designed for those who think in stars - [Github](https://github.com/OmegaCentauri68/Omega-Theme-for-Obsidian)

---

## 🔁 Theme Updates

- **Elegance** has been relisted.

---
