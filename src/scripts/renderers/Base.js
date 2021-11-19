import Highway from '@dogstudio/highway';
import 'lazysizes';
import smoothscroll from 'smoothscroll-polyfill';

import { selectAll } from '../utils/helper';
import { Styles } from '../pages/Styles';
import { Carousel } from '../components/Carousel';
import { Nav } from '../components/Nav';
import { FadeIn } from '../animations/FadeIn';
import { Frontpage } from '../pages/Frontpage';
import { Muxvideo } from '../components/Muxvideo';
import { PixiSketch } from '../components/Pixi';

export class Base extends Highway.Renderer {
  onEnter() {
    window.dispatchEvent(new CustomEvent('enterstart'));

    setTimeout(() => {
      smoothscroll.polyfill();

      /**
       * Components
      //  */
      // selectAll('[data-carousel]').forEach(
      //   (carousel) => new Carousel(carousel)
      // );
      // selectAll('[data-mux-videoplayer]').forEach(
      //   (muxvideo) => new Muxvideo(muxvideo)
      // );
      selectAll('[data-pixi-container]').forEach(
        (pixi) => new PixiSketch(pixi)
      );
      new Nav();

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
