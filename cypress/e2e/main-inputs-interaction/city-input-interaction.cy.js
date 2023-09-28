describe('City input interaction', () => {
  it('City input must have typed value', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(1) input').as('city-input');
    cy.get('@city-input').type('Paris');
    cy.get('@city-input').should('have.value', 'Paris');
  });

  it('Url must have search param city with typed value', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(1) input').as('city-input');
    cy.get('@city-input').type('Paris');
    cy.url().should('include', 'city=Paris');
  });

  it('Input must have typed value after page reload', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(1) input').as('city-input');
    cy.get('@city-input').type('Paris');
    cy.reload();
    cy.get('@city-input').should('have.value', 'Paris');
  });

  it('Input must have value from search params', () => {
    cy.visit('/?city=Paris');
    cy.get('[data-cy=main-input]:nth-child(1) input').as('city-input');
    cy.get('@city-input').should('have.value', 'Paris');
  });
});
