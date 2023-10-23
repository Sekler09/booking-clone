import React from 'react';
import CheckboxFilter from './index';

const FILTER_TITLE = '[data-cy=checkbox-filter-title]';
const CHECKBOX_INPUT = '[data-cy=checkbox-filter-input]';
const CHECKBOX_LABEL = '[data-cy=checkbox-label]';
const CHECKBOX_COUNT = '[data-cy=checkbox-count]';

const TITLE = 'Filter';
const CHECKBOXES = [
  {
    value: 1,
    label: 'One',
    count: 1,
    checked: false,
  },
  {
    value: 2,
    label: 'Two',
    count: 2,
    checked: true,
  },
  {
    value: 3,
    label: 'Three',
    count: 0,
    checked: false,
  },
];

describe('<CheckboxFilter />', () => {
  beforeEach(() => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(
      <CheckboxFilter
        title={TITLE}
        checkboxes={CHECKBOXES}
        onChange={onChangeSpy}
      />,
    );
  });

  it('renders correctly', () => {
    cy.get(FILTER_TITLE).should('have.text', TITLE);
    cy.get(CHECKBOX_INPUT)
      .should('have.length', CHECKBOXES.length - 1)
      .each(($el, index) => {
        cy.wrap($el).should(
          CHECKBOXES[index].checked ? 'be.checked' : 'not.be.checked',
        );

        cy.get(CHECKBOX_LABEL)
          .eq(index)
          .should('have.text', CHECKBOXES[index].label);

        cy.get(CHECKBOX_COUNT)
          .eq(index)
          .should('have.text', CHECKBOXES[index].count);
      });
  });

  it('Clicking a checkbox onChange must be called with corresponding arguments', () => {
    cy.get(CHECKBOX_LABEL).each(($el, index) => {
      cy.wrap($el).click();
      cy.get('@onChangeSpy').should(
        'have.been.calledWith',
        !CHECKBOXES[index].checked,
        CHECKBOXES[index].value,
      );
    });
  });
});
