import moment from 'moment';
import { Plugin } from '@prisma/client';

interface INewPluginProps {
  plugin: Plugin;
  showDescription?: boolean;
}

const PluginCard = ({ plugin, showDescription }: INewPluginProps) => {
  return (
    <a
      key={plugin.id}
      href={`/plugins/${plugin.pluginId}`}
      target="_blank"
      rel="noreferrer"
      className="relative flex-col justify-between group shrink-0 my-1 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 hover:bg-gray-50 bg-white text-gray-700"
    >
      <div className="text-xl font-medium uppercase tracking-wide text-violet-900">
        {plugin.name}
      </div>
      <div className="text-sm">
        <span>{moment(plugin.createdAt).fromNow()}</span> by{' '}
        <span className="group-hover:text-violet-500">{plugin.author}</span>
      </div>
      {showDescription && (
        <div className="mt-5 text-sm">{plugin.description}</div>
      )}
    </a>
  );
};

export default PluginCard;
