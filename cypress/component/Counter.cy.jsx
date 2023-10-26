import React from 'react';
import Counter from '../../src/components/counter/index';

const DECREMENT_BTN = '[data-cy=count-decrement]';
const INCREMENT_BTN = '[data-cy=count-increment]';
const VALUE = '[data-cy=count-value]';

const LABEL = 'Count';
const COUNT = 1;
const COUNT_MIN = 0;
const COUNT_MAX = 5;

describe('<Counter />', () => {
  it('renders correctly', () => {
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT}
        setCount={() => {}}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );
    cy.contains(LABEL);
    cy.get(DECREMENT_BTN).should('be.enabled');
    cy.get(INCREMENT_BTN).should('be.enabled');
    cy.get(VALUE).should('have.text', COUNT);
  });

  it('Increment button increases value by 1', () => {
    const setCountSpy = cy.spy().as('setCountSpy');
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT}
        setCount={setCountSpy}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );

    cy.get(VALUE).should('have.text', COUNT);
    cy.get(INCREMENT_BTN).should('be.enabled');
    cy.get(INCREMENT_BTN).click();

    cy.get('@setCountSpy').should('have.been.calledOnceWith', COUNT + 1);
  });

  it('Decrement button decrements value by 1', () => {
    const setCountSpy = cy.spy().as('setCountSpy');
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT}
        setCount={setCountSpy}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );

    cy.get(VALUE).should('have.text', COUNT);
    cy.get(DECREMENT_BTN).should('be.enabled');
    cy.get(DECREMENT_BTN).click();

    cy.get('@setCountSpy').should('have.been.calledOnceWith', COUNT - 1);
  });

  it('Increment button must be disabled if count value equals max', () => {
    const setCountSpy = cy.spy().as('setCountSpy');
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT_MAX}
        setCount={setCountSpy}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );

    cy.get(VALUE).should('have.text', COUNT_MAX);

    cy.get(INCREMENT_BTN).should('be.disabled');
  });

  it('Decrement button must be disabled if count value equals min', () => {
    const setCountSpy = cy.spy().as('setCountSpy');
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT_MIN}
        setCount={setCountSpy}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );

    cy.get(VALUE).should('have.text', COUNT_MIN);

    cy.get(DECREMENT_BTN).should('be.disabled');
  });
});
