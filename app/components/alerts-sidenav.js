import { sort } from '@ember/object/computed';
import Component from '@ember/component';
export default Component.extend({
  sortingKey:['createdAt:desc'],
  sortedAlerts: sort('sensor.alerts', 'sortingKey'),
});
