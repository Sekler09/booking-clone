const DEFAULT_ROUTE = '/searchresults?city=Paris';
const HOTEL_CARD = '[data-cy=hotel-card]';

const MAX_SLIDER = '[data-cy=thumb-max]';
const MIN_SLIDER = '[data-cy=thumb-min]';
const MAX_INIT_VALUE = 300;
const MIN_INIT_VALUE = 50;
const MAX_TYPED_VALUE = '{leftarrow}'.repeat(16);
const MIN_TYPED_VALUE = '{rightarrow}'.repeat(16);

describe('Price filter must work correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', '/hotels*', { fixture: 'db.json' }.hotels);

    cy.visit(DEFAULT_ROUTE);
  });

  it('Default value must be 50 and 300', () => {
    cy.get(MAX_SLIDER).should('have.value', MAX_INIT_VALUE);
    cy.get(MIN_SLIDER).should('have.value', MIN_INIT_VALUE);
  });

  it('When max price is set to 140 only 1 hotel must be displayed', () => {
    cy.get(MAX_SLIDER).focus();
    cy.get(MAX_SLIDER).realType(MAX_TYPED_VALUE);

    cy.get(MAX_SLIDER).should('have.value', 140);
    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
  });

  it('When min price is set to 210 only 1 hotel must be displayed', () => {
    cy.get(MIN_SLIDER).focus();
    cy.get(MIN_SLIDER).realType(MIN_TYPED_VALUE);

    cy.get(MIN_SLIDER).should('have.value', 210);
    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel A');
  });
});
