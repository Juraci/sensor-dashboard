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

