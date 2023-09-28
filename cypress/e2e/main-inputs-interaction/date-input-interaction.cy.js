import { format, addMonths, startOfToday } from 'date-fns';
import { DATE_FORMAT_PATTERN } from '../../../src/constants/date';

const today = startOfToday();
const nextMonth = addMonths(today, 1);

describe('Dates input interaction', () => {
  it('Calendar must open on click and have current and next month', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(2)').as('dates-input');
    cy.get('@dates-input').click();
    cy.get('@dates-input').contains(format(today, 'MMMM')).as('current-month');
    cy.get('@dates-input').contains(format(nextMonth, 'MMMM')).as('next-month');
  });

  it('Calendar must change value according to selected dates', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(2)').as('dates-input');
    cy.get('@dates-input').click();
    cy.get('@dates-input')
      .contains(format(today, 'MMMM'))
      .parent()
      .parent()
      .as('current-month');
    cy.get('@dates-input')
      .contains(format(nextMonth, 'MMMM'))
      .parent()
      .parent()
      .as('next-month');
    cy.get('@current-month').contains(today.getDate()).click();
    cy.get('@next-month').contains(today.getDate()).click();
    cy.get('[data-cy=main-input]:nth-child(2) input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN,
      )}`,
    );
  });

  it('Url must have search param from and to with selected dates', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(2)').as('dates-input');
    cy.get('@dates-input').click();
    cy.get('@dates-input')
      .contains(format(today, 'MMMM'))
      .parent()
      .parent()
      .as('current-month');
    cy.get('@dates-input')
      .contains(format(nextMonth, 'MMMM'))
      .parent()
      .parent()
      .as('next-month');
    cy.get('@current-month').contains(today.getDate()).click();
    cy.get('@next-month').contains(today.getDate()).click();
    cy.url().should('include', `from=${format(today, 'y-M-d')}`);
    cy.url().should('include', `to=${format(nextMonth, 'y-M-d')}`);
  });

  it('Input must have selected value after page reload', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(2)').as('dates-input');
    cy.get('@dates-input').click();
    cy.get('@dates-input')
      .contains(format(today, 'MMMM'))
      .parent()
      .parent()
      .as('current-month');
    cy.get('@dates-input')
      .contains(format(nextMonth, 'MMMM'))
      .parent()
      .parent()
      .as('next-month');
    cy.get('@current-month').contains(today.getDate()).click();
    cy.get('@next-month').contains(today.getDate()).click();
    cy.reload();
    cy.get('[data-cy=main-input]:nth-child(2) input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN,
      )}`,
    );
  });

  it('Input must have value from search params', () => {
    const from = format(today, 'y-M-d');
    const to = format(nextMonth, 'y-M-d');
    cy.visit(`/?from=${from}&to=${to}`);
    cy.get('[data-cy=main-input]:nth-child(2) input').should(
      'have.value',
      `${format(today, DATE_FORMAT_PATTERN)} -- ${format(
        nextMonth,
        DATE_FORMAT_PATTERN,
      )}`,
    );
  });
});
