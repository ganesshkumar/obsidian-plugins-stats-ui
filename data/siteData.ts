import { Highlight } from '../lib/abstractions';

export const SiteData = {
  highlights: [
    {
      title: 'New Plugin Scoring System',
      image: '/images/score-example-1.png',
      description:
        'Discover a new scoring system designed to evaluate and rank Obsidian plugins. The scoring is based on project metrics, user engagement, and activity. You can see these scores across the website on different plugin lists (such as new plugins, plugin updates, most downloaded, trending plugins) all plugins page, and plugin details pages. This is an early version of the scoring system and will be improved over time. 🚀',
      link: '/posts/2024-12-28-obsidian-plugin-scoring-system',
      ctaText: 'Learn about the scoring system',
      bgClasses: 'bg-gradient-to-tr from-fuchsia-400 to-purple-400 text-black',
    } as Highlight,
    {
      title: 'Obsidian Plugin - Wrapped 2024',
      image: '/logo-512-removebg-preview.png',
      description:
        "2024 has been a monumental year for the Obsidian community, with over 750+ newly released plugins now shaping how we create, organize, and think. These incredible tools are a testament to the hard work, creativity, and meticulous care of our dedicated developers. Let’s take a moment to celebrate their passion and the transformative impact they've had on our workflows—this is your achievement! 🎉",
      link: '/posts/2024-12-07-wrapped-2024',
      ctaText: 'See Wrapped 2024',
      bgClasses: 'bg-gradient-to-br from-fuchsia-400 to-purple-400 text-black',
    } as Highlight,
  ],
};
