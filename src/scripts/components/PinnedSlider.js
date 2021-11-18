import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rect, select, selectAll } from '../utils/helper';

export class PinnedSlider {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.wrapper = select('[data-wrapper]', this.container);
    this.slides = selectAll('[data-slide]', this.container);

    /**
     * State
     */
    this.end = this.wrapper.scrollWidth - rect(this.container).width;

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
    this.setSlideWidth();
    this.animate();
  }

  setSlideWidth() {
    const { isSafari } = detectBrowser();

    if (!isSafari) return;

    this.slides.forEach((slide) => {
      const img = select('img', slide);

      if (img) {
        const origWidth = img.getAttribute('width');
        const origHeight = img.getAttribute('height');
        const slideHeight = slide.offsetHeight;
        const ratio = origWidth / origHeight;
        const width = slideHeight * ratio;

        gsap.set(slide, { width });
      } else {
        gsap.set(slide, { minWidth: '100vw' });
      }

      this.end = this.wrapper.scrollWidth - rect(this.container).width;
    });
  }

  animate() {
    gsap.to(this.wrapper, {
      x: this.end * -1,
      ease: 'none',
      scrollTrigger: {
        pin: true,
        trigger: this.container,
        scrub: true,
        start: 'top top',
        end: `+=${this.end}`,
      },
    });
  }

  resize() {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    this.end = this.wrapper.scrollWidth - rect(this.container).width;
    this.setSlideWidth();
    this.animate();
  }

  destroy() {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    window.removeEventListener('resize', this.resize);
  }
}
