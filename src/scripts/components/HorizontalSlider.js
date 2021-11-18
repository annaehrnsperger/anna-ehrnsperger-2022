import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class HorizontalSlider {
  constructor(horizontalslider) {
    this.container = horizontalslider;
    if (!this.container) return;

    /**
     * Elements
     */
    this.wrapper = select('[data-wrapper]', this.container);
    this.slides = selectAll('[data-slide]', this.container);

    /**
     * State
     */
    this.EASE = 0.07;
    this.DRAG_SPEED = 1;

    this.state = {
      current: 0,
      target: 0,
      startPos: 0,
      lastPos: 0,
      direction: '',
      end: this.wrapper.scrollWidth - this.container.clientWidth,
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
    this.initialStyles();
    this.events();
    gsap.ticker.add(this.update.bind(this));
  }

  initialStyles() {
    gsap.set(this.wrapper, {
      width:
        this.slides[0].getBoundingClientRect().width * (this.slides.length - 1),
    });
  }

  xPos(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    return x;
  }

  onDown(e) {
    e.preventDefault();

    this.isDown = true;

    this.state.startPos = this.xPos(e);
    this.state.lastPos = this.state.target;
  }

  onUp() {
    this.isDown = false;
    this.wrapper.style.pointerEvents = 'all';
  }

  onMove(e) {
    if (!this.isDown) return;
    this.wrapper.style.pointerEvents = 'none';

    const distance = this.xPos(e) - this.state.startPos;
    this.state.target = (this.state.lastPos + distance) * this.DRAG_SPEED;
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
    this.initialStyles();

    this.state.end = this.wrapper.scrollWidth - this.container.clientWidth;
    this.events();
  }

  setPos() {
    gsap.set(this.wrapper, { x: this.state.current });
  }

  update() {
    this.state.target = gsap.utils.clamp(
      this.state.end * -1,
      0,
      this.state.target
    );

    this.state.current = gsap.utils.interpolate(
      this.state.current,
      this.state.target,
      this.EASE
    );

    this.setPos();
  }

  events() {
    this.container.addEventListener('touchstart', this.onDown);
    this.container.addEventListener('mousedown', this.onDown);
    window.addEventListener('touchend', this.onUp);
    window.addEventListener('mouseup', this.onUp);
    this.container.addEventListener('touchmove', this.onMove);
    this.container.addEventListener('mousemove', this.onMove);
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
