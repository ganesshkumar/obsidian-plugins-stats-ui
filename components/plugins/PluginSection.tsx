import { Plugin } from "@/domain/plugins/models/Plugin";
import { DataviewSection } from "./dataview";

const PluginSpecificComponentMap = {
  'dataview': <DataviewSection />,
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
