import { styled } from 'styled-components';
import theme, { device } from 'styles/theme';

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 10px;
  padding: 8px;
  background-color: ${theme.colors.alana};

  @media ${device.laptop} {
    flex-direction: column;
    gap: 4px;
    padding: 4px;
  }
`;

export { InputsWrapper };
