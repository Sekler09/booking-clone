import { createGlobalStyle, styled } from 'styled-components';

export default createGlobalStyle`
  
  body {
    place-items: baseline;
    position: relative;
    min-height: 100vh;
    padding-bottom: 85px;
  }

  * {
	  padding: 0;
	  margin: 0;
	  border: none;
    font-family: Roboto, sans-serif;
  }

  *,
  *::before,
  *::after {
	  box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;
  }

  aside, nav, footer, header, section, main {
	  display: block;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-size: inherit;
	  font-weight: inherit;
  }

  ul, ul li {
	  list-style: none;
  }

  img, svg {
	  max-width: 100%;
	  height: auto;
  }

  *:active,
  *:hover,
  *:focus {
    outline: none;
  }
`;

export const MainWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: calc(100% - 10px);

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    max-width: 720px;
  }
`;
