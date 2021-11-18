import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Template {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.elements = {};

    /**
     * State
     */
    this.state = {};
    this.isMobile = window.innerWidth < defaultState.mobile;

    /**
     * Events
     */
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.events();
  }

  setThings() {}

  setActiveThing() {}

  toggleTheThing() {}

  sendThing() {}

  updateThing() {}

  onMoveThing() {}

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
  }

  events() {}

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
