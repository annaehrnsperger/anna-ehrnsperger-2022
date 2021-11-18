import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Filter {
  constructor(filter) {
    this.container = filter;
    if (!this.container) return;

    /**
     * Elements
     */
    this.filter = {
      categories: selectAll('[data-filter-category]', this.container),
      items: selectAll('[data-filter-item]'),
    };

    /**
     * State
     */
    this.state = {};
    this.isMobile = window.innerWidth < defaultState.mobile;

    /**
     * Events
     */
    this.changeCategory = this.changeCategory.bind(this);
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
    this.initialState();
    this.events();
  }

  initialState() {
    const categories = [];
    this.filter.categories.forEach((category) => {
      categories.push(category.dataset.filterCategory);

      // eslint-disable-next-line array-callback-return
      categories.filter((item, index) => {
        if (categories.indexOf(item) !== index) {
          gsap.set(category, { display: 'none' });
        }
      });
    });
  }

  resize() {
    const isMobile = window.innerWidth < defaultState.mobile;
  }

  hideItem(item) {
    gsap.to(item, { autoAlpha: 0 });
    gsap.to(item, {
      display: 'none',
      delay: 0.2,
    });
  }

  showItem(item) {
    gsap.to(item, { autoAlpha: 1, delay: 0.2 });
    gsap.to(item, {
      display: 'block',
    });
  }

  changeCategory(e) {
    const currCategory = e.target.dataset.filterCategory;

    this.filter.categories.forEach((category) => {
      if (currCategory !== category.dataset.filterCategory) {
        gsap.to(e.target, { autoAlpha: 1 });
        gsap.to(category, { autoAlpha: 0.5 });
      }
    });

    this.filter.items.forEach((item) => {
      if (
        !item.dataset.filterItem.includes(currCategory) &&
        currCategory !== 'all'
      ) {
        this.hideItem(item);
      } else if (currCategory === 'all') {
        this.showItem(item);
      } else {
        this.showItem(item);
      }
    });
  }

  events() {
    this.filter.categories.forEach((category) => {
      category.addEventListener('click', this.changeCategory);
    });
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
