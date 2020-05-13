var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.use(function (socket, next) {
  var handshakeData = socket.request;
  console.log(handshakeData.io);
  next();
});
var connectedUsers = 0;
io.on("connection", (socket) => {
  console.log(socket.id);
  connectedUsers++;

  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    connectedUsers--;
    console.log(connectedUsers);
  });
  console.log(connectedUsers);
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
