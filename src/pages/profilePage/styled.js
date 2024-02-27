import styled from 'styled-components';

const PageTitle = styled.h1`
  font-weight: 700;
  font-size: 28px;
  color: ${({ theme }) => theme.mode.textColor};
`;

const BookingsList = styled.div`
  display: flex;
  margin-top: 30px;
`;

const BookingCard = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.mode.hotelCardBg};
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.mode.textColor};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px ${({ theme }) => theme.colors.trueBlue} solid;
  border-radius: 4px;
  padding: 4px 12px;
  color: ${({ theme }) => theme.colors.trueBlue};
  text-transform: capitalize;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlueGray};
  }
`;

const WarningButton = styled(Button)`
  border: 1px ${({ theme }) => theme.colors.red} solid;
  color: ${({ theme }) => theme.colors.red};

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightRed};
  }
`;

const WarnText = styled.h2`
  font-size: large;
  color: ${({ theme }) => theme.colors.red};
`;

const ChoiceButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

export {
  PageTitle,
  BookingCard,
  BookingInfo,
  BookingsList,
  WarningButton,
  Button,
  WarnText,
  ChoiceButtonsContainer,
};
