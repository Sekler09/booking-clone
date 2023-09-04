import { styled } from 'styled-components';
import theme from 'styles/theme';

const CityInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px black solid;
  border-radius: 8px;
  width: 100%;
  gap: 10px;
  padding: 8px;
  background-color: ${theme.colors.white};
`;

const HotelImg = styled.img`
  width: 30px;
`;

const StyledCityInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 8px 6px;
  font-size: 16px;
  line-height: 20px;
`;

export { CityInputWrapper, HotelImg, StyledCityInput };
