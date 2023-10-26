import React from 'react';
import HotelRoom from '../../src/components/hotelRoom/index';

const ROOM_TYPE = '[data-cy=hotel-room-type]';
const ROOM_CAPACITY = '[data-cy=hotel-room-capacity]';
const ROOM_PRICE = '[data-cy=hotel-room-price]';
const ROOM_BOOK = '[data-cy=hotel-room-book]';

const ROOM = {
  roomId: 100,
  roomType: 'Single',
  capacity: 2,
  pricePerNight: 320,
  bookedDates: [],
  reviews: [],
};

describe('<HotelRoom />', () => {
  it('renders correctly', () => {
    cy.mount(<HotelRoom room={ROOM} onBook={() => {}} />);

    cy.get(ROOM_TYPE).should('have.text', ROOM.roomType);
    cy.get(ROOM_CAPACITY).should('include.text', ROOM.capacity);
    cy.get(ROOM_PRICE).should('include.text', ROOM.pricePerNight);
  });

  it('book button calls correctly', () => {
    const onBookSpy = cy.spy().as('onBookSpy');
    cy.mount(<HotelRoom room={ROOM} onBook={onBookSpy} />);

    cy.get(ROOM_TYPE).should('have.text', ROOM.roomType);
    cy.get(ROOM_CAPACITY).should('include.text', ROOM.capacity);
    cy.get(ROOM_PRICE).should('include.text', ROOM.pricePerNight);

    cy.get(ROOM_BOOK).click();

    cy.get('@onBookSpy').should('have.been.calledOnceWith', ROOM.roomId);
  });
});
