import { styled } from 'styled-components';

import theme, { device } from 'styles/theme';

const SortOptionsWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 250px;
  margin: 10px 0;

  @media ${device.laptop} {
    width: fit-content;
  }
`;

const Button = styled.button`
  border-radius: 20px;
  padding: 8px 16px;
  width: 250px;
  background-color: ${theme.colors.trueBlue};
  font-size: 16px;
  color: ${theme.colors.white};
  cursor: pointer;

  @media ${device.laptop} {
    width: fit-content;
    font-size: 14px;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: ${theme.colors.white};
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
