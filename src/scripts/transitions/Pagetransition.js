import Highway from '@dogstudio/highway';
import gsap from 'gsap';

export const inAnim = (done, delay = false, overview = false) => {
  gsap.fromTo(
    overview ? ['main', 'footer', 'header'] : ['main', 'footer'],
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

export const outAnim = (done, delay = false, overview = false) => {
  gsap.to(overview ? ['main', 'footer', 'header'] : ['main', 'footer'], {
    autoAlpha: 0,
    duration: 0.3,
    delay: delay ? 0.1 : 0,
    ease: 'power4.out',
    onComplete: done,
  });

  if (overview) return;

  gsap.to('header', {
    bottom: 0,
    top: 'auto',
    duration: 0.3,
    ease: 'power4.out',
  });
};
export class Pagetransition extends Highway.Transition {
  in({ from, done }) {
    window.scrollTo(0, 0);
    from.remove();

    inAnim(done);
  }

  out({ done }) {
    outAnim(done);
  }
}
