import React from 'react';
import HotelGallery from '../../src/components/hotelGallery/index';

const GALLERY_IMG = '[data-cy=gallery-image]';
const GALLERY_CONTAINER = '.swiper-wrapper';
const NEXT_BTN = '.next-btn';
const PREV_BTN = '.prev-btn';
const GALLERY_LENGTH = 11;

describe('<HotelGallery />', () => {
  beforeEach(() => {
    cy.mount(
      <HotelGallery
        hotel={{
          image:
            'https://cf.bstatic.com/xdata/images/hotel/square200/482818914.webp?k=956909b72bd50eb028d1327daaa55ff5f5bd2f75e8549fdb0ed705eb57cab621&o=',
        }}
      />,
    );
  });

  it('renders', () => {
    cy.get(GALLERY_IMG).should('have.length', GALLERY_LENGTH * 2 - 1);
    cy.get(NEXT_BTN).should('be.enabled');
    cy.get(PREV_BTN).should('be.disabled');
  });

  it('First image stops being visible after next btn click', () => {
    cy.get(GALLERY_IMG).should('have.length', GALLERY_LENGTH * 2 - 1);
    cy.get(GALLERY_IMG).eq(0).should('be.visible');

    cy.get(NEXT_BTN).click().wait(300);

    let firstImageWidth;
    cy.get(GALLERY_IMG)
      .eq(0)
      .invoke('css', 'width')
      .then(w => {
        firstImageWidth = w;
      });

    cy.get(GALLERY_CONTAINER)
      .invoke('css', 'transform')
      .then(transform => {
        expect(+transform.split(',')[4]).to.be.lessThan(
          -firstImageWidth.replace('px', ''),
        );
      });
  });

  it('First image becomes visible again after next and prev btn click', () => {
    cy.get(GALLERY_IMG).should('have.length', GALLERY_LENGTH * 2 - 1);
    cy.get(GALLERY_IMG).eq(0).should('be.visible');

    cy.get(NEXT_BTN).click().wait(300);

    let firstImageWidth;
    cy.get(GALLERY_IMG)
      .eq(0)
      .invoke('css', 'width')
      .then(w => {
        firstImageWidth = w;
      });

    cy.get(GALLERY_CONTAINER)
      .invoke('css', 'transform')
      .then(transform => {
        expect(+transform.split(',')[4]).to.be.lessThan(
          -firstImageWidth.replace('px', ''),
        );
      });

    cy.get(PREV_BTN).click().wait(300);
    cy.get(GALLERY_CONTAINER)
      .invoke('css', 'transform')
      .then(transform => {
        expect(+transform.split(',')[4]).to.be.not.lessThan(
          -firstImageWidth.replace('px', ''),
        );
      });
  });
});
