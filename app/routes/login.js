import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  authenticator: service(),
  sessionManager: service(),
  notify: service(),

  beforeModel() {
    if (this.get('sessionManager.isAuthenticated')) {
      this.transitionTo('sensors');
    }
  },

  actions: {
    didTransition() {
      this.controller.set('spinner', false);
    },

    onEmailChange(value) {
      this.controller.set('email', value);
    },

    onPasswordChange(value) {
      this.controller.set('password', value);
    },

    login() {
      this.controller.set('spinner', true);
      const email = this.controller.get('email');
      const password = this.controller.get('password');
      this.get('authenticator').authenticate(email, password)
        .then((result) => {
          this.controller.set('spinner', false);
          if(result.success) {
            this.get('sessionManager').setToken(result.token);
            this.transitionTo('sensors');
          } else {
            this.get('notify').alert('Incorrect email or password', {
              classNames: ['alert-notification']
            });
          }
        });
    },
  },
});
