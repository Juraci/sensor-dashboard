import { test } from 'qunit';
import moduleForAcceptance from 'sensor-dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard', {
  beforeEach() {
    window.localStorage.clear();
  }
});

test('an user can see his sensors', function(assert) {
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

test('a user that enters a wrong password or email should stay in the login', function(assert) {
  server.create('user', { email: 'test@test.com', password: 'password1234' });
  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password12');
  click('#login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('a user that is not authenticated cannot see his dashboard', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('an authenticated user can logout of the app', function(assert) {
  const user =  server.create('user', { email: 'test@test.com', password: 'password1234' });
  server.create('sensor', { description: 'living room sensor', boardId: '100837', user });
  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  andThen(function() {
    assert.equal(find('.sensor').length, 1);
  });

  click('#logout');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('an user with an invalid token should be redirected to the login page', function(assert) {
  window.localStorage.setItem('token', '127873987KJHDUMEMI');
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
