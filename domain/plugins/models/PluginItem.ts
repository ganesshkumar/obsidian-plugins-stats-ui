export interface PluginItem {
  pluginId: string;
  name: string;
  author: string;
  createdAt: number;
  totalDownloads: number;
  repo: string;
  osCategory?: string;
  osTags?: string;
  osDescription?: string;
  description?: string;
}
