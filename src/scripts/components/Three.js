import * as THREE from 'three';
import gsap from 'gsap';
import { select, selectAll } from '../utils/helper';
import defaultState from '../utils/defaultState';

export class Sketch {
  constructor() {
    /**
     * State
     */
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    /**
     * Scene
     */
    this.scene = new THREE.Scene();

    /**
     * Camera
     * position.z is important!
     * PerspectiveCamera(field of view in degrees (45-75 ist gut), aspect ratio, near parameter, far parameter (objecte außerhalb sind nicht sichtbar))
     */
    this.camera = new THREE.PerspectiveCamera(75, this.w / this.h, 0.1, 100);
    this.camera.position.z = 2;

    /**
     * Renderer
     */
    this.renderer = new THREE.WebGLRenderer({ canvas: select('.webgl') });
    this.renderer.setPixelRatio(devicePixelRatio);

    /**
     * Axes Helper
     */
    this.axesHelper = new THREE.AxesHelper(3);
    this.scene.add(this.axesHelper);

    /**
     * Clock
     */
    this.clock = new THREE.Clock();

    /**
     * Events
     */
    this.tick = this.tick.bind(this);
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.resize();
    this.init();

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.objects();
    gsap.ticker.add(this.tick);
  }

  objects() {
    this.group = new THREE.Group();
    this.group.position.y = 2;

    // units are up to me, 1 cm, 1 m, 1km depending on the object I'am building
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    this.cube1 = new THREE.Mesh(geometry, material);
    this.cube2 = new THREE.Mesh(geometry, material);
    this.cube3 = new THREE.Mesh(geometry, material);

    this.cube1.position.x = 1;
    this.cube1.position.y = -0.2;
    this.cube2.position.z = -2;
    this.cube2.position.y = -2;
    this.cube3.scale.x = 2;
    // Mesh rotation is type Euler
    // eine halbe Rotation ist PI
    this.cube3.rotation.y = Math.PI;

    gsap.to(this.cube2.position, { y: 1, duration: 10 });

    // scene.add(mesh);
    this.scene.add(this.group);

    this.group.add(this.cube1);
    this.group.add(this.cube2);
    this.group.add(this.cube3);
  }

  tick() {
    const elapsedTime = this.clock.getElapsedTime();

    this.cube1.rotation.x = elapsedTime;
    this.cube1.position.y = Math.sin(elapsedTime);
    this.cube1.position.z = Math.cos(elapsedTime);

    // this.cube1.rotation.x += 0.01;
    // this.cube1.rotation.z += 0.01;

    /**
     * like taking a photo from the scene and my point of view
     */
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.renderer.setSize(this.w, this.h);

    /**
     * immer wenn die Kamera geupdated wird, muss man das Three sagen
     * deshalb WICHTIG updateProjectionMatrix
     */
    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
