import { select, selectAll } from '../utils/helper';

export class ScrollPos {
  constructor() {
    this.template = select('[data-template]');
    // if (this.template.dataset.template !== 'project') return;

    /**
     * Elements
     */
    this.projectBtn = selectAll('[data-project-overview]');

    /**
     * Functions
     */
    this.init();
  }

  init() {
    // this.events();
  }

  events() {
    this.projectBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          window.scrollTo(localStorage.getItem('scrollPos'), 0);
        }, 2000);
      });
    });
  }
}
