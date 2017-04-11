import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Component.extend({
  sessionManager: inject.service(),
  logged: computed('sessionManager.isAuthenticated', function() {
    return this.get('sessionManager.isAuthenticated');
  }),
});
