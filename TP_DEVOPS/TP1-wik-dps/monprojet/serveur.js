"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var PORT = process.env.PING_LISTEN_PORT || 3000;
var requestHandler = function (request, response) {
    if (request.method === 'GET' && request.url === '/ping') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(request.headers));
    }
    else {
        response.writeHead(404);
        response.end();
    }
};
var server = http.createServer(requestHandler);
server.listen(PORT, function () {
    console.log("Le serveur est en \u00E9coute sur le port ".concat(PORT));
});
