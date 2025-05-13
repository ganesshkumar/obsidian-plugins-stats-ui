'use client';

import { useAnalytics } from "@/lib/analytics/analytics";
import { Button, Card } from "flowbite-react";
import { RiOpenaiFill } from "react-icons/ri";
import { customCardTheme } from "./theme";

export const DataviewSection = () => {
  const { trackEvent } = useAnalytics();
  
  const handleCTAButtonClick = () => {
    trackEvent('Plugin: Dataview Query Wizard CTA Button Click');
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
