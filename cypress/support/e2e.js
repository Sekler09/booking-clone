import failOnConsoleError from 'cypress-fail-on-console-error';
import 'cypress-real-events';
import './commands';
import '@cypress/code-coverage/support';

failOnConsoleError();
