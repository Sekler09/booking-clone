describe('Sort options must sort hotels correctly', () => {
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
    cy.get('[data-cy=sort-options]').as('sort-options');
  });

  it('Default sort option must be default', () => {
    cy.get('@sort-options').contains('Default');
  });

  it('Sort options list must be opened on button click', () => {
    cy.get('@sort-options').click();
    cy.get('@sort-options').contains('Default');
    cy.get('@sort-options').contains('Price (Low to High)');
    cy.get('@sort-options').contains('Price (High to Low)');
    cy.get('@sort-options').contains('Rating (Low to High)');
    cy.get('@sort-options').contains('Rating (High to Low)');
  });

  it('Price (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();
    cy.get('@sort-options').contains('Price (Low to High)').click();
    cy.get('@sort-options').contains('Price (Low to High)');
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel C');
    cy.get('[data-cy=hotels-list]').children().eq(1).contains('Hotel A');
  });

  it('Price (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();
    cy.get('@sort-options').contains('Price (High to Low)').click();
    cy.get('@sort-options').contains('Price (High to Low)');
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel A');
    cy.get('[data-cy=hotels-list]').children().eq(1).contains('Hotel C');
  });

  it('Rating (High to Low) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();
    cy.get('@sort-options').contains('Rating (High to Low)').click();
    cy.get('@sort-options').contains('Rating (High to Low)');
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel A');
    cy.get('[data-cy=hotels-list]').children().eq(1).contains('Hotel C');
  });

  it('Rating (Low to High) sort options displays hotels in correct order', () => {
    cy.get('@sort-options').click();
    cy.get('@sort-options').contains('Rating (Low to High)').click();
    cy.get('@sort-options').contains('Rating (Low to High)');
    cy.get('[data-cy=hotels-list]').children().eq(0).contains('Hotel C');
    cy.get('[data-cy=hotels-list]').children().eq(1).contains('Hotel A');
  });
});
