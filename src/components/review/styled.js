import styled from 'styled-components';

import { ReactComponent as ProfileIcon } from 'assets/profile.svg';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 8px;
  width: 200px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewerName = styled.div`
  font-style: italic;
  font-size: large;
`;

const Rating = styled.span`
  border-radius: 4px;
  padding: 4px;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.pantone};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const Text = styled.div`
  margin-top: 20px;
`;

const Profile = styled(ProfileIcon)`
  width: 30px;
  fill: ${({ theme }) => theme.mode.textColor};
`;

export { UserContainer, ReviewContainer, ReviewerName, Rating, Text, Profile };
