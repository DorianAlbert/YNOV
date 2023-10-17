"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
// Method used to handle incoming requests
const requestListener = function (req, res) {
    try {
        // Only send JSON if HTTP verb is GET and url is /ping
        if (req.method === "GET" && req.url === "/ping") {
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(req.headers));
            res.end();
            // Else return HTTP 404
        }
        else {
            res.statusCode = 404;
            res.end();
        }
        // If something went wrong return HTTP 500
    }
    catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
    }
};
try {
    // Server creation
    const server = (0, http_1.createServer)(requestListener);
    server.listen((_a = process.env.PING_LISTEN_PORT) !== null && _a !== void 0 ? _a : 8080);
    const serverAddressInfo = server.address();
    if (!serverAddressInfo) {
        throw new Error("No server address info");
    }
    if (typeof serverAddressInfo === 'string') {
        console.log(`Server listening : ${serverAddressInfo}`);
    }
    else {
        console.log(`Server listening : ${serverAddressInfo.address}:${serverAddressInfo.port}`);
    }
}
catch (err) {
    console.error(err);
    process.exit(1);
}
