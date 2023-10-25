import Modal from '.';

const OVERLAY = '[data-cy="modal-overlay"]';
const CONTAINER = '[data-cy="modal-container"]';
const CROSS = '[data-cy="modal-cross"]';
const CONTENT = '[data-cy="modal-content"]';

describe('<Modal />', () => {
  beforeEach(() => {
    const onCloseSpy = cy.spy().as('onCloseSpy');
    cy.mount(
      <Modal onClose={onCloseSpy}>
        <div data-cy="modal-content">Hello world</div>
      </Modal>,
    );
  });

  it('Renders correctly', () => {
    cy.get(OVERLAY).should('be.visible');
    cy.get(CONTAINER).should('be.visible');
    cy.get(CONTENT).should('be.visible');
    cy.get(CROSS).should('be.visible');
  });

  it('onClose calls when clicking cross', () => {
    cy.get(CROSS).click();

    cy.get('@onCloseSpy').should('have.been.calledOnce');
  });

  it('onClose calls when clicking outside container', () => {
    cy.get(OVERLAY).click(0, 0);

    cy.get('@onCloseSpy').should('have.been.calledOnce');
  });
});
