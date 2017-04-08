  import Ember from 'ember';

  export default Ember.Route.extend({
    authenticator: Ember.inject.service(),
    sessionManager: Ember.inject.service(),
    flashMessages: Ember.inject.service(),

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
            Ember.Logger.warn(result);
            if(result.success) {
              this.get('sessionManager').setToken(result.token);
              this.transitionTo('dashboard');
            } else {
              this.get('flashMessages').danger('Incorrect email or password', { timeout: 5000 });
            }
        });
    },
  }
});
