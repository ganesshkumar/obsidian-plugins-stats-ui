---
title: Custom Callouts in Obsidian with CSS Snippets
description: 'Learn how to add personalized callouts in Obsidian using simple CSS snippets and Lucide icons.'
excerpt: 'Define callout types like target, code, customization etc. using CSS and markdown in Obsidian.'
publishedDate: '2025-06-10'
modifiedDate: '2025-06-10'
bannerImage: '/images/custom-callouts-in-obsidian-with-css-snippets.webp'
tags:
  - tutorial
  - callouts
  - css-snippets
---

## What are Callouts in Obsidian?

Obsidian callouts are specially styled blockquote elements featuring icons and colors. They provide visual structure without disrupting your note flow. Creating a basic callout in markdown is straightforward. Start a blockquote with `[!info]` or other built-in types like tip or warning ([help.obsidian.md](https://help.obsidian.md/callouts)).

![Default Callout](/images/default-callout-in-obsidian.png)

Personally, I use callouts in my daily notes quite a lot. Over time, I found that the visual elements like icon and color help me instantly focus on the key parts of a note. It's like having a mini visual system that keeps my brain on track. However, the default types (like `[!info]`, `[!tip]`, etc.) eventually felt limiting. They didn't fully match the kind of structure I needed for my own note taking system.

For example, I have recurring entries like morning routines, nightly reflections, and ongoing learning logs. I wanted these to stand out in a consistent and meaningful way. That's when I realized that custom callouts could be more than decoration and they could act as **semantic signposts** in my notes. 

I also didn't want to overload my vault with more plugins just for visual tweaks. So, I started looking into CSS snippets as a lightweight alternative. The beauty of this approach is that it gives you full control. You pick your Lucide icons, assign your own RGB color values, and define custom types like `target`, `code`, or even something specific like `routine` or `gratitude`. All this without any external dependencies.

Fortunately, Obsidian makes this quite beginner friendly. This post is a simplified, step-by-step tutorial based on how I personally customized my callouts. No prior CSS knowledge required.

## Step-by-Step Guide to Enable CSS Snippets in Obsidian

No advanced CSS knowledge required. Just follow these easy steps:

1. Open or create your Obsidian vault.
2. Create the `.obsidian/snippets/` folder if it doesn't exist.
3. Save your file as `custom-callouts.css` inside this folder.
4. Within Obsidian, navigate to **Settings → Appearance → CSS Snippets**. Click **Open snippets folder**, place your CSS file there, and select **Reload snippets** ([help.obsidian.md](https://help.obsidian.md/snippets)).
5. Toggle your snippet on, and Obsidian will instantly reflect your changes.

This method kept my vault lean with less plugins while giving me the visual boost I wanted.

## Example CSS: Four Custom Callouts

Here's an example of what my custom callouts look like. Add this to your `custom-callouts.css` file:

```css
.callout[data-callout="target"] {
  --callout-color: 153, 27, 27;
  --callout-icon: lucide-target;
}

.callout[data-callout="code"] {
  --callout-color: 67, 56, 202;
  --callout-icon: lucide-code;
}

.callout[data-callout="customize"] {
  --callout-color: 202, 138, 4;
  --callout-icon: lucide-swatch-book;
}

.callout[data-callout="levelup"] {
  --callout-color: 22, 163, 74;
  --callout-icon: lucide-chevrons-up;
}
```

* Type names (target, code, customize, levelup etc.) must be lowercase due to CSS case sensitivity.
* RGB numeric colors are required; hex or color names won't work.
* Lucide icons are prefixed with `lucide-`.

## How to Use Custom Callouts in Markdown

Here's a clear markdown callouts example:

```markdown
> [!target] Aim
> To create custom callouts like this

> [!code] Tools
> - Use only CSS
> - No external plugins

> [!customize] Customize
> - Custom icon and
> - Custom color

> [!levelup] 
> Level up your notes
> Simple and fast!
```

And the above code will output as follows

![Custom callouts in Obsidian](/images/custom-callouts-in-obsidian.png)

Callout types appear after `![ ]`, always lowercase. Follow with your chosen title text and body. Obsidian will render each with the designated Lucide icon and custom color from your snippet.

Integrating these CSS variables for Obsidian callouts makes your notes visually coherent and personally meaningful. This simple yet powerful Obsidian markdown customization boosts clarity, enhances productivity, and sparks creativity. For me, it was a small tweak that turned into a game changer for organizing thoughts. I hope it helps you feel just as in control of your own vault.

---

As of 2025-06-09, Obsidian uses Lucide version 0.446.0. You can choose any icons from this version.