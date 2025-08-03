import React from 'react';
import { CustomFlowbiteTheme, Table } from 'flowbite-react';
import Link from 'next/link';
import moment from 'moment';
import { CategoryIcon } from './Category';

const customTheme: CustomFlowbiteTheme['table'] = {
  root: {
    base: 'w-max text-left text-sm text-gray-500 dark:text-gray-400',
  },
};

export const PluginsComparisionTable = ({ plugins }) => {
  return (
    <div className="flex-col stripped overflow-x-auto relative">
      <Table striped className="overflow-x-auto" theme={customTheme}>
        <Table.Head>
          <Table.HeadCell key="property-head"></Table.HeadCell>
          {plugins.map((plugin) => (
            <Table.HeadCell key={`${plugin.id}-head`}>
              {plugin.name}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 w-96">
            <Table.Cell key="property-description">Description</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-description`} className="w-96">
                {plugin.description}
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-createdAt">Created</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-createdAt`}>
                {moment(plugin.createdAt).format('DD MMM YYYY')}
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-downloads">Downloads</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-downloads`}>
                <div className="flex flex-wrap gap-1">
                  {plugin.totalDownloads.toLocaleString()}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-category">Category</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-category`}>
                <div className="flex gap-x-2 items-center">
                  <CategoryIcon category={plugin.osCategory} size={16} />
                  {plugin.osCategory}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-tags">Tags</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-tags`}>
                <div className="flex flex-wrap gap-1">
                  {plugin.osTags.split(',').map((t) => (
                    <span
                      className="bg-gray-100 px-2 rounded-md"
                      key={`${plugin.id}-${t}`}
                    >
                      #{t.trim()}
                    </span>
                  ))}
                </div>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-long-description">
              Detailed Description
            </Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-long-description`}>
                {plugin.osDescription}
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-author">Author</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-author`}>
                {plugin.author}
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell key="property-link">Link</Table.Cell>
            {plugins.map((plugin) => (
              <Table.Cell key={`${plugin.id}-link`}>
                <Link
                  href={`/plugins/${plugin.pluginId}`}
                  className="underline text-blue-500"
                  target="_blank"
                  prefetch={false}
                >
                  Open Plugin
                </Link>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
