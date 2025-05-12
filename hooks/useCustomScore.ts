import { useEffect, useState } from 'react';
import { patchPluginsWithCustomScore } from '../lib/scorer';
import { useScoreListStore, useScorerStore } from '../store/scorer-store';
import { PluginMetrics } from '../cache/plugins-cache';
import { Plugin } from '@prisma/client';

export const useCustomScore = (initialPlugins: PluginMetrics[] | Plugin[]) => {
  const pluginsScoreMap = useScoreListStore((state) => state.scores);
  const getActiveScorer = useScorerStore((state) => state.getActiveScorer);
  const activeScorer = getActiveScorer();
  const enableCustomScorer = useScorerStore(
    (state) => state.enableCustomScorer
  );
  const [plugins, setPlugins] = useState(initialPlugins);

  useEffect(() => {
    if (enableCustomScorer && activeScorer) {
      const patchedPlugins = patchPluginsWithCustomScore(
        initialPlugins,
        pluginsScoreMap
      );
      setPlugins(patchedPlugins);
    }
  }, [pluginsScoreMap]);

  return plugins;
};
