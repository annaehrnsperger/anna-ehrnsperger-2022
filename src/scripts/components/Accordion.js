import gsap from 'gsap';
import { select } from '../utils/helper';

export class Accordion {
  constructor(accordion) {
    this.container = accordion;
    if (!this.container) return;

    /**
     * Elements
     */
    this.accordion = {
      btn: select('[data-btn]', this.container),
      content: select('[data-content]', this.container),
    };

    /**
     * State
     */
    this.state = {
      closed: true,
    };

    this.ease = 'power2.out';
    this.duration = 0.4;

    /**
     * Events
     */
    this.handleOpen = this.handleOpen.bind(this);

    /**
     * Functions
     */
    this.init();
    this.events();
  }

  init() {
    gsap.set(this.accordion.content, {
      height: 0,
      autoAlpha: 0,
    });
  }

  handleOpen() {
    this.state.closed = !this.state.closed;

    if (!this.state.closed) {
      gsap.to(this.accordion.content, {
        height: 'auto',
        ease: this.ease,
        duration: this.duration,
      });
      gsap.to(this.accordion.content, {
        autoAlpha: 1,
        ease: this.ease,
        duration: this.duration,
        delay: 0.2,
      });
    } else {
      gsap.to(this.accordion.content, {
        autoAlpha: 0,
        ease: this.ease,
        duration: this.duration,
      });
      gsap.to(this.accordion.content, {
        height: 0,
        ease: this.ease,
        duration: this.duration,
        delay: 0.1,
      });
    }
  }

  events() {
    this.accordion.btn.addEventListener('click', this.handleOpen);
  }
}
