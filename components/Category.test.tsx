import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryIcon } from './Category';

describe('CategoryIcon', () => {
  const categories = [
    { name: 'Task Management', testId: 'task-management-icon' },
    { name: 'File Management', testId: 'file-management-icon' },
    { name: 'Note Enhancements', testId: 'note-enhancements-icon' },
    { name: 'Data Visualization', testId: 'data-visualization-icon' },
    { name: '3rd Party Integrations', testId: 'third-party-integrations-icon' },
    { name: 'Productivity Tools', testId: 'productivity-tools-icon' },
    { name: 'Coding & Technical Tools', testId: 'coding-technical-tools-icon' },
    { name: 'Creative & Writing Tools', testId: 'creative-writing-tools-icon' },
    { name: 'Privacy & Security', testId: 'privacy-security-icon' },
    { name: 'Customization & UI', testId: 'customization-ui-icon' },
    { name: 'Collaboration & Sharing', testId: 'collaboration-sharing-icon' },
    {
      name: 'Learning & Knowledge Management',
      testId: 'learning-knowledge-management-icon',
    },
    { name: 'Miscellaneous', testId: 'miscellaneous-icon' },
    { name: 'Uncategorized', testId: 'uncategorized-icon' },
    { name: 'Unknown', testId: 'default-icon' },
  ];

  categories.forEach(({ name, testId }) => {
    test(`renders correct icon for ${name}`, () => {
      render(<CategoryIcon category={name} size={48} />);
      const icon = screen.queryByTestId(testId);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('width', '48');
      expect(icon).toHaveAttribute('height', '48');
    });
  });
});
