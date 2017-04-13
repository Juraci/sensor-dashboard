import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sensor-item', 'Integration | Component | sensor item', {
  integration: true
});

test('it renders', function(assert) {
  const sensor = Ember.Object.create({
    description: 'entrance hall',
    boardId: '183FKD78d7SD',
  });

  this.set('sensor', sensor);

  this.render(hbs`{{sensor-item sensor=sensor}}`);

  assert.equal(this.$('.description').text(), 'entrance hall');
});