import gsap from 'gsap';
import { darkMode, select } from '../utils/helper';

export class Project {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'project') return;

    /**
     * Elements
     */
    this.arrow = select('[data-visit-website-arrow]');
    this.link = select('[data-visit-website]');

    /**
     * Events
     */
    this.handleArrowHover = this.handleArrowHover.bind(this);
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

  resize() {
    localStorage.setItem('scrollPos', 0);
  }

  handleArrowHover(e) {
    const height = this.link.offsetHeight;
    const top = height / 3;

    if (e.pageY < top) {
      gsap.set(this.arrow, { gridColumnStart: 2 });
    } else {
      gsap.set(this.arrow, { gridColumnStart: 1 });
    }
  }

  events() {
    this.link.addEventListener('mousemove', this.handleArrowHover);
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
