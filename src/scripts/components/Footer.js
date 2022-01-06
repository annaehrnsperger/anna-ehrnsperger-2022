import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { darkMode, lightMode, select } from '../utils/helper';
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
    setTimeout(() => ScrollTrigger.refresh(), 600);

    this.animateFooter();
  }

  animateFooter() {
    gsap.to(this.section, {
      clipPath: 'inset(0% 0 0% 0)',
      duration: 1,
      scrollTrigger: {
        id: 'footer',
        scrub: true,
        trigger: this.container,
        start: 'top center',
        end: `+=${this.container.offsetHeight / 2}`,
        toggleActions: 'play none none reverse',
        onEnterBack: () => {
          lightMode(0.9);
        },
      },
      onComplete: () => {
        darkMode(0.3);
      },
    });
  }

  resize() {
    ScrollTrigger.getById('footer').kill();
    this.animateFooter();
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    window.removeEventListener('resize', this.resize);
  }
}
