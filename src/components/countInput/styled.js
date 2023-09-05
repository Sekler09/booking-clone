import { styled } from 'styled-components';
import theme from 'styles/theme';

const CountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px black solid;
  border-radius: 8px;
  width: 100%;
  gap: 10px;
  padding: 8px;
  background-color: ${theme.colors.white};
  position: relative;
`;

const CountImg = styled.img`
  width: 30px;
`;

const StyledCountInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 8px 6px;
  font-size: 16px;
  line-height: 20px;
`;

const DayPickerWrapper = styled.div`
  position: absolute;
  z-index: 99;
  border: 1px black solid;
  top: calc(1em + 100%);
  left: 0;
  background-color: ${theme.colors.white};
`;

export { CountImg, CountInputWrapper, DayPickerWrapper, StyledCountInput };
