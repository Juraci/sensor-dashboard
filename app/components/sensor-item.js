import Ember from 'ember';
import Config from 'sensor-dashboard/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  source: null,
  notifications: computed('sensor.alerts.length', function() {
    return this.get('sensor.alerts.length');
  }),
  hasNotifications: computed('notifications', function() {
    return this.get('notifications') > 0;
  }),

  init() {
    this._super(...arguments);
    const source = new EventSource(`${Config.APP.sse}/cards/${this.get('sensor.boardId')}/stream`);
    source.onmessage =  (e) => {
      if(e.data !== 'sse ready') {
        this.get('onCreateAction')(this.get('sensor'), { message: e.data, seen: false });
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
