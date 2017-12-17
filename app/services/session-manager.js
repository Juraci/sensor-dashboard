import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  token: null,
  localStorage: window.localStorage,

  init() {
    this._super(...arguments);
    const localToken = this.get('localStorage').getItem('token');
    if(localToken !== null) {
      this.set('token', localToken);
    }
  },

  isAuthenticated: computed('token', function() {
    return !!this.get('token');
  }),

  setToken(token) {
    this.set('token', token);
    this.get('localStorage').setItem('token', token);
  },

  unsetToken() {
    this.set('token', null);
    this.get('localStorage').removeItem('token');
  },
});
