import { styled } from 'styled-components';
import theme from 'styles/theme';

const StyledFooter = styled.footer`
  background-color: ${theme.colors.brightGray};
  padding: 12px 16px;
  color: ${theme.colors.white};
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Copyright = styled.p`
  padding: 20px 0;
  font-size: 18px;
  text-align: center;
  color: ${theme.colors.auroMetalSaurus};
`;

export { Copyright, StyledFooter };
