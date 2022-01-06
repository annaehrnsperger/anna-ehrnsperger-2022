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
    this.setColor();
  }

  setHeaderPosition() {
    gsap.to(this.container, {
      top: '66%',
      scrollTrigger: {
        trigger: 'body',
        id: 'nav',
        scrub: 0.2,
        start: 100,
        end: '+=500',
      },
    });
  }

  setColor() {
    const isStory = this.template.dataset.template === 'story';

    const updateValues = () => {
      if (
        ScrollTrigger.isInViewport(this.footer, 0.7) ||
        (window.scrollY < 100 && !isStory)
      ) {
        gsap.to(this.container, {
          color: '#fff',
          duration: 0.1,
        });
      } else {
        gsap.to(this.container, {
          color: '#000',
          duration: 0.1,
        });
      }
    };

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: updateValues,
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
