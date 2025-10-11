import React from 'react';
import { Footer } from '../../components/Footer';
import Header from '../../components/Header';
import InfoBar from '../../components/InfoBar';
import Navbar from '../../components/Navbar';
import { PluginsCache } from '../../cache/plugins-cache';
import {
  Badge,
  Button,
  Modal,
  Table,
  ToggleSwitch,
  Tooltip,
} from 'flowbite-react';
import {
  useScoreListStore,
  useScorerFormStore,
  useScorerStore,
} from '../../store/scorer-store';
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { Scorer } from '../../lib/abstractions';
import { useRouter } from 'next/router';
import { scorePlugins } from '../../lib/scorer';
import { Code, Edit, Plus, Trash2 } from 'react-feather';
import EthicalAd from '../../components/EthicalAd';

const ScorerListPage = (props) => {
  const router = useRouter();
  const [selectedScorer, setSelectedScorer] = useState<Scorer | undefined>(
    undefined
  );
  const [scorerToDelete, setScorerToDelete] = useState<Scorer | undefined>(
    undefined
  );
  const enableCustomScorer = useScorerStore(
    (state) => state.enableCustomScorer
  );
  const setEnableCustomScorer = useScorerStore(
    (state) => state.setEnableCustomScorer
  );
  const scorers = useScorerStore((state) => state.scorers);
  const activeScorerId = useScorerStore((state) => state.activeScorerId);
  const setScorerForm = useScorerFormStore((state) => state.setScorerForm);
  const setScoringStatus = useScoreListStore((state) => state.setScoringStatus);
  const setScoringProgress = useScoreListStore(
    (state) => state.setScoringProgress
  );

  const setActiveScorerId = useScorerStore((state) => state.setActiveScorerId);
  const setScores = useScoreListStore((state) => state.setScores);

  const deleteScorer = useScorerStore((state) => state.deleteScorer);

  const openScorerBuilderPage = (scorer: Scorer) => {
    setScorerForm(scorer.id, scorer.name, scorer.description, scorer.code);
    setScoringStatus('success', '');
    setScoringProgress(false, 0);
    router.push('/scorer/build');
  };

  const createNewScorer = () => {
    setScorerForm('', '', '', '');
    setScoringStatus('success', '');
    setScoringProgress(false, 0);
    router.push('/scorer/build');
  };

  const useScorer = (scorer: Scorer) => {
    const timestamp = Date.now();
    setActiveScorerId(scorer.id);
    setScoringProgress(true, 0);
    try {
      const pluginsScoreMap = scorePlugins(props.plugins, scorer);
      setScores(pluginsScoreMap, scorer.updatedAt, timestamp);
      setScoringStatus('success', 'Scoring completed successfully.');
    } catch (error) {
      setScoringStatus(
        'error',
        'Error executing the code. Fix the function and try again.'
      );
    } finally {
      setScoringProgress(false, 100);
    }
  };

  const handleDeleteScorer = (scorer: Scorer) => {
    deleteScorer(scorer.id);
    setScorerToDelete(undefined);
  };

  const toggleEnableCustomScorer = () => {
    setEnableCustomScorer(!enableCustomScorer);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...props} />
      <Navbar current="scorer" />
      <div className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
          <InfoBar title="scorer" />
          <div className="border-l-8 pl-2 border-violet-100">
            Build your own custom formula function to score the plugins.
          </div>
          <EthicalAd
            type="text"
            style="fixed-footer"
            placementId="scorers-text"
          />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mt-2">
            <ToggleSwitch
              label="Enable custom scorers"
              className="gap-x-2"
              color="purple"
              checked={enableCustomScorer}
              onChange={toggleEnableCustomScorer}
            />
            <Button
              color="dark"
              onClick={createNewScorer}
              className="w-40"
              size="sm"
            >
              <div className="flex items-center gap-x-1">
                <Plus size={16} />
                <div>Create Scorer</div>
              </div>
            </Button>
          </div>
          <Table className="mt-4 grow border-x border-gray-200 rounded-lg">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>
                <span>Actions</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Use</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {scorers.map((scorer, index) => {
                return (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {scorer.name}
                    </Table.Cell>
                    <Table.Cell>{scorer.description}</Table.Cell>
                    <Table.Cell className="w-40">
                      <div className="flex gap-x-1">
                        <Tooltip content="View Scorer">
                          <Button
                            color="light"
                            onClick={() => setSelectedScorer(scorer)}
                            size="sm"
                          >
                            <Code size={12} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Edit Scorer">
                          <Button
                            color="light"
                            onClick={() => openScorerBuilderPage(scorer)}
                            size="sm"
                          >
                            <Edit size={12} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Delete Scorer">
                          <Button
                            color="light"
                            className="bg-red-50 border-red-500"
                            onClick={() => setScorerToDelete(scorer)}
                            size="sm"
                          >
                            <Trash2 size={12} className="text-red-500" />
                          </Button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="w-28">
                      {enableCustomScorer && activeScorerId === scorer.id ? (
                        <Badge color="purple" className="flex justify-center">
                          In Use
                        </Badge>
                      ) : (
                        <Button
                          color="dark"
                          size="sm"
                          onClick={() => useScorer(scorer)}
                          disabled={!enableCustomScorer}
                        >
                          Use
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {selectedScorer && (
            <Modal
              show={!!selectedScorer}
              onClose={() => setSelectedScorer(undefined)}
            >
              <Modal.Header>
                <div>{selectedScorer.name ?? ''}</div>
                <div className="text-xs text-gray-600 font-normal">
                  {selectedScorer.name ?? ''}
                </div>
              </Modal.Header>
              <Modal.Body>
                <Editor
                  disabled={true}
                  value={'function scorePlugins(plugins, utils) {'}
                  onValueChange={() => {}}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                  className="bg-gray-200 border border-b-0 border-gray-300 rounded-t-sm"
                />
                <Editor
                  value={selectedScorer?.code ?? ''}
                  onValueChange={() => {}}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                  className="bg-gray-50 border border-t-0 border-b-0 border-gray-300"
                />
                <Editor
                  disabled={true}
                  value={'}'}
                  onValueChange={() => {}}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                  className="bg-gray-200 border border-t-0 border-gray-300 rounded-b-sm"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="gray"
                  onClick={() => setSelectedScorer(undefined)}
                >
                  Close
                </Button>
                <Button
                  color="dark"
                  onClick={() => openScorerBuilderPage(selectedScorer)}
                >
                  Edit
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {scorerToDelete && (
            <Modal
              show={!!scorerToDelete}
              onClose={() => setScorerToDelete(undefined)}
            >
              <Modal.Header> Confirm deletion </Modal.Header>
              <Modal.Body>
                Deleting "{scorerToDelete.name}" scoring function.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="gray"
                  onClick={() => setScorerToDelete(undefined)}
                >
                  Close
                </Button>
                <Button
                  color="failure"
                  onClick={() => handleDeleteScorer(scorerToDelete)}
                >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.getMetrics();
  plugins.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  const title =
    'Enhance your Obsidian experience with our curated list of plugins';
  const description =
    'Discover how to build custom scoring functions for Obsidian plugins. Enhance your productivity by creating personalized formulas to evaluate and rank plugins based on your specific needs.';
  const canonical = 'https://www.obsidianstats.com/scorer';
  const image = '/images/obsidian-stats-ogImage.png';

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema: null,
      plugins,
    },
  };
};

export default ScorerListPage;
