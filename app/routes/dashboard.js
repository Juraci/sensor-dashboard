import Ember from 'ember';

export default Ember.Route.extend({
  sseHandler: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.get('sseHandler').subscribe();
  },

  model() {
    return this.get('sseHandler.messages');
  }
});
