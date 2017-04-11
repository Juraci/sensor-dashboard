import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  beforeModel() {
    if (!this.get('sessionManager.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.store.findAll('sensor');
  }
});
