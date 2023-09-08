import { styled } from 'styled-components';
import theme from 'styles/theme';

const MainInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px black solid;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  background-color: ${theme.colors.white};
  cursor: pointer;
`;

const MainInput = styled.input`
  padding: 8px 6px;
  width: 100%;
  background-color: ${theme.colors.white};
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

const MainInputImg = styled.img`
  width: 30px;
`;

export { MainInput, MainInputImg, MainInputWrapper };
