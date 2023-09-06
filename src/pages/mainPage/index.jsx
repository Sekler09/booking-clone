import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';

import { InputsWrapper } from './styled';

export default function MainPage() {
  return (
    <InputsWrapper>
      <CityInput />
      <CalendarInput />
      <CountInput />
      <SearchButton />
    </InputsWrapper>
  );
}
