
# Changelog 

- Switched to amplitude-browser-sdk to track custom events
    - Added `404` custom event to track the path and queryParams of 404s
        - Why? I observed 10s of tags pages `/tags/*` failing with 404 due to inconsistent sanitization of tags.
- Added support
    - to build curtom scorer via pages/scorer/build and
    - to manage scorer functions via pages/scorer/index
    - to patch custom scores into plugins in
      - components/PluginsMultiView
      - pages/plugins/index
- Fixed SEO issue where canonical names for some pages point to invalid URL.
- Fixed issues with tags where redirects to pages/tags/[slug] were inconsistently sanitized.