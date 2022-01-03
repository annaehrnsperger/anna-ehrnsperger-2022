import gsap from 'gsap';

export function select(selector, container = document) {
  return container.querySelector(selector);
}

export function selectAll(selector, container = document) {
  return container.querySelectorAll(selector);
}

export function rect(el) {
  return el?.getBoundingClientRect?.();
}

export function addClass(el, className) {
  el?.classList.add(className);
}

export function removeClass(el, className) {
  el?.classList.remove(className);
}

export function containsClass(el, className) {
  el?.classList.contains(className);
}

export function toggleClass(el, className) {
  el?.classList.toggle(className);
}

export function create(el) {
  return document.createElement(el);
}

export function append(container, el) {
  container.appendChild(el);
}

export function size() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  return { width, height };
}

export function secondsToMinutes(seconds) {
  return `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(
    -2
  )}`;
}

export function isEven(value) {
  if (value % 2 === 0) return true;
  return false;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function next(i, arr) {
  return i === arr.length - 1 ? arr[0] : arr[i + 1];
}

export function prev(i, arr) {
  return i === 0 ? arr[arr.length - 1] : arr[i - 1];
}

export function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function scrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

export function loadImages(paths, whenLoaded) {
  const imgs = [];
  const img0 = [];

  paths.forEach((path) => {
    const img = new Image();

    img.onload = () => {
      imgs.push(img);
      img0.push({ path, img });
      if (imgs.length === paths.length) whenLoaded(img0);
    };

    img.crossOrigin = 'anonymous';
    img.src = `${path}`;
  });
}

export function darkMode(duration = 0.2, delay = 0, ease = 'expo.out') {
  gsap.to(':root', {
    '--primary': '#000',
    duration,
    delay,
    ease,
  });

  gsap.to(':root', {
    '--secondary': '#fff',
    duration,
    delay,
    ease,
  });
}

export function lightMode(duration = 0.2, delay = 0, ease = 'expo.out') {
  gsap.to(':root', {
    '--primary': '#fff',
    duration,
    delay,
    ease,
  });

  gsap.to(':root', {
    '--secondary': '#000',
    duration,
    delay,
    ease,
  });
}
