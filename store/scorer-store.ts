import { create } from 'zustand'
import { Scorer } from '../lib/abstractions'
import { persist } from 'zustand/middleware'

export interface IScorerStore {
  enableCustomScorer: boolean;
  setEnableCustomScorer: (enableCustomScorer: boolean) => void;
  activeScorerId: string;
  setActiveScorerId: (scorerId: string) => void;
  scorers: Scorer[];
  addScorer: (scorer: Scorer) => void;
  updateScorer: (scorer: Scorer) => void;
  deleteScorer: (scorerId: string) => void;
  getScorer: (id: string) => Scorer | undefined;
  getActiveScorer: () => Scorer | undefined;
}

export const useScorerStore = create<IScorerStore>()(
  persist(
    (set, get) => ({
      enableCustomScorer: false,
      setEnableCustomScorer: (enableCustomScorer: boolean) => set({ enableCustomScorer }),
      activeScorerId: 'default',
      scorerFormData: undefined,
      scorers: [],
      addScorer: (scorer: Scorer) => {
        const scorers = get().scorers;
        if (scorers.find(s => s.id === scorer.id)) {
          return;
        }

        scorers.push(scorer);
        set({
          scorers: [...scorers]
        });
      },
      updateScorer: (scorer: Scorer) => {
        const scorers = get().scorers;

        const oldScorer = scorers.find(s => s.id === scorer.id);
        if (!oldScorer) {
          return;
        }

        oldScorer.name = scorer.name;
        oldScorer.description = scorer.description;
        oldScorer.code = scorer.code;
        oldScorer.updatedAt = scorer.updatedAt;

        set({
          scorers: [...scorers]
        });
      },
      deleteScorer: (scorerId) => {
        const scorers = get().scorers;
        const updatedScorers = scorers.filter(scorer => scorer.id !== scorerId);
        set({ scorers: updatedScorers });
      },
      getActiveScorer: () => {
        const scorerId = get().activeScorerId;
        return get().scorers.find(s => s.id === scorerId);
      },
      getScorer: (scorerId: string) => {
        return get().scorers.find(scorer => scorer.id === scorerId);
      },
      setActiveScorerId: (scorerId: string) => set({ activeScorerId: scorerId }),
    }),
    {
      name: 'scorerStore',
    }
  )
);

export interface IScorerFormStore {
  id: string;
  setId: (id: string) => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  code: string;
  setCode: (code: string) => void;
  shouldValidate: boolean;
  setShouldValidate: (shouldValidate: boolean) => void;
  isValid: boolean;
  validationMessage: string;
  setValidationStatus: (isValid: boolean, validationMessage: string, shouldValidate?: boolean) => void;
  isSaved: boolean;
  saveMessage: string;
  setSaveStatus: (isSaved: boolean, saveMessage: string) => void;
  setScorerForm: (id: string, name: string, description: string, code: string) => void
}

export const useScorerFormStore = create<IScorerFormStore>()(
  persist(
    (set, get) => ({
      id: '',
      setId: (id: string) => set({ id }),
      name: '',
      setName: (name: string) => set({ name }),
      description: '',
      setDescription: (description: string) => set({ description }),
      code: '',
      setCode: (code: string) => set({ code }),
      shouldValidate: false,
      setShouldValidate: (shouldValidate: boolean) => set({ shouldValidate }),
      isValid: false,
      validationMessage: '',
      setValidationStatus: (isValid: boolean, validationMessage: string, shouldValidate?: boolean) => set({
        isValid, validationMessage,
        shouldValidate: !!shouldValidate,
      }),
      isSaved: false,
      saveMessage: '',
      setSaveStatus: (isSaved: boolean, saveMessage: string) => set({ isSaved, saveMessage }),
      setScorerForm(id, name, description, code) {
        set({
          id, name, description, code,
          shouldValidate: true,
          isValid: false,
          validationMessage: '',
          isSaved: false,
          saveMessage: ''
        })
      },
    }),
    {
      name: 'scorerFormStore',
    }
  )
);

export interface IScoreListStore {
  scores: Record<string, number>;
  scorerTimestamp: number;
  scoringTimestamp: number;
  setScores: (scores: Record<string, number>, scorerTimestamp: number, scoringTimestamp: number) => void;
  setScore: (pluginId: string, score: number) => void;
  scoringStatus: 'success' | 'error' | 'in-progress';
  scoringMessage: string;
  setScoringStatus: (scoringStatus: 'success' | 'error' | 'in-progress', scoringMessage: string) => void;
  scoringInProgress: boolean;
  scoringProgress: number;
  setScoringProgress: (scoringInProgress: boolean, scoringProgress: number) => void;
}

export const useScoreListStore = create<IScoreListStore>()(
  persist(
    (set, get) => ({
      scores: {},
      scorerTimestamp: 0,
      scoringTimestamp: 0,
      setScores: (scores, scorerTimestamp, scoringTimestamp) => set({ scores, scorerTimestamp, scoringTimestamp }),
      setScore: (pluginId, score) => {
        const scores = get().scores;
        scores[pluginId] = score;
        set({ scores });
      },
      scoringStatus: 'success',
      scoringMessage: '',
      setScoringStatus: (scoringStatus, scoringMessage) => set({ scoringStatus, scoringMessage }),
      scoringInProgress: false,
      scoringProgress: 0,
      setScoringProgress: (scoringInProgress, scoringProgress) => set({ scoringInProgress, scoringProgress }),
    }),
    {
      name: 'scoreListStore',
    }
  )
);
