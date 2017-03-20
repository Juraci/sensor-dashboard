import { moduleFor, test } from 'ember-qunit';

moduleFor('service:sse-handler', 'Unit | Service | sse handler', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it should listen to the events and add them to the messages array', function(assert) {
  const eventSource = {
    onmessage: null,
    onerror: null
  };

  let service = this.subject({
    eventSource: eventSource
  });

  service.subscribe();

  eventSource.onmessage({ id: 1, data: 'foo'});
  assert.equal(service.get('messages.length'), 1);
});

test('it should ignore the sse ready event', function(assert) {
  const eventSource = {
    onmessage: null,
    onerror: null
  };

  let service = this.subject({
    eventSource: eventSource
  });

  service.subscribe();

  eventSource.onmessage({ id: 1, data: 'sse ready'});
  assert.equal(service.get('messages.length'), 0);
});
