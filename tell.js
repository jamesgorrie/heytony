const net = require('net');


function triggerTimeline(name) {
  return new Promise((resolve, reject) => {
    const port = 3039;
    const host = '192.168.1.17'
    const net = require('net');
    const client = net.connect({port, host}, () => {
      console.log('connected to watchout');
      client.write('authenticate 1\n');
    });
    client.on('data', (data) => {
      console.log(data.toString());
      resolve(data.toString());
      client.end();
    });
    client.on('end', () => {
      console.log('disconnected from server');
    });
  });
}

module.exports = triggerTimeline;
