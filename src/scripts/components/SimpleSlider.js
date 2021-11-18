import gsap from 'gsap/gsap-core';
import defaultState from '../utils/defaultState';

export class SimpleSlider {
  constructor(simpleslider) {
    this.container = simpleslider;
    if (!this.container) return;

    /**
     * State
     */
    this.SPEED = 3;
    this.state = {
      startPos: 0,
      scrollLeft: 0,
    };
    this.isMobile = window.innerWidth < defaultState.mobile;

    /**
     * Events
     */
    this.onDown = this.onDown.bind(this);
    this.onUp = this.onUp.bind(this);
    this.onMove = this.onMove.bind(this);
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
    this.events();
  }

  onDown(e) {
    e.preventDefault();

    this.isDown = true;
    gsap.set(this.container, { cursor: 'grab' });

    this.state.startPos = e.pageX - this.container.offsetLeft;
    this.state.scrollLeft = this.container.scrollLeft;
  }

  onUp() {
    this.isDown = false;
    gsap.set(this.container, { cursor: 'default' });
  }

  onMove(e) {
    if (!this.isDown) return;

    const x = e.pageX - this.container.offsetLeft;
    const distance = (x - this.state.startPos) * this.SPEED;
    this.container.scrollLeft = this.state.scrollLeft - distance;
  }

  resize() {
    this.events();
  }

  events() {
    this.container.addEventListener('mousedown', this.onDown);
    window.addEventListener('mouseup', this.onUp);
    this.container.addEventListener('mousemove', this.onMove);
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
