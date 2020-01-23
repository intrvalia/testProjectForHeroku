//import the Express library
let connectionsLimit = 3
let express = require('express');
const portNumber= process.env.PORT || 5000;
let app = express(); //make an insatnce of express
let httpServer = require('http').createServer(app);  // create a server (using the Express framework object)
// make server listen for incoming messages
//httpServer.listen(portNumber, function(){
  //console.log('listening on port:: '+portNumber);
//});
//const https = require('https');
const fs = require('fs');



// var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
// var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
// var options = {
//   key: key,
//   cert: cert
// };

//let httpsServer  =   https.createServer(options, app);

httpServer.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
});

// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/cam', function(req, res) {
    res.sendFile(__dirname + '/public/index-camera.html');
});

// declare io which mounts to our httpServer object (runs ontop ... )
let io = require('socket.io')(httpServer);
// for the client...
app.use(express.static(__dirname + '/node_modules'));

// Listen for incoming connections from clients
io.on('connection', function (socket) {
console.log(io.engine.clientsCount);
if (io.engine.clientsCount > connectionsLimit) {
      socket.emit('err', { message: 'reach the limit of connections' })
      socket.disconnect()
      console.log('Disconnected...')
      return;
    }

socket.on('join', function (data) {
   console.log("client joined:: "+ data);
});
socket.on('newRectA', function (data) {
    console.log("newRect A:: "+ data);
    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    socket.broadcast.emit('movingFromServer', data);
});
socket.on('newRectB', function (data) {
    console.log("newRect B:: "+ data);
    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    socket.broadcast.emit('movingFromServer', data);
});
socket.on('newRectC', function (data) {
    console.log("newRect C:: "+ data);
    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    socket.broadcast.emit('movingFromServer', data);
});
socket.on('newRectD', function (data) {
    console.log("newRect D:: "+ data);
    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    socket.broadcast.emit('movingFromServer', data);
});
});
