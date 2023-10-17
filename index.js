const express = require('express');
const app = express();
const http = require('http');
const server= http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
require('dotenv').config(); 
const chat = require('./chat/chat');
const path = require('path')
const body = require('body-parser');
const cors = require('cors')
app.use(body.raw());
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
const login = require("./api/api")
app.use(express.static(path.join(__dirname + '/public')));
console.log(path.join(__dirname+'/public'));
const sequelize = require('./conn/connection');
const { Sequelize } = require("sequelize");
const { readdirSync } = require('fs');





//Allowing Cors
app.use(
  cors({
    origin: '*',
  }),
)

let onlineUserCount = 0;

  io.on('connection', (socket) => {
    console.log('A user connected');
    onlineUserCount++;
  
 
   
    io.emit('usercount', onlineUserCount);
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
     
      onlineUserCount--;
      io.emit('updateUserCount', onlineUserCount);
    });
  });






 io.on('connection', (socket) => {
    socket.on('send name', (username) => {
        io.emit('send name', (username));
    });
  
    socket.on('send message', (chat) => {
        io.emit('send message', (chat));
    });
});
server.listen(process.env.PORT,()=>{
    console.log(`server is listening at ${process.env.PORT}`);
})
readdirSync('./routes').map((route) =>
  
  app.use('/',require('./routes/'+route))
)

