import { Plugin as PluginRecord } from '@prisma/client';
import { PluginRatingInfo } from './PluginRatingInfo';

export type Plugin = PluginRecord & {
  pluginRatingInfo?: PluginRatingInfo
}
