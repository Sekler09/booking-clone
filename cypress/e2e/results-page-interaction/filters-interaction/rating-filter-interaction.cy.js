const DEFAULT_ROUTE = '/searchresults?city=Paris';
const HOTEL_CARD = '[data-cy=hotel-card]';
const CHECKBOX = '[data-cy=checkbox-filter-input]';

const LABELS = ['Superb: 4.5+', 'Very good: 4+', 'Good: 3.5+', 'Pleasant: 3+'];
const SUPERB = `[data-cy="${LABELS[0]}"]`;
const VERY_GOOD = `[data-cy="${LABELS[1]}"]`;
const GOOD = `[data-cy="${LABELS[2]}"]`;
const PLEASANT = `[data-cy="${LABELS[3]}"]`;

describe('Rating filter must show correct information', () => {
  beforeEach(() => {
    cy.intercept('GET', '/hotels*', { fixture: 'db.json' }.hotels);

    cy.visit(DEFAULT_ROUTE);
  });

  it('Rating filter must have options 4+, 3.5+, 3+ for Paris hotels', () => {
    cy.get(VERY_GOOD);
    cy.get(GOOD);
    cy.get(PLEASANT);
    cy.get(SUPERB).should('not.exist');
  });

  it('When selecting 4+ only Hotel A must be displayed', () => {
    cy.get(VERY_GOOD).click();

    cy.get(CHECKBOX).eq(0).should('be.checked');

    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel A');
  });

  it('When selecting 4+ and then selecting 3+ both hotels must be displayed', () => {
    cy.get(VERY_GOOD).click();

    cy.get(CHECKBOX).eq(0).should('be.checked');
    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel A');

    cy.get(PLEASANT).click();

    cy.get(CHECKBOX).eq(0).should('be.checked');
    cy.get(CHECKBOX).eq(2).should('be.checked');

    cy.get(HOTEL_CARD).should('have.length', 2);
  });
});
