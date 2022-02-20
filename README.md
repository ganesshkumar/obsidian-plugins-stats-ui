# Obsidian Plugin Stats

A tool to get plugin statistics of [Obsidian](https://obsidian.md) plugin ecosystem.  

![Obsidian Plugin Stats](https://user-images.githubusercontent.com/2135089/154796362-e80a56b4-1f0f-451b-8bf3-3ed435c6b23f.png)

[![Tag 0.1.0](https://img.shields.io/badge/tag-0.1.0-blue)](https://github.com/ganesshkumar/obsidian-plugins-stats-ui) 
[![MIT License](https://img.shields.io/github/license/ganesshkumar/obsidian-plugins-stats-ui)](LICENSE)

## Usage 
You can use [this tool](https://obsidian-plugin-stats.vercel.app/) to  
- see the plugins that has hit community plugin list (in the last 10 days).
- see the plugins for which a latest version has been released (in the last 10 days).
- see the top 25 most downloaded plugins of all time.
- see the tags that the developer has annotated the GitHub repository with.
  - see the plugins that being to a particular tag.
- favorite a plugin and see it highlighted when a new version is available.

## Pages

1. The **`home`** page is a card view of new plugins released in the last 10 days, latest versions released in the last 10 days and the 25 most downloaded plugins of all time.
    1. The pluins that are released or updated in the last 24 hours are annotated with the 🥳 emoji on the top left corner of the card.
    2. The plugins that are favorited are annotated with 🤩 on the top left corner of the card.
2. The **`new`** page is a list view of new plugins released in the last 10 days.
    1. The pluins that are released in the last 24 hours are annotated with the 🥳 emoji on the left.
    2. The plugins that are favorited are annotated with 🤩 on the left.
    3. A plugin can be favorited by using the clickable text under the name of the plugin.
3. The **`updates`** page is a list view of latest releases in the last 10 days.
    1. The latest versions that are released in the last 24 hours are annotated with the 🥳 emoji on the left.
    2. The plugins that are favorited are annotated with 🤩 on the left.
    3. A plugin can be favorited by using the clickable text under the name of the plugin.
4. The **`most downloaded`** page is a list view of 25 most downloaded plugins of all time.
    1. The pluins that are released in the last 24 hours are annotated with the 🥳 emoji on the left.
    2. The plugins that are favorited are annotated with 🤩 on the left.
    3. A plugin can be favorited by using the clickable text under the name of the plugin.
5. The **`trending`** page is work in progress.
6. The **`tags`** page is a word cloud of all the tags that are found on the GitHub repositories of the plugins, along with the number of plugins belonging to that tag.
7. The **`tags/{tag}`** page is a list view of all the plugins belonging to that tag.
8. The **`plugins/{pluginId}`** page is a detailed view of the plugin. This contains description, changelog of the latest release etc.

## Screenshot

Home Page
![Home Page](https://user-images.githubusercontent.com/2135089/154796389-814c4e49-6610-4309-b090-5be25d0fd859.jpeg)

Favorited Plugin


Plugin updated/released in the last 24 hours


How to favorite a plugin from new/updates/most downloaded/plugin page.


## License
[MIT](LICENSE)

---

If you like my work, you could consider buying me a coffee. It is unnecessary, but appreciated 🙂

<a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
