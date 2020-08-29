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
    console.log(`[Request] join roomId: ${msg}`)
    socket.join(msg);
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
