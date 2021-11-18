import gsap from 'gsap';
import {
  addClass,
  append,
  create,
  removeClass,
  select,
  selectAll,
} from '../utils/helper';
import defaultState from '../utils/defaultState';

// TODO clear LocalStorage on submit

export class Calendar {
  constructor(el) {
    this.container = el;
    if (!this.container) return;

    /**
     * Elements
     */
    this.daysContainer = select('[data-days]', this.container);
    this.monthContainer = select('[data-month]', this.container);
    this.backBtn = select('[data-back]', this.container);
    this.nextBtn = select('[data-next]', this.container);

    /**
     * State
     */
    this.state = {
      currentMonth: 0,
    };
    this.isMobile = window.innerWidth < defaultState.mobile;

    /**
     * Events
     */
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.resize = this.resize.bind(this);
    this.destroy = this.destroy.bind(this);

    /**
     * Functions
     */
    this.init();

    window.addEventListener('resize', this.resize);
    window.addEventListener('leavecomplete', this.destroy);
  }

  init() {
    this.dates();
    this.renderMonthYear();
    this.renderDays();
    this.events();
  }

  dates() {
    this.weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    this.now = new Date();

    if (this.state.currentMonth !== 0)
      this.now.setMonth(new Date().getMonth() + this.state.currentMonth);

    this.day = this.now.getDay();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();

    this.firstDay = new Date(this.year, this.month, 1).toLocaleDateString(
      'en-EN',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    this.lastDay = new Date(this.year, this.month + 1, 0).toLocaleDateString(
      undefined,
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    this.lastDayLastMonth = new Date(
      this.year,
      this.month,
      0
    ).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.daysInMonth = Number(this.lastDay.split(' ')[1]);
    this.daysInLastMonth = Number(this.lastDayLastMonth.split(' ')[1]);

    this.daysBefore = this.weekdays.indexOf(this.firstDay.split(', ')[0]);
    this.daysAfter =
      this.weekdays.length -
      1 -
      this.weekdays.indexOf(this.lastDay.split(', ')[0]);

    this.lastDays = [...Array(this.daysInLastMonth).keys()]
      .reverse()
      .splice(0, this.daysBefore)
      .reverse();

    setTimeout(() => {
      const today = new Date();
      if (this.month === today.getMonth())
        addClass(select(`.day-${today.getDate()}`), 'today');

      if (
        this.month + 1 ===
        Number(localStorage.getItem('date')?.split('-')[1])
      )
        addClass(
          select(`.day-${localStorage.getItem('date').split('-')[2]}`),
          'active-day'
        );
    }, 100);
  }

  renderDays() {
    this.daysContainer.innerHTML = ``;

    if (this.daysBefore)
      this.lastDays.forEach((d) => {
        const day = create('p');
        addClass(day, 'day');
        addClass(day, 'day-before');

        day.innerText = d + 1;

        append(this.daysContainer, day);
      });

    Array.from({ length: this.daysInMonth }).forEach((d, i) => {
      const day = create('p');
      addClass(day, 'day');
      addClass(day, `day-${i + 1}`);

      day.innerText = i + 1;

      append(this.daysContainer, day);
    });

    Array.from({ length: this.daysAfter }).forEach((d, i) => {
      const day = create('p');
      addClass(day, 'day');
      addClass(day, 'day-after');

      day.innerText = i + 1;

      append(this.daysContainer, day);
    });
  }

  renderMonthYear() {
    const monthText = (month) =>
      (this.monthContainer.innerText = `${month} ${this.year}`);

    switch (this.month) {
      case 0:
        return monthText('January');
      case 1:
        return monthText('February');
      case 2:
        return monthText('March');
      case 3:
        return monthText('April');
      case 4:
        return monthText('Mai');
      case 5:
        return monthText('June');
      case 6:
        return monthText('July');
      case 7:
        return monthText('August');
      case 8:
        return monthText('September');
      case 9:
        return monthText('October');
      case 10:
        return monthText('November');
      case 11:
        return monthText('December');

      default:
        break;
    }
  }

  resize() {
    this.isMobile = window.innerWidth < defaultState.mobile;
  }

  handleNext() {
    this.state.currentMonth += 1;

    this.dates();
    this.renderMonthYear();
    this.renderDays();
  }

  handleBack() {
    this.state.currentMonth -= 1;

    this.dates();
    this.renderMonthYear();
    this.renderDays();
  }

  events() {
    this.nextBtn.addEventListener('click', this.handleNext);
    this.backBtn.addEventListener('click', this.handleBack);

    this.daysContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('data-days')) return;

      const dayBefore = e.target.classList.contains('day-before');
      const dayAfter = e.target.classList.contains('day-after');

      if (dayBefore) this.handleBack();
      if (dayAfter) this.handleNext();

      if (!dayBefore && !dayAfter) {
        selectAll('.day').forEach((day) => removeClass(day, 'active-day'));
        addClass(e.target, 'active-day');

        localStorage.setItem(
          'date',
          `${this.monthContainer.innerText.split(' ')[1]}-${this.month + 1}-${
            e.target.innerText
          }`
        );
      }
    });
  }

  destroy() {
    window.removeEventListener('resize', this.resize);
  }
}
