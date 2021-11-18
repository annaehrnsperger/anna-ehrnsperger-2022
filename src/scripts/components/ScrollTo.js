import { select, selectAll } from '../utils/helper';

export class ScrollTo {
  constructor() {
    this.container = selectAll('[data-scroll-target]');
    if (!this.container) return;

    /**
     * Elements
     */
    this.scroll = {
      btn: selectAll('[data-scroll-btn]'),
      target: selectAll('[data-scroll-target]'),
    };

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.events();
  }

  events() {
    this.scroll.btn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const currId = btn.getAttribute('data-scroll-btn');
        const target = select(`[data-scroll-target="${currId}"]`);

        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}
