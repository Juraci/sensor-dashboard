import Service, { inject as service } from '@ember/service';
import Config from 'sensor-dashboard/config/environment';

export default Service.extend({
  ajax: service(),
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
