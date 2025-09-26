import { Plugin } from 'obsidian';

export default class RatingsPlugin extends Plugin {
  settings: { token?: string; pseudoname?: string } = {};

  override async onload() {
    await this.loadSettings();

    // Command: login (simplified)
    this.addCommand({
      id: 'ratings-login',
      name: 'Login with Google',
      callback: () => console.log('Login functionality would be implemented here')
    });

    // Command: rate plugin (simplified)
    this.addCommand({
      id: 'rate-a-plugin',
      name: 'Rate a plugin…',
      callback: () => console.log('Rating functionality would be implemented here')
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData());
  }
  
  async saveSettings() { 
    await this.saveData(this.settings); 
  }
}