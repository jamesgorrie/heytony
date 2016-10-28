const Hapi = require('hapi');
const triggerTimeline = require('./tell');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.register(require('inert'), (err) => {

  server.route({
    method: 'GET',
    path: '/superagent.js',
    handler: function (request, reply) {
      return reply.file('./node_modules/superagent/superagent.js');
    }
  });

  server.route({
      method: 'GET',
      path:'/',
      handler: function (request, reply) {
          return reply.file('./index.html');
      }
  });

  server.route({
    method: 'GET',
    path: '/trigger-timeline',
    handler: function(request, reply) {
      const name = request.params.name;
      triggerTimeline(name).then(m => console.info(m));
      reply('Done')
    }
  })

  // Start the server
  server.start((err) => {
      if (err) { throw err; }
      console.log('Server running at:', server.info.uri);
  });

});
