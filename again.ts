import http, { IncomingMessage, ServerResponse } from "http";
import os from "os";
import fs from "fs";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Context-type", "text/plain");
      res.write("A file has been created");
      res.end();
      const text = "First Text";
      fs.appendFile(
        "message.txt",
        text + "\n",
        "utf8",
        (err: NodeJS.ErrnoException | null) => {
            res.statusCode = 500;
            res.setHeader("Content-type", "text/plain");
            res.write("") 
        }
      );
    }
  }
);
