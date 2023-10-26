import PriceFilter from '../../src/components/priceFilter';

const MIN = 0;
const STEP = 10;
const MAX = 100;

const MAX_SLIDER = '[data-cy=thumb-max]';
const MIN_SLIDER = '[data-cy=thumb-min]';
const MAX_TYPED_VALUE = '{leftarrow}'.repeat((MAX - MIN) / STEP - 1);
const MIN_TYPED_VALUE = '{rightarrow}'.repeat((MAX - MIN) / STEP - 1);

describe('<PriceFilter />', () => {
  beforeEach(() => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<PriceFilter max={MAX} min={MIN} onChange={onChangeSpy} />);
  });

  it('render with correct initial values', () => {
    cy.get(MAX_SLIDER).should('have.value', MAX);
    cy.get(MIN_SLIDER).should('have.value', MIN);
  });

  it('min slider changes its values correctly', () => {
    cy.get(MIN_SLIDER).should('have.value', MIN);

    cy.get(MIN_SLIDER).focus();
    cy.get(MIN_SLIDER).realType(MIN_TYPED_VALUE);

    cy.get(MIN_SLIDER).should('have.value', MAX - STEP);
  });

  it('max slider changes its values correctly', () => {
    cy.get(MAX_SLIDER).should('have.value', MAX);

    cy.get(MAX_SLIDER).focus();
    cy.get(MAX_SLIDER).realType(MAX_TYPED_VALUE);

    cy.get(MAX_SLIDER).should('have.value', MIN + STEP);
  });

  it('min slider value must be still less than max no matter how many times increase', () => {
    cy.get(MAX_SLIDER).should('have.value', MAX);
    cy.get(MIN_SLIDER).should('have.value', MIN);

    cy.get(MAX_SLIDER).focus();
    cy.get(MAX_SLIDER).realType('{leftarrow}'.repeat(4));
    cy.get(MAX_SLIDER).should('have.value', MAX - STEP * 4);

    cy.get(MIN_SLIDER).focus();
    cy.get(MIN_SLIDER).realType(MIN_TYPED_VALUE);
    cy.get(MIN_SLIDER).should('have.value', MAX - STEP * 5);
  });
});
