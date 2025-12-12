import { Post } from '../../../lib/abstractions';
import { Plugin, Theme } from '@prisma/client';

export type PageInfo = {
  type:
    | 'posts'
    | 'post'
    | 'plugins'
    | 'plugin'
    | 'tool'
    | 'page'
    | 'theme'
    | 'themes';
  slug: string;
};

export type Suggestions = {
  tools: ToolSuggestion[];
  posts: Post[];
  similarPlugins: Plugin[];
  similarThemes: Theme[];
  hasMoreSimilarPlugins?: boolean;
};

export type ToolSuggestion = {
  name: string;
  description: string;
  link: string;
};
