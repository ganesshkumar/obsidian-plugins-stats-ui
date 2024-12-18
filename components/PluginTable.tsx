import { Table } from 'flowbite-react';
import Link from 'next/link';
import moment from 'moment';
import { CategoryIcon } from './Category';

const PluginsTable = ({
  plugins,
  favorites,
  setFavorites,
  showDownloadStat = false,
  showLatestRelease = false,
  showChangelog = false,
  showDescription = true,
}) => {
  return (
    <div className="flex-col stripped">
      <Table striped>
        <Table.Head>
          <Table.HeadCell key="property-head"></Table.HeadCell>
          {plugins.map((plugin, idx) => (
            <Table.HeadCell key={`${plugin.id}-head`}>{plugin.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-description">Description</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-description`}>{plugin.description}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-createdAt">Created</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-createdAt`}>{moment(plugin.createdAt).format("DD MMM YYYY")}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-downloads">Downloads</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-downloads`}>
                <div className='flex flex-wrap gap-1'>
                  {plugin.totalDownloads.toLocaleString()}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>  
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-category">Category</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-category`}>
                <div className='flex gap-x-2 items-center'>
                  <CategoryIcon category={plugin.aiCategories} size={16} />{plugin.aiCategories}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-tags">Tags</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-tags`}>
                <div className='flex flex-wrap gap-1'>
                  {plugin.aiTags.split(',').map(t => <span className="bg-gray-100 px-2 rounded-md" key={`${plugin.id}-${t}`}>#{t}</span>)}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-long-description">Detailed Description</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-long-description`}>{plugin.aiDescription}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-author">Author</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-author`}>{plugin.author}</Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-link">Link</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-link`}>
                <Link href={`/plugins/${plugin.pluginId}`} className="underline text-blue-500" target="_blank">Open Plugin</Link>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default PluginsTable;
