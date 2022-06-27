import React, { useState } from 'react';
import { io } from 'socket.io-client';
const socket = io("https://react.zenzig.com", {secure:true});

export const Sockets = () => {
  // send a message to the server
  const testSocket = () => {
    socket.emit('testSocket');
    console.log("sent test socket");
  };
  
  // this is a test of dynamic listeners, that is to say we have not defined a listener on the server
  // with the explicit name "testListener", rather this will be caught by the Socket.onAny event handler
  const testListener = () => {
    socket.emit('testListener', true);
    console.log("sent test socket");
  };  
  // listen for a message from the server
  socket.addEventListener("fromServer", () => {
    console.log("recieved a message from the server.");
  });

  // listen for a message from the server
  socket.addEventListener("testListener", (data) => {
    console.log("testListener: "+data);
      let el = document.getElementById("js-socket-test");
      //If it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(el) != 'undefined' && el != null){
        if (data == 0) {
            el.style.border = "solid 6px green";
        } else if (data == 1) {
            el.style.border = "solid 6px yellow";
        } else if (data == 2) {
            el.style.border = "solid 6px red";
        } 
      }
  });  
  
  socket.on('pytest', (data) => {
    //console.log("pytest: "+data);
    let el = document.getElementById("js-test-listener");
      //If it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(el) != 'undefined' && el != null){
        if (data == 0) {
            el.style.border = "solid 6px green";
        } else if (data == 1) {
            el.style.border = "solid 6px yellow";
        } else if (data == 2) {
            el.style.border = "solid 6px red";
        } 
      }
  });  
  
     
  return (
    <div>
        <div className="card card-min-width col-4 mx-5">
            <div className="card-body cardsize">
                 <h5 className="card-title">Socket.io Tests</h5>
                  <p className="card-text">Socket.IO client/server testing in Meteor with React</p>
                  <div className="inlineLeft">
                      <a href="#" onClick={testSocket} className="btn btn-primary btn-outline-default" role="button" aria-pressed="true" style={{margin:'0 0 0 5px'}}>Test Socket</a> 
                      <a href="#" onClick={testListener} className="btn btn-primary btn-outline-default" role="button" aria-pressed="true" style={{margin:'0 0 0 5px'}}>Test Listener</a> 
                  </div>
            </div>
        </div>    
    </div>
  );
};
