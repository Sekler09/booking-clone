import { styled } from 'styled-components';

const MainInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px black solid;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  svg {
    width: 30px;
  }

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding: 4px;

    svg {
      width: 25px;
    }
  }
`;

const MainInput = styled.input`
  padding: 8px 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding: 4px 3px;
  }
`;

export { MainInput, MainInputWrapper };
