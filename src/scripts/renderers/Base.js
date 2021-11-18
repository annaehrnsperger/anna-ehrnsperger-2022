import Highway from '@dogstudio/highway';
import 'lazysizes';
import smoothscroll from 'smoothscroll-polyfill';

import { selectAll } from '../utils/helper';
import { Styles } from '../pages/Styles';
import { List } from '../components/List';
import { Videoplayer } from '../components/Videoplayer';
import { Accordion } from '../components/Accordion';
import { Carousel } from '../components/Carousel';
import { Nav } from '../components/Nav';
import { FadeIn } from '../animations/FadeIn';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { Cart } from '../components/Cart';
import { SimpleSlider } from '../components/SimpleSlider';
import { Filter } from '../components/Filter';
import { Frontpage } from '../pages/Frontpage';
import { Calendar } from '../components/Calendar';
import { Marquee } from '../components/Marquee';
import { Newsletter } from '../components/Newsletter';
import { Muxvideo } from '../components/Muxvideo';
import { PinnedSlider } from '../components/PinnedSlider';

export class Base extends Highway.Renderer {
  onEnter() {
    window.dispatchEvent(new CustomEvent('enterstart'));

    setTimeout(() => {
      smoothscroll.polyfill();

      /**
       * Components
       */
      selectAll('[data-accordion]').forEach(
        (accordion) => new Accordion(accordion)
      );
      selectAll('[data-calendar]').forEach(
        (calendar) => new Calendar(calendar)
      );
      selectAll('[data-carousel]').forEach(
        (carousel) => new Carousel(carousel)
      );
      selectAll('[data-filter]').forEach((filter) => new Filter(filter));
      selectAll('[data-list]').forEach((list) => new List(list));
      selectAll('[data-marquee]').forEach((marquee) => new Marquee(marquee));
      selectAll('[data-mux-videoplayer]').forEach(
        (muxvideo) => new Muxvideo(muxvideo)
      );
      selectAll('[data-newsletter]').forEach(
        (newsletter) => new Newsletter(newsletter)
      );
      selectAll('[data-videoplayer]').forEach(
        (player) => new Videoplayer(player)
      );
      selectAll('[data-horizontal-slider]').forEach(
        (horizontalslider) => new HorizontalSlider(horizontalslider)
      );
      selectAll('[data-simple-slider]').forEach(
        (simpleslider) => new SimpleSlider(simpleslider)
      );
      selectAll('[data-pinned-slider]').forEach(
        (pinnedslider) => new PinnedSlider(pinnedslider)
      );

      new Cart();
      new Nav();

      /**
       * Animations
       */
      selectAll('[data-animation="fadein"]').forEach(
        (fadein) => new FadeIn({ fadein })
      );

      /**
       * Pages
       */
      new Styles();
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
