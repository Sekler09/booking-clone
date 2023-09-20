import { Link } from 'react-router-dom';
import styled from 'styled-components';

import theme from 'styles/theme';

const Card = styled.div`
  display: flex;
  border: 1px solid ${theme.colors.gainsboro};
  border-radius: 8px;
  margin: 16px 0;
  max-width: 600px;
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const HotelImage = styled.img`
  border-radius: 8px 0 0 8px;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
`;

const HotelInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HotelMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HotelName = styled.h3`
  margin: 0;
  font-size: 24px;
  color: ${theme.colors.trueBlue};
`;

const HotelLocation = styled.p`
  color: ${theme.colors.graniteGray};
  font-size: 14px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ReviewsInfo = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 10px;
  color: ${theme.colors.graniteGray};
  font-size: 14px;
  text-align: right;
`;

const ReviewTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewRatingText = styled.div`
  font-size: large;
  font-weight: bold;
  color: ${theme.colors.black};
`;

const Rating = styled.span`
  border-radius: 4px;
  padding: 10px;
  background-color: ${theme.colors.pantone};
  font-size: 16px;
  color: ${theme.colors.white};
`;

const TotalReviews = styled.div`
  margin-top: 4px;
`;

const BookButton = styled(Link)`
  align-self: flex-end;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: ${theme.colors.trueBlue};
  color: ${theme.colors.white};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.pantone};
  }
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
  BookButton,
  ReviewRatingText,
};
