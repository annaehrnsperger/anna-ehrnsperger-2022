import Highway from '@dogstudio/highway';
import gsap from 'gsap/all';
import { select } from '../utils/helper';
import { inAnim, outAnim } from './Pagetransition';

export class Overviewtransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, localStorage.getItem('scrollPos'));
    from.remove();

    const footer = select('[data-footer-white-section]');

    gsap.to(['body', footer], { background: '#fff', duration: 0.1 });
    inAnim(to, done, true);
  }

  out({ from, done }) {
    const footer = select('[data-footer-white-section]');

    gsap.to(['body', footer], { background: '#000', duration: 0.1 });
    outAnim(from, done, true);
  }
}
