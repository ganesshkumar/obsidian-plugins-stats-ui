import { CustomFlowbiteTheme } from 'flowbite-react';

export const CustomTheme = {
  card: {
    root: {
      children: 'flex h-full flex-col justify-center gap-0 p-4 cursor-pointer',
    },
  } as CustomFlowbiteTheme['card'],
  tabs: {
    tablist: {
      tabitem: {
        variant: {
          default: {
            active: {
              on: 'bg-gray-100 text-violet-600 dark:bg-gray-800 dark:text-violet-500',
            },
          },
          underline: {
            active: {
              on: 'active rounded-t-lg border-b-2 border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500',
            },
          },
        },
      },
    },
  },
};

export const ComponentTheme = {
  mostDownloadedCardTheme: {
    root: {
      children: 'flex flex-col h-full items-center gap-0',
    },
  } as CustomFlowbiteTheme['card'],
};

export const getGraidentFrom = (index: number) => {
  if (index % 10 === 0) return 'from-blue-100';
  if (index % 10 === 1) return 'from-red-100';
  if (index % 10 === 2) return 'from-green-100';
  if (index % 10 === 3) return 'from-yellow-100';
  if (index % 10 === 4) return 'from-purple-100';
  if (index % 10 === 5) return 'from-pink-100';
  if (index % 10 === 6) return 'from-orange-100';
  if (index % 10 === 7) return 'from-teal-100';
  if (index % 10 === 8) return 'from-indigo-100';
  return 'from-gray-100';
}

export  const getGraidentTo = (index: number) => {
  if (index % 10 === 0) return 'to-pink-100';
  if (index % 10 === 1) return 'to-yellow-100';
  if (index % 10 === 2) return 'to-purple-100';
  if (index % 10 === 3) return 'to-blue-100';
  if (index % 10 === 4) return 'to-green-100';
  if (index % 10 === 5) return 'to-red-100';
  if (index % 10 === 6) return 'to-teal-100';
  if (index % 10 === 7) return 'to-indigo-100';
  if (index % 10 === 8) return 'to-orange-100';
  return 'to-brown-100';
}

export const getScoreBgClass = (score: number) => {
  let scoreClass = '';
  if (score > 0.8) {
    scoreClass = 'bg-emerald-500 text-white rounded-full p-1';
  } else if (score > 0.6) {
    scoreClass = 'bg-lime-500 text-white rounded-full p-1';
  } else if (score > 0.4) {
    scoreClass = 'bg-yellow-500 text-white rounded-full p-1';
  } else if (score > 0.2) {
    scoreClass = 'bg-amber-500 text-white rounded-full p-1';
  } else {
    scoreClass = 'bg-red-500 text-white rounded-full p-1';
  }
  return scoreClass;
};

export const getScoreTextClass = (score: number) => {
  let scoreClass = '';
  if (score > 0.8) {
    scoreClass = 'text-emerald-500';
  } else if (score > 0.6) {
    scoreClass = 'text-lime-500';
  } else if (score > 0.4) {
    scoreClass = 'text-yellow-500';
  } else if (score > 0.2) {
    scoreClass = 'text-amber-500';
  } else {
    scoreClass = 'text-red-500';
  }
  return scoreClass;
};

export const getCategoryBgClass = (category: string) => {
  switch (category) {
      case 'Task Management':
        return 'bg-green-50'
      case 'File Management':
        return 'bg-blue-50'
      case 'Note Enhancements':
        return 'bg-yellow-50'
      case 'Data Visualization':
        return 'bg-orange-50'
      case '3rd Party Integrations':
        return 'bg-cyan-50'
      case 'Productivity Tools':
        return 'bg-lime-50'
      case 'Coding & Technical Tools':
        return 'bg-teal-50'        
      case 'Creative & Writing Tools':
        return 'bg-rose-50'
      case 'Privacy & Security':
        return 'bg-gray-50'
      case 'Customization & UI':
        return 'bg-indigo-50'
      case 'Collaboration & Sharing':
        return 'bg-amber-50'
      case 'Learning & Knowledge Management':
        return 'bg-emerald-50'
      case 'Miscellaneous':
        return 'bg-rose-50'
      case 'Uncategorized':
        return 'bg-neutral-50'
      default:
        return 'bg-red-50'
    }
}
