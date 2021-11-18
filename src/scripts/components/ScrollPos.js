import { select, selectAll } from '../utils/helper';

export class ScrollPos {
  constructor() {
    this.template = select('[data-template]');
    if (this.template.dataset.template !== 'frontpage') return;

    /**
     * Elements
     */
    this.closeBtn = selectAll('[data-close]', this.container);

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.events();
  }

  events() {
    this.closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          window.scrollTo({
            top: localStorage.getItem('scrollPos'),
            left: 0,
            behavior: 'smooth',
          });
        }, 1200);
      });
    });
  }
}

// window.addEventListener('scroll', this.trackScrollPos);

// trackScrollPos() {
//   if (this.container.length !== 0) {
//     localStorage.setItem('scrollPos', window.pageYOffset);
//   }
// }
