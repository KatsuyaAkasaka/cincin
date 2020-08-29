const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

app.get('/' , (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.sockets.on('connection', (socket) => {
  socket.on('join', (msg) => {
    socket.join(msg);
  });
  socket.on('shake', (msg) => {
    socket.broadcast.to(msg.room_id).emit(msg.time);
  });
});

http.listen(PORT, () => {
  console.log('server listening. Port:' + PORT);
});
