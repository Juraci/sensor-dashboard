import Ember from 'ember';

export default Ember.Route.extend({
  sseHandler: Ember.inject.service(),
  sessionManager: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get('sseHandler').subscribe();
  },

  beforeModel() {
    if (!this.get('sessionManager.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.get('sseHandler.messages');
  }
});
