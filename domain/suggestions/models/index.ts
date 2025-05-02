import { Post } from "../../../lib/abstractions"
import { Plugin } from '@prisma/client';

export type PageInfo = {
  type: 'posts' | 'post' | 'plugins' | 'plugin' | 'tool'
  slug: string
}

export type Suggestions = {
  tools: ToolSuggestion[]
  posts: Post[]
  similarPlugins: Plugin[]
  hasMoreSimilarPlugins?: boolean
}

export type ToolSuggestion = {
  name: string
  description: string
  link: string
}
