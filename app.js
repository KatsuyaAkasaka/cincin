const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

app.get('/load/:id' , (req, res) => {
  res.send(`200 ok`);
});

io.sockets.on('connection', (socket) => {
  socket.on('join', (msg) => {
    console.log(`[Request] join roomId: ${msg}`)
    console.log(`TIMES = ${process.env.TIMES}`)
    const TIMES = 500;
    for (const i = 0; i < TIMES; i++) {
      socket.join(msg);
    }
  });
  socket.on('cheer', (msg) => {
    console.log(`[Request] cheer ${msg}`)
    socket.broadcast.to(msg.roomId).emit('cheered', msg.time);
    console.log('[Response] broadcasted')
  });
});

http.listen(PORT, () => {
  console.log('server listening. Port:' + PORT);
});
