import styled from 'styled-components';

import { ReactComponent as MoonIcon } from 'assets/moon.svg';
import { ReactComponent as SunIcon } from 'assets/sun.svg';

const IconContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;

  svg {
    position: absolute;
    right: 0;
    top: calc(50% - 15px);
    width: 30px;
    fill: ${({ theme }) => theme.colors.white};
    transform: rotate(${({ $isDark }) => ($isDark ? 0 : 90)}deg);
    transition: all 0.5s ease;
  }
`;

const Moon = styled(MoonIcon)`
  opacity: ${({ $isDark }) => ($isDark ? 1 : 0)};
`;
const Sun = styled(SunIcon)`
  opacity: ${({ $isDark }) => ($isDark ? 0 : 1)};
`;

export { IconContainer, Moon, Sun };
