/* eslint-disable new-cap */
import gsap from 'gsap';
import p5 from 'p5';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';
import { sketch } from '../components/P5Sketch';
import { Sketch } from '../components/Three';

export class Frontpage {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

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
    // new p5(sketch);
    // new Sketch();
    this.events();
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
  }

  events() {}

  destroy() {
    // select('.p5Canvas')?.remove();

    window.removeEventListener('resize', this.resize);
  }
}
