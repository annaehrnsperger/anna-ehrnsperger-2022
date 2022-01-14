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

export function size() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  return { width, height };
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
