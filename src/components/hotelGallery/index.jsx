import React from 'react';
import { number, string, shape, arrayOf } from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import {
  ImageWrapper,
  FirstImageWrapper,
  ControlBtn,
  PrevArrow,
  NextArrow,
  ControlBtnsContainer,
  PhotoGallery,
} from './styled';

export default function HotelGallery({ hotel }) {
  const imgUrl = hotel.image;
  const arr = [...Array(10).keys()];
  return (
    <PhotoGallery>
      <Swiper
        slidesPerView="auto"
        spaceBetween={6}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        modules={[Navigation]}
      >
        <>
          <SwiperSlide>
            <FirstImageWrapper>
              <img src={imgUrl} alt="" />
            </FirstImageWrapper>
          </SwiperSlide>
          {arr.map(el => (
            <SwiperSlide key={el}>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </>
        <ControlBtnsContainer>
          <ControlBtn className="prev-btn">
            <PrevArrow />
          </ControlBtn>
          <ControlBtn className="next-btn">
            <NextArrow />
          </ControlBtn>
        </ControlBtnsContainer>
      </Swiper>
    </PhotoGallery>
  );
}

HotelGallery.propTypes = {
  hotel: shape({
    id: number.isRequired,
    name: string.isRequired,
    city: string.isRequired,
    address: string.isRequired,
    distance_from_center: number.isRequired,
    image: string.isRequired,
    rooms: arrayOf(
      shape({
        price_per_night: number.isRequired,
        reviews: arrayOf(
          shape({
            rating: number.isRequired,
          }),
        ),
      }),
    ),
  }).isRequired,
};
