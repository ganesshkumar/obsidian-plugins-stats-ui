import { Tooltip } from 'flowbite-react';
import {
  CheckCircle,
  Edit,
  Folder,
  Frown,
  RefreshCw,
  Clock,
  Code,
  PieChart,
  PenTool,
  Shield,
  Sliders,
  HelpCircle,
  Users,
  Book,
  Box,
} from 'react-feather';

const Categories = [
  'Task Management',
  'File Management',
  'Note Enhancements',
  'Data Visualization',
  '3rd Party Integrations',
  'Productivity Tools',
  'Coding & Technical Tools',
  'Creative & Writing Tools',
  'Privacy & Security',
  'Customization & UI',
  'Collaboration & Sharing',
  'Learning & Knowledge Management',
  'Miscellaneous',
  'Uncategorized',
];

export const CategoryIcon = ({
  category,
  size = 48,
}: {
  category: string;
  size: number;
}) => {
  return (
    <Tooltip content={`${category} Plugin`}>
      <CategoryIconInternal category={category} size={size} />
    </Tooltip>
  );
};

const CategoryIconInternal = ({
  category,
  size = 48,
}: {
  category: string;
  size: number;
}) => {
  switch (category) {
    case 'Task Management':
      return <CheckCircle className="text-green-400" size={size} />;
    case 'File Management':
      return <Folder className="text-blue-500" size={size} />;
    case 'Note Enhancements':
      return <Edit className="text-yellow-400" size={size} />;
    case 'Data Visualization':
      return <PieChart className="text-orange-500" size={size} />;
    case '3rd Party Integrations':
      return <RefreshCw className="text-cyan-400" size={size} />;
    case 'Productivity Tools':
      return <Clock className="text-lime-400" size={size} />;
    case 'Coding & Technical Tools':
      return <Code className="text-teal-500" size={size} />;
    case 'Creative & Writing Tools':
      return <PenTool className="text-pink-400" size={size} />;
    case 'Privacy & Security':
      return <Shield className="text-gray-500" size={size} />;
    case 'Customization & UI':
      return <Sliders className="text-indigo-400" size={size} />;
    case 'Collaboration & Sharing':
      return <Users className="text-amber-400" size={size} />;
    case 'Learning & Knowledge Management':
      return <Book className="text-emerald-400" size={size} />;
    case 'Miscellaneous':
      return <Box className="text-rose-400" size={size} />;
    case 'Uncategorized':
      return <HelpCircle className="text-neutral-400" size={size} />;
    default:
      return <Frown className="text-red-400" size={size} />;
  }
};
