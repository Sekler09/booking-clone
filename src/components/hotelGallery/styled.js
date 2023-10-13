import { styled } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';

import { ReactComponent as Arrow } from 'assets/arrow.svg';

const PhotoGallery = styled.div`
  margin: 20px 0;

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
`;

const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  PhotoGallery,
  ImageWrapper,
  FirstImageWrapper,
  ControlBtn,
  NextArrow,
  PrevArrow,
  ControlBtnsContainer,
  GalleryImage,
};
