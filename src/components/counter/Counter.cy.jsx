import React from 'react';
import Counter from './index';

const DECREMENT_BTN = '[data-cy=count-decrement]';
const INCREMENT_BTN = '[data-cy=count-increment]';
const VALUE = '[data-cy=count-value]';

const LABEL = 'Count';
const COUNT = 1;
const COUNT_MIN = 0;
const COUNT_MAX = 5;

describe('<Counter />', () => {
  beforeEach(() => {
    const onSetCountSpy = cy.spy().as('onSetCountSpy');
    cy.mount(
      <Counter
        label={LABEL}
        count={COUNT}
        setCount={onSetCountSpy}
        min={COUNT_MIN}
        max={COUNT_MAX}
      />,
    );
  });

  it('renders', () => {
    cy.get(DECREMENT_BTN);
    cy.get(INCREMENT_BTN);
    cy.get(VALUE);
  });
});
