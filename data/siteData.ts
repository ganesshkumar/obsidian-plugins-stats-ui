import { Faq, Highlight } from '../lib/abstractions';

export const SiteData = {
  highlights: [
    {
      title: 'Obsidian Dataview Query Wizard',
      image: '',
      description:
        'Introducing the Obsidian Dataview Query Wizard, a powerful custom ChatGPT that simplifies the process of creating and modifying Dataview queries.',
      link: 'https://chatgpt.com/g/g-67f63dc319588191a4bb13d0def278b0-obsidian-dataview-query-wizard',
      ctaText: 'Try it now',
      bgClasses: 'bg-gradient-to-tr from-blue-400 to-sky-400 text-black',
    },
    {
      title: 'Introducing Custom Scoring Functions',
      image: '/images/custom-scorer-example-1.png',
      description:
        'Build your own custom score function to score the plugins. Follow the latest post for step-by-step walkthrough on creating, validating, and using custom scoring functions in Obsidian. This is still a work in progress and will be improved over time to make writing custom scorers easier 🛠️. Feel free to give your feedback and suggestions on the GitHub discussion.',
      link: '/posts/2025-01-18-building-a-custom-score-function',
      ctaText: 'Build a custom score functions',
      bgClasses: 'bg-gradient-to-tr from-green-400 to-emerald-400 text-black',
    },
    {
      title: 'New Plugin Scoring System',
      image: '/images/score-example-1.png',
      description:
        'Discover a new scoring system designed to evaluate and rank Obsidian plugins. The scoring is based on project metrics, user engagement, and activity. You can see these scores across the website on different plugin lists (such as new plugins, plugin updates, most downloaded, trending plugins) all plugins page, and plugin details pages. This is an early version of the scoring system and will be improved over time. 🚀',
      link: '/posts/2024-12-28-obsidian-plugin-scoring-system',
      ctaText: 'Learn about the scoring system',
      bgClasses: 'bg-gradient-to-tr from-fuchsia-400 to-purple-400 text-black',
    } as Highlight,
    // {
    //   title: 'Obsidian Plugin - Wrapped 2024',
    //   image: '/logo-512-removebg-preview.png',
    //   description:
    //     "2024 has been a monumental year for the Obsidian community, with over 750+ newly released plugins now shaping how we create, organize, and think. These incredible tools are a testament to the hard work, creativity, and meticulous care of our dedicated developers. Let’s take a moment to celebrate their passion and the transformative impact they've had on our workflows—this is your achievement! 🎉",
    //   link: '/posts/2024-12-07-wrapped-2024',
    //   ctaText: 'See Wrapped 2024',
    //   bgClasses: 'bg-gradient-to-br from-fuchsia-400 to-purple-400 text-black',
    // } as Highlight,
  ],
  faqs: [
    {
      question: '1. What is the source of plugin list?',
      answer:
        'The list of plugins are obtained by parsing the `community-plugins.json` file from `obsidianmd/obsidian-releases` GitHub repository.',
    } as Faq,
    {
      question: '2. What is the source of plugin description?',
      answer:
        'The description of the plugin is populated from the content corresponding to the plugin as found in `community-plugins.json` file.',
    } as Faq,
    {
      question: '3. What is the source of release changelog?',
      answer:
        'The changelog is obtained from the body of release as found in `GET /repos/{repo}/releases` API.',
    } as Faq,
    {
      question: '4. How are tags populated for a plugin?',
      answer:
        'The tags are the topics of the GitHub repo, as found in `GET /repos/{repo}` API. To populate this, you can go to the GitHub repo, click open the gear icon in the About section and update the topics.',
    } as Faq,
    {
      question: '5. How are the trending plugins calculated?',
      answer:
        'The trending plugins are calculated using the z-score obtained over the daily number of downloads - with a small delay added exponentially for the older records.',
    } as Faq,
    {
      question: '6. Other question?',
      answer:
        'If you question is not answered, please open an issue in the GitHub repository (https://github.com/ganesshkumar/obsidian-plugins-stats-ui). We would be happy to answer it for you!',
    } as Faq,
  ],
};
