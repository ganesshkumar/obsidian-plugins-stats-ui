import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PluginEcosystemStats from './PluginEcosystemStats';

describe('PluginEcosystemStats', () => {
  const props = {
    totalPluginsCount: 100,
    newPluginsCount: 10,
    newReleasesCount: 5,
  };

  test('renders new plugins stat', () => {
    render(<PluginEcosystemStats {...props} />);
    const newPluginsStat = screen.getByText(props.newPluginsCount.toString());
    expect(newPluginsStat).toBeInTheDocument();
    expect(newPluginsStat).toHaveClass(
      'text-7xl font-bold tracking-tight text-violet-900 dark:text-white text-center'
    );
    const newPluginsTitle = screen.getByText('New Plugins');
    expect(newPluginsTitle).toBeInTheDocument();
  });

  test('renders recently updated plugins stat', () => {
    render(<PluginEcosystemStats {...props} />);
    const newReleasesStat = screen.getByText(props.newReleasesCount.toString());
    expect(newReleasesStat).toBeInTheDocument();
    expect(newReleasesStat).toHaveClass(
      'text-7xl font-bold tracking-tight text-violet-900 dark:text-white text-center'
    );
    const newReleasesTitle = screen.getByText('Recently Updated Plugins');
    expect(newReleasesTitle).toBeInTheDocument();
  });

  test('renders total plugins stat', () => {
    render(<PluginEcosystemStats {...props} />);
    const totalPluginsStat = screen.getByText(
      props.totalPluginsCount.toString()
    );
    expect(totalPluginsStat).toBeInTheDocument();
    expect(totalPluginsStat).toHaveClass(
      'text-7xl font-bold tracking-tight text-violet-900 dark:text-white text-center'
    );
    const totalPluginsTitle = screen.getByText('Total Plugins');
    expect(totalPluginsTitle).toBeInTheDocument();
  });

  test('renders correct links for stats', () => {
    render(<PluginEcosystemStats {...props} />);
    const newPluginsLink = screen.getByRole('link', { name: /New Plugins/i });
    expect(newPluginsLink).toHaveAttribute('href', '/new');
    const newReleasesLink = screen.getByRole('link', {
      name: /Recently Updated Plugins/i,
    });
    expect(newReleasesLink).toHaveAttribute('href', '/updates');
    const totalPluginsLink = screen.getByRole('link', {
      name: /Total Plugins/i,
    });
    expect(totalPluginsLink).toHaveAttribute('href', '/plugins');
  });
});
