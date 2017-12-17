import Component from '@ember/component';

export default Component.extend({
  actions: {
    submit(description, boardId) {
      this.get('onSubmit')(description, boardId);
      this.set('description', null);
      this.set('boardId', null);
    },

    close() {
      this.get('closeDialog')();
      this.set('description', null);
      this.set('boardId', null);
    }
  }
});
