import { Alert, Button, Dropdown, Label, Spinner, Tabs, Textarea, TextInput } from "flowbite-react";
import { Footer } from "../../components/Footer"
import Header from "../../components/Header"
import InfoBar from "../../components/InfoBar"
import Navbar from "../../components/Navbar"
import { PluginsCache } from "../../cache/plugins-cache";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import DOMPurify from 'dompurify';
import { scorePlugins } from "../../lib/scorer";
import { useScoreListStore, useScorerFormStore, useScorerStore } from "../../store/scorer-store";
import { ScorerUtils } from "../../domain/scorer/ScorerUtils";
import { Info } from "react-feather";

const metrics = [
  'stargazers',
  'forks',
  'totalIssues',
  'closedIssues',
  'openIssues',
  'totalPR',
  'openPR',
  'closedPR',
  'mergedPR',
  'commitCountInLastYear',
  'totalDownloads',
  'lastCommitAt',
  'createdAt',
  'latestReleaseAt',
];

const ScorerBuildPage = (props) => {
  const setScorerForm = useScorerFormStore(state => state.setScorerForm);
  const setScoringStatus = useScoreListStore(state => state.setScoringStatus);
  const setScoringProgress = useScoreListStore(state => state.setScoringProgress);
  const scorers = useScorerStore(state => state.scorers);

  const name = useScorerFormStore(state => state.name);

  const createNewScorer = () => {
    setScorerForm('', '', '', '');
    setScoringStatus('success', '');
    setScoringProgress(false, 0);
  }

  const selectScorer = (scorer) => {
    setScorerForm(scorer.id, scorer.name, scorer.description, scorer.code);
    setScoringStatus('success', '');
    setScoringProgress(false, 0);
  }

  return (
    <div>
      <Header {...props} />
      <Navbar current="build-scorer" />
      <div className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
          <InfoBar title="scorer" />
          <div className="border-l-8 pl-2 border-violet-100">Build your own custom formula function to score the plugins.</div>
          <div className="flex justify-between items-center">
            <div className="mt-4 font-bold text-2xl">
              Editing "{name ? name : 'new'}" scorer function
            </div>
            <div className="flex gap-x-2 justify-end">
              <Button color="dark" onClick={createNewScorer} size="sm">New Scorer</Button>
              <Dropdown label="Select Scorer" color="dark" size="sm">
                <Dropdown.Header>
                  <TextInput placeholder="Search scorers" />
                </Dropdown.Header>
                {scorers.map(scorer => {
                  return (
                    <Dropdown.Item key={scorer.id} onClick={() => selectScorer(scorer)}>
                      {scorer.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
            </div>
          </div>
          <ScoreEditor plugins={props.plugins}/>
          <ScorerForm plugins={props.plugins} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

const ScoreEditor = ({ plugins}) => {
  const code = useScorerFormStore(state => state.code);
  const setCode = useScorerFormStore(state => state.setCode);
  const shouldValidate = useScorerFormStore(state => state.shouldValidate);
  const setShouldValidate = useScorerFormStore(state => state.setShouldValidate);
  const setValidationStatus = useScorerFormStore(state => state.setValidationStatus);
  const isValid = useScorerFormStore(state => state.isValid);
  const validationMessage = useScorerFormStore(state => state.validationMessage);
  const setSaveStatus = useScorerFormStore(state => state.setSaveStatus);

  const handleCodeChange = (code) => {
    setCode(code);
    if (!shouldValidate) {
      setValidationStatus(false, '', true);
      setSaveStatus(false, '');
    }
  }

  const handleValidate = () => {
    try {
      const sanitizedCode = DOMPurify.sanitize(code);

      // Create a new function with limited scope
      const func = new Function('plugins', 'utils', sanitizedCode);
      const plugin = plugins.find(plugin => plugin.pluginId === 'better-plugins-manager');
      const result = func([plugin], new ScorerUtils());
      const isValidResult = typeof result === 'undefined';
      if (!isValidResult) {
        setValidationStatus(false, 'Function should update the scores inplace and should not return anything.', true);
      }
      setValidationStatus(true, 'Validation passed successfully.', false);
    } catch (error) {
      setValidationStatus(false, 'Error validating the function. Fix the function and try again.', true);
      return false;
    }
  }

  return (
    <>
      <div className="flex justify-start flex-wrap gap-x-2 gap-y-1 mt-4">
        <span key="title" className="font-bold">Available plugin metrics:</span>
        {metrics.map((metric, idx) =>
          <span>
            <span key={metric} className="bg-gray-100 px-1 rounded-md">{metric}</span>
            {idx !== metrics.length - 1 ? ',': ''}
          </span>
        )}
      </div>
      <Alert color="info" icon={Info} className="mt-4">
        <span className="font-medium">Note</span>:{' '}
        We have documented types the plugins(array of <a className="underline" href="/docs/global.html#PluginMetrics">PluginMetrics</a>) and utils(<a className="underline" href="/docs/ScorerUtils.html#ScorerUtils">ScorerUtils</a>) objects in <a className="underline" href="/docs/index.html">jsdocs</a>.
      </Alert>
      <div className="mt-4 mb-2">
        <Editor
          disabled={true}
          value={'function scorePlugins(plugins, utils) {'}
          onValueChange={handleCodeChange}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
          className="bg-gray-200 border border-b-0 border-gray-300 rounded-t-sm"
        />
        <Editor
          value={code ?? ''}
          onValueChange={handleCodeChange}
          highlight={code => highlight(code, languages.js)}
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
          onValueChange={handleCodeChange}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
          className="bg-gray-200 border border-t-0 border-gray-300 rounded-b-sm"
        />
      </div>
      <div className="flex gap-x-2">
        <Button color="dark" onClick={handleValidate}>Validate</Button>   
      </div>
      {validationMessage &&
        <div className={`text-sm ${isValid ? 'text-green-500': 'text-red-500'}`}>{validationMessage}</div>
      }
    </>
  );
}

const ScorerForm = ({
  plugins,
}) => {
  const addScorer = useScorerStore(state => state.addScorer);
  const updateScorer = useScorerStore(state => state.updateScorer);
  const setActiveScorerId = useScorerStore(state => state.setActiveScorerId);

  const id = useScorerFormStore(state => state.id);
  const setId = useScorerFormStore(state => state.setId);
  const name = useScorerFormStore(state => state.name);
  const description = useScorerFormStore(state => state.description);
  const code = useScorerFormStore(state => state.code);
  const isValid = useScorerFormStore(state => state.isValid);
  const setName = useScorerFormStore(state => state.setName);
  const setDescription = useScorerFormStore(state => state.setDescription);
  const isSaved = useScorerFormStore(state => state.isSaved);
  const saveMessage = useScorerFormStore(state => state.saveMessage);
  const setSaveStatus = useScorerFormStore(state => state.setSaveStatus);

  const scoringInProgress = useScoreListStore(state => state.scoringInProgress);
  const scoringStatus = useScoreListStore(state => state.scoringStatus);
  const scoringMessage = useScoreListStore(state => state.scoringMessage);
  const setScoringProgress = useScoreListStore(state => state.setScoringProgress);
  const setScoringStatus = useScoreListStore(state => state.setScoringStatus);
  const setScores = useScoreListStore(state => state.setScores);

  const handleSave = (action: 'create' | 'update', use: boolean = false) => {
    const timestamp = Date.now();
    
    const newScorer = {
      id: action === 'create' ? `scorer-${timestamp}` : id,
      name,
      description,
      code,
      updatedAt: timestamp,
    };

    // Add to list of custom scorers and set it as active
    if (action === 'create') {
      addScorer(newScorer);
      setId(newScorer.id);
    } else {
      updateScorer(newScorer);
    }
    setSaveStatus(true, `Score function ${action === 'create' ? 'created' : 'updated'} successfully.`);

    if (use) {
      setActiveScorerId(newScorer.id);
      setScoringProgress(true, 0);
      try {
        const pluginsScoreMap = scorePlugins(plugins, newScorer);
        setScores(pluginsScoreMap, timestamp, timestamp);
        setScoringStatus('success', 'Scoring completed successfully.');
      } catch (error) {
        setScoringStatus('error', 'Error executing the code. Fix the function and try again.');
      } finally {
        setScoringProgress(false, 100);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 justify-center mt-4">
        <div>
          <Label>Scorer name</Label>
          <TextInput className="pt-0" placeholder="Function name" onChange={e => setName(e.target.value)} value={name} />
        </div>
        <div>
          <Label>Scorer description</Label>
          <Textarea placeholder="Description" onChange={e => setDescription(e.target.value)} value={description} />
        </div>
        {!id && <div className="flex gap-x-2">
          <Button color="dark" disabled={!isValid || !name || !description} onClick={() => handleSave('create')}>Create</Button>
          <Button color="dark" disabled={!isValid || !name || !description} onClick={() => handleSave('create', true)}>Create and Use</Button>
        </div>}
        {!!id && <div className="flex gap-x-2">
          <Button color="dark" disabled={!isValid || !name || !description} onClick={() => handleSave('update')}>Update</Button>
          <Button color="dark" disabled={!isValid || !name || !description} onClick={() => handleSave('update', true)}>Update and Use</Button>
        </div>}
      </div>
      { saveMessage && <div className={`${isSaved ? 'text-green-500': 'text-red-500'}`}>{saveMessage}</div> }
      { scoringInProgress && <div className="flex gap-x-2 justify-center items-center"> <Spinner aria-label="Scoring in progress" /> <div>Scoring in progress...</div> </div> }
      { scoringMessage && <div className={`${scoringStatus === 'success' ? 'text-green-500': 'text-red-500'}`}>{scoringMessage}</div> }
    </>
  )
}

export const getStaticProps = async () => { 
  const plugins = await PluginsCache.getMetrics();
  plugins.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  
  const title = 'Build and Customize Your Own Plugin Scorer - Obsidian Plugin Stats';
  const description = 'Discover how to build and customize your own plugin scorer for Obsidian. Learn to create custom scoring functions to evaluate plugins based on various metrics and enhance your Obsidian experience.';
  const canonical = 'https://www.obsidianstats.com/scorer/build';
  const image = 'https://www.obsidianstats.com/logo-512.png';

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema: null,
      plugins
    }
  };
};

export default ScorerBuildPage;
