import { Promise as EmberPromise } from 'rsvp';
import EmberObject from '@ember/object';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:authenticator', 'Unit | Service | authenticator', {
 needs: ['service:ajax']
});

test('it delegates the post request to ajax service', function(assert) {
  const ajax = EmberObject.create({
    uri: null,

    request(uri, { method, data }) {
      this.set('uri', uri);
      this.set('method', method);
      this.set('data', data);
      return EmberPromise.resolve({ success: true });
    }
  });

  let service = this.subject({ ajax, baseUrl: 'http://fakeuri.com' });
  return service.authenticate('test@email.com', 'mypass')
    .then(() => {
      assert.equal(ajax.get('uri'), 'http://fakeuri.com/authenticate');
      assert.equal(ajax.get('method'), 'POST');
    });
});
