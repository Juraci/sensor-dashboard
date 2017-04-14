import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  sessionManager: inject.service(),
  notify: inject.service(),

  beforeModel() {
    if (!this.get('sessionManager.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  actions: {
    error(error) {
      if (error.errors[0].status === '401') {
        this.get('sessionManager').unsetToken();
        this.replaceWith('login');
      }
    },

    createSensor(description, boardId) {
      this.controller.set('showSensorDialog', false);
      const sensor = this.store.createRecord('sensor', {
        description,
        boardId
      });
      sensor.save()
        .then(() => {
          this.get('notify').success('Success', {
            classNames: ['success-notification']
          });
        })
        .catch(() => {
          this.get('notify').alert('Error while trying to create sensor.', {
            classNames: ['alert-notification']
          });
        });
    },

    openSensorDialog() {
      this.controller.set('showSensorDialog', true);
    },

    closeSensorDialog() {
      this.controller.set('showSensorDialog', false);
    },
  },

  model() {
    return this.store.findAll('sensor');
  }
});
