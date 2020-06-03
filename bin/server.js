#!/usr/bin/env node

const enrichment = require("../main");
const http = require("http");

if (process.argv.length < 3 || !process.argv[2].match(/^[1-9][0-9]*$/)) {
  console.error("Usage: node server.js [port number]");
  process.exit(1);
}

const port = parseInt(process.argv[2]);

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(require('fs').readFileSync(__dirname + "/server.html", "utf-8"));
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, {
      "Content-Type": "text/plain",
      "Allow": "POST",
      "Access-Control-Allow-Origin": "*"
    });
    res.end("405 Method Not Allowed, only POST method is supported");
    return;
  }

  new Promise(resolve => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    }).on("end", () => {
      resolve(data);
    });
  }).then(data => {
    try {
      const done = enrichment(data);
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify(done, null, 2));
    } catch (e) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(`500 Internal Server Error\n\n${e.toString()}`);
    }
  });

});
server.listen(port, () => {
  console.log(`imi-enrichment-contact-server is running on port ${port}`);
});
