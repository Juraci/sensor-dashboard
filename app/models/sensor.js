import DS from 'ember-data';

export default DS.Model.extend({
  alerts: DS.hasMany('alert'),
  description: DS.attr('string'),
  boardId: DS.attr('string')
});
