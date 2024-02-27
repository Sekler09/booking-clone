import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ContentContainer = styled.div`
  margin-bottom: 10px;
  padding: 16px;
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.mode.hotelCardBg};
  color: ${({ theme }) => theme.mode.textColor};
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const HotelHeaderContainer = styled(ContentContainer)`
  display: flex;
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

const HotelAddress = styled(Link)`
  color: ${({ theme }) => theme.colors.graniteGray};
  text-transform: capitalize;

  &:hover {
    color: ${({ theme }) => theme.colors.trueBlue};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const HotelDistanceFromTheCenter = styled.div`
  color: ${({ theme }) => theme.colors.graniteGray};
`;

const PriceStart = styled.div`
  align-self: center;
  font-size: large;
`;

const DatesOfStayContainer = styled(ContentContainer)`
  display: flex;
  gap: 35px;
`;

const DateOfStay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateTitle = styled.p`
  font-weight: bold;
`;

const DateAndTimeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DateValue = styled.p`
  color: ${({ theme }) => theme.colors.trueBlue};
  cursor: pointer;
`;

const TimeValue = styled.p`
  color: ${({ theme }) => theme.colors.graniteGray};
`;

const ChangeDateButton = styled.button`
  margin-left: auto;
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lightBlueGray};
  font-size: medium;
  color: ${({ theme }) => theme.colors.trueBlue};
  cursor: pointer;
`;

const RoomsContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AvailableRoomsTitle = styled.p`
  font-weight: bold;
  font-size: larger;
`;

const SuccessTitle = styled.p`
  padding: 40px;
  font-weight: bold;
  font-size: x-large;
`;

const HotelReviewsContainer = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
`;

const ReviewsTitle = styled(AvailableRoomsTitle)`
  margin-bottom: 20px;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export {
  ReviewsContainer,
  ReviewsTitle,
  HotelReviewsContainer,
  SuccessTitle,
  HotelHeaderContainer,
  HotelTitleWrapper,
  HotelName,
  HotelAddress,
  HotelDistanceFromTheCenter,
  PriceStart,
  DatesOfStayContainer,
  DateAndTimeContainer,
  DateOfStay,
  DateTitle,
  DateValue,
  TimeValue,
  ChangeDateButton,
  RoomsContainer,
  AvailableRoomsTitle,
};
