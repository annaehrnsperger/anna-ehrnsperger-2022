import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { rect, select } from '../utils/helper';

export class Projecttransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    gsap.to(to, {
      duration: 0.5,
      autoAlpha: 1,
      onComplete: () => {
        done();
      },
    });
  }

  out({ from, trigger, done }) {
    const preview = select('[data-preview-project]', trigger);
    const img = select('[data-preview-project] img', trigger);

    const { top } = rect(preview);

    gsap.to(img, {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power4.inOut',
    });

    gsap.to(preview, {
      width: '100vw',
      height: '100vh',
      marginLeft: -20,
      y: top * -1,
      duration: 0.5,
      ease: 'power4.inOut',
      delay: 0.15,
      onComplete: done,
    });
  }
}
