import { createServer, IncomingMessage, ServerResponse } from "http";
import * as os from "os";

// Method used to handle incoming requests
const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  try {
    // Only send JSON if HTTP verb is GET and url is /ping
    if (req.method === "GET" && req.url === "/ping") {
      res.setHeader("Content-Type", "application/json");
      const responseJson = {
        headers: req.headers,
        hostname: os.hostname(),
      };
      res.write(JSON.stringify(responseJson));
      res.end();
      // Log the hostname
      console.log(`Request from hostname: ${os.hostname()}`);
    // Else return HTTP 404
    } else {
      res.statusCode = 404;
      res.end();
    }
  // If something went wrong return HTTP 500
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end();
  }
}

try {
  // Server creation
  const server = createServer(requestListener);
  server.listen(process.env.PING_LISTEN_PORT ?? 8080);
  const serverAddressInfo = server.address();
  if (!serverAddressInfo) {
    throw new Error("No server address info");
  }
  if (typeof serverAddressInfo === 'string') {
    console.log(`Server listening: ${serverAddressInfo}`);
  } else {
    console.log(`Server listening: ${serverAddressInfo.address}:${serverAddressInfo.port}`);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
