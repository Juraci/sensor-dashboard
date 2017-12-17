import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  sessionManager: service(),

  actions: {
    logout() {
      this.get('sessionManager').unsetToken();
      this.transitionTo('login');
    }
  },
});
