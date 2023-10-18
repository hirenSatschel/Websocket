const express = require("express");
const app = express();
const http = require("http");
const serverListener = http.createServer(app);
const { Server } = require("socket.io");

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello world , Welcome to Node.js");
// });

// app.get("creatMessage", (req, res) => {
//   res.send("Hello world , Welcome to Node.js");
// });
const IO = new Server(serverListener);
IO.on("connection", (socket) => {
  console.log("Connected ===>", socket.user);

  // socket.on("creatMessage", (data) => {
  //   console.log("receiveMessage from client side ====>", data);
  socket.emit(
    "reciveMessage",
    "Response from server ===>" + "HIREN"
  );
  //   });
});

// new Server(serverListener);
serverListener.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
