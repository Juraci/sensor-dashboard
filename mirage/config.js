import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

const { Logger } = Ember;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.urlPrefix = 'http://localhost:5000';

  this.post('/authenticate', ({ users }, request ) => {
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

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
