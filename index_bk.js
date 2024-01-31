const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { google } = require('googleapis');
const youtubeSearch = require('youtube-search');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const googleApiKey = 'AIzaSyC7gMmk4m-5zPVNky-daB3JyWH2nsnW2O8'; // Ganti dengan API key Google Anda
const youtubeSearchOpts = {
  maxResults: 25,
  key: googleApiKey,
};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/play', (req, res) => {
  res.sendFile(__dirname + '/player.html');
});

const youtube = google.youtube({
  version: 'v3',
  auth: googleApiKey,
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('search', (query) => {
    youtubeSearch(query, youtubeSearchOpts, (err, results) => {
      if (err) return console.log(err);
      io.emit('searchResults', results);
    });
  });

  socket.on('selectVideo', (videoId) => {
    io.emit('loadVideo', videoId);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
