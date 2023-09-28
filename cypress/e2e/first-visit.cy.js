describe('first visit', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('City input must be empty', () => {
    cy.get('[data-cy=main-input]:nth-child(1) input').as('city-input');
    cy.get('@city-input').should('have.value', '');
  });

  it('No dates must be selected', () => {
    cy.get('[data-cy=main-input]:nth-child(2) input').as('date-input');
    cy.get('@date-input').should(
      'have.value',
      'Check-in date -- Check-out date',
    );
  });

  it('Counts must be initial', () => {
    cy.get('[data-cy=main-input]:nth-child(3) input').as('count-input');
    cy.get('@count-input').should(
      'have.value',
      '1 adult · 0 children · 1 room',
    );
  });
});
