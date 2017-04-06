import Ember from 'ember';

export default Ember.Route.extend({
  authenticator: Ember.inject.service(),

  actions: {
    didTransition() {
      this.controller.set('spinner', false);
      this.controller.set('inputErrors', []);
    },

    onEmailChange(value) {
      this.controller.set('email', value);
      this.controller.set('inputErrors', []);
    },

    onPasswordChange(value) {
      this.controller.set('password', value);
      this.controller.set('inputErrors', []);
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
            this.transitionTo('dashboard');
          }
        });
    },
  }
});
