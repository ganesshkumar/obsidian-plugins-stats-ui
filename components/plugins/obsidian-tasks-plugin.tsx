'use client';

import React from 'react';
import { useAnalytics } from "@/lib/analytics/analytics";
import { Button, Card } from "flowbite-react";
import { RiOpenaiFill } from "react-icons/ri";
import { customCardTheme } from "./theme";

export const ObsidianTasksPluginSection = () => {
  const { trackEvent } = useAnalytics();
  
  const handleCTAButtonClick = () => {
    trackEvent('Plugin: Tasks Query Wizard CTA Button Click');
    window.open("https://chatgpt.com/g/g-68236a25c43c8191ae356408a73d2fd1-obsidian-tasks-query-wizard", "_blank");
  }

  return (
    <Card theme={customCardTheme} className="relative mt-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4 text-center max-w-xl">Tasks Query Wizard</h2>
        <p className="text-sm text-gray-600 text-center max-w-xl">Describe what you need - overdue tasks, weekly reviews, project-specific filters - and let the Query Wizard craft the query for you. No syntax memorization needed.</p>
        <Button color="purple" className="mx-auto mt-4 max-w-96 flex items-center text-center max-w-xl" onClick={handleCTAButtonClick}>
          Chat with Wizard <RiOpenaiFill className="ml-2" size={18} />
        </Button>
      </div>
    </Card>
  );
}
