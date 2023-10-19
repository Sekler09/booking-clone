const MAIN_INPUT = '[data-cy=main-input]';
const COUNTERS_WRAPPER = '[data-cy=counters-wrapper]';
const COUNT_VALUE = '[data-cy=count-value]';
const DECREMENT = '[data-cy=count-decrement]';
const INCREMENT = '[data-cy=count-increment]';

const COUNTS_NO_VALUE = '1 adult · 0 children · 1 room';

const ADULTS_INIT_VALUE = 1;
const ADULTS_QUERY_PARAM = 'adults=';

const ROOMS_INIT_VALUE = 1;
const ROOMS_QUERY_PARAM = 'rooms=';

const CHILDREN_INIT_VALUE = 0;
const CHILDREN_QUERY_PARAM = 'children=';

describe('Counts input interaction', () => {
  it('Field with counts manipulation must be opened on input click', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get(COUNTERS_WRAPPER).as('counts-input-wrapper');

    cy.get('@counts-input-wrapper').contains('adults');
    cy.get('@counts-input-wrapper').contains('children');
    cy.get('@counts-input-wrapper').contains('rooms');
    cy.get('@counts-input-wrapper').contains('done');
  });

  it('Inputs` adults value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get(COUNTERS_WRAPPER).as('counts-input-wrapper');

    cy.get(COUNT_VALUE).eq(0).contains(ADULTS_INIT_VALUE);

    cy.get(DECREMENT).eq(0).as('decrement');
    cy.get(INCREMENT).eq(0).as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE + 1} adults`,
    );
    cy.get(COUNT_VALUE)
      .eq(0)
      .contains(ADULTS_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ADULTS_INIT_VALUE} adult`,
    );
    cy.get(COUNT_VALUE).eq(0).contains(ADULTS_INIT_VALUE);
  });

  it('Inputs` children value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get(COUNTERS_WRAPPER).as('counts-input-wrapper');

    cy.get(COUNT_VALUE).eq(1).contains(CHILDREN_INIT_VALUE);

    cy.get(DECREMENT).eq(1).as('decrement');
    cy.get(INCREMENT).eq(1).as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE + 1} children`,
    );
    cy.get(COUNT_VALUE)
      .eq(1)
      .contains(CHILDREN_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should(
      'include.value',
      `${CHILDREN_INIT_VALUE} children`,
    );
    cy.get(COUNT_VALUE).eq(1).contains(CHILDREN_INIT_VALUE);
  });

  it('Inputs` rooms value must coincide with value in the box', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.get('@counts-input').click();

    cy.get(COUNTERS_WRAPPER).as('counts-input-wrapper');

    cy.get(COUNT_VALUE).eq(2).contains(ROOMS_INIT_VALUE);

    cy.get(DECREMENT).eq(2).as('decrement');
    cy.get(INCREMENT).eq(2).as('increment');

    cy.get('@increment').click();
    cy.get('@counts-input').should(
      'include.value',
      `${ROOMS_INIT_VALUE + 1} rooms`,
    );
    cy.get(COUNT_VALUE)
      .eq(2)
      .contains(ROOMS_INIT_VALUE + 1);

    cy.get('@decrement').click();
    cy.get('@counts-input').should('include.value', `${ROOMS_INIT_VALUE} room`);
    cy.get(COUNT_VALUE).eq(2).contains(ROOMS_INIT_VALUE);
  });

  it('Url must have search param adults with adults count if it is not 1', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ADULTS_QUERY_PARAM);

    cy.get(INCREMENT).eq(0).click();
    cy.url().should('include', `${ADULTS_QUERY_PARAM}${ADULTS_INIT_VALUE + 1}`);
  });

  it('Url must have search param children with children count if it is not 0', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', CHILDREN_QUERY_PARAM);

    cy.get(INCREMENT).eq(1).click();
    cy.url().should(
      'include',
      `${CHILDREN_QUERY_PARAM}${CHILDREN_INIT_VALUE + 1}`,
    );
  });

  it('Url must have search param rooms with rooms count if it is not 1', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ROOMS_QUERY_PARAM);

    cy.get(INCREMENT).eq(2).click();
    cy.url().should('include', `${ROOMS_QUERY_PARAM}${ROOMS_INIT_VALUE + 1}`);
  });

  it('Adults must have picked value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(2).as('counts-input');
    cy.get('@counts-input').click();

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ADULTS_QUERY_PARAM);

    cy.get(INCREMENT).eq(0).click();

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

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', CHILDREN_QUERY_PARAM);

    cy.get(INCREMENT).eq(1).click();

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

    cy.get('@counts-input').should('have.value', COUNTS_NO_VALUE);
    cy.url().should('not.include', ROOMS_QUERY_PARAM);

    cy.get(INCREMENT).eq(2).click();

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
