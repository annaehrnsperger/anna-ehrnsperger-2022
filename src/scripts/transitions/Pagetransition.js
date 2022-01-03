import Highway from '@dogstudio/highway';
import gsap from 'gsap';

export const inAnim = (to, done, delay = false) => {
  gsap.fromTo(
    to,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 0.2,
      delay: delay ? 0.1 : 0,
      ease: 'power4.in',
      onComplete: done,
    }
  );
};

export const outAnim = (from, done, delay = false) => {
  gsap.to(from, {
    autoAlpha: 0,
    duration: 0.3,
    delay: delay ? 0.1 : 0,
    ease: 'power4.out',
    onComplete: done,
  });
};
export class Pagetransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();

    inAnim(to, done);
  }

  out({ from, done }) {
    outAnim(from, done);
  }
}
