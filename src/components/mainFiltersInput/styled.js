import { styled } from 'styled-components';

import { ReactComponent as ArrowIcon } from 'assets/arrow.svg';

const MainInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px black solid;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.appBg};
  cursor: pointer;

  svg {
    width: 30px;
    fill: ${({ theme }) => theme.mode.textColor};
  }

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    padding: 4px;

    svg {
      width: 25px;
    }
  }
`;

const MainInput = styled.input`
  padding: 8px 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.appBg};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.mode.textColor};
  cursor: pointer;

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    padding: 4px 3px;
  }
`;

const Arrow = styled(ArrowIcon)`
  fill: ${({ theme }) => theme.mode.textColor};
`;

export { MainInput, MainInputWrapper, Arrow };
