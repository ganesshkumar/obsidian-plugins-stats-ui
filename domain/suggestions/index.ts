import { PluginsCache } from '../../cache/plugins-cache';
import { Post } from '../../lib/abstractions';
import { getSortedPostsData } from '../../lib/posts';
import { sanitizeTag } from '../../utils/plugins';
import { ToolSuggestion, PageInfo, Suggestions } from './models';

const tools: ToolSuggestion[] = [
  {
    name: 'Dataview Query Wizard',
    description: 'A GPT to help writing Dataview queries.',
    link: '/tools/dataview-query-wizard',
  },
  {
    name: 'Custom Scorer',
    description: 'Write custom scoring functions for plugins',
    link: '/scorer/build',
  },
];

const posts: Post[] = getSortedPostsData();

const getRandomTool = () => {
  const randomIndex = Math.floor(Math.random() * tools.length);
  return tools[randomIndex];
};

const canSuggestTool = (
  pageInfo: PageInfo,
  tool: ToolSuggestion,
  selectedTools: ToolSuggestion[]
): boolean => {
  const { type, slug } = pageInfo;

  // Check if the current page is the tool page itself
  if (type === 'tool' && (tool.link.split('/')[2] ?? '') === slug) return false;

  // Check if the tool is already suggested
  if (selectedTools.some((selectedTool) => selectedTool.link === tool.link))
    return false;

  return true;
};

const pickTools = (pageInfo: PageInfo, count: number): ToolSuggestion[] => {
  const selectedTools: ToolSuggestion[] = [];

  let suggestionsCount = Math.min(
    count,
    pageInfo.type === 'tool' ? tools.length - 1 : tools.length
  );

  while (selectedTools.length < suggestionsCount) {
    const tool = getRandomTool();
    if (canSuggestTool(pageInfo, tool, selectedTools)) {
      selectedTools.push(tool);
    }
  }

  return selectedTools;
};

const getRamdomPost = (candidates?: Post[]) => {
  if (!candidates || candidates.length === 0) {
    candidates = posts;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};

const canSuggestPost = (
  pageInfo: PageInfo,
  post: Post,
  selectedPosts: Post[]
): boolean => {
  const { type, slug } = pageInfo;

  // Check if the current page is the post itself
  if (type === 'post' && post.id === slug) return false;

  // Check if the post is already suggested
  if (selectedPosts.some((selectedPost) => selectedPost.id === post.id)) {
    return false;
  }

  return true;
};

const pickPosts = (pageInfo: PageInfo): Post[] => {
  const selectedPosts: Post[] = [];

  const pickPostByTag = (tag: string) => {
    const postsByTag = posts
      .filter((post) => post.tags?.includes(tag))
      .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

    if (tag === 'weekly-updates') {
      const weeklyPluginPost =
        postsByTag[0].id === pageInfo.slug ? postsByTag[1] : postsByTag[0];
      selectedPosts.push(weeklyPluginPost);
    } else {
      let postSuggestion = getRamdomPost(postsByTag);
      while (!canSuggestPost(pageInfo, postSuggestion, selectedPosts)) {
        postSuggestion = getRamdomPost(postsByTag);
      }
      selectedPosts.push(postSuggestion);
    }
  };

  ['weekly-updates', 'tip', 'workflow', 'workflow', 'feature'].forEach((tag) =>
    pickPostByTag(tag)
  );

  return selectedPosts;
};

const pickSimilarPlugins = async (pageInfo: PageInfo) => {
  const { type, slug } = pageInfo;
  const plugins = (await PluginsCache.get()) ?? [];

  const currentPlugin = plugins.find((plugin) => plugin.pluginId === slug);
  const pluginTags =
    currentPlugin?.osTags
      ?.split(',')
      ?.map((t) => t.trim())
      ?.map((t) => sanitizeTag(t)) ?? [];

  const similarPlugins = plugins.filter(
    (p) =>
      p.pluginId !== currentPlugin.pluginId &&
      p.osTags &&
      p.osTags
        .split(',')
        .map((tag) => sanitizeTag(tag))
        .some((tag) => pluginTags.includes(tag))
  );

  const suggestedPlugins = [];
  let suggestionsCount = Math.min(5, similarPlugins.length);

  while (suggestedPlugins.length < suggestionsCount) {
    const randomIndex = Math.floor(Math.random() * similarPlugins.length);
    const plugin = similarPlugins[randomIndex];
    if (!suggestedPlugins.some((p) => p.pluginId === plugin.pluginId)) {
      suggestedPlugins.push(plugin);
    }
  }

  return {
    plugins: suggestedPlugins,
    hasMore: similarPlugins.length > 5,
  };
};

export const generateSuggestions = async (
  pageInfo: PageInfo
): Promise<Suggestions> => {
  const { type, slug } = pageInfo;
  let suggestions: Suggestions;

  if (type === 'plugin') {
    const { plugins, hasMore } = await pickSimilarPlugins(pageInfo);
    return {
      tools: [],
      posts: [],
      similarPlugins: plugins,
      hasMoreSimilarPlugins: hasMore,
    };
  } else {
    const tools = pickTools(pageInfo, 1);
    const posts = pickPosts(pageInfo);

    suggestions = {
      tools: tools,
      posts: posts,
      similarPlugins: [],
      hasMoreSimilarPlugins: false,
    };
  }

  return suggestions;
};
