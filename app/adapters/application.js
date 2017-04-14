import Ember from 'ember';
import DS from 'ember-data';
import Config from 'sensor-dashboard/config/environment';

const { inject, computed } = Ember;

export default DS.JSONAPIAdapter.extend({
  host: Config.APP.sensorsManagement,
  sessionManager: inject.service(),
  headers: computed('sessionManager.token', function() {
    return {
      'x-access-token': this.get('sessionManager.token'),
      'Content-Type': 'application/json'
    };
  })
});
