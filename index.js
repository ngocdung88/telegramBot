
const express = require('express');
const http = require('http');



// Setup server
var app = express();
var server = http.createServer(app);
require('./routes')(app);

// Start server
function startServer() {
    app.angularFullstack = server.listen(process.env.PORT || 3000, function() {
        console.log('Express server listening on %d, in %s mode', process.env.PORT || 3000);
    });
}

require('./botUtil');
startServer();