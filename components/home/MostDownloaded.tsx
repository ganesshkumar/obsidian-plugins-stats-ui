import InfoBar from '../InfoBar';
import { LinkButton } from '../LinkButton';
import { Plugin } from '@prisma/client';
import { Download } from 'react-feather';
import { useRouter } from 'next/router';
import { useAnalytics } from '../../lib/analytics/analytics';

interface IMostDownloadedProps {
  overall: Plugin[];
  last7Days: Plugin[];
  last30Days: Plugin[];
}

export const MostDownloadedPlugins = ({ overall, last7Days, last30Days }: IMostDownloadedProps) => {
  return (
    <div className="bg-transparent mt-32" id='most-downloaded'>
      <div className="max-w-6xl mx-auto px-2">
        <InfoBar title="Most Downloaded" as="h2" />
        <div className="grid grid-cols-1 lg:grid-cols-3 pt-5 gap-4">
          <List plugins={overall} title="Overall" />
          <List plugins={last30Days} title="Last 30 days" />
          <List plugins={last7Days} title="Last 7 days" />
        </div>
        <div className='mt-4'>
          <LinkButton
            href="/most-downloaded"
            content={`View 25 most downloaded plugins ⟶`}
          />
        </div>
      </div>
    </div>
  );
};

const List = ({ plugins, title }) => {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handlePluginClick = (pluginId: string) => {
    trackEvent(`Home Most Downloaded Plugin Card Click`);
    router.push(`/plugins/${pluginId}`);
  }

  return (
    <div className='grid grid-cols-1 content-center border border-gray-700'>
      <div className='text-center font-bold text-xl bg-violet-500 text-slate-100'>{title}</div>
      {plugins.map((plugin, index) => {
        return (
          <div
            key={plugin.id}
            onClick={() => handlePluginClick(plugin.pluginId)}
            id={`most-downloaded-${index}`}
            //theme={ComponentTheme.mostDownloadedCardTheme}
            className={`flex justify-between w-full ${index % 2 === 0 ? 'bg-tranparent' : 'bg-gray-100'} cursor-pointer`}
          >
            <div className='flex justify-start gap-x-2 w-full px-1'>
              <div className="text">
                {index + 1}.{' '}
              </div>
              <div className="text text-violet-900 text-left">
                {plugin.name}
              </div>
            </div>
            <div className="w-1/5 text-violet-900 py-1 px-12 hidden md:flex justify-center">
              <div className="text-sm text-gray-800 flex items-center gap-2">
                <Download size={12} /> {plugin.totalDownloads.toLocaleString('en-US')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}