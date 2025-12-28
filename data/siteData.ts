import { Author, Faq } from '../lib/abstractions';

export const SiteData = {
  authors: {
    ganesshkumar: {
      slug: 'ganesshkumar',
      name: 'Ganesh Kumar',
      title: 'Creator of Obsidian Stats',
      bio: 'Ganessh Kumar R P is a software developer and a long-time Obsidian user who enjoys building tools that make knowledge management easier. After using Obsidian for several years, he gained strong hands-on experience with its plugin and theme ecosystem, both as a user and as a developer. He has built a few Obsidian plugins and created ObsidianStats to explore, track, and understand plugins and themes in one place. Through ObsidianStats, Ganessh focuses on making plugin and theme information simple and easy to access. The site helps users discover new tools, follow updates, and understand trends without going through multiple sources. His work reflects a practical approach to software development, driven by real usage and community needs.',
      avatar: '/images/authors/ganesshkumar.png',
      social: {
        website: 'https://www.ganesshkumar.com',
        twitter: 'https://x.com/ganesshkumar',
        github: 'https://github.com/ganesshkumar',
        email: 'rpganesshkumar@gmail.com',
      },
      questions: {},
    } as Author,
  },
  highlights: [
    {
      title: 'Rate Plugins with Stars ⭐',
      image: '/images/star.gif',
      description:
        "You can now rate Obsidian plugins using a 5-star rating system! This feature allows you to provide feedback on your favorite plugins and helps others discover high quality tools. Simply navigate to a plugin's detail page and select the number of stars you wish to give. Your ratings will contribute to the overall score of the plugin, making it easier for the community to find the best plugins available. Start rating today and help shape the Obsidian plugin ecosystem! 🌟",
      link: '/plugins',
      ctaText: 'Rate your favorite plugins',
      bgClasses: 'bg-linear-to-tr from-green-400 to-emerald-400 text-black',
    },
    {
      title: 'Now supporting Themes',
      image: '/images/swatch.jpg',
      description:
        'Now you can explore and discover Obsidian themes on the website! For now there is a new `/themes` page, individual page for each theme (in testing mode), and themes are also integrated into the existing `/new` page - to make new themes easier to find. More features will be added over time based on your feedback. 🎨',
      link: '/themes',
      ctaText: 'Explore Themes',
      bgClasses: 'bg-linear-to-tr from-pink-400 to-rose-400 text-black',
    },
    {
      title: 'Catalog of BETA Plugins',
      image: '/images/beta.svg',
      description:
        'I am cataloging the BETA plugins that are not yet available in the Obsidian community plugins list. If you know a BETA plugin that you would like to be listed here, please submit it using the GitHub Issue.',
      link: 'https://github.com/ganesshkumar/awesome-obsidian-beta-plugins',
      ctaText: 'Submit BETA plugins',
      bgClasses: 'bg-linear-to-tr from-blue-400 to-sky-400 text-black',
    },
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
        "Plugin descriptions are written based on the README content of each plugin's GitHub repository to provide more detailed and informative summaries. If a custom description cannot be generated from the README, we fall back to using the description from the `community-plugins.json` file.",
    } as Faq,
    {
      question: '3. What is the source of release changelog?',
      answer:
        'The changelog is obtained from the body of release as found in `GET /repos/{repo}/releases` API.',
    } as Faq,
    {
      question: '4. How are tags populated for a plugin?',
      answer:
        'Tags are manually created for each plugin at the time of plugin creation to ensure accurate categorization and discoverability.',
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
