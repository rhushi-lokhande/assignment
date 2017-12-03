const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const socket = require('./server/socket');

// Get gist route
const api = require('./server/api');
const app = express();
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
// Socket.io for real time communication
const io = require('socket.io').listen(server);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'server')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

/**
 * Socket events
 */
socket._socket(io);