import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pantone};
  }

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    padding: 8px;
    width: 100%;
    font-size: 18px;
  }
`;
export { LinkButton };
