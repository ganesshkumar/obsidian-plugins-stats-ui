import { CustomFlowbiteTheme, Table } from 'flowbite-react';
import moment from 'moment';
import { getScoreBgClass } from '../lib/customThemes';
import { Plugin } from '@prisma/client';

const customTheme: CustomFlowbiteTheme['table'] = {
  root: {
    base: 'w-max text-left text-sm text-gray-500 dark:text-gray-400',
  },
};

interface IPluginsTableViewProps {
  plugins: Plugin[];
  showDownloadStat?: boolean;
  showDescription?: boolean;
}

export const PluginsTableView = ({
  plugins,
  showDownloadStat = false,
  showDescription = false,
}: IPluginsTableViewProps) => {
  return (
    <div className="flex-col stripped relative">
      <Table striped className="" theme={customTheme}>
        <Table.Head>
          <Table.HeadCell key="plugin-name">Name</Table.HeadCell>
          {showDownloadStat && (
            <Table.HeadCell key="plugin-downloads">Downloads</Table.HeadCell>
          )}
          <Table.HeadCell key="plugin-score">Score</Table.HeadCell>
          <Table.HeadCell key="plugin-created" className="hidden lg:table-cell">
            Created
          </Table.HeadCell>
          <Table.HeadCell key="plugin-author" className="hidden lg:table-cell">
            Author
          </Table.HeadCell>
          {showDescription && (
            <Table.HeadCell key="plugin-description">
              Description
            </Table.HeadCell>
          )}
          <Table.HeadCell key="plugin-link">Link</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {plugins.map((plugin) => (
            <Table.Row
              key={plugin.pluginId}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 w-96"
            >
              <Table.Cell key={`${plugin.pluginId}-name`}>
                {plugin.name}
              </Table.Cell>
              {showDownloadStat && (
                <Table.Cell key={`${plugin.pluginId}-downloads`}>
                  {plugin.totalDownloads.toLocaleString()}
                </Table.Cell>
              )}
              <Table.Cell key={`${plugin.pluginId}-score`}>
                {plugin.score ? 
                  <span className={getScoreBgClass(plugin.score)}>
                    {Math.round(parseFloat(plugin.score?.toFixed(4)) * 100)}
                  </span> :
                  undefined
                }                
              </Table.Cell>
              <Table.Cell
                key={`${plugin.pluginId}-created`}
                className="hidden lg:table-cell"
              >
                {moment(plugin.createdAt).fromNow()}
              </Table.Cell>
              <Table.Cell
                key={`${plugin.pluginId}-author`}
                className="hidden lg:table-cell"
              >
                {plugin.author}
              </Table.Cell>
              {showDescription && (
                <Table.Cell
                  key={`${plugin.pluginId}-description`}
                  className="max-w-lg"
                >
                  {plugin.description}
                </Table.Cell>
              )}
              <Table.Cell key={`${plugin.pluginId}-link`}>
                <a
                  href={`/plugins/${plugin.pluginId}`}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
