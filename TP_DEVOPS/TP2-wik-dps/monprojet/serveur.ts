import * as http from 'http';

const PORT = (process.env.PING_LISTEN_PORT as string) || 3000;

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse): void => {
    if (request.method === 'GET' && request.url === '/ping') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(request.headers));
    } else {
        response.writeHead(404);
        response.end();
    }
}

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
