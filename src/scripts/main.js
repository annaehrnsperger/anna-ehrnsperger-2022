import Highway from '@dogstudio/highway';
import { Base } from './renderers/Base';
import { Pagetransition } from './transitions/Pagetransition';
import { Projecttransition } from './transitions/Projecttransition';
import { Overviewtransition } from './transitions/Overviewtransition';
import { initialLoad } from './utils/initialLoad';
import { showConsole } from './utils/showConsole';

// Import Renderers

// Import Transitions

export const H = new Highway.Core({
  renderers: {
    global: Base,
  },
  transitions: {
    global: Pagetransition,
    contextual: {
      project: Projecttransition,
      overview: Overviewtransition,
    },
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
