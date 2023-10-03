describe('Price filter must work correctly', () => {
  beforeEach(() => {
    cy.visit('/?city=Paris');
    cy.fixture('db').then(s => {
      cy.intercept(
        'GET',
        '/hotels*',
        s.hotels.filter(h => h.city === 'Paris'),
      ).as('getHotels');
    });
    cy.get('[data-cy=search-btn]').click();
  });

  it('Default value must be 50 and 300', () => {
    cy.get('[data-cy=thumb-max]').should('have.value', 300);
    cy.get('[data-cy=thumb-min]').should('have.value', 50);
  });

  it('When max price is set to 140 only 1 hotel must be displayed', () => {
    cy.get('[data-cy=thumb-max]').focus();
    cy.get('[data-cy=thumb-max]').realType('{leftarrow}'.repeat(16));
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel C');
  });

  it('When min price is set to 210 only 1 hotel must be displayed', () => {
    cy.get('[data-cy=thumb-min]').focus();
    cy.get('[data-cy=thumb-min]').realType('{rightarrow}'.repeat(16));
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel A');
  });
});
