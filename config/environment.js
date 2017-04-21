/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sensor-dashboard',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      sse: null,
      sensorsManagement: null,
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.sse = 'http://localhost:3000';
    ENV.APP.sensorsManagement = 'http://localhost:5000';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.APP.sse = 'http://localhost:3000';
    ENV.APP.sensorsManagement = 'http://localhost:5000';
  }

  if (environment === 'production') {
     ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
     ENV.APP.LOG_TRANSITIONS = true;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.sse = 'https://nodemcu-listener.herokuapp.com';
    ENV.APP.sensorsManagement = 'https://sensors-management.herokuapp.com';
  }

  return ENV;
};
