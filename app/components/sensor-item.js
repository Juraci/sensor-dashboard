import Ember from 'ember';
import Config from 'sensor-dashboard/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  messages: null,
  source: null,
  motionAmount: computed('messages.length', function() {
    return this.get('messages.length');
  }),

  init() {
    this._super(...arguments);
    this.set('messages', []);
    const source = new EventSource(`${Config.APP.sse}/cards/${this.get('sensor.boardId')}/stream`);
    source.onmessage =  (e) => {
      if(e.data !== 'sse ready') {
        this.get('messages').pushObject(e.data);
      }
    };

    source.onerror = (e) => {
      if (source.readyState === EventSource.CLOSED) {
        return;
      }

      Ember.Logger.error(`SSE error ${e}`);
    };

    this.set('source', source);
  },


  willDestroyElement() {
    this._super(...arguments);
    this.get('source').close();
  },
});
