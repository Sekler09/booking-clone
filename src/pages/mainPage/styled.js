import { styled } from 'styled-components';

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 4px;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.alana};

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    flex-direction: column;
  }
`;

export { InputsWrapper };
