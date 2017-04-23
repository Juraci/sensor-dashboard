export default function(server) {
  const user = server.create('user', { email: 'honestly@haremscarem.com', password: 'pass1234' });
  const sensor1 = server.create('sensor', { description: 'living room', boardId: '109812JMA', user });
  server.create('sensor', { description: 'Bedroom', boardId: '109812JMZ', user });
  server.create('alert', { message: 'Motion 10/02/1987 10:29:19 pm', seen: false, sensorId: sensor1.id });
  server.create('alert', { message: 'Motion 10/02/1987 10:30:19 pm', seen: false, sensorId: sensor1.id });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
