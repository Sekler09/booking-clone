import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { bool } from 'prop-types';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { MainWrapper } from 'styles/globalStyle';
import { toggleMode } from 'store/slices/themeSlice';

import { LogoLink, Nav, StyledHeader, HeaderInnerContainer } from './styled';

export default function Header({ isExtraBgNeeded }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const mode = useSelector(state => state.theme.mode);

  const toUrl = `/?${searchParams.toString()}`;

  return (
    <StyledHeader $isExtraBgNeeded={isExtraBgNeeded}>
      <MainWrapper>
        <HeaderInnerContainer>
          <Nav>
            <LogoLink to={toUrl}>RoomBook</LogoLink>
          </Nav>
          <DarkModeSwitch
            checked={mode === 'dark'}
            onChange={() => dispatch(toggleMode())}
            sunColor="white"
            size={30}
          />
        </HeaderInnerContainer>
      </MainWrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  isExtraBgNeeded: bool.isRequired,
};
