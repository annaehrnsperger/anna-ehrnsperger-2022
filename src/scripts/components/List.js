import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';

export class List {
  constructor(list) {
    this.container = list;
    if (!this.container) return;

    /**
     * Elements
     */
    this.list = {
      table: select('table', this.container),
      tableBody: select('tBody', this.container),
      heads: selectAll('th', this.container),
      rows: selectAll('tBody > tr', this.container),
    };

    /**
     * State
     */
    this.state = {
      asc: true,
    };

    /**
     * Events
     */
    this.handleImgMove = this.handleImgMove.bind(this);
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('mousemove', this.handleImgMove);

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.list.rows.forEach((row) => {
      const img = select('[data-img-overlay]', row);

      gsap.set(img, {
        autoAlpha: 0,
      });
    });

    this.events();
  }

  sortRows(column) {
    const dirModifier = this.state.asc ? 1 : -1;
    const selectColumn = column + 1;
    const rows = [...this.list.rows];

    const sortedRows = rows.sort((a, b) => {
      const aColText = a
        .querySelector(`td:nth-child(${selectColumn})`)
        .textContent.trim();
      const bColText = b
        .querySelector(`td:nth-child(${selectColumn})`)
        .textContent.trim();

      return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
    });

    /**
     *  Remove existing rows and add sortes ones
     */
    while (this.list.tableBody.firstChild) {
      this.list.tableBody.removeChild(this.list.tableBody.firstChild);
    }
    this.list.tableBody.append(...sortedRows);
  }

  handleHeadClick(head, i) {
    this.sortRows(i);
    this.state.asc = !this.state.asc;

    const arrow = select('[data-arrow]', head);

    if (this.state.asc)
      gsap.to(arrow, {
        rotate: -180,
        duration: 0.2,
      });

    if (!this.state.asc)
      gsap.to(arrow, {
        rotate: 0,
        duration: 0.2,
      });
  }

  handleImgMove(e) {
    const imgRow = e.target.parentElement?.lastElementChild;
    const img = select('[data-img-overlay]', imgRow);

    if (img) {
      const { height, width } = img.getBoundingClientRect();

      gsap.set(img, {
        left: e.clientX - width / 2,
        top: e.clientY - height / 2,
      });
    }
  }

  handleImgToggle(img, autoAlpha) {
    gsap.to(img, {
      autoAlpha,
      ease: 'expoa.out',
      duration: 0.3,
    });
  }

  events() {
    this.list.heads.forEach((head, i) => {
      head.addEventListener('click', () => this.handleHeadClick(head, i));
    });

    this.list.rows.forEach((row) => {
      const img = select('[data-img-overlay]', row);

      row.addEventListener('mouseenter', () => this.handleImgToggle(img, 1));
      row.addEventListener('mouseleave', () => this.handleImgToggle(img, 0));
    });
  }

  resize() {}

  destroy() {
    window.removeEventListener('mousemove', this.handleImgMove);
  }
}
