import { styled } from 'styled-components';

const RoomContainer = styled.div`
  display: flex;
  margin-bottom: 0;
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 110px;
  width: 110px;
`;

const RoomImage = styled.img`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const RoomName = styled.p`
  font-weight: bold;
  font-size: larger;
`;

const RoomCapacity = styled.p`
  color: ${({ theme }) => theme.colors.oldSilver};
`;

const RoomPrice = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const BookButton = styled.button`
  align-self: center;
  margin-left: auto;
  margin-right: 20px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  font-size: medium;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export {
  RoomContainer,
  RoomImage,
  InfoContainer,
  RoomName,
  RoomCapacity,
  BookButton,
  ImageContainer,
  RoomPrice,
};
