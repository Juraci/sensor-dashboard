import Ember from 'ember';
//import Config from 'sensor-dashboard/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  source: null,
  hasNotifications: computed('sensor.alerts.length', function() {
    return this.get('sensor.alerts.length') > 0;
  }),

  init() {
    this._super(...arguments);
    /*const source = new EventSource(`${Config.APP.sse}/cards/${this.get('sensor.boardId')}/stream`);
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

    this.set('source', source);*/
  },


  willDestroyElement() {
    this._super(...arguments);
    //this.get('source').close();
  },
});
