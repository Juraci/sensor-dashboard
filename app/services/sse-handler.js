import Ember from 'ember';
import Config from 'sensor-dashboard/config/environment';

export default Ember.Service.extend({
  messages: null,

  init() {
    this._super(...arguments);
    this.set('messages', []);
  },

  subscribe() {
    const source = new EventSource(Config.APP.sse);
    source.onmessage =  (e) => {
      if(e.data !== 'sse ready') {
        this.messages.unshiftObjects(e.data);
      }
    };

    source.onerror = (e) => {
      Ember.Logger.error(`SSE error ${JSON.stringify(e)}`);
    };
  }
});
