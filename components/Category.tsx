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
      return (
        <CheckCircle
          className="text-green-400"
          size={size}
          data-testid="task-management-icon"
        />
      );
    case 'File Management':
      return (
        <Folder
          className="text-blue-500"
          size={size}
          data-testid="file-management-icon"
        />
      );
    case 'Note Enhancements':
      return (
        <Edit
          className="text-yellow-400"
          size={size}
          data-testid="note-enhancements-icon"
        />
      );
    case 'Data Visualization':
      return (
        <PieChart
          className="text-orange-500"
          size={size}
          data-testid="data-visualization-icon"
        />
      );
    case '3rd Party Integrations':
      return (
        <RefreshCw
          className="text-cyan-400"
          size={size}
          data-testid="third-party-integrations-icon"
        />
      );
    case 'Productivity Tools':
      return (
        <Clock
          className="text-lime-400"
          size={size}
          data-testid="productivity-tools-icon"
        />
      );
    case 'Coding & Technical Tools':
      return (
        <Code
          className="text-teal-500"
          size={size}
          data-testid="coding-technical-tools-icon"
        />
      );
    case 'Creative & Writing Tools':
      return (
        <PenTool
          className="text-pink-400"
          size={size}
          data-testid="creative-writing-tools-icon"
        />
      );
    case 'Privacy & Security':
      return (
        <Shield
          className="text-gray-500"
          size={size}
          data-testid="privacy-security-icon"
        />
      );
    case 'Customization & UI':
      return (
        <Sliders
          className="text-indigo-400"
          size={size}
          data-testid="customization-ui-icon"
        />
      );
    case 'Collaboration & Sharing':
      return (
        <Users
          className="text-amber-400"
          size={size}
          data-testid="collaboration-sharing-icon"
        />
      );
    case 'Learning & Knowledge Management':
      return (
        <Book
          className="text-emerald-400"
          size={size}
          data-testid="learning-knowledge-management-icon"
        />
      );
    case 'Miscellaneous':
      return (
        <Box
          className="text-rose-400"
          size={size}
          data-testid="miscellaneous-icon"
        />
      );
    case 'Uncategorized':
      return (
        <HelpCircle
          className="text-neutral-400"
          size={size}
          data-testid="uncategorized-icon"
        />
      );
    default:
      return (
        <Frown
          className="text-red-400"
          size={size}
          data-testid="default-icon"
        />
      );
  }
};
