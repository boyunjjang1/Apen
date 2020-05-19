
module.exports = function (app) {
  const path = require('path');
  const jwtMiddleware = require('../../../config/jwtMiddleware');
  const http = require('http').createServer(app);
  const io = require('socket.io')(http);

  const roomForChat = io.of('/testChat');
  const roomForDraw = io.of('/testDraw');
  const room = io.of('/room');

  // let room =['room1','room2'];

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
        clientSocket.emit('RoomLog', code)
        roomName = "room"+clientSocket.id;
        clientSocket.join(roomName);
      })

     clientSocket.on('joinRoom', (data) => {
      console.log(data);
      roomName = data.roomName;
      let msg = {msg: '상대방이 입장하셨습니다.'}
      // clientSocket.in(roomName).emit('RoomLog', msg);
      clientSocket.emit('RoomLog','방 참가');

      clientSocket.join(roomName);
    });

    clientSocket.on('sendMsgFromClient', (msg) => {
     clientSocket.to(roomName).emit('sendMsgFromServer', msg)
    });


    clientSocket.leave('leaveRoom', (data) => {
      console.log("Room네임스페이스 Leave Room");
      let msg = {code: 103}
      clientSocket.emit('RoomLog',code);
      clientSocket.to(roomName).emit('leaveRoom');
    })

   })
 
   roomForChat.on('connection', (clientSocket) => {
     console.log("socket connection");
     let roomName = null;

     console.log('Client Socket', clientSocket.id);

     
     clientSocket.on('joinRoom', (data) => {
       console.log(data);
       roomName = data;
       clientSocket.join(data);
     });

     clientSocket.on('sendMsgFromClient', (msg) => {
      clientSocket.to(roomName).emit('sendMsgFromServer', msg)
     });

     clientSocket.leave('leaveRoom', (data) => {
       console.log("Leave Room");
       clientSocket.to(roomName).emit('leaveRoom');
     })

   })


  // roomForChat.on('connection', (clientSocket) => {
  //   console.log('*** test connected ***');
  //   console.log(clientSocket.id)

  //   clientSocket.on('disconnect', function () {
  //     clientSocket.disconnect();
  //     console.log('test disconnected');
  //   })

  //   clientSocket.on('leaveRoom', (num, name) => {
  //     clientSocket.leave(room[num-1], () => {
  //       console.log(name + ' leave a ' + room[num-1]);
  //       clientSocket.to(room[num-1]).emit('leaveRoom', num, name);
  //     });
  //   });
  
  
  //  clientSocket.on('joinRoom', (num, name) => {
  //    console.log("joinROom TEst",num);
  //     clientSocket.join(room[num-1], () => {
  //       console.log(name + ' join a ' + room[num-1]);
  //       clientSocket.to(room[num-1]).emit('joinRoom', num, name);
  //     });
  //   });
    
  //   clientSocket.on('sendMsgFromClient', (num,name,msg) => {
  //     console.log(msg)
  //     console.log(msg.msg)
  //     console.log('*************')
  //     console.log(num)

  //     a = num-1;
  //     clientSocket.to(room[a]).emit('sendMsgFromServer', msg);
  //     console.log(a, name);

  //     // clientSocket.broadcast.emit('sendMsgFromServer',  msg )
  //   })
  
  // })

  roomForDraw.on('connection', (clientSocket) => {
    console.log('*** test connected ***');
    console.log(clientSocket.id)

    clientSocket.on('disconnect', function () {
      clientSocket.disconnect();
      console.log('test disconnected');
    })
    
    clientSocket.on('sendDrawFromClient', (msg) => {
      console.log(msg)
      console.log(msg["draw"])
      console.log('*************')

      clientSocket.emit('sendDrawFromServer',  {"shit":"shit"} )
    })
  })
}
