import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import {
  ImageWrapper,
  HotelAddress,
  HotelDistanceFromTheCenter,
  HotelHeaderContainer,
  HotelName,
  HotelTitleWrapper,
  PhotoGallery,
  PriceStart,
  FirstImageWrapper,
  ControlBtn,
  PrevArrow,
  NextArrow,
  ControlBtnsContainer,
} from './styled';

export default function Hotel() {
  const hotel = useLoaderData();

  const startPrice = Math.min(...hotel.rooms.map(room => room.price_per_night));

  const imgUrl = 'https://placehold.co/600x400';

  return (
    <>
      <HotelHeaderContainer>
        <HotelTitleWrapper>
          <HotelName>{hotel.name}</HotelName>
          <HotelAddress>
            {hotel.city}, {hotel.address}
          </HotelAddress>
          <HotelDistanceFromTheCenter>
            {hotel.distance_from_center}km from the center
          </HotelDistanceFromTheCenter>
        </HotelTitleWrapper>
        <PriceStart>from ${startPrice}</PriceStart>
      </HotelHeaderContainer>
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
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
            <SwiperSlide>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
              <ImageWrapper>
                <img src={imgUrl} alt="" />
              </ImageWrapper>
            </SwiperSlide>
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
    </>
  );
}
