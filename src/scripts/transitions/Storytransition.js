import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { rect, select, selectAll, size } from '../utils/helper';

export class Storytransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();

    const introImg = select('[data-intro] img');

    document.body.removeAttribute('style');

    // gsap.set({
    //   duration: 0.3,
    //   autoAlpha: 1,
    //   ease: 'power4.inOut',
    //   onComplete: done,
    // });
  }

  out({ trigger, done }) {
    const links = selectAll('[data-transition]');
    const intro = select('main > section');
    const img = select('[data-preview-storyimg]', trigger);

    const { top } = rect(trigger);

    gsap.set('body', { overflow: 'hidden' });

    links.forEach((link) => {
      if (link.getAttribute('href') === trigger.getAttribute('href')) return;

      gsap.to(link, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'expo.inOut',
      });
    });

    gsap.to(intro, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'expo.inOut',
    });

    // gsap.to([img, more], {
    //   autoAlpha: 0,
    //   duration: 0.25,
    //   ease: 'power4.inOut',
    // });

    gsap.to(img, {
      y: trigger.offsetHeight,
      duration: 0.5,
      ease: 'power4.inOut',
    });

    gsap.to(trigger, {
      // width: size().width,
      // height: '100vh',
      // marginLeft: -20,
      // position: 'absolute',
      // zIndex: 100,
      y: top * -1,
      duration: 0.5,
      ease: 'power4.inOut',
      // delay: 0.2,
      onComplete: done,
    });
  }
}
