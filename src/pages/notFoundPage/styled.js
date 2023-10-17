import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 300px;
    fill: ${({ theme }) => theme.mode.textColor};
  }
`;

const NotFoundText = styled.p`
  color: ${({ theme }) => theme.mode.textColor};
  font-size: xx-large;
`;

const MainPageLink = styled(Link)`
  text-decoration: underline;
`;

export { IconsContainer, NotFoundText, PageContainer, MainPageLink };
