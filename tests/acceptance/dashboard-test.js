import { test } from 'qunit';
import moduleForAcceptance from 'sensor-dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | dashboard');

test('a user can see his dashboard', function(assert) {
  server.create('user', { email: 'test@test.com', password: 'password1234' });
  visit('/');
  fillIn('#input-email', 'test@test.com');
  fillIn('#input-password', 'password1234');
  click('#login');

  andThen(function() {
    assert.equal(currentURL(), '/dashboard');
  });
});

test('a user that enters a wrong password or email should see an login error', function(assert) {
  server.create('user', { email: 'test@test.com', passowrd: 'password1234' });
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
