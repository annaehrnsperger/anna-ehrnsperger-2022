import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { darkMode, lightMode, select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Intro {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.template = select('[data-template]');

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
    gsap.registerPlugin(ScrollTrigger);

    this.animateIntro();
    this.events();
  }

  animateIntro() {
    ScrollTrigger.create({
      start: 30,
      ease: 'none',
      onEnter: () => {
        gsap.killTweensOf(this.container);
        gsap.killTweensOf('body');

        lightMode(0.9, 0.2);

        gsap.to(this.container, {
          clipPath: 'inset(0 0 100% 0)',
          ease: 'expo.inOut',
          duration: 1.2,
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(this.container);
        gsap.killTweensOf('body');

        darkMode(0.6, 0.2);

        gsap.to(this.container, {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'expo.out',
          duration: 1.2,
        });
      },
    });
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
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    window.removeEventListener('resize', this.resize);
  }
}
