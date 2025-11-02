import {
  Plugin as PluginRecord,
  Theme as ThemeRecord,
} from '@prisma/client';

export enum EntityType {
  Plugin = 'plugin',
  Theme = 'theme',
}

export type Entity = 
  | {
      id: string;
      type: EntityType.Plugin;
      data: PluginRecord;
    }
  | {
      id: string;
      type: EntityType.Theme;
      data: ThemeRecord;
    };