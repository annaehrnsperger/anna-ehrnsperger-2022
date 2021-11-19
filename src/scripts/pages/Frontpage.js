/* eslint-disable new-cap */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Frontpage {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

    /**
     * Elements
     */
    this.introContainer = select('[data-fp-intro-container]');
    this.intro = select('[data-fp-intro]');
    this.introText = select('[data-fp-intro] div');
    this.content = select('[data-fp-content]');

    /**
     * State
     */
    this.state = {};
    this.isMobile = window.innerWidth < defaultState.mobile;

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
    setTimeout(() => ScrollTrigger.refresh(), 600);

    gsap.set('body', { background: '#000' });

    this.setIntroContainerHeight();
    this.animateIntro();
    this.events();
  }

  setIntroContainerHeight() {
    gsap.set(this.introContainer, {
      height: this.introText.offsetHeight + 200,
    });
  }

  animateIntro() {
    ScrollTrigger.create({
      start: 50,
      ease: 'none',
      onEnter: () => {
        gsap.killTweensOf(this.intro);
        gsap.killTweensOf('body');

        gsap.to('body', { background: '#fff', duration: 0.3 });

        gsap.to(this.intro, {
          clipPath: 'inset(0 0 100% 0)',
          ease: 'expo.inOut',
          duration: 0.8,
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(this.intro);
        gsap.killTweensOf('body');

        gsap.to('body', { background: '#000', delay: 0.1, duration: 0.3 });

        gsap.to(this.intro, {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'expo.out',
          duration: 0.7,
        });
      },
    });
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
    this.setIntroContainerHeight();
  }

  events() {}

  destroy() {
    setTimeout(() => {
      document.body.removeAttribute('style');
    }, 1000);

    window.removeEventListener('resize', this.resize);
  }
}
