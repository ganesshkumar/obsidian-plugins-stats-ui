import { Plugin } from "@/domain/plugins/models/Plugin";
import { useAnalytics } from "@/lib/analytics/analytics";
import { Button, Card, CustomFlowbiteTheme } from "flowbite-react";
import { RiOpenaiFill } from "react-icons/ri";

const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    base: 'flex rounded-lg border border-violet-500 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-center gap-0 py-5 px-5 rounded',
  },
};

const DataviewSection = () => {
  const { trackEvent } = useAnalytics();
  
  const handleCTAButtonClick = () => {
    trackEvent('Dataview Query Wizard CTA Button Click');
    window.open("https://chatgpt.com/g/g-67f63dc319588191a4bb13d0def278b0-obsidian-dataview-query-wizard", "_blank");
  }

  return (
    <Card theme={customCardTheme} className="relative mt-4">
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-xl font-bold mb-4">Dataview Query Wizard</h2>
        <p className="text-sm text-gray-600"> A custom GPT that helps Obsidian users write, understand, and debug Dataview queries. </p>
        <p className="text-sm text-gray-600"> Great for creating tables, tracking tasks, filtering notes, and exploring metadata in your vault. </p>
        <p className="text-sm text-gray-600"> Supports YAML, inline fields, and DataviewJS. </p>
        <Button color="purple" className="mx-auto mt-4 max-w-96 flex items-center" onClick={handleCTAButtonClick}>
          Chat with Wizard <RiOpenaiFill className="ml-2" size={18} />
        </Button>
      </div>
    </Card>
  );
}

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
