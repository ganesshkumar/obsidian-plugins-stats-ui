import DOMPurify from 'dompurify';
import { PluginMetrics } from '../cache/plugins-cache';
import { Plugin } from '@prisma/client';
import { Scorer } from './abstractions';
import { ScorerUtils } from '../domain/scorer/ScorerUtils';

export const scorePlugins = (plugins: PluginMetrics[] | Plugin[], scorer: Scorer): Record<string, number> => {
  try {
    const { code } = scorer;
    const sanitizedCode = DOMPurify.sanitize(code);

    const func = new Function('plugins', 'utils', sanitizedCode);
    const timeout = setTimeout(() => {
      throw new Error('Code execution timed out');
    }, 60000);
    func(plugins, new ScorerUtils());
    clearTimeout(timeout);

    const pluginScoreMap = plugins.map(plugin => {
      return {
        pluginId: plugin.pluginId,
        score: plugin.score,
      }
    }).reduce((acc, curr) => {
      acc[curr.pluginId] = curr.score;
      return acc;
    }, {});

    return pluginScoreMap;
  } catch (error) {
    console.error('Error executing code:', error);
    throw new Error('Error executing code');
  }
}

export const patchPluginsWithCustomScore = (plugins: PluginMetrics[] | Plugin[], pluginScoreMap: Record<string, number>) => {
    const patchedPlugins = plugins.map(plugin => {
      const score = pluginScoreMap[plugin.pluginId];
      if (score !== undefined) {
        return {
          ...plugin,
          score: score,
        }
      }
      return {
        ...plugin
      };
    });

    return patchedPlugins;
}

export const hasCustomScorer = (): boolean => {
  const pluginsScoreStr = localStorage.getItem("customScoreFunction");
  return !!pluginsScoreStr;
}