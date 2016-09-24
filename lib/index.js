var server = require('./server.js');

server.start(function (err) {
  if (err) throw err;
  console.log('Server running at: ' + server.info.uri + '!✨ 👍');
});
