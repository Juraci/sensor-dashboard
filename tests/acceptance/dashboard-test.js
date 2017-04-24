import { test } from 'qunit';
import moduleForAcceptance from 'sensor-dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard', {
  beforeEach() {
    window.localStorage.clear();
  }
});

test('the user sees his sensors', function(assert) {
  const user =  server.create('user', { email: 'test@test.com', password: 'password1234' });
  server.create('sensor', { description: 'living room sensor', boardId: '100837', user });
  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  andThen(function() {
    assert.equal(find('.sensor').length, 1);
  });
});

test('the user creates a sensor', function(assert) {
  server.create('user', { email: 'test@test.com', password: 'password1234' });

  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  click('#add-sensor');
  fillIn('#input-description', 'Entrance sensor');
  fillIn('#input-boardId', '123874ABFHN');
  click('#create');

  andThen(function() {
    assert.equal(find('.sensor').length, 1);
    assert.equal(find('.sensor:eq(0) .description').text(), 'Entrance sensor');
  });
});

test('the user deletes a sensor', function(assert) {
  const user =  server.create('user', { email: 'test@test.com', password: 'password1234' });
  server.create('sensor', { description: 'living room sensor', boardId: '100837', user });
  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  click('.sensor:eq(0) .delete');
  click('#confirm');

  andThen(function() {
    assert.equal(find('.sensor').length, 0);
  });
});

test('the user sees alerts for a given sensor', function(assert) {
  const user =  server.create('user', { email: 'test@test.com', password: 'password1234' });
  const sensor = server.create('sensor', { description: 'living room sensor', boardId: '100837', user });
  const alert = server.create('alert', { message: 'Motion 22/04/2017 11:11:43 am', seen: false, sensor });

  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  click('.sensor:eq(0) .notifications');

  andThen(function() {
    assert.equal(find('.alert').length, 1);
    assert.equal(find('.alert:eq(0) .message').text(), alert.message);
  });
});

test('alerts are sorted by descending date', function(assert) {
  const user =  server.create('user', { email: 'test@test.com', password: 'password1234' });
  const sensor = server.create('sensor', { description: 'living room sensor', boardId: '100837', user });
  const alert1 = server.create('alert', {
    createdAt: '2017-04-23T22:11:11.193Z',
    message: 'Motion 22/04/2017 11:11:43 am',
    seen: false,
    sensor,
  });
  const alert2 = server.create('alert', {
    createdAt: '2017-04-23T22:11:23.563Z',
    message: 'Motion 22/04/2017 11:12:01 am',
    seen: false,
    sensor,
  });

  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  click('.sensor:eq(0) .notifications');

  andThen(function() {
    assert.equal(find('.alert').length, 2);
    assert.equal(find('.alert:eq(0) .message').text(), alert2.message);
    assert.equal(find('.alert:eq(1) .message').text(), alert1.message);
  });
});
