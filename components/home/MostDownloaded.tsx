import { Card } from 'flowbite-react';
import { ComponentTheme } from '../../lib/customThemes';
import InfoBar from '../InfoBar';
import { LinkButton } from '../LinkButton';
import { Plugin } from '@prisma/client';

interface IMostDownloadedProps {
  plugins: Plugin[];
}

export const MostDownloadedPlugins = ({ plugins }: IMostDownloadedProps) => {
  return (
    <div className="bg-transparent mt-32">
      <div className="max-w-6xl mx-auto px-2">
        <InfoBar title="Most Downloaded" as="h2" />
        <div>
          Here are the 25 most downloaded plugins ever since the beginning of
          Obsidian Editor.
        </div>
        <div className="grid grid-cols-1 pt-5 gap-y-2">
          {plugins.slice(0, 5).map((plugin, index) => {
            return (
              <Card
                key={plugin.id}
                href={`/plugins/${plugin.pluginId}`}
                id={`most-downloaded-${index}`}
                theme={ComponentTheme.mostDownloadedCardTheme}
                className="flex"
              >
                <div className="flex flex-col w-1/6 justify-center items-center text-5xl bg-violet-50">
                  {index + 1}
                </div>
                <div className="grow flex flex-col md:flex-row md:items-center gap-x-2 my-4 rounded-tr-md pl-8">
                  <div className="text-xl uppercase tracking-wide text-violet-900 text-left">
                    {plugin.name}
                  </div>
                  <div className="text-lg text-center hidden md:block">
                    by <span>{plugin.author}</span>
                  </div>
                </div>
                <div className="w-full md:w-48 justify-start text-violet-900 items-center bg-violet-900 py-1 px-12 hidden md:flex flex-col">
                  <div className="text-3xl text-gray-100">
                    {plugin.totalDownloads.toLocaleString('en-US')}
                  </div>
                  <div className="text-lg text-gray-100">downloads</div>
                </div>
              </Card>
            );
          })}
          <LinkButton
            href="/most-downloaded"
            content={`View 25 most downloaded plugins ⟶`}
          />
        </div>
      </div>
    </div>
  );
};
