import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.mode.elementsBorder};
  border-radius: 8px;
  margin: 16px 0;
  background-color: ${({ theme }) => theme.mode.hotelCardBg};
  color: ${({ theme }) => theme.mode.textColor};
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  cursor: pointer;
`;

const HotelImage = styled.img`
  border-radius: 8px 0 0 8px;
  width: 200px;
  height: 200px;
  object-fit: cover;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    width: 180px;
    height: 180px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding: 10px;
  }
`;

const HotelInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HotelMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HotelName = styled.h3`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.trueBlue};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    font-size: 20px;
  }
`;

const HotelLocation = styled.p`
  color: ${({ theme }) => theme.colors.graniteGray};
  font-size: 12px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    font-size: 16px;
  }
`;

const ReviewsInfo = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.graniteGray};
  font-size: 14px;
  text-align: right;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    font-size: 12px;
  }
`;

const ReviewTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewRatingText = styled.div`
  font-size: large;
  font-weight: bold;
  color: ${({ theme }) => theme.mode.textColor};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    font-size: 16px;
  }
`;

const Rating = styled.span`
  border-radius: 4px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.pantone};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const TotalReviews = styled.div`
  margin-top: 4px;
`;

const Distance = styled.div`
  font-size: small;
`;

export {
  Distance,
  Card,
  HotelImage,
  ContentWrapper,
  HotelInfoWrapper,
  HotelMainInfoWrapper,
  HotelName,
  HotelLocation,
  Price,
  ReviewsInfo,
  ReviewTitle,
  Rating,
  TotalReviews,
  ReviewRatingText,
};
