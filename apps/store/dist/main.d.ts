import { Plugin } from 'obsidian';
export default class RatingsPlugin extends Plugin {
    settings: {
        token?: string;
        pseudoname?: string;
    };
    onload(): Promise<void>;
    loadSettings(): Promise<void>;
    saveSettings(): Promise<void>;
}
