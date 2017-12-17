import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data';
import Config from 'sensor-dashboard/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: Config.APP.sensorsManagement,
  sessionManager: service(),
  headers: computed('sessionManager.token', function() {
    return {
      'x-access-token': this.get('sessionManager.token'),
      'Content-Type': 'application/json'
    };
  })
});
