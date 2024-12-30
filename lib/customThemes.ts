import { CustomFlowbiteTheme } from 'flowbite-react';

export const CustomTheme = {
  card: {
    root: {
      children: 'flex h-full flex-col justify-center gap-0 p-4',
    },
  } as CustomFlowbiteTheme['card'],
};

export const ComponentTheme = {
  mostDownloadedCardTheme: {
    root: {
      children: 'flex h-full justify-center gap-0',
    },
  } as CustomFlowbiteTheme['card'],
};
