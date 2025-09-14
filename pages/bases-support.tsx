import React, { useMemo, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import InfoBar from '../components/InfoBar';
import EthicalAd from '../components/EthicalAd';
import ResponsiveLayout from './_responsive-layout';
import { Sidebar } from '../components/Sidebar';
import { generateSuggestions } from '../domain/suggestions';
import { Suggestions } from '../domain/suggestions/models';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import { GetStaticProps } from 'next';
import { useIsLessThanLarge } from '../hooks/useIsLessThanLarge';
import Comments from '../components/Comments';

type EntryType = 'plugin' | 'theme';

interface IBaseSupportEntry {
  type: EntryType;
  name: string;
  repository: string;
  repositoryUrl: string;
  firstBasesSupport: string;
  releaseUrl: string;
  confidence: number;
  explanation: string;
  addedAt: string; // ISO timestamp
}

const BASES_SUPPORT_DATA: IBaseSupportEntry[] = [
  {
    type: 'plugin',
    name: 'Excalidraw',
    repository: 'zsviczian/obsidian-excalidraw-plugin',
    repositoryUrl: 'https://github.com/zsviczian/obsidian-excalidraw-plugin',
    firstBasesSupport: '2.13.1',
    releaseUrl: 'https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.13.1',
    confidence: 95,
    explanation: "The release notes explicitly state 'Support for Obsidian bases as embeddables in Excalidraw.' This clearly adds support for Obsidian bases functionality.",
    addedAt: '2025-09-01T02:32:48.126Z',
  },
  {
    type: 'plugin',
    name: 'Supercharged Links',
    repository: 'mdelobelle/obsidian_supercharged_links',
    repositoryUrl: 'https://github.com/mdelobelle/obsidian_supercharged_links',
    firstBasesSupport: '0.13.0',
    releaseUrl: 'https://github.com/mdelobelle/obsidian_supercharged_links/releases/tag/0.13.0',
    confidence: 95,
    explanation: 'The release notes explicitly mention adding support for the new bases core plugin, indicating integration with Obsidian bases functionality.',
    addedAt: '2025-09-01T02:33:44.192Z',
  },
  {
    type: 'plugin',
    name: 'Homepage',
    repository: 'mirnovov/obsidian-homepage',
    repositoryUrl: 'https://github.com/mirnovov/obsidian-homepage',
    firstBasesSupport: '4.2.1',
    releaseUrl: 'https://github.com/mirnovov/obsidian-homepage/releases/tag/4.2.1',
    confidence: 98,
    explanation: "The release notes explicitly state ‘Add support for Obsidian's new Bases feature,’ confirming support for Obsidian bases.",
    addedAt: '2025-09-01T09:40:32.417Z',
  },
  {
    type: 'plugin',
    name: 'Self-hosted LiveSync',
    repository: 'vrtmrz/obsidian-livesync',
    repositoryUrl: 'https://github.com/vrtmrz/obsidian-livesync',
    firstBasesSupport: '0.25.9',
    releaseUrl: 'https://github.com/vrtmrz/obsidian-livesync/releases/tag/0.25.9',
    confidence: 85,
    explanation: "The notes explicitly state that the editor statusline now supports ‘Bases’, indicating added support for bases functionality.",
    addedAt: '2025-09-01T10:00:40.426Z',
  },
  {
    type: 'plugin',
    name: 'Task Genius',
    repository: 'Quorafind/Obsidian-Task-Progress-Bar',
    repositoryUrl: 'https://github.com/Quorafind/Obsidian-Task-Genius',
    firstBasesSupport: '9.8.0-beta.0',
    releaseUrl: 'https://github.com/Quorafind/Obsidian-Task-Genius/releases/tag/9.8.0-beta.0',
    confidence: 85,
    explanation: "The notes include a ‘refactor(bases): enhance Bases API compatibility and content handling’ entry, indicating work on bases support.",
    addedAt: '2025-09-01T10:53:18.169Z',
  },
  {
    type: 'plugin',
    name: 'Smart Connections',
    repository: 'brianpetro/obsidian-smart-connections',
    repositoryUrl: 'https://github.com/brianpetro/obsidian-smart-connections',
    firstBasesSupport: '3.0.45',
    releaseUrl: 'https://github.com/brianpetro/obsidian-smart-connections/releases/tag/3.0.45',
    confidence: 90,
    explanation: 'Multiple patch notes refer to “bases integration,” including improvements, new options in “bases connection score modal,” and temporary disabling of bases integration, indicating support for bases functionality.',
    addedAt: '2025-09-01T11:49:47.129Z',
  },
  {
    type: 'plugin',
    name: 'Continuous Mode',
    repository: 'gasparschott/obsidian-continuous-mode',
    repositoryUrl: 'https://github.com/gasparschott/obsidian-continuous-mode',
    firstBasesSupport: '3.4.0',
    releaseUrl: 'https://github.com/gasparschott/obsidian-continuous-mode/releases/tag/3.4.0',
    confidence: 90,
    explanation: 'The notes explicitly state “Added compatibility with base files,” indicating support for Obsidian bases functionality.',
    addedAt: '2025-09-02T08:16:38.220Z',
  },
  {
    type: 'plugin',
    name: 'Note Toolbar',
    repository: 'chrisgurney/obsidian-note-toolbar',
    repositoryUrl: 'https://github.com/chrisgurney/obsidian-note-toolbar',
    firstBasesSupport: '1.24-beta-02',
    releaseUrl: 'https://github.com/chrisgurney/obsidian-note-toolbar/releases/tag/1.24-beta-02',
    confidence: 95,
    explanation: "The release notes include a “Toolbars in Bases” feature that explicitly enables toolbars in Obsidian’s new Bases core plugin, indicating added support for Bases functionality.",
    addedAt: '2025-09-02T14:08:01.934Z',
  },
  {
    type: 'plugin',
    name: 'Iconic',
    repository: 'gfxholo/iconic',
    repositoryUrl: 'https://github.com/gfxholo/iconic',
    firstBasesSupport: '1.1.2',
    releaseUrl: 'https://github.com/gfxholo/iconic/releases/tag/1.1.2',
    confidence: 85,
    explanation: "Release notes include a bugfix for Obsidian bases (‘Bases can now be customized correctly from their tab’), indicating support for bases functionality.",
    addedAt: '2025-09-02T16:37:34.012Z',
  },
  {
    type: 'plugin',
    name: 'Modal Opener',
    repository: 'likemuuxi/obsidian-modal-opener',
    repositoryUrl: 'https://github.com/likemuuxi/obsidian-modal-opener',
    firstBasesSupport: '1.1.12',
    releaseUrl: 'https://github.com/likemuuxi/obsidian-modal-opener/releases/tag/1.1.12',
    confidence: 95,
    explanation: 'The release notes explicitly mention “Support Base card view,” indicating added support for base (database-like) functionality.',
    addedAt: '2025-09-02T19:33:50.826Z',
  },
  {
    type: 'plugin',
    name: 'GridExplorer',
    repository: 'Devon22/obsidian-gridexplorer',
    repositoryUrl: 'https://github.com/Devon22/obsidian-gridexplorer',
    firstBasesSupport: '2.9.8',
    releaseUrl: 'https://github.com/Devon22/obsidian-gridexplorer/releases/tag/2.9.8',
    confidence: 85,
    explanation: 'The notes explicitly mention “Support base … in shortcut files,” indicating addition of base (i.e. Obsidian bases) support alongside canvas.',
    addedAt: '2025-09-06T03:36:10.583Z',
  },
  {
    type: 'plugin',
    name: 'TaskNotes',
    repository: 'callumalpass/tasknotes',
    repositoryUrl: 'https://github.com/callumalpass/tasknotes',
    firstBasesSupport: '3.23.0',
    releaseUrl: 'https://github.com/callumalpass/tasknotes/releases/tag/3.23.0',
    confidence: 95,
    explanation: 'The release includes a new “Bases Plugin Integration” feature with experimental integration, formula computation, custom property support, and kanban view for the Bases plugin, indicating added support for Obsidian bases.',
    addedAt: '2025-09-11T15:08:03.450Z',
  },
  {
    type: 'theme',
    name: 'Minimal',
    repository: 'kepano/obsidian-minimal',
    repositoryUrl: 'https://github.com/kepano/obsidian-minimal',
    firstBasesSupport: '8.0.0',
    releaseUrl: 'https://github.com/kepano/obsidian-minimal/releases/tag/8.0.0',
    confidence: 95,
    explanation: 'The release notes explicitly mention initial styles and settings for Obsidian Bases.',
    addedAt: '2025-09-11T16:59:48.025Z',
  },
  {
    type: 'theme',
    name: 'Willemstad',
    repository: 'tingmelvin/willemstad-x',
    repositoryUrl: 'https://github.com/tingmelvin/willemstad-x',
    firstBasesSupport: 'v1.9.0',
    releaseUrl: 'https://github.com/tingmelvin/willemstad-x/releases/tag/v1.9.0',
    confidence: 95,
    explanation: "The notes explicitly state expanded support for the Bases core plugin (‘new look for Bases and Canvas’) under Plugin Integration.",
    addedAt: '2025-09-12T00:42:44.874Z',
  },
  {
    type: 'theme',
    name: 'Sei',
    repository: 'iwa/Sei',
    repositoryUrl: 'https://github.com/iwa/Sei',
    firstBasesSupport: '1.1.0',
    releaseUrl: 'https://github.com/iwa/Sei/releases/tag/1.1.0',
    confidence: 95,
    explanation: "The release notes include a feature commit (e02986a) explicitly stating 'add plugin core bases support,' indicating added support for Obsidian bases.",
    addedAt: '2025-09-13T08:36:18.610Z',
  },
  {
    type: 'theme',
    name: 'flexcyon',
    repository: 'bladeacer/flexcyon',
    repositoryUrl: 'https://github.com/bladeacer/flexcyon',
    firstBasesSupport: '1.0.1',
    releaseUrl: 'https://github.com/bladeacer/flexcyon/releases/tag/1.0.1',
    confidence: 90,
    explanation: 'The release notes include “Added experimental Bases style settings,” indicating support for Obsidian bases functionality (styling for bases).',
    addedAt: '2025-09-13T08:39:32.837Z',
  },
  {
    type: 'theme',
    name: 'Velocity',
    repository: 'Gonzalo-D-Sales/obsidian-velocity',
    repositoryUrl: 'https://github.com/Gonzalo-D-Sales/obsidian-velocity',
    firstBasesSupport: 'v1.0.4-alpha',
    releaseUrl: 'https://github.com/Gonzalo-D-Sales/obsidian-velocity/releases/tag/v1.0.4-alpha',
    confidence: 90,
    explanation: 'The release notes explicitly mention custom styling for the Bases core plugin, indicating added support for Obsidian bases functionality.',
    addedAt: '2025-09-13T09:16:28.269Z',
  },
];

const BasesSupportPage = (props: IHeaderProps & { suggestions: Suggestions }) => {
  const [filter, setFilter] = useState<'all' | EntryType>('all');
  const isLessThanLarge = useIsLessThanLarge();

  const sidebar = <Sidebar pageInfo={{ type: 'plugins', slug: '' }} suggestions={props.suggestions} />;

  const filtered = useMemo(() => {
    const list = BASES_SUPPORT_DATA.slice();
    const filteredByType = filter === 'all' ? list : list.filter((l) => l.type === filter);
    return filteredByType.sort((a, b) => a.name.localeCompare(b.name));
  }, [filter]);

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="plugins" />
      </div>
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <InfoBar title={`Plugins & Themes with Bases Support (${BASES_SUPPORT_DATA.length})`} />

          {isLessThanLarge && <EthicalAd type="text" style="fixed-footer" placementId="bases-support-fixed-footer" />}

          <div className="mt-4 text-sm text-gray-700 prose prose-sm max-w-none">
            <p>
              Obsidian's new <strong>Bases</strong> feature lets you treat your notes like a structured database - filter, sort and organize properties with ease. To kick things off, I've put together an <em><strong>experimental list of plugins and themes that already support Bases</strong></em>, along with the versions where support was added. This is just a starting point and I'd love your help in making it more complete. If you know of any plugins or themes with Bases support that aren't listed yet, please let me know so I can add them.
            </p>
          </div>

          <div className="my-4 flex items-center gap-x-4 text-sm font-medium">
            <span className="text-gray-500">Show:</span>
            <button
              onClick={() => setFilter('all')}
              className={`underline-offset-4 hover:underline ${filter === 'all' ? 'underline font-semibold' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('plugin')}
              className={`underline-offset-4 hover:underline ${filter === 'plugin' ? 'underline font-semibold' : ''}`}
            >
              Plugins
            </button>
            <button
              onClick={() => setFilter('theme')}
              className={`underline-offset-4 hover:underline ${filter === 'theme' ? 'underline font-semibold' : ''}`}
            >
              Themes
            </button>
          </div>

          <div className="grid gap-4 divide-y divide-gray-200">
            {filtered.map((e, idx) => (
              <div
                key={`${e.type}-${e.name}`}
                className="p-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="w-12 text-right select-none">
                    <div className="text-2xl text-gray-400 font-semibold">{String(idx + 1).padStart(2, '0')}.</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <a href={e.repositoryUrl} target="_blank" rel="noreferrer" className="text-xl font-semibold text-gray-800 hover:underline">
                          {e.name}
                        </a>
                        <div className="text-sm text-gray-700 mt-1">by <span className="text-gray-800">{e.repository.split('/')[0]}</span></div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-block text-sm font-semibold px-2 py-1 rounded-md shadow-sm ${e.type === 'plugin' ? 'bg-violet-700 text-white' : 'bg-green-700 text-white'}`}>
                          {e.type === 'plugin' ? 'Plugin' : 'Theme'}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">First support: <a href={e.releaseUrl} target="_blank" rel="noreferrer" className="underline">{e.firstBasesSupport}</a></div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <a href={e.releaseUrl} target="_blank" rel="noreferrer" className="inline-block bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-600">
                        View Release
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className='max-w-2xl mx-auto text-center mb-8'>
              <h2 className="text-lg font-semibold">Leave a Comment</h2>
              <p className="text-center text-sm text-gray-600 mt-2">
                Know a plugin or theme that supports Bases but is not listed here? Please leave a comment with the name and a link to the release notes or repository - we will review it and add it to the list.
              </p>
            </div>
            <Comments />
          </div>

        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const title = 'Plugins & Themes Supporting Bases';
  const description = 'A curated list of Obsidian plugins and themes that added support for the new Bases core plugin.';
  const canonical = 'https://www.obsidianstats.com/bases-support';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getHomePageSchema();
  const suggestions = await generateSuggestions({ type: 'plugins', slug: '' });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      suggestions,
    },
  };
};

export default BasesSupportPage;
