import { styled } from 'styled-components';
import theme from 'styles/theme';

const MainInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px black solid;
  border-radius: 8px;
  width: 100%;
  justify-content: space-between;
  padding: 8px;
  background-color: ${theme.colors.white};
  position: relative;
  cursor: pointer;
`;

const MainInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 8px 6px;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

const MainInputImg = styled.img`
  width: 30px;
`;

export { MainInput, MainInputImg, MainInputWrapper };
