import { App, Notice, Plugin, requestUrl } from 'obsidian';

type PluginLite = { pluginId: string; name: string; };

export default class RatingsPlugin extends Plugin {
  settings: { token?: string; pseudoname?: string } = {};

  async onload() {
    await this.loadSettings();

    // Command: login
    this.addCommand({
      id: 'ratings-login',
      name: 'Login with Google',
      callback: () => this.beginLogin()
    });

    // Command: set pseudoname
    this.addCommand({
      id: 'ratings-pseudoname',
      name: 'Set pseudoname',
      callback: () => this.promptPseudoname()
    });

    // Command: rate current plugin (from hover/selection in UI; simplified)
    this.addCommand({
      id: 'rate-a-plugin',
      name: 'Rate a plugin…',
      callback: () => this.promptRate()
    });

    // Basic view listing installed plugins with server data
    this.registerView('ratings-view', (leaf) => new RatingsView(leaf, this));
    this.addRibbonIcon('star', 'Ratings & Reviews', () => this.activateView());

    // Handle auth callback deep link
    this.app.workspace.on('uri', async (uri) => {
      if (uri?.path?.startsWith('/auth/callback')) {
        const token = uri.getQuery('token');
        if (token) {
          this.settings.token = token;
          await this.saveSettings();
          new Notice('Logged in!');
        }
      }
    });
  }

  async beginLogin() {
    const start = await requestUrl({
      url: `${process.env.BACKEND_URL}/v1/auth/start`,
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({ redirect: 'obsidian' })
    });
    const { loginUrl } = start.json;
    // open system browser
    // @ts-ignore
    window.open(loginUrl, '_blank');
  }

  async promptPseudoname() {
    const pseudoname = prompt('Choose a pseudoname (public):');
    if (!pseudoname) return;
    await requestUrl({
      url: `${process.env.BACKEND_URL}/v1/me/pseudoname`,
      method: 'POST',
      headers: { Authorization: `Bearer ${this.settings.token}` },
      contentType: 'application/json',
      body: JSON.stringify({ pseudoname })
    });
    this.settings.pseudoname = pseudoname;
    await this.saveSettings();
    new Notice('Pseudoname saved.');
  }

  async promptRate() {
    const pluginId = prompt('Plugin ID (exact):');
    const version = prompt('Plugin version:');
    const rating = Number(prompt('Rating 1..5:'));
    const review = prompt('Optional review (<=2048 chars):') ?? undefined;
    if (!pluginId || !version || !rating) return;

    await requestUrl({
      url: `${process.env.BACKEND_URL}/v1/reviews`,
      method: 'POST',
      headers: { Authorization: `Bearer ${this.settings.token}` },
      contentType: 'application/json',
      body: JSON.stringify({ pluginId, pluginVersion: version, rating, review })
    });
    new Notice('Thanks for your review!');
  }

  /** Returns installed plugin IDs; filters server list to only those */
  getInstalledPluginIds(): string[] {
    // @ts-ignore
    const manifests = this.app.plugins?.manifests ?? {};
    return Object.keys(manifests);
  }

  async activateView() {
    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({ type: 'ratings-view', active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData());
  }
  async saveSettings() { await this.saveData(this.settings); }
}

// Minimal view implementation (pseudo)
class RatingsView {
  constructor(leaf: any, plugin: RatingsPlugin) {
    // Implementation would render installed plugins
    // and call POST /v1/plugins/lookup with {items:[{pluginId,version}]}
  }
}