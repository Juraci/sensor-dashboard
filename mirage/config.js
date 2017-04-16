import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

const { Logger } = Ember;

export default function() {
  this.urlPrefix = 'http://localhost:5000';

  const token = 'secret-token';

  this.post('/authenticate', function({ users }, request ) {
    let body;
    try {
      body = JSON.parse(request.requestBody);
    } catch(err) {
      Logger.warn(`Error trying to parse ${request.requestBody}`);
    }

    let response = {
      status: 200,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        success: false,
        message: 'Authentication failed'
      }
    };

    const user = users.findBy({ email: body.email });
    if (!user || user.password !== body.password) {
      return new Mirage.Response(response.status, response.header, response.data);
    }
    response.data.success = true;
    response.data.message = 'Enjoy your token';
    response.data.token = 'secret-token';
    return new Mirage.Response(response.status, response.header, response.data);
  });

  this.get('/sensors', function(schema, request) {
    if (request.requestHeaders['x-access-token'] !== token) {
      return new Mirage.Response(401, { 'Content-Type': 'Text' }, 'Unauthorized');
    }

    const user = schema.users.first();

    return schema.sensors.where({ userId: user.id });
  });

  this.post('/sensors', function(schema, request) {
    if (request.requestHeaders['x-access-token'] !== token) {
      return new Mirage.Response(401, { 'Content-Type': 'Text' }, 'Unauthorized');
    }

    let user = schema.users.first();

    let attrs = this.normalizedRequestAttrs();
    attrs.userId = user.id;

    return schema.sensors.create(attrs);
  });

  this.delete('/sensors/:id', function(schema, request) {
    if (request.requestHeaders['x-access-token'] !== token) {
      return new Mirage.Response(401, { 'Content-Type': 'Text' }, 'Unauthorized');
    }

    const id = request.params.id;

    return schema.sensors.find(id).destroy();
  });
}
