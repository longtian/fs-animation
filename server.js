/**
 * Created by yan on 15-11-5.
 */

var http = require('http');
var express = require('express');
var path = require('path');
var WebSocketServer = require('ws').Server;
var chokidar = require('chokidar');
var History = require('./lib/History');

// bootstraping

var app = express();
var server = http.createServer();
var wss = new WebSocketServer({
  server: server
});
var watcher = chokidar.watch('/var/lib/docker/', {
  ignored: [/[\/\\]\./,/docker\/aufs/],
  ignoreInitial: true
});
var history = new History(watcher);

history.on('update', function () {
  wss.clients.forEach(function each(client) {
    client.send('update');
  });
});

// serve static files

app.use(express.static(path.join(__dirname, 'public')));

// route definition

app.get('/tree/latest', function (req, res) {
  res.json(history.current.toJSON());
});

app.get('/tree/size', function (req, res) {
  res.json(history.history.length);
});

app.get('/tree/history', function (req, res) {
  res.json(history.history.map(function (no) {
    return no.toJSON();
  }));
});

app.get('/tree/:id', function (req, res) {
  res.json(history.history[req.params.id].toJSON());
});

server.on('request', app);
server.listen(8001);
