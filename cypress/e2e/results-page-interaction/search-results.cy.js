const SEARCH_BTN = '[data-cy=search-btn]';
const NO_HOTELS = '[data-cy=no-hotels-found]';
const HOTEL_CARD = '[data-cy=hotel-card]';

describe('Search results must be correct', () => {
  beforeEach(() => {
    cy.intercept('GET', '/hotels*', { fixture: 'db.json' }.hotels);

    cy.visit('/');
    cy.get(SEARCH_BTN).as('search-btn');
  });

  it('There must be 2 hotels in Paris', () => {
    cy.visit('/?city=Paris');
    cy.get('@search-btn').click();

    cy.get(HOTEL_CARD).should('have.length', 2);
  });

  it('There must be 2 hotels available in dates 10th October to 21th October in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-10&to=2023-10-21');
    cy.get('@search-btn').click();

    cy.get(HOTEL_CARD).should('have.length', 2);
  });

  it('There must be 1 hotel available in dates 3th October to 21th October in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-3&to=2023-10-21');
    cy.get('@search-btn').click();

    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
  });

  it('There must be no hotels available for 3 adults in 1 room in Paris', () => {
    cy.visit('/?city=Paris&adults=3');
    cy.get('@search-btn').click();

    cy.get(NO_HOTELS).contains('No properties found in Paris');
  });

  it('There must be 2 hotels available for 3 adults in 2 rooms in Paris', () => {
    cy.visit('/?city=Paris&adults=3&rooms=2');
    cy.get('@search-btn').click();

    cy.get(HOTEL_CARD).should('have.length', 2);
  });

  it('There must be 1 hotel available for 3 adults in 2 rooms in dates 3th October to 21th in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-3&to=2023-10-21&adults=3&rooms=2');
    cy.get('@search-btn').click();

    cy.get(HOTEL_CARD).should('have.length', 1);
    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
  });
});
