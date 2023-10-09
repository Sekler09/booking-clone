const DEFAULT_ROUTE = '/searchresults?city=Paris';
const HOTEL_CARD = '[data-cy=hotel-card]';

const LABELS = ['Less than 5km', 'Less than 3km', 'Less than 1km'];
const LESS_THAN_1KM = `[data-cy="${LABELS[2]}"]`;
const LESS_THAN_3KM = `[data-cy="${LABELS[1]}"]`;
const LESS_THAN_5KM = `[data-cy="${LABELS[0]}"]`;

describe('Rating filter must show correct information', () => {
  beforeEach(() => {
    cy.intercept('GET', '/hotels*', { fixture: 'db.json' }.hotels);

    cy.visit(DEFAULT_ROUTE);
  });

  it('Distance filter must have options less than 3 and 5km for Paris hotels', () => {
    cy.get(LESS_THAN_3KM);
    cy.get(LESS_THAN_5KM);
    cy.get(LESS_THAN_1KM).should('not.exist');
  });

  it('When selecting less than 3km only Hotel C must be displayed', () => {
    cy.get(LESS_THAN_3KM).click();

    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
  });

  it('When selecting 3km and then selecting 5km both hotels must be displayed', () => {
    cy.get(LESS_THAN_3KM).click();

    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');

    cy.get(LESS_THAN_5KM).click();

    cy.get(HOTEL_CARD).should('have.length', 2);
  });
});
