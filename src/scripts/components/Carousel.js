import KeenSlider from 'keen-slider';
import lazySizes from 'lazysizes';
import { select, selectAll } from '../utils/helper';

// TODO add to layout
/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/keen-slider@latest/keen-slider.min.css" /> */

export class Carousel {
  constructor(carousel) {
    this.container = carousel;
    if (!this.container) return;

    /**
     * Elements
     */
    this.carousel = {
      slides: selectAll('[data-slide]', this.container),
      // count: select('[data-count]', this.container),
    };

    /**
     * State
     */
    this.state = {
      autoplayDuration: 5000,
      interval: 0,
      currSlide: '',
      direction: '',
    };

    this.ease = 'expo.out';
    this.duration = 0.6;

    /**
     * Events
     */

    /**
     * Functions
     */
    this.init();

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.initSlider();
    this.autoplay();

    lazySizes.autoSizer.checkElems();
  }

  initSlider() {
    this.keenslider = new KeenSlider(this.container, {
      loop: true,
      duration: 1000,
      move: (s) => {
        const opacities = s.details().positions.map((slide) => slide.portion);
        this.carousel.slides.forEach((element, idx) => {
          element.style.opacity = opacities[idx];
        });
      },
      created: (instance) => {
        this.state.currSlide = instance.details().relativeSlide;
        this.handleNextPrevClick(instance);
      },
      slideChanged: (instance) => {
        const { relativeSlide, direction } = instance.details();

        this.state.currSlide = relativeSlide;
        if (direction === 1) this.state.direction = 'next';
        if (direction === -1) this.state.direction = 'prev';

        this.handleNextPrevClick(instance);
        // this.updateCount(instance);
      },
    });
  }

  // autoplay() {
  //   this.state.interval = setInterval(() => {
  //     if (this.keenslider) {
  //       this.keenslider.next();
  //     }
  //   }, this.state.autoplayDuration);
  // }

  // destroyAutoplay() {
  //   clearInterval(this.state.interval);
  // }

  handleNextPrevClick(instance) {
    this.carousel.slides[this.state.currSlide].addEventListener(
      'click',
      (e) => {
        if (e.target.href) return;

        // this.destroyAutoplay();
        // this.autoplay();

        const left = e.clientX < window.innerWidth / 2;
        const right = e.clientX > window.innerWidth / 2;

        if (left) instance.prev();
        if (right) instance.next();
      }
    );
  }

  // updateCount(instance) {
  //   this.carousel.count.textContent = instance.details().relativeSlide + 1;
  // }

  destroy() {
    // this.destroyAutoplay();
    this.keenslider.destroy();
  }
}
