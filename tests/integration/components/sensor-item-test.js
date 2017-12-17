import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let deleteAction;
let openNotification;
let alert;
let sensor;

moduleForComponent('sensor-item', 'Integration | Component | sensor item', {
  integration: true,
  beforeEach() {
    deleteAction = () => {};
    openNotification = () => {};
    alert = EmberObject.create({
      message: 'motion 31/12/1997 10:28:43 am',
      seen: false,
    });
    sensor = EmberObject.create({
      description: 'entrance hall',
      boardId: '183FKD78d7SD',
      alerts: [],
    });
  }
});

test('it renders', function(assert) {
  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);
  this.set('openNotification', openNotification);

  this.render(hbs`{{sensor-item
    sensor=sensor
    onDeleteAction=showDeletionDialog
    onNotificationAction=openNotification
  }}`);

  assert.equal(this.$('.description').text(), 'entrance hall');
});

test('calls the onDeleteAction passing the sensor when clicked', function(assert) {
  assert.expect(2);

  deleteAction = (sensorParam) => {
    assert.equal(sensorParam.boardId, sensor.boardId);
    assert.equal(sensorParam.description, sensor.description);
  };

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);
  this.set('openNotification', openNotification);

  this.render(hbs`{{sensor-item
    sensor=sensor
    onDeleteAction=showDeletionDialog
    onNotificationAction=openNotification
  }}`);

  this.$('.delete').click();
});

test('displays the notification icon when there are alerts', function(assert) {
  sensor.get('alerts').pushObject(alert);

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);
  this.set('openNotification', openNotification);

  this.render(hbs`{{sensor-item
    sensor=sensor
    onDeleteAction=showDeletionDialog
    onNotificationAction=openNotification
  }}`);

  assert.equal(this.$('.notifications').length, 1);
});

test('displays the notifications none icon when there are no alerts', function(assert) {
  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);
  this.set('openNotification', openNotification);

  this.render(hbs`{{sensor-item
    sensor=sensor
    onDeleteAction=showDeletionDialog
    onNotificationAction=openNotification
  }}`);

  assert.equal(this.$('.notifications').length, 0);
  assert.equal(this.$('.notifications-none').length, 1);
});

test('calls the onNotificationAction passing the sensor when clicked', function(assert) {
  assert.expect(2);
  sensor.get('alerts').pushObject(alert);

  openNotification = (sensorParam) => {
    assert.equal(sensorParam.boardId, sensor.boardId);
    assert.equal(sensorParam.description, sensor.description);
  };

  this.set('sensor', sensor);
  this.set('showDeletionDialog', deleteAction);
  this.set('openNotification', openNotification);

  this.render(hbs`{{sensor-item
    sensor=sensor
    onDeleteAction=showDeletionDialog
    onNotificationAction=openNotification
  }}`);

  this.$('.notifications').click();
});
