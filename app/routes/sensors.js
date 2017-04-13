import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

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
    }
  },

  model() {
    return this.store.findAll('sensor');
  }
});
