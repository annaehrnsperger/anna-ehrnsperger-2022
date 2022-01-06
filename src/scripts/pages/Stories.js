import { darkMode, select } from '../utils/helper';

export class Stories {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'stories') return;

    /**
     * Functions
     */
    this.init();
  }

  init() {
    darkMode(0.2);
  }
}
