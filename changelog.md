# Changelog

- #### 2025-01-15
  - Added `/timeline` page.
  - Added develop.obsidianstats.com to publish `develop` branch as beta version of the webapp.
  - Added support
    - to build curtom scorer via pages/scorer/build and
    - to manage scorer functions via pages/scorer/index
    - to patch custom scores into plugins in
    - components/PluginsMultiView
    - pages/plugins/index
  - Fixed SEO issue where canonical names for some pages point to invalid URL.
  - Fixed issues with tags where redirects to pages/tags/[slug] were inconsistently sanitized.
