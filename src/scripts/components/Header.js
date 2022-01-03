import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select } from '../utils/helper';

export class Header {
  constructor() {
    this.container = select('header');
    if (!this.container) return;

    /**
     * Elements
     */
    this.template = select('[data-template]');
    this.footer = select('footer');

    /**
     * State
     */
    this.state = {
      isNavOpen: false,
    };

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
    setTimeout(() => ScrollTrigger.refresh(), 600);

    this.setHeaderPosition();
    this.setFooterColor();
  }

  setHeaderPosition() {
    gsap.to(this.container, {
      top: '66%',
      color: '#000',
      scrollTrigger: {
        trigger: 'body',
        id: 'nav',
        scrub: 0.2,
        start: 100,
        end: '+=500',
      },
    });
  }

  setFooterColor() {
    gsap.to(this.container, {
      color: '#fff',
      duration: 0.2,
      scrollTrigger: {
        trigger: this.footer,
        start: 'center 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    localStorage.removeItem('theme');
  }
}
