import gsap from 'gsap';
import * as PIXI from 'pixi.js';
// import imagesLoaded from 'imagesloaded';
import { loadImages, select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';
// import gradient from '../../assets/images/gradient.png';

export class PixiSketch {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * State
     */
    this.w = this.container.offsetWidth;
    this.h = this.container.offsetHeight;
    this.slideW = 200;
    this.slideH = 800;
    this.scroll = 0;
    this.scrollTarget = 0;
    this.isMobile = window.innerWidth < defaultState.mobile;

    /**
     * Pixi
     */
    this.app = new PIXI.Application({
      width: this.w,
      height: this.h,
      backgroundAlpha: 0,
    });
    this.container.appendChild(this.app.view);
    this.app.stage.interactive = true;

    /**
     * Elements
     */

    // const texture = PIXI.Texture.from(
    //   'https://cdn.sanity.io/images/lx8z3k6n/production/1c8ff0807c2554e82d9d0b19088be9554f5d7d39-1600x1067.jpg'
    // );
    // this.img = new PIXI.Sprite(texture);
    this.images = [
      'https://cdn.sanity.io/images/lx8z3k6n/production/afadc46239994be5676916178d7bdf7ca2396931-1600x1067.jpg',
    ];

    /**
     * Events
     */
    this.tick = this.tick.bind(this);
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
    loadImages(this.images, (images) => {
      this.loadedImages = images;
      this.addImages();
      this.events();
      this.addFilter();
      // this.app.ticker.add(this.tick);
    });

    // console.log(this.img);
  }

  addImages() {
    this.imgContainer = new PIXI.Container();
    this.app.stage.addChild(this.imgContainer);
    gsap.set(this.imgContainer, { alpha: 0 });

    this.loadedImages.forEach(({ img }, i) => {
      const texture = PIXI.Texture.from(img);
      const sprite = new PIXI.Sprite(texture);

      sprite.x = this.app.screen.width / 2;
      sprite.y = this.app.screen.height / 2;
      sprite.scale.set(1.5);
      sprite.anchor.set(0.5);

      this.imgContainer.addChild(sprite);

      // const container = new PIXI.Container();
      // const spriteContainer = new PIXI.Container();

      // const mask = new PIXI.Sprite(PIXI.Texture.WHITE);
      // mask.width = this.slideW;
      // mask.height = this.slideH;

      // sprite.mask = mask;

      // container.x = this.slideW * i;
      // container.y = 100;

      // const imageSizes = {
      //   w: sprite.texture.orig.width,
      //   h: sprite.texture.orig.height,
      // };

      // const cover = fit(imageSizes, { w: this.slideW, h: this.slideH });
      // spriteContainer.position.set(cover.left, cover.top);
      // spriteContainer.scale.set(cover.scale, cover.scale);

      // spriteContainer.interactive = true;
      // spriteContainer.on('mouseover', this.onOver);
      // spriteContainer.on('mouseout', this.onOut);

      // spriteContainer.addChild(sprite);

      // container.addChild(mask);
      // container.addChild(spriteContainer);

      // this.slider.addChild(container);

      // this.allContainers.push(container);
    });

    // this.app.stage.addChild(this.img);

    // // center

    // this.displacementSprite = PIXI.Sprite.from(
    //   'https://images.unsplash.com/photo-1621757787548-4d0cc5a6bf71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
    // );
    // const displacementFilter = new PIXI.filters.DisplacementFilter(
    //   this.displacementSprite
    // );

    // this.app.stage.addChild(this.displacementSprite);

    // this.img.filters = [displacementFilter];

    // displacementFilter.scale.x = 110;
    // displacementFilter.scale.y = 110;
    // this.displacementSprite.anchor.set(0.5);

    // const onPointerMove = (eventData) => {
    //   this.displacementSprite.position.set(
    //     eventData.data.global.x - 25,
    //     eventData.data.global.y
    //   );
    // };

    // this.app.stage.on('mousemove', onPointerMove);
  }

  addFilter() {
    this.displacementSprite = PIXI.Sprite.from('../../assets/pixi/t6.png');
    this.app.stage.addChild(this.displacementSprite);

    this.displacementSprite.position.x = this.app.screen.width / 2;
    this.displacementSprite.position.y = this.app.screen.height / 2;
    this.displacementSprite.anchor.set(0.5);
    this.displacementSprite.scale.set(0.3);

    this.displacementFilter = new PIXI.filters.DisplacementFilter(
      this.displacementSprite
    );

    this.imgContainer.filters = [this.displacementFilter];
  }

  onOver(e) {
    const el = e.target.children[0];
    gsap.to(el.scale, { x: 1.1, y: 1.1 });
  }

  onOut(e) {
    const el = e.currentTarget.children[0];
    gsap.to(el.scale, { x: 1, y: 1 });
  }

  tick() {
    // this.displacementSprite.rotation += 0.01;

    this.scroll = gsap.utils.interpolate(this.scroll, this.scrollTarget, 0.1);
    // this.scroll -= 1;

    this.allContainers.forEach((container) => {
      container.position.x = this.calcPos(this.scroll, container.position.x);
      gsap.utils.interpolate();
    });

    this.direction = this.scroll > 0 ? -1 : 1;

    this.displacementFilter.scale.x = this.direction * Math.abs(this.scroll);
  }

  calcPos(scroll, pos) {
    // modulo gibt immer den Rest zurück wenn der Slider bei 2300 ist und die Breite ist 2200 -> wieder bei 100
    const target =
      ((scroll + pos + this.sliderWidth + 200) % this.sliderWidth) - 200;

    return target;
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
  }

  events() {
    // window.addEventListener('mousewheel', (e) => {
    //   this.scroll = e.wheelDelta / 3;
    // });

    window.addEventListener('wheel', this.onPointerMove.bind(this));
    window.addEventListener('scroll', () => {
      this.test();
      // this.onPointerMove();
    });
    // this.app.stage
    //   .on('scroll', this.onPointerMove.bind(this))
    //   .on('touchmove', this.onPointerMove.bind(this));
  }

  test(e) {
    if (window.pageYOffset > 10) {
      gsap.to(this.imgContainer, { alpha: 0.3, duration: 0.2 });
    } else {
      gsap.to(this.imgContainer, { alpha: 0, duration: 0.2 });
    }
  }

  onPointerMove(e) {
    console.log(e.pageY);
    // this.displacementSprite.position.set(e.deltaY, e.deltaY * 2);
    // this.displacementSprite.position.y = e.deltaY / 2;
    // this.displacementSprite.scale.y ;
    this.displacementSprite.scale.x = e.pageY / 100;
    this.displacementSprite.position.x = e.pageY / 1000;
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
