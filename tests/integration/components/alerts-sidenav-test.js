import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('alerts-sidenav', 'Integration | Component | alerts sidenav', {
  integration: true
});

test('it renders the alerts', function(assert) {
  const alert = Ember.Object.create({
    message: 'motion Motion 23/04/2017, 7:11:11 pm',
    seen: false,
    createdAt: '2017-04-23T22:11:11.193Z',
  });
  const sensor = Ember.Object.create({
    description: 'entrance gateway',
    alerts: [alert],
    boardId: '16787216BS',
  });

  this.set('sensor', sensor);

  this.render(hbs`{{alerts-sidenav open=true sensor=sensor}}`);

  assert.equal(this.$('.alert:eq(0) .message').text(), alert.get('message'));
});

test('it renders the alerts ordered by ascending date', function(assert) {
  const alert = Ember.Object.create({
    message: 'motion Motion 23/04/2017, 7:11:11 pm',
    seen: false,
    createdAt: '2017-04-23T22:11:11.193Z',
  });
  const alert2 = Ember.Object.create({
    message: 'motion Motion 23/04/2017, 7:11:50 pm',
    seen: false,
    createdAt: '2017-04-23T22:11:50.193Z',
  });
  const sensor = Ember.Object.create({
    description: 'entrance gateway',
    alerts: [alert, alert2],
    boardId: '16787216BS',
  });

  this.set('sensor', sensor);

  this.render(hbs`{{alerts-sidenav open=true sensor=sensor}}`);

  assert.equal(this.$('.alert:eq(0) .message').text(), alert2.get('message'));
  assert.equal(this.$('.alert:eq(1) .message').text(), alert.get('message'));
});
