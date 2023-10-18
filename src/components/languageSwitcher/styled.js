import styled from 'styled-components';

import { ReactComponent as RusIcon } from 'assets/russia.svg';
import { ReactComponent as UsaIcon } from 'assets/usa.svg';

const IconContainer = styled.div`
  cursor: pointer;

  svg {
    width: 30px;
    transition: all 0.5s ease-in-out;
  }
`;

const Rus = styled(RusIcon)`
  opacity: ${({ $isRu }) => ($isRu ? 1 : 0)};
  transform: scale(${({ $isRu }) => ($isRu ? 1 : 0)});
`;
const Usa = styled(UsaIcon)`
  position: relative;
  left: -50%;
  opacity: ${({ $isRu }) => ($isRu ? 0 : 1)};
  transform: scale(${({ $isRu }) => ($isRu ? 0 : 1)});
`;

export { IconContainer, Rus, Usa };
