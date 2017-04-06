import Ember from 'ember';
import Config from 'sensor-dashboard/config/environment';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  baseUrl: Config.APP.sensorsManagement,

  authenticate(email, password) {
    return this.get('ajax').request(`${this.get('baseUrl')}/authenticate`, {
      method: 'POST',
      data: JSON.stringify({
        email,
        password,
      }),
    });
  }
});
