import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    close() {
      this.get('closeDialog')();
    },

    confirm() {
      this.get('onConfirm')();
    },
  }
});
