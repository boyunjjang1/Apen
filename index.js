const express = require('./config/express');
const {logger} = require('./config/winston');
// const http = require('http')
const sio = require('socket.io');
const port = 3030;

express().listen(port);
// const server = http.createServer(express()).listen(port);
// io = sio(server)

// io.on('connection', (socket)=>{
//     console.log("3030 socket connection")
//     socket.emit('CreateRoomLog', 'createSuccess')
// })

logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);