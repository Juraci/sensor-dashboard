import Ember from 'ember';
import Config from 'sensor-dashboard/config/environment';

export default Ember.Service.extend({
  messages: null,
  eventSource: new EventSource(`${Config.APP.sse}/cards/f442332e-2008-4ec8-98a2-def7f702d56d/stream`),

  init() {
    this._super(...arguments);
    this.set('messages', []);
  },

  subscribe() {
    const source = this.get('eventSource');
    source.onmessage =  (e) => {
      if(e.data !== 'sse ready') {
        this.messages.unshiftObjects(e.data);
      }
    };

    source.onerror = (e) => {
      if (source.readyState === EventSource.CLOSED) {
        return;
      }

      Ember.Logger.error(`SSE error ${e}`);
    };
  }
});
