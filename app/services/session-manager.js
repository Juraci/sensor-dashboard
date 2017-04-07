import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  token: null,
  isAuthenticated: computed('token', function() {
    return !!this.get('token');
  }),

  setToken(token) {
    this.set('token', token);
  },
});
