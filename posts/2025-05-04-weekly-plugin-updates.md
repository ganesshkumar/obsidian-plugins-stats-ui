---
title: Obsidian Plugin Updates 2025-04-27 to 2025-05-03
description: 'new obsidian plugins from 2025-04-27 to 2025-05-03 - Sentence Rhythm, Model Viewer, Tick Tones, Reveal Folded, Reference Link Render, JupyMD, Daily Notes Automater, About Blank, Image Embedder, TOC compatible with Publish, Rainbow Folders Fixer, JW Library Linker, Advanced Note Composer, Quick Peek Sidebar, Completed Tasks, Date Range Expander, Reader Mode'
excerpt: There are 17 new plugins and 89 plugin updates in the last one week's time.
publishedDate: '2025-05-04'
modifiedDate: '2025-05-04'
tags:
  - weekly-updates
---

This week, we're welcoming 17 new plugins and 89 updates, covering everything from rhythmic sentence highlighting and 3D model viewing to audio feedback on task completion. Highlights include visual sentence flow tools, smarter daily note automation, and a quick sidebar peek feature for smoother navigation. Let's take a closer look at what's new in the vault this week!

![Weekly Updates](/images/2025-05-04-weekly-plugin-updates.webp)

> There are 17 new plugins and 89 plugin updates in the last one week's time.

## ⭐ New Plugins: We have 17 new plugins.

### 1. [Sentence Rhythm](/plugins/sentence-rhythm)

