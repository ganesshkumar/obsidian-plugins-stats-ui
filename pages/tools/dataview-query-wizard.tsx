import React from 'react';
import Header, { IHeaderProps } from '../../components/Header';
import Navbar from '../../components/Navbar';

import Link from 'next/link';
import { Footer } from '../../components/Footer';
import remarkParse from 'remark-parse';
import EthicalAd from '../../components/EthicalAd';
import ResponsiveLayout from '../../pages/_responsive-layout';
import { Button } from 'flowbite-react';
import { RiOpenaiFill } from 'react-icons/ri';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Comments from '../../components/Comments';
import { Suggestions } from '../../domain/suggestions/models';
import { generateSuggestions } from '../../domain/suggestions';
import { Sidebar } from '../../components/Sidebar';

const markdown = `
## Why This Tool?

Many users have shared their struggles on Reddit:
- **Complex Syntax and Extra Effort:** Writing even simple Dataview queries often involves repeatedly checking docs and mimicking setups from other users. ([See discussion](https://www.reddit.com/r/ObsidianMD/comments/16hl907/struggling_with_dataview/))
- **Formatting Issues:** Users complain about bullet lists coming out too nested, making the output messy instead of clean lists. ([Example here](https://www.reddit.com/r/ObsidianMD/comments/159hk8x/struggling_with_lists_in_dataview_query_how_to/))
- **Linked Notes Troubles:** Another common frustration is that Dataview sometimes fails to display results when properties contain linked notes rather than plain text. ([More info](https://www.reddit.com/r/ObsidianMD/comments/1iu3k5z/why_wont_dataview_show_results_for_notes_as/))

I built the Dataview Query Wizard (a custom ChatGPT) to address these issues by harnessing a custom GPT trained on your common query patterns and frustrations.

## What does it do?

The custom GPT tool lets you simply describe your query in plain English. No more back-and-forth with documentation or copying examples from others—just type what you need, and the tool generates a ready-to-use Dataview query.

- **Natural Language Input:** Describe your desired query in everyday language. For example, type:  
  _"Show me a table of all daily notes with the #meeting tag that reference a specific note 'Project X'."_
- **Automatic Query Generation:** The tool converts your description into a proper Dataview query, so you can copy and paste it directly into your Obsidian note.
- **Instant Troubleshooting:** If your query output is not what you expected (e.g., nested bullet issues), the tool also suggests easy fixes, including helpful CSS snippets.

## How It Works?

1. **Input Your Request:** Simply type a detailed description of what you want.  
   *Example:*  
   - "List all my meeting notes that include the tag #meeting and mention [[Project X]]."
2. **Generate the Query:** The GPT tool uses its internal model—tuned with common Dataview examples and issues—to build a query that fits your setup.
3. **Apply and Fine-Tune:** You can then paste this query into your Obsidian note. If it needs any adjustments (for instance, correcting nested list outputs), you’re guided toward simple modifications and CSS tweaks.

For those curious about the custom GPT, check out the [Custom GPT for Obsidian Dataview Query Wizard](https://chatgpt.com/g/g-67f63dc319588191a4bb13d0def278b0-obsidian-dataview-query-wizard).


### Guidelines to Prompting

- Add information about your notes' frontmatter metadata that is relavant to this query.
- Add information about any inline properties that you want the query to use.
- Describe what you want the dataview to query, filter, sort etc.
- Describe the format in which you want the output to be in - TABLE, LIST, TASKS.
- If the generated dataview query fails, paste the error message back to the gpt and it should be able to improve the query.
- For advanced queries, ask the gpt to use dataviewjs (by defult it uses dataviewjs when it finds necessary)
`;

