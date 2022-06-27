import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
import { io } from 'socket.io-client';
var fs = Npm.require('fs-extra');
// set a port for the socket.io connection, meteor is running on port 3000
const PORT = 8083;

// function to return a random number between 0 and max - we use this to simulate our data feed in the client
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

Meteor.startup(() => {
// define socket.io server and set CORS to allow all access
const server = http.createServer();
const io = socket_io(server, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
    console.log("client connected");
    
    // dynamic listeners - listeners are edge device names, exp: "room301", "room302", etc.
    // and are the value of event, args is true or false
    socket.onAny((event, args) => {
      let dataInterval;
      socket.on(event, function(args) {
        if (args == false) {
          // if false we call clear() on our running interval function
          clearInterval(dataInterval);
        } else if (args == true) {
          // we start our interval function and emit data to our device name every two seconds
          dataInterval = setInterval(function() {
            socket.emit(event, getRandomInt(3));
          }, 2000);
        }
      });
    });

  // listen for message from client side.
  socket.on("testSocket", function(data) {
    console.log("client sent testSocket");
    // we got a message from the client so we'll emit a response
    socket.emit('fromServer');
  });

});


// Start the socket.io server we defined above
try {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

} catch (error) {
  console.log(error);
}   


});









              
        
   
                  
    












