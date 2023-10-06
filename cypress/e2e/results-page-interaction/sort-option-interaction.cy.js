const DEFAULT_ROUTE = '/?city=Paris';
const SEARCH_BTN = '[data-cy=search-btn]';
const SORT_OPTIONS = '[data-cy=sort-options]';
const HOTELS_LIST = '[data-cy=hotels-list]';
const DEFAULT_SORT_OPTION = 'Default';
const PRICE_LOW_FIRST_SORT_OPTION = 'Price (Low to High)';
const PRICE_HIGH_FIRST_SORT_OPTION = 'Price (High to Low)';
const RATING_LOW_FIRST_SORT_OPTION = 'Rating (Low to High)';
const RATING_HIGH_FIRST_SORT_OPTION = 'Rating (High to Low)';

describe('Sort options must sort hotels correctly', () => {
  beforeEach(() => {
    cy.visit(DEFAULT_ROUTE);

    cy.fixture('db').then(s => {
      cy.intercept(
        'GET',
        '/hotels*',
        s.hotels.filter(h => h.city === 'Paris'),
      ).as('getHotels');
    });

    cy.get(SEARCH_BTN).click();
    cy.wait('@getHotels');

    cy.get(SORT_OPTIONS).as('sort-options');
  });

  it('Default sort option must be "default"', () => {
    cy.get('@sort-options').contains(DEFAULT_SORT_OPTION);
  });

  it('Sort options list must be opened on button click', () => {
    cy.get('@sort-options').click();

    cy.get('@sort-options').contains(DEFAULT_SORT_OPTION);
    cy.get('@sort-options').contains(PRICE_LOW_FIRST_SORT_OPTION);
    cy.get('@sort-options').contains(PRICE_HIGH_FIRST_SORT_OPTION);
    cy.get('@sort-options').contains(RATING_LOW_FIRST_SORT_OPTION);
    cy.get('@sort-options').contains(RATING_HIGH_FIRST_SORT_OPTION);
  });

  it('Price (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();

    cy.get('@sort-options').contains(PRICE_LOW_FIRST_SORT_OPTION).click();
    cy.get('@sort-options').contains(PRICE_LOW_FIRST_SORT_OPTION);

    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel C');
    cy.get(HOTELS_LIST).children().eq(1).contains('Hotel A');
  });

  it('Price (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();

    cy.get('@sort-options').contains(PRICE_HIGH_FIRST_SORT_OPTION).click();
    cy.get('@sort-options').contains(PRICE_HIGH_FIRST_SORT_OPTION);

    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel A');
    cy.get(HOTELS_LIST).children().eq(1).contains('Hotel C');
  });

  it('Rating (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();

    cy.get('@sort-options').contains(RATING_HIGH_FIRST_SORT_OPTION).click();
    cy.get('@sort-options').contains(RATING_HIGH_FIRST_SORT_OPTION);

    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel A');
    cy.get(HOTELS_LIST).children().eq(1).contains('Hotel C');
  });

  it('Rating (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();

    cy.get('@sort-options').contains(RATING_LOW_FIRST_SORT_OPTION).click();
    cy.get('@sort-options').contains(RATING_LOW_FIRST_SORT_OPTION);

    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel C');
    cy.get(HOTELS_LIST).children().eq(1).contains('Hotel A');
  });
});
