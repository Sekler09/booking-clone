import React from 'react';
import AddReviewForm from './index';

const USERNAME_INPUT = '[data-cy=review-username-input]';
const ROOM_SELECT = '[data-cy=review-room-select]';
const RATING_INPUT = '[data-cy=review-rating-input]';
const COMMENT_INPUT = '[data-cy=review-comment-input]';
const SUBMIT_BTN = '[data-cy=review-submit-btn]';

const USERNAME_TYPE = 'Andrew';
const RATING_TYPE = 3.5;
const RATING_MIN = 0;
const RATING_MAX = 5;
const COMMENT_TYPE = 'Hello world!';
const rooms = [
  {
    roomId: 1,
    roomType: 'Single',
  },
  {
    roomId: 2,
    roomType: 'Double',
  },
];

const ADD_REVIEW_CORRECT_CALL_ARGUMENTS = [
  rooms[1].roomId,
  {
    username: USERNAME_TYPE.trim(),
    rating: RATING_TYPE,
    comment: COMMENT_TYPE.trim(),
  },
];

describe('<AddReviewForm />', () => {
  beforeEach(() => {
    const onCloseSpy = cy.spy().as('onCloseSpy');
    const onReviewAddSpy = cy.spy().as('onReviewAddSpy');
    cy.mount(
      <AddReviewForm
        onClose={onCloseSpy}
        onReviewAdd={onReviewAddSpy}
        rooms={rooms}
      />,
    );
  });

  it('Username input works fine', () => {
    cy.get(USERNAME_INPUT).should('have.value', '');

    cy.get(USERNAME_INPUT)
      .type(USERNAME_TYPE)
      .should('have.value', USERNAME_TYPE);
  });

  it('Room select works fine', () => {
    cy.get(ROOM_SELECT).should('have.value', rooms[0].roomId);

    cy.get(ROOM_SELECT)
      .select(rooms[1].roomType)
      .should('have.value', rooms[1].roomId);

    cy.get(ROOM_SELECT)
      .select(rooms[0].roomType)
      .should('have.value', rooms[0].roomId);
  });

  it('Rating input works fine', () => {
    cy.get(RATING_INPUT).should('have.value', 0);

    cy.get(RATING_INPUT)
      .clear()
      .type(RATING_TYPE)
      .should('have.value', RATING_TYPE);

    cy.get(RATING_INPUT)
      .clear()
      .type(RATING_MIN - 1)
      .should('have.value', RATING_MIN - 1);
    cy.get(`${RATING_INPUT}:invalid`).should('be.visible');

    cy.get(RATING_INPUT)
      .clear()
      .type(RATING_MAX + 1)
      .should('have.value', RATING_MAX + 1);
    cy.get(`${RATING_INPUT}:invalid`).should('be.visible');
  });

  it('Comment input works fine', () => {
    cy.get(COMMENT_INPUT).should('have.value', '');

    cy.get(COMMENT_INPUT).type(COMMENT_TYPE).should('have.value', COMMENT_TYPE);
  });

  it('Form does not submit when username or comment is empty', () => {
    cy.get(USERNAME_INPUT).should('have.value', '');
    cy.get(COMMENT_INPUT).should('have.value', '');

    cy.get(SUBMIT_BTN).click();
    cy.get('@onReviewAddSpy').should('not.have.been.called');
    cy.get('@onCloseSpy').should('not.have.been.called');

    cy.get(COMMENT_INPUT).type(COMMENT_TYPE).should('have.value', COMMENT_TYPE);
    cy.get(USERNAME_INPUT).should('have.value', '');

    cy.get(SUBMIT_BTN).click();
    cy.get('@onReviewAddSpy').should('not.have.been.called');
    cy.get('@onCloseSpy').should('not.have.been.called');

    cy.get(COMMENT_INPUT).clear().should('have.value', '');
    cy.get(USERNAME_INPUT)
      .type(USERNAME_TYPE)
      .should('have.value', USERNAME_TYPE);

    cy.get(SUBMIT_BTN).click();
    cy.get('@onReviewAddSpy').should('not.have.been.called');
    cy.get('@onCloseSpy').should('not.have.been.called');
  });

  it('Form submits with correct data', () => {
    cy.get(USERNAME_INPUT)
      .should('have.value', '')
      .type(USERNAME_TYPE)
      .should('have.value', USERNAME_TYPE);

    cy.get(ROOM_SELECT)
      .should('have.value', rooms[0].roomId)
      .select(rooms[1].roomType)
      .should('have.value', rooms[1].roomId);

    cy.get(RATING_INPUT)
      .should('have.value', 0)
      .clear()
      .type(RATING_TYPE)
      .should('have.value', RATING_TYPE);

    cy.get(COMMENT_INPUT)
      .should('have.value', '')
      .type(COMMENT_TYPE)
      .should('have.value', COMMENT_TYPE);

    cy.get(SUBMIT_BTN).click();

    cy.get('@onReviewAddSpy').should(
      'have.been.calledWith',
      ADD_REVIEW_CORRECT_CALL_ARGUMENTS[0],
      // ...ADD_REVIEW_CORRECT_CALL_ARGUMENTS,
    );
  });
});
