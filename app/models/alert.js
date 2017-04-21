import DS from 'ember-data';

export default DS.Model.extend({
  sensor: DS.belongsTo('sensor'),
  message: DS.attr('string'),
  seen: DS.attr('boolean')
});
