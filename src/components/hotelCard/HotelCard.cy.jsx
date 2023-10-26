import HotelCard from './index';

const PRICE = '[data-cy=hotel-card-price]';
const RATING_LABEL = '[data-cy=hotel-card-rating-label]';
const RATING = '[data-cy=hotel-card-rating]';
const REVIEWS_COUNT = '[data-cy=hotel-card-reviews]';

const HOTEL1 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 4,
          comment: 'Great room!',
        },
        {
          username: 'JaneSmith',
          rating: 5,
          comment: 'Excellent service!',
        },
      ],
    },
    {
      roomId: 102,
      roomType: 'Double',
      capacity: 2,
      pricePerNight: 150,
      bookedDates: [
        '2023-10-7',
        '2023-11-14',
        '2023-11-15',
        '2023-11-16',
        '2023-11-17',
      ],
      reviews: [
        {
          username: 'AliceJohnson',
          rating: 4,
          comment: 'Clean and comfortable!',
        },
      ],
    },
  ],
};

const HOTEL2 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 5,
          comment: 'Great room!',
        },
      ],
    },
  ],
};

const HOTEL3 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 10,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [],
    },
  ],
};

const HOTEL4 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 1,
          comment: 'Great room!',
        },
      ],
    },
  ],
};

const HOTEL5 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 3.6,
          comment: 'Great room!',
        },
      ],
    },
  ],
};

const HOTEL6 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 4.1,
          comment: 'Great room!',
        },
      ],
    },
  ],
};

const HOTEL7 = {
  id: 1,
  name: 'Hotel A',
  city: 'paris',
  address: '123 Main Street',
  distanceFromCenter: 3.5,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/square200/466014443.webp?k=5d05c2f38b420240d795fe164a35801e9f7b696615728d9786a7809ad7087e9d&o=',
  rooms: [
    {
      roomId: 101,
      roomType: 'Single',
      capacity: 1,
      pricePerNight: 300,
      bookedDates: ['2023-10-1', '2023-10-5'],
      reviews: [
        {
          username: 'JohnDoe',
          rating: 4.6,
          comment: 'Great room!',
        },
      ],
    },
  ],
};

describe('<HotelCard />', () => {
  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL1} />);

    cy.get(PRICE).should('include.text', 150);
    cy.get(RATING_LABEL).should('have.text', 'Fabulous');
    cy.get(RATING).should('have.text', '4.3');
    cy.get(REVIEWS_COUNT).should('include.text', 3);
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL2} />);
    cy.get(PRICE).should('include.text', 300);

    cy.get(RATING_LABEL).should('have.text', 'Exceptional');
    cy.get(RATING).should('have.text', '5.0');
    cy.get(REVIEWS_COUNT).should('include.text', 1);
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL3} />);

    cy.get(PRICE).should('include.text', 10);
    cy.get(RATING_LABEL).should('not.exist');
    cy.get(RATING).should('not.exist');
    cy.get(REVIEWS_COUNT).should('not.exist');
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL4} />);

    cy.get(PRICE).should('include.text', 300);
    cy.get(RATING_LABEL).should('have.text', 'Review score');
    cy.get(RATING).should('have.text', '1.0');
    cy.get(REVIEWS_COUNT).should('include.text', 1);
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL5} />);

    cy.get(PRICE).should('include.text', 300);
    cy.get(RATING_LABEL).should('have.text', 'Good');
    cy.get(RATING).should('have.text', '3.6');
    cy.get(REVIEWS_COUNT).should('include.text', 1);
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL6} />);

    cy.get(PRICE).should('include.text', 300);
    cy.get(RATING_LABEL).should('have.text', 'Very good');
    cy.get(RATING).should('have.text', '4.1');
    cy.get(REVIEWS_COUNT).should('include.text', 1);
  });

  it('Hotel card show correct info', () => {
    cy.mount(<HotelCard hotel={HOTEL7} />);

    cy.get(PRICE).should('include.text', 300);
    cy.get(RATING_LABEL).should('have.text', 'Superb');
    cy.get(RATING).should('have.text', '4.6');
    cy.get(REVIEWS_COUNT).should('include.text', 1);
  });
});
