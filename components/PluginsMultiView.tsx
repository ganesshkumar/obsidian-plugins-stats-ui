import React from 'react';
import { List as ListIcon, Table as TableIcon } from 'react-feather';
import { PluginsListView } from './PluginsListView';
import { PluginsTableView } from './PluginsTableView';
import { CustomTheme } from '../lib/customThemes';
import { Button, Tabs } from 'flowbite-react';
import { Plugin } from '@prisma/client';
import { useCustomScoreWithScoreUpdater } from '../hooks/useCustomScoreWithScoreUpdater';
import { useState } from 'react';
import EthicalAd from './EthicalAd';

interface IPluginsMultiViewProps {
  plugins: Plugin[];
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

  const [componentView, componentSetView] = useState<'list' | 'table'>('list');
  const handleViewChange = (view: 'list' | 'table') => {
    if (setView) {
      setView(view);
    } else {
      componentSetView(view);
    }
  };

  return (
    <div className="flex-col stripped">
      <div className="pl-2 mt-2 mb-4 flex gap-x-2 items-center">
        <div className="mr-2 font-semibold">View: </div>
        <Button.Group outline>
          {' '}
          {/* View Options */}
          <Button
            color="gray"
            onClick={() => handleViewChange('list')}
            size="xs"
            className={`focus:text-gray-800 border-l rounded-l-lg ${(view !== undefined ? view : componentView) === 'list' && 'bg-violet-200'}`}
          >
            <ListIcon className="mr-3 h-4 w-4" />
            List
          </Button>
          <Button
            color="gray"
            onClick={() => handleViewChange('table')}
            size="xs"
            className={`focus:text-gray-800 border-r rounded-r-lg ${(view !== undefined ? view : componentView) === 'table' && 'bg-violet-200'}`}
          >
            <TableIcon className="mr-3 h-4 w-4" />
            Table
          </Button>
        </Button.Group>
      </div>
      <EthicalAd
        type="text"
        style="fixed-footer"
        placementId="plugins-multiview-text"
        className="horizontal"
      />
      {plugins && plugins.length && (
        <div className="mt-4">
          {(view !== undefined ? view : componentView) === 'list' ? (
            <PluginsListView
              data-testid="plugins-list-view"
              plugins={plugins}
              favorites={favorites}
              setFavorites={setFavorites}
              showDownloadStat={showDownloads}
            />
          ) : (
            <PluginsTableView
              data-testid="plugins-table-view"
              plugins={plugins}
              showDownloadStat={showDownloads}
              showDescription={showDescription}
              showCreatedAt={showCreatedAt}
              showAuthor={showAuthor}
            />
          )}
        </div>
      )}
    </div>
  );
};
