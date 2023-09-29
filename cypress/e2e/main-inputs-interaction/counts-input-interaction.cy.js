describe('Counts input interaction', () => {
  it('Field with counts manipulation must be opened on input click', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input').contains('Adults');
    cy.get('@counts-input').contains('Children');
    cy.get('@counts-input').contains('Rooms');
    cy.get('@counts-input').contains('Done');
  });

  it('Inputs` adults value must coincide with value in the box', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '1 adult');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Adults').as('adults-container');
    cy.get('@adults-container').contains(1);
    cy.get('@adults-container')
      .children()
      .children('[data-cy=count-decrement]')
      .as('decrement');
    cy.get('@adults-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '2 adults');
    cy.get('@adults-container').contains(2);
    cy.get('@decrement').click();
    cy.get('@counts-input').should('include.value', '1 adult');
    cy.get('@adults-container').contains(1);
  });

  it('Inputs` children value must coincide with value in the box', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '0 children');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper')
      .contains('Children')
      .as('children-container');
    cy.get('@children-container').contains(0);
    cy.get('@children-container')
      .children()
      .children('[data-cy=count-decrement]')
      .as('decrement');
    cy.get('@children-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '1 children');
    cy.get('@children-container').contains(1);
    cy.get('@decrement').click();
    cy.get('@counts-input').should('include.value', '0 children');
    cy.get('@children-container').contains(0);
  });

  it('Inputs` rooms value must coincide with value in the box', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '1 room');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Rooms').as('rooms-container');
    cy.get('@rooms-container').contains(1);
    cy.get('@rooms-container')
      .children()
      .children('[data-cy=count-decrement]')
      .as('decrement');
    cy.get('@rooms-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '2 rooms');
    cy.get('@rooms-container').contains(2);
    cy.get('@decrement').click();
    cy.get('@counts-input').should('include.value', '1 room');
    cy.get('@rooms-container').contains(1);
  });

  it('Url must have search param adults with adults count if it is not 1', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Adults').as('adults-container');
    cy.get('@adults-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.url().should('include', `adults=2`);
  });

  it('Url must have search param children with children count if it is not 0', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper')
      .contains('Children')
      .as('children-container');
    cy.get('@children-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.url().should('include', `children=1`);
  });

  it('Url must have search param rooms with rooms count if it is not 1', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Rooms').as('rooms-container');
    cy.get('@rooms-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.url().should('include', `rooms=2`);
  });

  it('Adults must have picked value after page reload', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Adults').as('adults-container');
    cy.get('@adults-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '2 adults');
    cy.reload();
    cy.get('@counts-input').should('include.value', '2 adults');
  });

  it('Children must have picked value after page reload', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper')
      .contains('Children')
      .as('children-container');
    cy.get('@children-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '1 children');
    cy.reload();
    cy.get('@counts-input').should('include.value', '1 children');
  });

  it('Rooms must have picked value after page reload', () => {
    cy.visit('/');
    cy.get('[data-cy=main-input]:nth-child(3)').as('counts-input-wrapper');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').click();
    cy.get('@counts-input-wrapper').contains('Rooms').as('rooms-container');
    cy.get('@rooms-container')
      .children()
      .children('[data-cy=count-increment]')
      .as('increment');
    cy.get('@increment').click();
    cy.get('@counts-input').should('include.value', '2 rooms');
    cy.reload();
    cy.get('@counts-input').should('include.value', '2 rooms');
  });

  it('Adults must have value from search params', () => {
    cy.visit('/?adults=2');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '2 adults');
  });

  it('Children must have value from search params', () => {
    cy.visit('/?children=2');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '2 children');
  });

  it('Rooms must have value from search params', () => {
    cy.visit('/?rooms=2');
    cy.get('[data-cy=main-input]:nth-child(3) input').as('counts-input');
    cy.get('@counts-input').should('include.value', '2 rooms');
  });
});
