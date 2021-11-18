import { select } from '../utils/helper';

export class Newsletter {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.error = select('[data-error]', this.container);
    this.emailField = select('input[type=email]', this.container);

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.handleForm();
  }

  handleForm() {
    this.container.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        await fetch('/api/mailchimp-newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.emailField.value,
          }),
        });

        this.container.innerHTML = '<p>Success!</p>';
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        this.error.textContent = 'Something went wrong';
      }
    });
  }
}
