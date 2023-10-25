import { ReactComponent as Icon } from 'assets/man.svg';
import MainFiltersInput from './index';

const INPUT = '[data-cy=main-input]';
const MODAL = '[data-cy=main-input-modal]';
const ARROW = '[data-cy=main-input-arrow]';
const ICON = '[data-cy=main-input-icon]';

const INPUT_VALUE = '12345';
const PLACEHOLDER = 'placeholder';

describe('<MainFilterInput />', () => {
  it('renders correctly with no props except required', () => {
    cy.mount(<MainFiltersInput inputValue={INPUT_VALUE} />);

    cy.get(INPUT).should('have.value', INPUT_VALUE);
    cy.get(MODAL).should('not.exist');
    cy.get(ARROW).should('not.exist');
  });

  it('renders correctly with all props except event handlers and false isOpen', () => {
    cy.mount(
      <MainFiltersInput
        inputValue=""
        placeholder={PLACEHOLDER}
        needArrow
        Icon={<Icon data-cy="main-input-icon" />}
        isReadOnly
        isOpen={false}
      />,
    );

    cy.get(INPUT).should('have.value', '').should('have.attr', 'readOnly');
    cy.get(MODAL).should('not.exist');
    cy.get(ARROW).should('be.visible');
    cy.get(ICON).should('be.visible');
  });

  it('renders correctly with all props except event handlers and true isOpen', () => {
    cy.mount(
      <MainFiltersInput
        inputValue=""
        placeholder={PLACEHOLDER}
        needArrow
        Icon={<Icon data-cy="main-input-icon" />}
        isReadOnly
        isOpen
      >
        <div>Hello</div>
      </MainFiltersInput>,
    );

    cy.get(INPUT).should('have.value', '').should('have.attr', 'readOnly');
    cy.get(MODAL).should('be.visible');
    cy.get(ARROW).should('be.visible');
    cy.get(ICON).should('be.visible');
  });

  it('onOpen function calls when clicking on input and isOpen is false', () => {
    const onOpenSpy = cy.spy().as('onOpenSpy');
    cy.mount(
      <MainFiltersInput inputValue="" onOpen={onOpenSpy}>
        <div>Hello</div>
      </MainFiltersInput>,
    );

    cy.get(INPUT).click();
    cy.get('@onOpenSpy').should('have.been.calledOnce');
  });

  it('onClose function calls when clicking on input and isOpen is true', () => {
    const onCloseSpy = cy.spy().as('onCloseSpy');
    cy.mount(
      <MainFiltersInput inputValue="" onClose={onCloseSpy} isOpen>
        <div>Hello</div>
      </MainFiltersInput>,
    );

    cy.get(INPUT).click();
    cy.get('@onCloseSpy').should('have.been.calledOnce');
  });
});
