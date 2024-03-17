import styled from 'styled-components';

import { ReactComponent as MoonIcon } from 'assets/moon.svg';
import { ReactComponent as SunIcon } from 'assets/sun.svg';

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;

  svg {
    width: 30px;
    fill: ${({ theme }) => theme.colors.white};
    transform: rotate(${({ $isDark }) => ($isDark ? 0 : 90)}deg);
    transition: all 0.5s ease;

    @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
      width: 20px;
    }
  }
`;

const Moon = styled(MoonIcon)`
  opacity: ${({ $isDark }) => ($isDark ? 1 : 0)};
`;
const Sun = styled(SunIcon)`
  position: relative;
  left: -50%;
  opacity: ${({ $isDark }) => ($isDark ? 0 : 1)};
`;

export { IconContainer, Moon, Sun };
