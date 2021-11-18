export class BackToTop {
  constructor(btn) {
    this.container = btn;
    if (!this.container) return;

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.events();
  }

  events() {
    this.container.addEventListener('click', () =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    );
  }
}
