import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select, selectAll } from '../utils/helper';

export class Story {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'story') return;

    /**
     * Elements
     */
    this.sections = select('[data-story-content]');
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

    this.animateMedia();
    this.animateContent();
  }

  animateMedia() {
    const media = select('[data-story-media]');
    const img = select('img', media);
    const video = select('video', media);

    gsap.to(img || video, {
      autoAlpha: 1,
    });

    ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 900px)': function () {
        gsap.to(media, {
          height: '33vw',
        });
      },

      // mobile
      '(max-width: 899px)': function () {
        gsap.to(media, {
          height: '80.5vw',
        });
      },
    });
  }

  animateContent() {
    gsap.to(this.sections, {
      autoAlpha: 1,
      delay: 0.45,
      ease: 'power4.out',
      duration: 0.3,
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
