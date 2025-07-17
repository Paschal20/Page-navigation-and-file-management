import http, { IncomingMessage, ServerResponse } from "http";
import os from "os";
import fs from "fs";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/plain");
      res.write("Your file has been created");
      res.end();

      const text = "My first text";
      fs.appendFile(
        "message.txt",
        text + "\n",
        "utf8",
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "text/plain");
            res.write(`Error saving file: ${err.code} - ${err.message}`);
            res.end();
          }
        }
      );
    } else if (req.url === "/add" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/plain");
      res.write("Your cpu specs have been added to the file");
      res.end();
      const newText = JSON.stringify(os.cpus());

      fs.appendFile(
        "message.txt",
        newText + "\n",
        "utf8",
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "text/plain");
            res.write(`Error saving file: ${err.code} - ${err.message}`);
            res.end();
          }
        }
      );
    } else if (req.url === "/rename" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/plain");
      res.write("The name of your file has been changed");
      res.end();
      const newtext = JSON.stringify(os.cpus());

      fs.rename(
        "./message.txt",
        "./renamed.txt",
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "text/plain");
            res.write(`Error renaming file: ${err.code} - ${err.message}`);
            res.end();
          }
        }
      );
    } else if (req.url === "/delete" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-type", "text/plain");
      res.write("Your file has been deleted");
      res.end();
      const newtext = JSON.stringify(os.cpus());

      fs.unlink("renamed.txt", (err: NodeJS.ErrnoException | null) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-type", "text/plain");
          res.write(`Error saving file: ${err.code} - ${err.message}`);
          res.end();
        }
      });
    }
  }
);

server.listen(3000, () => {
  console.log("server is hearing http://localhost:3000");
});
