import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { darkMode, lightMode, select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Footer {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.section = select('[data-footer-section]');

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
    // TODO
    setTimeout(() => ScrollTrigger.refresh(), 1000);

    this.animateFooter();
    this.events();
  }

  animateFooter() {
    gsap.to(this.section, {
      clipPath: 'inset(0% 0 0% 0)',
      ease: 'expo.out',
      duration: 1,
      scrollTrigger: {
        trigger: this.container,
        start: 'top 20%',
        toggleActions: 'play none none reverse',
        onLeaveBack: () => {
          lightMode(0.9);
        },
      },
      onComplete: () => {
        darkMode(0.3);
      },
    });
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
  }

  events() {}

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
