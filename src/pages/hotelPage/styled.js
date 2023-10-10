import { styled } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';

import { ReactComponent as Arrow } from 'assets/arrow.svg';

const HotelHeaderContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 8px 16px;
  border: 1px ${({ theme }) => theme.colors.brightGray} solid;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const HotelTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HotelName = styled.h1`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: x-large;
`;

const HotelAddress = styled.div`
  color: ${({ theme }) => theme.colors.graniteGray};
`;

const HotelDistanceFromTheCenter = styled.div`
  color: ${({ theme }) => theme.colors.graniteGray};
`;

const PriceStart = styled.div`
  align-self: center;
  font-size: large;
`;

const PhotoGallery = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 160px;
    text-align: center;
    font-size: 18px;

    &:first-child {
      width: 400px;
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 160px;
  background: red;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FirstImageWrapper = styled(ImageWrapper)`
  height: 324px;
  width: 400px;
`;

const ControlBtnsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 20px;
  bottom: 20px;
  z-index: 1;
`;

const ControlBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const NextArrow = styled(Arrow)`
  transform: rotate(-90deg);
`;
const PrevArrow = styled(Arrow)`
  transform: rotate(90deg);
`;

export {
  HotelHeaderContainer,
  HotelTitleWrapper,
  HotelName,
  HotelAddress,
  HotelDistanceFromTheCenter,
  PriceStart,
  PhotoGallery,
  ImageWrapper,
  FirstImageWrapper,
  ControlBtn,
  NextArrow,
  PrevArrow,
  ControlBtnsContainer,
};
