/* eslint-disable new-cap */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { darkMode, lightMode, select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Frontpage {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

    /**
     * Elements
     */
    this.content = select('[data-fp-content]');
    this.projects = selectAll('[data-transition="project"]');
    this.intro = {
      container: select('[data-fp-intro-container]'),
      intro: select('[data-fp-intro]'),
      textcontainer: select('[data-introtext]'),
    };

    /**
     * State
     */
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

    this.setIntroContainerHeight();
    this.animateIntro();
    this.events();
  }

  setIntroContainerHeight() {
    gsap.set(this.intro.container, {
      height: this.intro.textcontainer.offsetHeight + 200,
    });
  }

  animateIntro() {
    ScrollTrigger.create({
      start: 30,
      ease: 'none',
      onEnter: () => {
        gsap.killTweensOf(this.intro.intro);
        gsap.killTweensOf('body');

        lightMode(0.9, 0.2);

        gsap.to(this.intro.intro, {
          clipPath: 'inset(0 0 100% 0)',
          ease: 'expo.inOut',
          duration: 1.2,
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf(this.intro.intro);
        gsap.killTweensOf('body');

        darkMode(0.9, 0.2);

        gsap.to(this.intro.intro, {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'expo.out',
          duration: 1.2,
        });
      },
    });
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
    this.setIntroContainerHeight();
  }

  events() {
    this.projects.forEach((project) => {
      const more = select('[data-project-more]', project);

      project.addEventListener('mouseenter', () => {
        gsap.to(more, {
          autoAlpha: 1,
          duration: 0.15,
          ease: 'expo.inOut',
        });
      });

      project.addEventListener('mouseleave', () => {
        gsap.to(more, {
          autoAlpha: 0,
          duration: 0.15,
          ease: 'expo.inOut',
        });
      });
    });
  }

  destroy() {
    setTimeout(() => {
      document.body.removeAttribute('style');
    }, 1000);

    window.removeEventListener('resize', this.resize);
  }
}
