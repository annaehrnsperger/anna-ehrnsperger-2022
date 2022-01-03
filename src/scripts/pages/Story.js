import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select } from '../utils/helper';

export class Story {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'story') return;

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

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
