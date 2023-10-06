const DEFAULT_ROUTE = '/searchresults?city=Paris';
const HOTELS_LIST = '[data-cy=hotels-list]';
const CHECKBOX_FILTER = '[data-cy=checkbox-filter]';
const CHECKBOX = '[data-cy=checkbox-filter-input]';

describe('Rating filter must show correct information', () => {
  beforeEach(() => {
    cy.fixture('db').then(s => {
      cy.intercept(
        'GET',
        '/hotels*',
        s.hotels.filter(h => h.city === 'Paris'),
      ).as('getHotels');
    });

    cy.visit(DEFAULT_ROUTE);
    cy.wait('@getHotels');
    cy.get(CHECKBOX_FILTER).eq(0).as('rating-filter');
  });

  it('Rating filter must have options 4+, 3.5+, 3+ for Paris hotels', () => {
    cy.get('@rating-filter').contains('4+');
    cy.get('@rating-filter').contains('3.5+');
    cy.get('@rating-filter').contains('3+');
    cy.get('@rating-filter').should('not.include.text', '4.5+');
  });

  it('When selecting 4+ only Hotel A must be displayed', () => {
    cy.get('@rating-filter').contains('4+').click();

    cy.get(CHECKBOX).eq(0).should('be.checked');

    cy.get(HOTELS_LIST).children().should('have.length', 1);
    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel A');
  });

  it('When selecting 4+ and then selecting 3+ both hotels must be displayed', () => {
    cy.get('@rating-filter').contains('4+').click();
    cy.get('@rating-filter').contains('3+').click();

    cy.get(CHECKBOX).eq(0).should('be.checked');
    cy.get(CHECKBOX).eq(2).should('be.checked');

    cy.get(HOTELS_LIST).children().should('have.length', 2);
  });
});
