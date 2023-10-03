describe('Search results must be correct', () => {
  beforeEach(() => {
    cy.fixture('db').then(s => {
      cy.intercept(
        'GET',
        '/hotels*',
        s.hotels.filter(h => h.city === 'Paris'),
      ).as('getHotels');
    });
    cy.visit('/');
    cy.get('[data-cy=search-btn]').as('search-btn');
  });

  it('There must be 2 hotels in Paris', () => {
    cy.visit('/?city=Paris');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=hotels-list]').children().should('have.length', 2);
  });

  it('There must be 2 hotels available in dates 10th October to 21th October in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-10&to=2023-10-21');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=hotels-list]').children().should('have.length', 2);
  });

  it('There must be 1 hotel available in dates 3th October to 21th October in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-3&to=2023-10-21');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
  });

  it('There must be no hotels available for 3 adults in 1 room in Paris', () => {
    cy.visit('/?city=Paris&adults=3');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=no-hotels-found]').contains(
      'No properties found in Paris',
    );
  });

  it('There must be 2 hotels available for 3 adults in 2 rooms in Paris', () => {
    cy.visit('/?city=Paris&adults=3&rooms=2');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=hotels-list]').children().should('have.length', 2);
  });

  it('There must be 1 hotel available for 3 adults in 2 rooms in dates 3th October to 21th in Paris', () => {
    cy.visit('/?city=Paris&from=2023-10-3&to=2023-10-21&adults=3&rooms=2');
    cy.get('@search-btn').click();
    cy.wait('@getHotels');
    cy.get('[data-cy=hotels-list]').children().should('have.length', 1);
  });
});
