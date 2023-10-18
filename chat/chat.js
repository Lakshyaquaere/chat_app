
const express = require('express');
const app = express();
const http = require('http');
const server= http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
require('dotenv').config(); 
const api = require("../api")
console.log("1")
