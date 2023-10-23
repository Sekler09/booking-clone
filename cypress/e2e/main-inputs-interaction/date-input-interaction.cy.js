import {
  format,
  addMonths,
  startOfToday,
  getDate,
  getDaysInMonth,
} from 'date-fns';
import { DATE_FORMAT_PATTERN_EN } from '../../../src/constants/date';

const today = startOfToday();
const nextMonth = addMonths(today, 1);

const DAY_BTN = '.rdp-day';
const MAIN_INPUT = '[data-cy=main-input]';
const DATES_WRAPPER = '[data-cy=dates-wrapper]';
const DATE_INIT_NO_VALUE = 'Check-in date -- Check-out date';
const FROM_QUERY_PARAM = 'from=';
const TO_QUERY_PARAM = 'to=';

describe('Dates input interaction', () => {
  it('Calendar must open on click   and have current and next month', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(1).as('date-input');

    cy.get('@date-input').should('have.value', DATE_INIT_NO_VALUE);

    cy.get('@date-input').click();
    cy.get(DATES_WRAPPER).as('dates-wrapper');

    cy.get('@dates-wrapper').contains(format(today, 'MMMM'));
    cy.get('@dates-wrapper').contains(format(nextMonth, 'MMMM'));
  });

  it('Calendar must change value according to selected dates', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(1).as('date-input');

    cy.get('@date-input').should('have.value', DATE_INIT_NO_VALUE);

    cy.get('@date-input').click();
    cy.get(DATES_WRAPPER).as('dates-wrapper');

    cy.get(DAY_BTN)
      .eq(getDate(today) - 1)
      .click();

    cy.get(DAY_BTN)
      .eq(getDaysInMonth(today) + getDate(nextMonth) - 1)
      .click();

    cy.get('@date-input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN_EN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN_EN,
      )}`,
    );
  });

  it('Url must have search param from and to with selected dates', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(1).as('date-input');

    cy.get('@date-input').should('have.value', DATE_INIT_NO_VALUE);

    cy.url().should('not.include', `${FROM_QUERY_PARAM}`);
    cy.url().should('not.include', `${TO_QUERY_PARAM}`);

    cy.get('@date-input').click();
    cy.get(DATES_WRAPPER).as('dates-wrapper');

    cy.get(DAY_BTN)
      .eq(getDate(today) - 1)
      .click();

    cy.get(DAY_BTN)
      .eq(getDaysInMonth(today) + getDate(nextMonth) - 1)
      .click();

    cy.get('@date-input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN_EN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN_EN,
      )}`,
    );

    cy.url().should('include', `${FROM_QUERY_PARAM}${format(today, 'y-M-d')}`);
    cy.url().should(
      'include',
      `${TO_QUERY_PARAM}${format(nextMonth, 'y-M-d')}`,
    );
  });

  it('Input must have selected value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(1).as('date-input');

    cy.get('@date-input').should('have.value', DATE_INIT_NO_VALUE);

    cy.url().should('not.include', `${FROM_QUERY_PARAM}`);
    cy.url().should('not.include', `${TO_QUERY_PARAM}`);

    cy.get('@date-input').click();
    cy.get(DATES_WRAPPER).as('dates-wrapper');

    cy.get(DAY_BTN)
      .eq(getDate(today) - 1)
      .click();

    cy.get(DAY_BTN)
      .eq(getDaysInMonth(today) + getDate(nextMonth) - 1)
      .click();

    cy.get('@date-input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN_EN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN_EN,
      )}`,
    );

    cy.url().should('include', `${FROM_QUERY_PARAM}${format(today, 'y-M-d')}`);
    cy.url().should(
      'include',
      `${TO_QUERY_PARAM}${format(nextMonth, 'y-M-d')}`,
    );

    cy.reload();

    cy.get('@date-input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN_EN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN_EN,
      )}`,
    );

    cy.url().should('include', `${FROM_QUERY_PARAM}${format(today, 'y-M-d')}`);
    cy.url().should(
      'include',
      `${TO_QUERY_PARAM}${format(nextMonth, 'y-M-d')}`,
    );
  });

  it('Input must have value from search params', () => {
    const from = format(today, 'y-M-d');
    const to = format(nextMonth, 'y-M-d');
    cy.visit(`/?${FROM_QUERY_PARAM}${from}&${TO_QUERY_PARAM}${to}`);
    cy.get(MAIN_INPUT)
      .eq(1)
      .should(
        'have.value',
        `${format(today, DATE_FORMAT_PATTERN_EN)} -- ${format(
          nextMonth,
          DATE_FORMAT_PATTERN_EN,
        )}`,
      );
  });
});
