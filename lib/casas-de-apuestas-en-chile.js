'use babel';

import CasasDeApuestasEnChileView from './casas-de-apuestas-en-chile-view';
import { CompositeDisposable } from 'atom';

export default {

  casasDeApuestasEnChileView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.casasDeApuestasEnChileView = new CasasDeApuestasEnChileView(state.casasDeApuestasEnChileViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.casasDeApuestasEnChileView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'casas-de-apuestas-en-chile:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.casasDeApuestasEnChileView.destroy();
  },

  serialize() {
    return {
      casasDeApuestasEnChileViewState: this.casasDeApuestasEnChileView.serialize()
    };
  },

  toggle() {
    console.log('CasasDeApuestasEnChile was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
