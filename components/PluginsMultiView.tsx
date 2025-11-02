import React from 'react';
import { PluginsListView } from './PluginsListView';
import { Plugin } from '@prisma/client';
import { useCustomScoreWithScoreUpdater } from '../hooks/useCustomScoreWithScoreUpdater';
import EthicalAd from './EthicalAd';
import { Entity } from '@/domain/Entity';

interface IPluginsMultiViewProps {
  plugins: Plugin[];
  entities?: Entity[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  showDownloads?: boolean;
  showDescription?: boolean;
  showCreatedAt?: boolean;
  showAuthor?: boolean;
  view?: 'list' | 'table';
  setView?: (view: 'list' | 'table') => void;
}

export const PluginsMultiView = (props: IPluginsMultiViewProps) => {
  const {
    favorites,
    setFavorites,
    showDownloads,
    showDescription,
    showAuthor,
    showCreatedAt,
    view,
    setView,
  } = props;
  const plugins = useCustomScoreWithScoreUpdater(props.plugins);

  return (
    <div className="flex-col stripped">
      <EthicalAd
        type="text"
        style="fixed-footer"
        placementId="plugins-multiview-text"
        className="horizontal"
      />
      {plugins && plugins.length && (
        <div className="mt-4">
          <PluginsListView
            data-testid="plugins-list-view"
            plugins={plugins}
            entities={props.entities}
            favorites={favorites}
            setFavorites={setFavorites}
            showDownloadStat={showDownloads}
          />
        </div>
      )}
    </div>
  );
};
