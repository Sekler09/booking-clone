import { styled } from 'styled-components';

import theme from 'styles/theme';

const SortOptionsWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px 0;
`;

const Button = styled.button`
  border-radius: 20px;
  padding: 8px 16px;
  background-color: ${theme.colors.trueBlue};
  color: ${theme.colors.white};
  cursor: pointer;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin: 0;
  background-color: ${theme.colors.white};
  padding: 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  list-style-type: none;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.brightGray};
  }
`;

export { SortOptionsWrapper, Button, Dropdown, Option };
