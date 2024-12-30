import { Calendar, List, Star, Zap } from 'react-feather';

export const PostIcon = (props) => {
  if (props.tags && props.tags.includes('weekly-plugin-updates')) {
    return (
      <Calendar
        data-testid="calendar-icon"
        size={48}
        className="text-violet-700 p-1 rounded fill-violet-200"
      />
    );
  } else if (props.tags && props.tags.includes('wrapped-yearly-post')) {
    return (
      <Star
        data-testid="star-icon"
        size={48}
        className="text-yellow-400 p-1 rounded fill-yellow-200" />
    );
  } else if (props.tags && props.tags.includes('workflow')) {
    return (
      <List
        data-testid="list-icon"
        size={48} className="text-green-400 p-1 rounded fill-yellow-200" />
    );
  } else if (props.tags && props.tags.includes('feature')) {
    return (
      <Zap
        data-testid="zap-icon"
        size={48} className="text-sky-700 p-1 rounded fill-sky-200" />
    );
  } else {
    return null;
  }
};
