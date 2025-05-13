import { Plugin } from "@/domain/plugins/models/Plugin";
import { DataviewSection } from "./dataview";
import { ObsidianTasksPluginSection } from "./obsidian-tasks-plugin";

const PluginSpecificComponentMap = {
  'dataview': <DataviewSection />,
  'obsidian-tasks-plugin': <ObsidianTasksPluginSection />
}

interface IPluginSectionProps {
  plugin: Plugin
}

export const PluginSection = ({plugin}: IPluginSectionProps) => {
  const content = PluginSpecificComponentMap[plugin.pluginId];
  return (
    <section>
      {!!content && content}
    </section>
  );
}
