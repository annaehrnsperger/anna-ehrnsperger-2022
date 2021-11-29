import gsap from 'gsap';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addClass, removeClass, select, selectAll } from '../utils/helper';

export class Nav {
  constructor() {
    this.container = select('header');
    if (!this.container) return;

    /**
     * Elements
     */
    this.logo = select('[data-header-logo]');
    this.header = {
      menuBtn: select('[data-menu-btn]', this.container),
      menuLines: selectAll('[data-menu-line]', this.container),
      navMobile: select('[data-nav-mobile]', this.container),
      navDesktop: select('[data-nav-desktop]', this.container),
      items: selectAll('[data-nav-item]', this.container),
    };

    /**
     * State
     */
    this.state = {
      isNavOpen: false,
    };

    /**
     * Events
     */
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);

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

    this.setHeaderPosition();
    this.events();
  }

  setHeaderPosition() {
    gsap.to([this.container, this.logo], {
      bottom: '33%',
      color: '#000',
      scrollTrigger: {
        scrub: 0.2,
        start: 100,
        end: '+=500',
      },
    });
  }

  handleMenuClick() {
    this.state.isNavOpen = !this.state.isNavOpen;

    this.menuAnim();
    this.handleNav();
  }

  handleNav() {
    if (this.state.isNavOpen) {
      gsap.to(this.header.navMobile, { y: 0 });
      disableBodyScroll(this.header.navMobile);
    }

    if (!this.state.isNavOpen) {
      gsap.to(this.header.navMobile, { y: '-100%' });
      enableBodyScroll(this.header.navMobile);
    }
  }

  menuAnim() {
    const first = this.header.menuLines[0];
    const middle = this.header.menuLines[1];
    const last = this.header.menuLines[2];

    const ease = 'expo.out';
    const duration = 0.4;

    if (this.state.isNavOpen) {
      gsap.to([first, last], { top: '0.75rem', ease, duration });
      gsap.to(last, { rotate: -45, ease, duration });
      gsap.to(first, { rotate: 45, ease, duration });
      gsap.to(middle, { autoAlpha: 0, ease, duration });
    }

    if (!this.state.isNavOpen) {
      gsap.to([first, last], { rotate: 0, ease, duration });
      gsap.to(first, { top: 0, ease, duration });
      gsap.to(last, { top: '1.5rem', ease, duration });
      gsap.to(middle, { autoAlpha: 1, ease, duration });
    }
  }

  resize() {}

  events() {
    this.header.menuBtn.addEventListener('click', this.handleMenuClick);

    this.header.items.forEach((item) => {
      item.addEventListener('click', () => {
        this.state.isNavOpen = false;
        this.handleNav();
        addClass(item, 'link-active');
      });
    });
  }

  destroy() {
    clearAllBodyScrollLocks();

    window.removeEventListener('resize', this.resize);
  }
}
