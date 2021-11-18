import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select } from '../utils/helper';

export class ImgParallax {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.img = select('img', this.container);
    this.video = select('video', this.container);

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

    gsap.set(this.container, { overflow: 'hidden' });
    gsap.set(this.img ? this.img : this.video, {
      y: -350,
      transformOrigin: 'center',
    });
    this.animate();
  }

  animate() {
    gsap.to(this.img ? this.img : this.video, {
      y: 200,
      scrollTrigger: {
        trigger: this.container,
        start: 'top bottom',
        end: `+=${window.innerHeight * 2}`,
        scrub: 0.3,
      },
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
