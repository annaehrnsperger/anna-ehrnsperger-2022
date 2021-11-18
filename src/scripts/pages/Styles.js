import defaultState from '../utils/defaultState';
import { selectAll } from '../utils/helper';

export class Styles {
  constructor() {
    /**
     * Elements
     */
    this.heights = selectAll('[data-height]');
    this.minHeights = selectAll('[data-min-height]');

    /**
     * State
     */
    this.state = {};

    /**
     * Events
     */
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.setHeight();
  }

  setHeight() {
    this.heights.forEach((page) => {
      page.style.height = `${window.innerHeight}px`;
    });

    this.minHeights.forEach((page) => {
      page.style.minHeight = `${window.innerHeight}px`;
    });
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
    this.setHeight();
  }

  events() {
    window.addEventListener('resize', this.resize);
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
