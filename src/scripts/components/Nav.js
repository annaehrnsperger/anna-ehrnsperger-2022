import gsap from 'gsap';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { addClass, removeClass, select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

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
      navMobile: select('[data-nav-mobile]', this.container),
      navDesktop: select('[data-nav-desktop]', this.container),
      items: selectAll('[data-nav-item]', this.container),
    };

    /**
     * State
     */
    // this.isMobile = window.innerWidth < defaultState.mobile;
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
    // this.events();
  }

  setHeaderPosition() {
    gsap.to([this.container, this.logo, this.header.menuBtn], {
      bottom: '33%',
      color: '#000',
      scrollTrigger: {
        trigger: 'body',
        id: 'nav',
        scrub: 0.2,
        start: 100,
        end: '+=500',
        onEnter: () => {
          localStorage.setItem('theme', 'light');
        },
        onLeaveBack: () => {
          localStorage.setItem('theme', 'dark');
        },
      },
    });
  }

  handleMenuClick() {
    this.state.isNavOpen = !this.state.isNavOpen;

    this.handleNav();
  }

  handleNav() {
    if (this.state.isNavOpen) {
      gsap.to(this.header.menuBtn, {
        textContent: 'Close',
        delay: 0.3,
        duration: 0.1,
        color: localStorage.getItem('theme') === 'light' ? '#fff' : '#000',
      });

      gsap.fromTo(
        this.header.navMobile,
        {
          y: '100%',
        },
        {
          y: 0,
          duration: 0.6,
          ease: 'expo.inOut',
        }
      );

      gsap.set('body', {
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      });

      disableBodyScroll(this.header.navMobile);
      disableBodyScroll(this.header.menuBtn);
    }

    if (!this.state.isNavOpen) {
      gsap.to(this.header.menuBtn, {
        textContent: 'Menu',
        duration: 0.1,
        delay: 0.2,
        color: localStorage.getItem('theme') === 'light' ? '#000' : '#fff',
      });

      gsap.to(this.header.navMobile, {
        y: '-100%',
        duration: 0.6,
        ease: 'expo.inOut',
      });

      document.body.removeAttribute('style');

      enableBodyScroll(this.header.navMobile);
      enableBodyScroll(this.header.menuBtn);
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
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    clearAllBodyScrollLocks();

    window.removeEventListener('resize', this.resize);
  }
}
