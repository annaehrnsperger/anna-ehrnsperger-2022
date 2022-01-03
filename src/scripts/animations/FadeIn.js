import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select } from '../utils/helper';

export class FadeIn {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.img = select('img', this.container);
    this.video = select('video', this.container);

    /**
     * State
     */
    this.duration = 0.3;
    this.ease = 'power4.inOut';

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

    this.initialState();
    this.animate();
  }

  initialState() {
    gsap.set(this.img || this.video, { autoAlpha: 0 });
  }

  animate() {
    gsap.to(this.img || this.video, {
      scrollTrigger: {
        trigger: this.container,
        start: 'top 70%',
        toggleActions: 'play reverse play reverse',
      },
      autoAlpha: 1,
      duration: this.duration,
      ease: this.ease,
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
