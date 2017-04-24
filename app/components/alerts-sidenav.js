import Ember from 'ember';

const { computed } = Ember;
export default Ember.Component.extend({
  sortingKey:['createdAt:desc'],
  sortedAlerts: computed.sort('sensor.alerts', 'sortingKey'),
});
