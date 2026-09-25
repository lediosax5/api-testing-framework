import { defineConfig } from 'cypress';

const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports',
    reportTitle: `API Test Execution - ${timestamp}`,
    reportPageTitle: 'API Testing Framework',
    reportFilename: `api-test-report_${timestamp}`,
    overwrite: false,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  video: false,

  e2e: {
    specPattern: 'cypress/e2e/api/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToConsole: 'onFail',
        printLogsToFile: 'always',
        outputRoot: `${config.projectRoot}/logs/`,
        specRoot: 'cypress/e2e',
        outputTarget: {
          'cypress-logs|txt': 'txt',
        },
      });

      return config;
    },
  },
});
