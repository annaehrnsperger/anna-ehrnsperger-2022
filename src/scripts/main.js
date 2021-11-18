import Highway from '@dogstudio/highway';
import { Base } from './renderers/Base';
import { Pagetransition } from './transitions/Pagetransition';
import { initialLoad } from './utils/initialLoad';
import { showConsole } from './utils/showConsole';

export const H = new Highway.Core({
  renderers: {
    global: Base,
  },
  transitions: {
    global: Pagetransition,
  },
});

/**
 * Components
 */
showConsole();
initialLoad();

// TODO
// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('');
// });
