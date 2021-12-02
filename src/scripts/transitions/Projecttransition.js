import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { rect, select, size } from '../utils/helper';

export class Projecttransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();

    const introImg = select('[data-intro] img');

    document.body.removeAttribute('style');

    gsap.fromTo(
      introImg,
      {
        autoAlpha: 0,
      },
      {
        duration: 0.3,
        autoAlpha: 1,
        ease: 'power4.inOut',
        onComplete: done,
      }
    );
  }

  out({ trigger, done }) {
    const preview = select('[data-preview-project]', trigger);
    const img = select('[data-preview-project] img', trigger);
    const more = select('[data-project-more]', trigger);

    const { top } = rect(preview);

    gsap.set('body', { overflow: 'hidden' });

    gsap.to([img, more], {
      autoAlpha: 0,
      duration: 0.25,
      ease: 'power4.inOut',
    });

    gsap.to(preview, {
      width: size().width,
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
