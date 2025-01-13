
# Changelog 

- Adding support
    - to build curtom scorer via pages/scorer/build and
    - to manage scorer functions via pages/scorer/index
    - to patch custom scores into plugins in
      - components/PluginsMultiView
      - pages/plugins/index
- Fixing SEO issue where canonical names for some pages point to invalid URL.
- Fixing issues with tags where redirects to pages/tags/[slug] were inconsistently sanitized.