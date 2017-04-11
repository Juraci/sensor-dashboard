export default function(server) {
  const user = server.create('user', { email: 'honestly@haremscarem.com', password: 'pass1234' });
  server.create('sensor', { description: 'living room sensor', boardId: '109812JMA', user });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
