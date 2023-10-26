import failOnConsoleError from 'cypress-fail-on-console-error';
import 'cypress-real-events';
import './commands';
import '@cypress/code-coverage/support';

import { mount } from 'cypress/react18';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import { lightTheme } from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';
import 'i18n/i18n';
import { node } from 'prop-types';

failOnConsoleError();

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
