const MAIN_INPUT = '[data-cy=main-input]';
const CITY_NO_VALUE = '';
const CITY_TYPE_VALUE = 'Paris';
const CITY_QUERY_PARAM = 'city=';

describe('City input interaction', () => {
  it('City input must have typed value', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(0).as('city-input');
    cy.get('@city-input').should('have.value', CITY_NO_VALUE);

    cy.get('@city-input').type(CITY_TYPE_VALUE);
    cy.get('@city-input').should('have.value', CITY_TYPE_VALUE);
  });

  it('Url must have search param city with typed value', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(0).as('city-input');
    cy.get('@city-input').should('have.value', CITY_NO_VALUE);

    cy.get('@city-input').type(CITY_TYPE_VALUE);
    cy.get('@city-input').should('have.value', CITY_TYPE_VALUE);
    cy.url().should('include', `${CITY_QUERY_PARAM}${CITY_TYPE_VALUE}`);
  });

  it('Input must have typed value after page reload', () => {
    cy.visit('/');

    cy.get(MAIN_INPUT).eq(0).as('city-input');
    cy.get('@city-input').should('have.value', CITY_NO_VALUE);

    cy.get('@city-input').type(CITY_TYPE_VALUE);
    cy.get('@city-input').should('have.value', CITY_TYPE_VALUE);
    cy.url().should('include', `${CITY_QUERY_PARAM}${CITY_TYPE_VALUE}`);

    cy.reload();
    cy.url().should('include', `${CITY_QUERY_PARAM}${CITY_TYPE_VALUE}`);
  });

  it('Input must have value from search params', () => {
    cy.visit(`/?${CITY_QUERY_PARAM}${CITY_TYPE_VALUE}`);

    cy.get(MAIN_INPUT).eq(0).should('have.value', CITY_TYPE_VALUE);
  });
});
