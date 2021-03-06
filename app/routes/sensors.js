import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  sessionManager: service(),
  notify: service(),
  sseToStore: service(),

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
          this.get('notify').success('Sensor created', {
            classNames: ['success-notification']
          });
        })
        .catch(() => {
          this.get('notify').alert('Error while trying to create sensor.', {
            classNames: ['alert-notification']
          });
        });
    },

    deleteSensor() {
      this.controller.set('showDeletionDialog', false);
      const sensor = this.controller.get('sensorToDelete');
      if (!sensor) {
        return;
      }

      sensor.destroyRecord()
        .then(() => {
          this.controller.get('sensorToDelete', null);
          this.get('notify').success('Sensor deleted.', {
            classNames: ['success-notification']
          });
        })
        .catch(() => {
          this.get('notify').alert('Error while trying to delete sensor.', {
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

    openDeletionDialog(sensor) {
      this.controller.set('showDeletionDialog', true);
      this.controller.set('sensorToDelete', sensor);
    },

    closeDeletionDialog() {
      this.controller.set('showDeletionDialog', false);
    },

    openAlerts(sensor) {
      this.controller.set('alerts', true);
      this.controller.set('currentSensor', sensor);
    },

    deleteAllAlerts(sensor) {
      sensor.get('alerts').forEach((alert) => {
        alert.destroyRecord();
      });
    },

    createAlert(sensor, rawAlert) {
      this.get('sseToStore').add(sensor, rawAlert);
    },
  },

  model() {
    return this.store.findAll('sensor');
  }
});
