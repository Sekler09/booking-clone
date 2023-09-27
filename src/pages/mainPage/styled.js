import { styled } from 'styled-components';

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 10px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.alana};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    flex-direction: column;
    gap: 4px;
    padding: 4px;
  }
`;

export { InputsWrapper };
