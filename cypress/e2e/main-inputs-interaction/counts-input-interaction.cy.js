const MAIN_INPUT = '[data-cy=main-input]';
const DECREMENT = '[data-cy=count-decrement]';
const INCREMENT = '[data-cy=count-increment]';
const COUNTS_NO_VALUE = '1 adult · 0 children · 1 room';
const ADULTS_TITLE = 'Adults';
const ADULTS_INIT_VALUE = 1;
const ADULTS_QUERY_PARAM = 'adults=';
const ROOMS_TITLE = 'Rooms';
const ROOMS_INIT_VALUE = 1;
const ROOMS_QUERY_PARAM = 'rooms=';
const CHILDREN_TITLE = 'Children';
const CHILDREN_INIT_VALUE = 0;
const CHILDREN_QUERY_PARAM = 'children=';

describe('Counts input interaction', () => {
  it('Field with counts manipulation must be opened on input click', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').parent().as('counts-input-wrapper');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);

    cy.get('@counts-input').click();

    cy.get('@counts-input-wrapper').contains('Adults');
    cy.get('@counts-input-wrapper').contains('Children');
    cy.get('@counts-input-wrapper').contains('Rooms');
    cy.get('@counts-input-wrapper').contains('Done');
  });

  it('Inputs` adults value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').parent().as('counts-input-wrapper');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get('@counts-input-wrapper')
      .contains(ADULTS_TITLE)
      .as('adults-container');

    cy.get('@adults-container').contains(ADULTS_INIT_VALUE);

    cy.get('@adults-container').children().children(DECREMENT).as('decrement');
    cy.get('@adults-container').children().children(INCREMENT).as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE + 1} adults`,
    );
    cy.get('@adults-container').contains(ADULTS_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE} adult`,
    );
    cy.get('@adults-container').contains(ADULTS_INIT_VALUE);
  });

  it('Inputs` children value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').parent().as('counts-input-wrapper');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get('@counts-input-wrapper')
      .contains(CHILDREN_TITLE)
      .as('children-container');

    cy.get('@children-container').contains(CHILDREN_INIT_VALUE);

    cy.get('@children-container')
      .children()
      .children(DECREMENT)
      .as('decrement');
    cy.get('@children-container')
      .children()
      .children(INCREMENT)
      .as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE + 1} children`,
    );
    cy.get('@children-container').contains(CHILDREN_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE} children`,
    );
    cy.get('@children-container').contains(CHILDREN_INIT_VALUE);
  });

  it('Inputs` rooms value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').parent().as('counts-input-wrapper');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get('@counts-input-wrapper').contains(ROOMS_TITLE).as('rooms-container');

    cy.get('@rooms-container').contains(ROOMS_INIT_VALUE);

    cy.get('@rooms-container').children().children(DECREMENT).as('decrement');
    cy.get('@rooms-container').children().children(INCREMENT).as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ROOMS_INIT_VALUE + 1} rooms`,
    );
    cy.get('@rooms-container').contains(ROOMS_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should('include.value', `${ROOMS_INIT_VALUE} room`);
    cy.get('@rooms-container').contains(ROOMS_INIT_VALUE);
  });

  it('Url must have search param adults with adults count if it is not 1', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(ADULTS_TITLE)
      .as('adults-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ADULTS_QUERY_PARAM);

    cy.get('@adults-container').children().children(INCREMENT).click();
    cy.url().should('include', `${ADULTS_QUERY_PARAM}${ADULTS_INIT_VALUE + 1}`);
  });

  it('Url must have search param children with children count if it is not 0', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(CHILDREN_TITLE)
      .as('children-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', CHILDREN_QUERY_PARAM);

    cy.get('@children-container').children().children(INCREMENT).click();
    cy.url().should(
      'include',
      `${CHILDREN_QUERY_PARAM}${CHILDREN_INIT_VALUE + 1}`,
    );
  });

  it('Url must have search param rooms with rooms count if it is not 1', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(ROOMS_TITLE)
      .as('rooms-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ROOMS_QUERY_PARAM);

    cy.get('@rooms-container').children().children(INCREMENT).click();
    cy.url().should('include', `${ROOMS_QUERY_PARAM}${ROOMS_INIT_VALUE + 1}`);
  });

  it('Adults must have picked value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(ADULTS_TITLE)
      .as('adults-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ADULTS_QUERY_PARAM);

    cy.get('@adults-container').children().children(INCREMENT).click();

    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE + 1} adults`,
    );
    cy.url().should('include', `${ADULTS_QUERY_PARAM}${ADULTS_INIT_VALUE + 1}`);

    cy.reload();

    cy.url().should('include', `${ADULTS_QUERY_PARAM}${ADULTS_INIT_VALUE + 1}`);
    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE + 1} adults`,
    );
  });

  it('Children must have picked value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(CHILDREN_TITLE)
      .as('children-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', CHILDREN_QUERY_PARAM);

    cy.get('@children-container').children().children(INCREMENT).click();

    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE + 1} children`,
    );
    cy.url().should(
      'include',
      `${CHILDREN_QUERY_PARAM}${CHILDREN_INIT_VALUE + 1}`,
    );

    cy.reload();

    cy.url().should(
      'include',
      `${CHILDREN_QUERY_PARAM}${CHILDREN_INIT_VALUE + 1}`,
    );
    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE + 1} children`,
    );
  });

  it('Rooms must have picked value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input')
      .parent()
      .contains(ROOMS_TITLE)
      .as('rooms-container');

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ROOMS_QUERY_PARAM);

    cy.get('@rooms-container').children().children(INCREMENT).click();

    cy.get('@counts-input').should(
      'include.value',
      `${ROOMS_INIT_VALUE + 1} rooms`,
    );
    cy.url().should('include', `${ROOMS_QUERY_PARAM}${ROOMS_INIT_VALUE + 1}`);

    cy.reload();

    cy.url().should('include', `${ROOMS_QUERY_PARAM}${ROOMS_INIT_VALUE + 1}`);
    cy.get('@counts-input').should(
      'include.value',
      `${ROOMS_INIT_VALUE + 1} rooms`,
    );
  });

  it('Adults must have value from search params', () => {
    cy.visit(`/?${ADULTS_QUERY_PARAM}${ADULTS_INIT_VALUE + 1}`);

    cy.get(MAIN_INPUT)
      .eq(2)
      .should('include.value', `${ADULTS_INIT_VALUE + 1} adults`);
  });

  it('Children must have value from search params', () => {
    cy.visit(`/?${CHILDREN_QUERY_PARAM}${CHILDREN_INIT_VALUE + 1}`);

    cy.get(MAIN_INPUT)
      .eq(2)
      .should('include.value', `${CHILDREN_INIT_VALUE + 1} children`);
  });

  it('Rooms must have value from search params', () => {
    cy.visit(`/?${ROOMS_QUERY_PARAM}${ROOMS_INIT_VALUE + 1}`);

    cy.get(MAIN_INPUT)
      .eq(2)
      .should('include.value', `${ROOMS_INIT_VALUE + 1} rooms`);
  });
});
