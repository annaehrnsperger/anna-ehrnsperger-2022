import Highway from '@dogstudio/highway';
import 'lazysizes';
import smoothscroll from 'smoothscroll-polyfill';

import { selectAll } from '../utils/helper';
import { Styles } from '../pages/Styles';
import { Nav } from '../components/Nav';
import { FadeIn } from '../animations/FadeIn';
import { Frontpage } from '../pages/Frontpage';
import { Muxvideo } from '../components/Muxvideo';
import { PixiSketch } from '../components/Pixi';
import { Intro } from '../components/Intro';
import { Footer } from '../components/Footer';
import { ScrollPos } from '../components/ScrollPos';

export class Base extends Highway.Renderer {
  onEnter() {
    window.dispatchEvent(new CustomEvent('enterstart'));

    setTimeout(() => {
      smoothscroll.polyfill();

      /**
       * Components
       */
      selectAll('footer').forEach((el) => new Footer(el));
      selectAll('[data-intro]').forEach((el) => new Intro(el));
      selectAll('[data-mux-video]').forEach((el) => new Muxvideo(el));
      selectAll('[data-pixi-container]').forEach((el) => new PixiSketch(el));
      new Nav();
      new ScrollPos();

      // /**
      //  * Animations
      //  */
      // selectAll('[data-animation="fadein"]').forEach(
      //   (fadein) => new FadeIn({ fadein })
      // );

      // /**
      //  * Pages
      //  */
      // new Styles();
      new Frontpage();
    }, 100);
  }

  onLeave() {
    window.dispatchEvent(new CustomEvent('leavestart'));
  }

  onEnterCompleted() {
    window.dispatchEvent(new CustomEvent('entercomplete'));
  }

  onLeaveCompleted() {
    window.dispatchEvent(new CustomEvent('leavecomplete'));
  }
}
