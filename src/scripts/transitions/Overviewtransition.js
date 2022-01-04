import Highway from '@dogstudio/highway';
import gsap from 'gsap/all';
import { select } from '../utils/helper';
import { inAnim, outAnim } from './Pagetransition';

export class Overviewtransition extends Highway.Transition {
  in({ from, done }) {
    window.scrollTo(0, 0);

    setTimeout(() => {
      window.scrollTo(0, localStorage.getItem('scrollPos'));
    }, 200);
    from.remove();

    const footer = select('[data-footer-white-section]');

    gsap.to(['body', footer], { background: '#fff', duration: 0.1 });
    inAnim(done, true, true);
  }

  out({ done }) {
    const footer = select('[data-footer-white-section]');

    gsap.to(['body', footer], { background: '#000', duration: 0.1 });
    outAnim(done, true, true);
  }
}
