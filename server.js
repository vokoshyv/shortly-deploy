var app = require('./server-config.js');

var port = (process.env.PORT)? process.env.PORT : 0000;

app.listen(port);

console.log('Server now listening on port ' + port);
