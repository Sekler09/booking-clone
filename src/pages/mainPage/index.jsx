import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';

import { InputsWrapper } from './styled';

export default function MainPage() {
  return (
    <InputsWrapper>
      <CityInput />
      <CalendarInput />
      <CityInput />
    </InputsWrapper>
  );
}
