import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  sessionManager: inject.service(),

  actions: {
    logout() {
      this.get('sessionManager').unsetToken();
      this.transitionTo('login');
    }
  },
});
