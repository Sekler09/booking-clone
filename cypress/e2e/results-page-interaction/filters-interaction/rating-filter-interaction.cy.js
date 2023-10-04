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

  it('Rating filter must have options 4+, 3.5+, 3+ for Paris hotels', () => {
    cy.contains('Review Score').parent().as('rating-filter');
    cy.get('@rating-filter').contains('4+');
    cy.get('@rating-filter').contains('3.5+');
    cy.get('@rating-filter').contains('3+');
    cy.get('@rating-filter').should('not.include.text', '4.5+');
  });

  it('When selecting 4+ only Hotel A must be displayed', () => {
    cy.contains('Review Score').parent().as('rating-filter');
    cy.get('@rating-filter').contains('4+').click();
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel A');
  });

  it('When selecting 4+ and then selecting 3+ both hotels must be displayed', () => {
    cy.contains('Review Score').parent().as('rating-filter');
    cy.get('@rating-filter').contains('4+').click();
    cy.get('@rating-filter').contains('3+').click();
    cy.get('[data-cy=hotels-list]').children().should('have.length', 2);
  });
});
