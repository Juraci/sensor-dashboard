import Ember from 'ember';

export default Ember.Service.extend({
  authenticate(/*email, password*/) {
    return Ember.RSVP.Promise.resolve({ success: true });
  }
});
