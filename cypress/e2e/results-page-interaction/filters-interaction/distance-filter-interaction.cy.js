const DEFAULT_ROUTE = '/searchresults?city=Paris';
const HOTELS_LIST = '[data-cy=hotels-list]';
const CHECKBOX_FILTER = '[data-cy=checkbox-filter]';

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
    cy.get(CHECKBOX_FILTER).eq(1).as('distance-filter');
  });

  it('Distance filter must have options less than 3 and 5km for Paris hotels', () => {
    cy.get('@distance-filter').contains('3km');
    cy.get('@distance-filter').contains('5km');
    cy.get('@distance-filter').should('not.include.text', '1km');
  });

  it('When selecting less than 3km only Hotel C must be displayed', () => {
    cy.get('@distance-filter').contains('3km').click();

    cy.get(HOTELS_LIST).children().should('have.length', 1);
    cy.get(HOTELS_LIST).children().eq(0).contains('Hotel C');
  });

  it('When selecting 3km and then selecting 5km both hotels must be displayed', () => {
    cy.get('@distance-filter').contains('3km').click();

    cy.get('@distance-filter').contains('5km').click();

    cy.get(HOTELS_LIST).children().should('have.length', 2);
  });
});
