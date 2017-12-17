import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  sessionManager: service(),
  logged: computed('sessionManager.isAuthenticated', function() {
    return this.get('sessionManager.isAuthenticated');
  }),
});
