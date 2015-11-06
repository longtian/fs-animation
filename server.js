/**
 * Created by yan on 15-11-5.
 */

var options = require('./options');
var bunyan = require('bunyan');
var http = require('http');
var express = require('express');
var path = require('path');
var WebSocketServer = require('ws').Server;
var chokidar = require('chokidar');
var History = require('./lib/History');
var _ = require('lodash');

// bootstraping

var log = bunyan.createLogger({
  name: 'fs-animation',
  level: options.logLevel
});

log.info('startup options', options);

var app = express();
var server = http.createServer();
var wss = new WebSocketServer({
  server: server
});
var watcher = chokidar.watch(options._, {
  ignored: options.ignore,
  ignoreInitial: options.ignoreInitial
});
var history = new History(watcher);

watcher.on('all', function (event, path) {
  log.debug('events', {
    event: event,
    path: path
  });
});

var notifyClients = _.throttle(function () {
  log.info('broadcasting to clients');
  wss.clients.forEach(function each(client) {
    client.send('update');
  });
}, options.throttle);

history.on('update', notifyClients);

// serve static files

app.use(express.static(path.join(__dirname, 'public')));

// route definition

app.use(function (req, res, next) {
  log.debug(req.url);
  next();
});

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
server.listen(options.port, options.hostname, function () {
  var address = server.address();
  log.warn('Listening on http://%s:%d', address.address, address.port);
});

process.on('SIGINT', function () {
  log.warn('Got SIGINT, exiting');
  process.exit();
});