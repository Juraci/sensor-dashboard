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
    alerts: [],
  });

  const deleteAction = () => {};

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);

  this.render(hbs`{{sensor-item sensor=sensor onDeleteAction=showDeletionDialog}}`);

  assert.equal(this.$('.description').text(), 'entrance hall');
});

test('calls the onDeleteAction passing the sensor when clicked', function(assert) {
  assert.expect(2);

  const sensor = Ember.Object.create({
    description: 'entrance hall',
    boardId: '183FKD78d7SD',
    alerts: [],
  });

  const deleteAction = (sensorParam) => {
    assert.equal(sensorParam.boardId, sensor.boardId);
    assert.equal(sensorParam.description, sensor.description);
  };

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);

  this.render(hbs`{{sensor-item sensor=sensor onDeleteAction=showDeletionDialog}}`);

  this.$('.delete').click();
});

test('displays the notification icon when there are alerts', function(assert) {
  const alert = Ember.Object.create({
    message: 'motion 31/12/1997 10:28:43 am',
    seen: false,
  });

  const sensor = Ember.Object.create({
    description: 'entrance hall',
    boardId: '183FKD78d7SD',
    alerts: [alert]
  });

  const deleteAction = () => {};

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);

  this.render(hbs`{{sensor-item sensor=sensor onDeleteAction=showDeletionDialog}}`);

  assert.equal(this.$('.notifications').length, 1);
});

test('displays the  notifications none icon when there are no alerts', function(assert) {
  const sensor = Ember.Object.create({
    description: 'entrance hall',
    boardId: '183FKD78d7SD',
    alerts: [],
  });

  const deleteAction = () => {};

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);

  this.render(hbs`{{sensor-item sensor=sensor onDeleteAction=showDeletionDialog}}`);

  assert.equal(this.$('.notifications').length, 0);
  assert.equal(this.$('.notifications-none').length, 1);
});
