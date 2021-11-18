import gsap from 'gsap';
import { selectAll } from '../utils/helper';

export class Marquee {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.content = selectAll('[data-marquee-content]', this.container);

    /**
     * State
     */
    this.state = {
      duration: 15,
      ease: 'steps(15)', // 'linear'
    };

    /**
     * Functions
     */
    this.animate();
  }

  animate() {
    this.content.forEach((c) => {
      gsap.fromTo(
        c,
        {
          x: '0%',
        },
        {
          x: '-100%',
          duration: this.state.duration,
          ease: this.state.ease,
          repeat: -1,
        }
      );
    });
  }
}
