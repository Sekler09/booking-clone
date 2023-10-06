const DEFAULT_ROUTE = '/searchresults?city=Paris';
const SORT_OPTIONS_BTN = '[data-cy=sort-options-btn]';
const HOTEL_CARD = '[data-cy=hotel-card]';

const DEFAULT_SORT_OPTION_NAME = 'Default';
const PRICE_LOW_FIRST_SORT_OPTION_NAME = 'Price (Low to High)';
const PRICE_HIGH_FIRST_SORT_OPTION_NAME = 'Price (High to Low)';
const RATING_LOW_FIRST_SORT_OPTION_NAME = 'Rating (Low to High)';
const RATING_HIGH_FIRST_SORT_OPTION_NAME = 'Rating (High to Low)';

const DEFAULT_SORT_OPTION = `[data-cy="${DEFAULT_SORT_OPTION_NAME}"]`;
const PRICE_LOW_FIRST_SORT_OPTION = `[data-cy="${PRICE_LOW_FIRST_SORT_OPTION_NAME}"]`;
const PRICE_HIGH_FIRST_SORT_OPTION = `[data-cy="${PRICE_HIGH_FIRST_SORT_OPTION_NAME}"]`;
const RATING_LOW_FIRST_SORT_OPTION = `[data-cy="${RATING_LOW_FIRST_SORT_OPTION_NAME}"]`;
const RATING_HIGH_FIRST_SORT_OPTION = `[data-cy="${RATING_HIGH_FIRST_SORT_OPTION_NAME}"]`;

describe('Sort options must sort hotels correctly', () => {
  beforeEach(() => {
    cy.visit(DEFAULT_ROUTE);

    cy.intercept('GET', '/hotels*', { fixture: 'db.json' }.hotels);

    cy.get(SORT_OPTIONS_BTN).as('sort-options-btn');
  });

  it('Default sort option must be "default"', () => {
    cy.get('@sort-options-btn').contains(DEFAULT_SORT_OPTION_NAME);
  });

  it('Sort options list must be opened on button click', () => {
    cy.get('@sort-options-btn').click();

    cy.get(DEFAULT_SORT_OPTION);
    cy.get(PRICE_LOW_FIRST_SORT_OPTION);
    cy.get(PRICE_HIGH_FIRST_SORT_OPTION);
    cy.get(RATING_LOW_FIRST_SORT_OPTION);
    cy.get(RATING_HIGH_FIRST_SORT_OPTION);
  });

  it('Price (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options-btn').click();

    cy.get(PRICE_LOW_FIRST_SORT_OPTION).click();
    cy.get('@sort-options-btn').contains(PRICE_LOW_FIRST_SORT_OPTION_NAME);

    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
    cy.get(HOTEL_CARD).eq(1).contains('Hotel A');
  });

  it('Price (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options-btn').click();

    cy.get(PRICE_HIGH_FIRST_SORT_OPTION).click();
    cy.get('@sort-options-btn').contains(PRICE_HIGH_FIRST_SORT_OPTION_NAME);

    cy.get(HOTEL_CARD).eq(0).contains('Hotel A');
    cy.get(HOTEL_CARD).eq(1).contains('Hotel C');
  });

  it('Rating (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options-btn').click();

    cy.get(RATING_HIGH_FIRST_SORT_OPTION).click();
    cy.get('@sort-options-btn').contains(RATING_HIGH_FIRST_SORT_OPTION_NAME);

    cy.get(HOTEL_CARD).eq(0).contains('Hotel A');
    cy.get(HOTEL_CARD).eq(1).contains('Hotel C');
  });

  it('Rating (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options-btn').click();

    cy.get(RATING_LOW_FIRST_SORT_OPTION).click();
    cy.get('@sort-options-btn').contains(RATING_LOW_FIRST_SORT_OPTION_NAME);

    cy.get(HOTEL_CARD).eq(0).contains('Hotel C');
    cy.get(HOTEL_CARD).eq(1).contains('Hotel A');
  });
});
