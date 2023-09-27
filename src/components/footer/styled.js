import { styled } from 'styled-components';

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 12px 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brightGray};
  color: ${({ theme }) => theme.colors.white};
`;

const Copyright = styled.p`
  padding: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.auroMetalSaurus};
  font-size: 18px;
`;

export { Copyright, StyledFooter };
