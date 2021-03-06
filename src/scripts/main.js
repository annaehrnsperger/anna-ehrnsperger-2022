import Highway from '@dogstudio/highway';
import { Base } from './renderers/Base';
import { Pagetransition } from './transitions/Pagetransition';
import { Projecttransition } from './transitions/Projecttransition';
import { Overviewtransition } from './transitions/Overviewtransition';
import { Storytransition } from './transitions/Storytransition';
import { showConsole } from './utils/showConsole';

export const H = new Highway.Core({
  renderers: {
    global: Base,
  },
  transitions: {
    global: Pagetransition,
    contextual: {
      project: Projecttransition,
      overview: Overviewtransition,
      story: Storytransition,
    },
  },
});

/**
 * Components
 */
showConsole();

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('scrollPos');
});
