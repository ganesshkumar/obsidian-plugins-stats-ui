import { CustomFlowbiteTheme } from 'flowbite-react';

export const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'flex rounded-lg border border-violet-500 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-center gap-0 py-5 px-5 rounded',
  },
};
