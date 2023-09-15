import { styled } from 'styled-components';

const SortOptionsWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin: 0;
  background-color: #fff;
  padding: 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  list-style-type: none;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export { SortOptionsWrapper, Button, Dropdown, Option };
