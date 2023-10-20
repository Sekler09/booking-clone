// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import { lightTheme } from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';
import 'i18n/i18n';
import { node } from 'prop-types';

function Container({ children }) {
  return (
    <MemoryRouter>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
}

Container.propTypes = {
  children: node.isRequired,
};

Cypress.Commands.add('mount', el => mount(<Container>{el}</Container>));

// Example use:
// cy.mount(<MyComponent />)
