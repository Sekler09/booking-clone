describe('Rating filter must show correct information', () => {
  beforeEach(() => {
    cy.fixture('db').then(s => {
      cy.intercept(
        'GET',
        '/hotels*',
        s.hotels.filter(h => h.city === 'Paris'),
      ).as('getHotels');
    });
    cy.visit('/searchresults?city=Paris');
    cy.wait('@getHotels');
  });

  it('Distance filter must have options less than 3 and 5km for Paris hotels', () => {
    cy.contains('Distance from the center').parent().as('distance-filter');
    cy.get('@distance-filter').contains('3km');
    cy.get('@distance-filter').contains('5km');
    cy.get('@distance-filter').should('not.include.text', '1km');
  });

  it('When selecting less than 3km only Hotel C must be displayed', () => {
    cy.contains('Distance from the center').parent().as('distance-filter');
    cy.get('@distance-filter').contains('3km').click();
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel C');
  });

  it('When selecting 3km and then selecting 5km both hotels must be displayed', () => {
    cy.contains('Distance from the center').parent().as('distance-filter');
    cy.get('@distance-filter').contains('3km').click();
    cy.get('@distance-filter').contains('5km').click();
    cy.get('[data-cy=hotels-list]').children().should('have.length', 2);
  });
});
