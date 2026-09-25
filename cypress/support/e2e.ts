import 'cypress-mochawesome-reporter/register';
import 'cypress-plugin-api';
import 'cypress-plugin-steps';

require('cypress-terminal-report/src/installLogsCollector')({
  collectTypes: [
    'cy:command',
    'cy:request',
    'cy:intercept',
    'cy:log',
    'cons:log',
    'cons:error',
    'cons:warn',
    'cons:info',
  ],
});

import './commands';