const afterCTA = `
**Examples**: Here are some of the queries that I have made on the tool. You can see the interactions.
- [How can I list all notes with a rating of 8 or higher?](https://chatgpt.com/share/67f776fe-5f84-8008-a7bc-9d00dba772f0)
- [Can you show me a table of tasks with a due date this week?](https://chatgpt.com/share/67f779a3-f698-8008-ac5a-e1d9cc2d506c)
- [What's the difference between inline fields and YAML frontmatter in Dataview?](https://chatgpt.com/share/67f77c36-89fc-8008-869c-7ea5756dc228)
- [I want to calculate how many days old each note is—how do I do that?](https://chatgpt.com/share/67f77c1f-4cf4-8008-ba1a-7c8d023f41de)

---

Using this tool means:
- **Less Time Wasting:** Spend fewer hours fretting over syntax and more time focusing on your content.
- **Reduced Frustration:** No more endless searching through documentation—get the query you need fast.
- **Enhanced Organization:** With well-structured queries, you can better manage your vault and keep your notes seamlessly interlinked.


If you’re tired of the back-and-forth hassle of writing Dataview queries and want to save time, give the Dataview Query Wizard a try. It’s built to ease your workflow and let you focus on what really matters: your ideas and insights.

Happy note-taking!

**Note**: We'd love to hear your suggestions and feedback to make this custom GPT tool even better—please share your thoughts in the comments!
`;

interface ITagsPageProps extends IHeaderProps {
  tags: string[];
  pluginCountByTags: Record<string, number>;
  contentHtml: string;
  afterCTAHtml: string;
  suggestions: Suggestions;
}

const DataviewQueryWizard = (props: ITagsPageProps) => {
  const isLessThanLarge = useIsLessThanLarge();

  const sidebar = (
    <Sidebar
      pageInfo={{ type: 'tool', slug: 'dataview-query-wizard' }}
      suggestions={props.suggestions}
    />
  );

  const ctaButton = (
    <Button color="purple" className="mt-8">
      <Link
        href="https://chatgpt.com/g/g-67f63dc319588191a4bb13d0def278b0-obsidian-dataview-query-wizard"
        className="flex gap-4 items-center"
        prefetch={false}
      >
        Chat with Wizard <RiOpenaiFill size={24} />
      </Link>
    </Button>
  );

  return (
    <div>
      <Header {...props} />
      <Navbar current="tags" />
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <div className="flex flex-col items-center lg:px-20 mb-24">
            <div className="flex justify-center">
              <span className="text-4xl 2xl:text-5xl font-bold tracking-tight mb-8 text-gray-800">
                Dataview Query Wizard
              </span>
            </div>
            <p className="text-xl max-w-lg lg:max-w-3xl text-gray-600 mt-4 text-center">
              A custom GPT that helps Obsidian users write, understand, and
              debug Dataview queries. Supports YAML, inline fields, and
              DataviewJS.
            </p>
            <p className="text-xl max-w-lg lg:max-w-3xl text-gray-600 mt-4 text-center">
              Great for creating tables, tracking tasks, filtering notes, and
              exploring metadata in your vault.
            </p>
            {ctaButton}
          </div>
          {isLessThanLarge && (
            <EthicalAd type="text" style="fixed-footer" placementId="tool-fixed-footer" />
          )}
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px]">
            <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
          </article>
          <div className="flex justify-center mt-12 mb-16">{ctaButton}</div>
          <article className="prose !max-w-none prose-img:mx-auto prose-img:max-h-[512px]">
            <div dangerouslySetInnerHTML={{ __html: props.afterCTAHtml }} />
          </article>
          <Comments />
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    //.use(rehypeToc, { headings: ['h1', 'h2', 'h3'], cssClasses:  { listItem: 'list-none [&>li>a]:no-underline'  } })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const processedContent = await processor.process(markdown);
  const processedAfterCTA = await processor.process(afterCTA);

  const contentHtml = processedContent.toString();
  const afterCTAHtml = processedAfterCTA.toString();

  const title = 'Obsidian Dataview Query Wizard';
  const description =
    'A custom GPT that helps Obsidian users write, understand, learn, and debug Obsidian Dataview queries.';
  const canonical = 'https://obsidianstats.com/tools/dataview-query-wizard';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getToolPageSchema(
    title,
    description,
    canonical,
    image
  );
  const suggestions = await generateSuggestions({
    type: 'tool',
    slug: 'dataview-query-wizard',
  });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      contentHtml,
      afterCTAHtml,
      suggestions,
    },
  };
};

export default DataviewQueryWizard;
