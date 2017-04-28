import Ember from 'ember';

const { inject } = Ember;

export default Ember.Service.extend({
  store: inject.service(),
  counter: null,

  init() {
    this._super(...arguments);
    this.set('counter', 0);
  },

  add(sensor, rawAlert) {
    this.get('store').push({
      data: [{
        id: `local${this.get('counter')}`,
        type: 'alert',
        attributes: {
          message: rawAlert.message,
          seen: false,
          createdAt: new Date()
        },
        relationships: {
          sensor: {
            data: { type: 'sensor', id: sensor.get('id') }
          }
        }
      }]
    });

    this.incrementProperty('counter');
  },
});
