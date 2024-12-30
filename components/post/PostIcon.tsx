import { Calendar, List, Star, Zap } from 'react-feather';

export const PostIcon = (props) => {
  if (props.tags && props.tags.includes('weekly-plugin-updates')) {
    return (
      <Calendar
        size={48}
        className="text-violet-700 p-1 rounded fill-violet-200"
      />
    );
  } else if (props.tags && props.tags.includes('wrapped-yearly-post')) {
    return (
      <Star size={48} className="text-yellow-400 p-1 rounded fill-yellow-200" />
    );
  } else if (props.tags && props.tags.includes('workflow')) {
    return (
      <List size={48} className="text-green-400 p-1 rounded fill-yellow-200" />
    );
  } else if (props.tags && props.tags.includes('feature')) {
    return <Zap size={48} className="text-sky-700 p-1 rounded fill-sky-200" />;
  } else {
    return undefined;
  }
};
