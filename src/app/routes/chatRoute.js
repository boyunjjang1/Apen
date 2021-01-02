module.exports = function (app) {
  const path = require('path');
  const jwtMiddleware = require('../../../config/jwtMiddleware');
  const http = require('http').createServer(app);
  const io = require('socket.io')(http);
  const { v4: uuidv4 } = require('uuid');
  const room = io.of('/room');

  app.get('/chatRoom', jwtMiddleware, function(req,res){
    console.log("chat room")
    res.send('shit');
  })

  http.listen(3060, () => {
        console.log('Connected at 3060');
   });

   room.on('connection', (clientSocket) => {
     let roomName = null;
     console.log("room 네임스페이스에 접속");
     console.log('Client Socket', clientSocket.id);

      clientSocket.on('createRoom', (data) => {
        // createRoom 성공하면 
        let msg = {code: 100}
        clientSocket.emit('RoomLog', msg)
        roomName = uuidv4();
        console.log(roomName, "roomNameCheck");
        clientSocket.emit('RoomID',roomName);
        clientSocket.join(roomName);

        // loginIds.push({
        //   owner: clientSocket.id,
        //   roomTitle: roomName,
        //   status: "ACTIVE"
        // })
      })

     clientSocket.on('joinRoom', (data) => {

      console.log(data, "joinRoomTest");
      roomName = data;
      let msg = {code: 102}
      // clientSocket.in(roomName).emit('RoomLog', msg); // 나한테는 안보이게 하기
      // clientSocket.emit('RoomLog','방 참가');

      clientSocket.broadcast.to(roomName).emit('RoomLog',msg);
      let msg2 = {code: 101}
      clientSocket.emit('RoomLog',msg2);

      // console.log(clientSocket.adapter.rooms, "몇명 체크");

      clientSocket.join(roomName);
    });

    clientSocket.on('sendMsgFromClient', (msg) => {
      console.log(roomName, "메시지 방이름 ")
     clientSocket.to(roomName).emit('sendMsgFromServer', msg)
    });

     // disconnect --> 소켓 연결 끊겼을 때

    clientSocket.on('leaveRoom', (room) => {

      clientSocket.leave(room, (data) => {
        console.log("Room네임스페이스 Leave Room");
        let msg = {code: 103}
        // clientSocket.emit('RoomLog',msg);
        clientSocket.broadcast.to(room).emit('leaveRoom',msg);      
      })
     })
    })

    


}