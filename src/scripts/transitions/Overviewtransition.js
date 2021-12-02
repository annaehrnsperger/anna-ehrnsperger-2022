import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import { select } from '../utils/helper';

export class Overviewtransition extends Highway.Transition {
  in({ from, to, done }) {
    const whiteCurtain = select('[data-white-curtain]');
    const blackCurtain = select('[data-black-curtain]');

    window.scrollTo(0, localStorage.getItem('scrollPos'));
    from.remove();

    gsap.fromTo(
      [blackCurtain, whiteCurtain],
      {
        y: 0,
      },
      {
        y: '-100%',
        duration: 0.4,
        delay: 0.2,
        ease: 'expo.out',
        onComplete: done,
      }
    );

    // gsap.fromTo(
    //   whiteCurtain,
    //   {
    //     y: 0,
    //   },
    //   {
    //     y: '-100%',
    //     delay: 0.2,
    //     duration: 0.9,
    //     ease: 'expo.inOut',
    //   }
    // );

    gsap.set([whiteCurtain, blackCurtain], { autoAlpha: 0, delay: 1.6 });
  }

  out({ from, done }) {
    const whiteCurtain = select('[data-white-curtain]');
    const blackCurtain = select('[data-black-curtain]');

    gsap.set([whiteCurtain, blackCurtain], { autoAlpha: 1 });

    gsap.fromTo(
      whiteCurtain,
      {
        y: '100%',
      },
      {
        y: 0,
        duration: 0.9,
        ease: 'expo.inOut',
      }
    );

    gsap.fromTo(
      blackCurtain,
      {
        y: '100%',
      },
      {
        y: 0,
        delay: 0.2,
        duration: 0.9,
        ease: 'expo.inOut',
        onComplete: done,
      }
    );
  }
}
