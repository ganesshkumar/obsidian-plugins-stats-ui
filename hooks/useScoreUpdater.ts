import { useEffect, useState } from 'react';
import { scorePlugins } from '../lib/scorer';
import { useScoreListStore, useScorerStore } from '../store/scorer-store';
import { PluginMetrics } from '../cache/plugins-cache';
import { Plugin } from '@prisma/client';

export const useScoreUpdater = (initialPlugins: PluginMetrics[] | Plugin[]) => {
  const getActiveScorer = useScorerStore((state) => state.getActiveScorer);
  const activeScorer = getActiveScorer();
  const pluginsScoreMap = useScoreListStore((state) => state.scores);
  const scoringTimestamp = useScoreListStore((state) => state.scoringTimestamp);
  const setScores = useScoreListStore((state) => state.setScores);

  useEffect(() => {
    if (activeScorer) {
      const hasNewPlugins = initialPlugins.some(plugin => !pluginsScoreMap[plugin.pluginId]);
      const scoreOutdated = Date.now() - scoringTimestamp > 86400000; // Older than 24 hours

      if (hasNewPlugins || scoreOutdated) {
        console.log(`useCustomScore: Scoring plugins with custom scorer ${activeScorer.id} ${activeScorer.name}`);
        try {
          const pluginsScoreMap = scorePlugins(initialPlugins, activeScorer);
          setScores(pluginsScoreMap, activeScorer.updatedAt, Date.now());
        } catch (error) {
          console.error('Error executing code:', error);
        }
      }
    }
  }, []);
};