Released on 2025-04-29 by [Adam Fletcher](https://github.com/adamfletcher)

The **Sentence Rhythm** plugin helps writers visually analyze sentence length variation by applying color-coded highlights to sentences based on their word count. It's inspired by Gary Provost's advice on rhythm in writing and aims to improve the flow and engagement of prose. Users can toggle the highlights on and off through the command palette or plugin settings. The plugin also allows customization of sentence length thresholds and highlight colors, offering flexibility for different writing styles. For advanced users, it adds specific CSS classes to sentences, making it easy to tailor the appearance through custom stylesheets. This is particularly useful for authors, bloggers, or students aiming to make their writing more dynamic and readable.

[View Details](/plugins/sentence-rhythm), [Github](https://github.com/adamfletcher/obsidian-sentence-rhythm)

---

### 2. [Model Viewer](/plugins/model-viewer)

Released on 2025-04-29 by [Janis Pritzkau](https://github.com/janispritzkau)

The **Model Viewer** plugin adds support for interactive 3D model viewing directly inside your notes using Google's `<model-viewer>` component. It recognizes `.glb` and `.gltf` files in your vault, enabling file previews, tabbed viewing, and seamless embedding via native syntax. You can adjust display settings like height, width, and aspect ratio, or even add multiple models side by side. It supports advanced attributes from the `<model-viewer>` API, such as autoplay, lighting controls, and custom camera positions. When used with the page preview plugin, you can also hover over links to preview models instantly. This plugin is especially handy for developers, designers, or educators working with 3D content who want smooth visual integration within their notes.

[View Details](/plugins/model-viewer), [Github](https://github.com/janispritzkau/obsidian-model-viewer)

---

### 3. [Tick Tones](/plugins/tick-tones)

Released on 2025-04-29 by [DontBlameMe](https://github.com/DontBlameMe99)

The **Checkbox Tick Tones** plugin adds an auditory touch to task completion by playing a custom sound whenever a checkbox is ticked in the editor. Users can configure which sound plays, and they're free to use any audio file format supported by the plugin, including `.mp3`, `.wav`, and others. Although sounds need to be manually placed in the plugin's assets folder due to file restrictions, this setup also gives users the flexibility to personalize the tick sound to suit their preferences. It's a simple but satisfying way to make your task tracking feel more interactive and engaging.

[View Details](/plugins/tick-tones), [Github](https://github.com/DontBlameMe99/Tick-Tones)

---

### 4. [Reveal Folded](/plugins/reveal-folded)

Released on 2025-04-29 by [d7sd6u](https://github.com/d7sd6u)

The **Reveal Folded** plugin adds a simple but handy command that focuses the file explorer on the current note while collapsing all other folders. This is particularly useful in large vaults where the file tree can get cluttered, making navigation tedious. With a single action, you can quickly locate your working file and reduce visual noise by folding unrelated sections. It's especially helpful for users who frequently switch between notes or prefer a minimalist, distraction-free workspace in the sidebar.

[View Details](/plugins/reveal-folded), [Github](https://github.com/d7sd6u/obsidian-reveal-folded)

---

### 5. [Reference Link Render](/plugins/reference-link-render)

Released on 2025-04-29 by [njko39](https://github.com/njko39)

The **Reference Link** plugin adds support for reference-style Markdown links, allowing you to separate link definitions from the main text. This is especially useful for long notes with many links, as it keeps the content cleaner and easier to read or manage. Instead of cluttering your writing with full URLs, you can define all the links at the bottom of your file and refer to them using simple labels. In reading mode, the plugin ensures the links are properly rendered just like regular inline links, offering a more organized way to structure link-heavy documents.

[View Details](/plugins/reference-link-render), [Github](https://github.com/njko39/obsidian-reference-link-plugin)

---

### 6. [JupyMD](/plugins/jupymd)

Released on 2025-04-29 by [Deniz Terzioglu](https://github.com/d-eniz)

The **JupyMD** plugin bridges the gap between Markdown notes and Jupyter Notebooks by enabling seamless creation and synchronization using Jupytext. It allows you to convert your current note into a Jupyter Notebook and keeps the Markdown and notebook versions in sync on save. You can also open these notebooks directly in VS Code or Jupyter Lab, provided the corresponding files exist. This setup is ideal for users who blend note-taking with code-based exploration, especially in data science, research, or computational notebooks. With minimal setup, it brings the interactivity of Jupyter into your note-based workflow.

[View Details](/plugins/jupymd), [Github](https://github.com/d-eniz/jupymd)

---

### 7. [Daily Notes Automater](/plugins/daily-note-automater)

Released on 2025-04-29 by [David Pedrero](https://github.com/davidpedrero)

The **Daily Notes Automater** plugin helps users streamline the creation of daily notes by automatically generating them when Obsidian is launched. It offers a high degree of customization, including user-defined date formats, file name suffixes, and flexible directory structures such as year and month-based subfolders. Users can also specify a template to pre-fill the content of each note, ensuring consistency in daily journaling or planning workflows. The plugin uses the Moment API for date handling and ensures that note files are neatly organized and named to support chronological order. This setup is especially useful for users who rely on structured daily logging or task tracking routines.

[View Details](/plugins/daily-note-automater), [Github](https://github.com/davidpedrero/obsidian-daily-notes-automater)

---

### 8. [About Blank](/plugins/about-blank)

Released on 2025-04-29 by [Ai-Jani](https://github.com/Ai-Jani)

The **About Blank** plugin enhances the default empty file view by letting you add customizable actions such as executing commands, opening specific files, or triggering grouped actions. These actions can be configured with icons, confirmation prompts, and even registered as standalone commands. Grouped actions offer a cleaner UI by bundling multiple tasks into a single interactive menu. Even if the empty view isn't used, the plugin remains useful by enabling quick command execution and streamlined workflows through a central 'Quick Actions' command. This tool is helpful for users who frequently work with multiple commands or files and prefer quick access to common actions right from a new tab.

[View Details](/plugins/about-blank), [Github](https://github.com/Ai-Jani/about-blank)

---

### 9. [Image Embedder](/plugins/image-embedder)

Released on 2025-04-29 by [Natalie Sumbo](https://github.com/sky150)

The **Image Embedder** plugin streamlines the process of adding images from the web into your notes by automatically detecting image URLs on paste, downloading the images, and embedding them in Markdown format. It supports custom attachment folders, flexible filename formatting using placeholders like date or timestamp, and optional confirmation prompts for better control. Users can also choose to display the saved file path as feedback. This plugin is particularly useful for researchers, bloggers, or students who frequently gather visual content from external sources and want to keep their vault self-contained and organised.

[View Details](/plugins/image-embedder), [Github](https://github.com/sky150/obsidian-image-embedder)

---

### 10. [TOC compatible with Publish](/plugins/table-of-contents-automatic-but-compatible-with-publish)

Released on 2025-04-29 by [Brian Collery](https://github.com/BrMacCath)

The **Automatic Table of Contents** plugin helps generate and manage a table of contents at the top of your note with a single command. It identifies existing TOCs to prevent duplication and allows users to update them when needed. Designed with compatibility for Publish in mind, the plugin ensures the TOC structure is recognised properly when sharing content online. Although current updates are manual, the roadmap hints at plans for automatic TOC updates and customizable formats, making it a handy tool for users who regularly work with structured documents or long-form writing.

[View Details](/plugins/table-of-contents-automatic-but-compatible-with-publish), [Github](https://github.com/BrMacCath/Table-of-Contents)

---

### 11. [Rainbow Folders Fixer](/plugins/rainbow-folders-fixer)

Released on 2025-04-28 by [Dee](https://github.com/dee158)

The **Rainbow Folders Fixer** plugin addresses a visual issue where folder colors in the file explorer shift unexpectedly as DOM elements are loaded or unloaded during scrolling. It achieves this by assigning stable data attributes to folders, allowing consistent color styling through CSS. Users can configure the number of colors, the attribute name used for data binding, and whether subfolders should inherit or cycle through the color scheme recursively. This is especially helpful for those using custom themes or rainbow-style folder coloring, ensuring a cleaner and more predictable appearance without relying on fragile `nth-child` selectors.

[View Details](/plugins/rainbow-folders-fixer), [Github](https://github.com/dee158/obsidian-rainbow-folders-fixer)

---

### 12. [JW Library Linker](/plugins/jw-library-linker)

Released on 2025-04-28 by [Martin Sakowski](https://github.com/msakowski)

The **JW Library Linker** plugin streamlines the process of working with JW Library content by converting `jwpub://` links to the `jwlibrary://` format, making them compatible with the JW Library app. It offers bulk conversion options for all links, Bible verses, or publication links in a note. Additionally, it includes a `/b` command that helps insert Bible references quickly, with options to just create the link or create and open it directly in JW Library. This is particularly useful for users who frequently reference scriptures or JW publications in their notes and want a more efficient linking experience.

[View Details](/plugins/jw-library-linker), [Github](https://github.com/msakowski/obsidian-library-linker)

---

### 13. [Advanced Note Composer](/plugins/advanced-note-composer)

Released on 2025-04-28 by [mnaoumov](https://github.com/mnaoumov)

The **Advanced Note Composer** plugin extends the functionality of Obsidian's core Note Composer plugin by addressing common limitations during note merging and content extraction. It intelligently updates relative links when content is moved between files, preventing broken links that usually require manual fixing. Additionally, it handles invalid characters in titles by either sanitizing them or storing the original form in note aliases or frontmatter titles for better compatibility with quick switcher and metadata-based workflows. This plugin is especially useful for users who regularly restructure their notes and want a smoother, error-free experience.

[View Details](/plugins/advanced-note-composer), [Github](https://github.com/mnaoumov/obsidian-advanced-note-composer)

---

### 14. [Quick Peek Sidebar](/plugins/quick-peek-sidebar)

Released on 2025-04-28 by [Bradley Wyatt](https://github.com/bwya77)

The **Quick Peek Sidebar** plugin provides an intuitive way to access sidebars by automatically expanding them when you hover near the edges of the window. It supports both left and right sidebars, with options to enable them individually or sync their behaviour. Users can fine-tune the trigger area, animation speed, and delays for expanding or collapsing. The plugin also offers an overlay mode to make sidebars slide over the main content instead of pushing it, along with settings to control their maximum width. These features are especially useful for users who prefer a cleaner workspace but still need quick access to sidebar tools.

[View Details](/plugins/quick-peek-sidebar), [Github](https://github.com/bwya77/obsidian-quick-peek-sidebar)

---

### 15. [Completed Tasks](/plugins/completed-tasks)

Released on 2025-04-28 by [Mgussekloo](https://github.com/mgussekloo)

The **Completed Tasks** plugin automatically moves checked-off tasks to the bottom of their list, helping keep notes clean and focused. It runs in the background and checks for changes every few seconds to reorder completed items without interrupting your writing flow. It supports root-level task lists and ensures that subtasks stay attached to their parent task during sorting. The plugin also works well with the popular Tasks plugin, though it doesn't depend on it. With minimal setup and automatic operation, it's ideal for users who frequently work with to-do lists and want a tidy, distraction-free structure as they complete tasks.

[View Details](/plugins/completed-tasks), [Github](https://github.com/mgussekloo/obsidian-completedtasks)

---

### 16. [Date Range Expander](/plugins/date-range-expander)

Released on 2025-04-28 by [Mil](https://github.com/mildeveloper)

The **Date Range Expander** plugin makes it easy to insert a sequence of dates into your notes using either a defined end date or a set duration. It supports customizable date formats, wiki-linking for each date, and even optional callout wrapping to keep long date sequences organised. Users can also choose whether to create actual note files for the linked dates and control where those files should be stored.

[View Details](/plugins/date-range-expander), [Github](https://github.com/mildeveloper/obsidian-date-range-expander)

---

### 17. [Reader Mode](/plugins/reader-mode)

Released on 2025-04-28 by [Dominik Mayer](https://github.com/dominikmayer)

The **Reader Mode** plugin automatically opens filled notes in reading view, making it easier to consume content with footnotes, images, embeds, or code blocks. This helps avoid issues like unclickable links that sometimes occur in edit mode when the cursor is placed inside a link. For users who primarily browse and refer to their notes rather than edit them constantly, this plugin creates a smoother, distraction-free experience.

[View Details](/plugins/reader-mode), [Github](https://github.com/dominikmayer/obsidian-reader-mode)

---

## 🅱️Beta Plugins

Couple of interesting plugins that are in beta stage (accessible via [BRAT](https://github.com/TfTHacker/obsidian42-brat)) are

- [BibLib for Obsidian](https://github.com/callumalpass/obsidian-biblib) and
- [Simple Banner](https://github.com/eatcodeplay/obsidian-simple-banner)

---

## 🔁 Plugin Updates

We got 89 plugin updates in the last one week's time. You can see all the plugin updates on [Obsidian Plugin Stats webapp](/updates).

---

## 🛤️ Workflows

Recently we covered plugins related to [spaced repetition](/posts/2025-05-01-spaced-repetition-plugins) workflow. What other workflows are you interested in categorizing?
