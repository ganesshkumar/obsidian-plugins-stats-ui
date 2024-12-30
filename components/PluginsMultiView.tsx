import { List as ListIcon, Table as TableIcon } from 'react-feather';
import { PluginsListView } from './PluginsListView';
import { PluginsTableView } from './PluginsTableView';
import { CustomTheme } from '../lib/customThemes';
import { Tabs } from 'flowbite-react';
import { Plugin } from '@prisma/client';

interface IPluginsMultiViewProps {
  plugins: Plugin[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  showDownloads?: boolean;
  showDescription?: boolean;
  // view?: 'list' | 'detailed-list' | 'table' | undefined;
}

export const PluginsMultiView = ({
  plugins,
  favorites,
  setFavorites,
  showDownloads = false,
  showDescription = false,
  // view = 'list',
}: IPluginsMultiViewProps) => {
  return (
    <div className="flex-col stripped">
      {plugins && plugins.length && (
        <div className="mt-4">
          <Tabs aria-label="View" variant="underline" theme={CustomTheme.tabs}>
            <Tabs.Item active title="List" icon={ListIcon}>
              <PluginsListView
                data-testid="plugins-list-view"
                plugins={plugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDownloadStat={showDownloads}
              />
            </Tabs.Item>
            <Tabs.Item title="Table" icon={TableIcon}>
              <PluginsTableView
                data-testid="plugins-table-view"
                plugins={plugins}
                showDownloadStat={showDownloads}
                showDescription={showDescription}
              />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </div>
  );
};
