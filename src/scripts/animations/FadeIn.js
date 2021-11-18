import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class FadeIn {
  constructor({ fadein }) {
    this.container = fadein;
    if (!this.container) return;

    /**
     * Elements
     */
    this.elements = {};

    /**
     * State
     */
    this.duration = 0.4;
    this.ease = 'power1.out';

    /**
     * Events
     */
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => ScrollTrigger.refresh(), 1000);

    this.initialState();
    this.animate();
  }

  initialState() {
    gsap.set(this.container, { autoAlpha: 0, y: 50 });
  }

  animate() {
    gsap.to(this.container, {
      scrollTrigger: this.container,
      autoAlpha: 1,
      y: 0,
      duration: this.duration,
      ease: this.ease,
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
