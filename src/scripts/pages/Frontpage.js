import gsap from 'gsap';
import { darkMode, select, selectAll } from '../utils/helper';

export class Frontpage {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

    /**
     * Elements
     */
    this.workBtn = select('[data-nav-work]');
    this.projects = selectAll('[data-preview-project]');

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
    this.events();
  }

  trackScrollPos() {
    localStorage.setItem('scrollPos', window.pageYOffset);
  }

  resize() {
    localStorage.setItem('scrollPos', 0);
  }

  handleScrollDown(e) {
    e.preventDefault();
    window.scrollTo({ left: 0, top: window.innerHeight, behavior: 'smooth' });
  }

  events() {
    this.workBtn.addEventListener('click', this.handleScrollDown);

    this.projects.forEach((project) => {
      const more = project.nextElementSibling;

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

    this.workBtn.removeEventListener('click', this.handleScrollDown);
    window.removeEventListener('scroll', this.trackScrollPos);
    window.removeEventListener('resize', this.resize);
  }
}
