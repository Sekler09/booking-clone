import CityInput from 'components/cityInput';

import { InputsWrapper } from './styled';

export default function MainPage() {
  return (
    <InputsWrapper>
      <CityInput />
      <CityInput />
      <CityInput />
    </InputsWrapper>
  );
}
