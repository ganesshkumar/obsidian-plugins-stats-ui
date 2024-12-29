import { CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import { List as ListIcon, Table as TableIcon } from 'react-feather';
import NewPluginsList from './NewPluginsList';
import { PluginsTableView } from './PluginsTableView';

const customTheme: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      variant: {
        default: {
          active: {
            on: 'bg-gray-100 text-violet-600 dark:bg-gray-800 dark:text-violet-500',
          },
        },
        underline: {
          active: {
            on: 'active rounded-t-lg border-b-2 border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500',
          },
        },
      },
    },
  },
};

interface IPluginsMultiViewProps {
  plugins: any[];
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
  // view = undefined,
}) => {
  return (
    <div className="flex-col stripped">
      {plugins && plugins.length && (
        <div className="mt-4">
          <Tabs aria-label="View" variant="underline" theme={customTheme}>
            <Tabs.Item active title="List" icon={ListIcon}>
              <NewPluginsList
                plugins={plugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDownloadStat={showDownloads}
              />
            </Tabs.Item>
            <Tabs.Item title="Table" icon={TableIcon}>
              <PluginsTableView
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
