import { createGlobalStyle, styled } from 'styled-components';

export default createGlobalStyle`
  
  body {
    place-items: baseline;
    position: relative;
    min-height: 100vh;
    padding-bottom: 85px;
    background-color: ${({ theme }) => theme.mode.appBg};
  }

  * {
	  padding: 0;
	  margin: 0;
	  border: none;
    font-family: Roboto, sans-serif;
    transition: background-color 0.3s ease;
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

  @media (hover: none) {
  * {
    cursor: none !important;
  }
}

  .preload-transitions {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
`;

export const MainWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: calc(100% - 10px);

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    max-width: 720px;
  }
`;
