import React from 'react';
import { PluginsListView } from './PluginsListView';
import EthicalAd from './EthicalAd';
import { Entity } from '@/domain/Entity';
import { PluginItem } from '@/domain/plugins/models/PluginItem';

interface IPluginsMultiViewProps {
  plugins: PluginItem[];
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
  } = props;
  const plugins = props.plugins;

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
