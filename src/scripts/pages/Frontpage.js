import gsap from 'gsap';
import { darkMode, select, selectAll } from '../utils/helper';

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
      textcontainer: select('[data-introtext]'),
    };

    /**
     * Events
     */
    this.trackScrollPos = this.trackScrollPos.bind(this);
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('scroll', this.trackScrollPos);
    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.setIntroContainerHeight();
    this.events();
  }

  setIntroContainerHeight() {
    gsap.set(this.intro.container, {
      height: this.intro.textcontainer.offsetHeight + 200,
    });
  }

  trackScrollPos() {
    localStorage.setItem('scrollPos', window.pageYOffset);
  }

  resize() {
    localStorage.setItem('scrollPos', 0);

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
    darkMode();

    window.removeEventListener('scroll', this.trackScrollPos);
    window.removeEventListener('resize', this.resize);
  }
}
