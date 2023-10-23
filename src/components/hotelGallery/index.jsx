import React from 'react';
import { string, shape } from 'prop-types';
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
  GalleryImage,
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
            <FirstImageWrapper data-cy="gallery-image">
              <GalleryImage src={imgUrl} alt="" />
            </FirstImageWrapper>
          </SwiperSlide>
          {arr.map(el => (
            <SwiperSlide key={el}>
              <ImageWrapper data-cy="gallery-image">
                <GalleryImage src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper data-cy="gallery-image">
                <GalleryImage src={imgUrl} alt="" />
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
    image: string.isRequired,
  }).isRequired,
};
