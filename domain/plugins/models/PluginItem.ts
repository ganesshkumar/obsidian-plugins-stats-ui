export interface PluginItem {
  pluginId: string;
  name: string;
  author: string;
  createdAt: number;
  totalDownloads: number;
  repo: string;
  score?: number;
  osCategory?: string;
  osTags?: string;
  osDescription?: string;
  description?: string;
}
