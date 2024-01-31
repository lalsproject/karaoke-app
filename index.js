// app.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { google } = require('googleapis');
const youtubeSearch = require('youtube-search');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./media.db');

console.log(db)
require('dotenv').config();

const port = process.env.PORT;
const API_KEY = process.env.API_KEY;

const googleApiKey = API_KEY; // Ganti dengan API key Google Anda
const youtubeSearchOpts = {
  maxResults: 25,
  key: googleApiKey,
};



app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/play', (req, res) => {
  res.sendFile(__dirname + '/public/player.html');
});

const youtube = google.youtube({
  version: 'v3',
  auth: googleApiKey,
});

io.on('connection', (socket) => {

  socket.on('search', (query) => {
    youtubeSearch(query+' Karaoke', youtubeSearchOpts, (err, results) => {
      if (err) return console.log(err);
      socket.emit('searchResults', results);
    });
  });

  socket.on('timeline', (query) => {
    // console.log(timeline)
    io.emit('update_timeline', query);
  });

  socket.on('set_volume', (vol) => {
    // console.log(timeline)
    io.emit('volume', vol);
  });

  socket.on('set_fun', (fun) => {
    io.emit('func', fun);
  });

  socket.on('playVideo', (id,videoId, title,thum) => {
    io.emit('loadVideo', videoId, title,thum);
  });

  socket.on('next', () => {
    let playlistArray = [];
    db.serialize(() => {
        db.each("SELECT * FROM playlist ORDER BY id ASC LIMIT 1", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                // Menambahkan row ke dalam array
                playlistArray.push(row);
                // console.log(row)
            }
        },()=>{
          if (playlistArray.length > 0)
          {
            // console.log(playlistArray[0])
            io.emit('loadVideo', playlistArray[0].id_video, playlistArray[0].title,playlistArray[0].thum);
            db.serialize(() => {
                db.run("DELETE FROM playlist WHERE id = "+playlistArray[0].id);
            });
          }
          else
          {
            // console.log('Not Song')
          }
          io.emit('next_song','')
        });
    });
    
  });
  

  socket.on('selectVideo', (videoId, title,thum) => {
    try{
      db.serialize(() => {
          // Menyimpan data ke dalam tabel users
          const stmt = db.prepare("INSERT INTO playlist (id_video, title,thum) VALUES (?, ?,?)");
          stmt.run(videoId, title,thum);
          stmt.finalize();
      });
      // return true;
    }catch{
      return false;
    }
  }); 
  
  //get playlist
  socket.on('get_playlist',(ee)=>{ 
    let playlistArray = [];
    db.serialize(() => {
        db.each("SELECT * FROM playlist", (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                // Menambahkan row ke dalam array
                playlistArray.push(row);
            }
        }, () => {
          socket.emit('res_playlist', playlistArray);
        });
    });
  });

  socket.on('delete_playlist',(id)=>{
    db.serialize(() => {
        db.run("DELETE FROM playlist WHERE id = "+id);
    });
    // console.log('del oke');
  });

});

  

server.listen(port, () => {
  console.log('Server is running');
});

process.on('exit', () => {
    db.close();
});
