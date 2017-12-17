import Component from '@ember/component';

export default Component.extend({
  actions: {
    close() {
      this.get('closeDialog')();
    },

    confirm() {
      this.get('onConfirm')();
    },
  }
});
