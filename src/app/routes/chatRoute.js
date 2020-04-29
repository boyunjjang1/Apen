
module.exports = function (app) {
    const path = require('path');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);

    const roomForChat = io.of('/testChat');
    const roomForDraw = io.of('/testDraw');
    let room =['room1','room2'];

    app.get('/chatRoom', jwtMiddleware, function(req,res){
      console.log("chat room")

      room.emit('test', {
        'Hello': 'World',
        'test': 'good'
      });
      res.send('shit');
    })

    http.listen(3060, () => {
          console.log('Connected at 3060');
     });
   
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
  
    // io.on('connection', (socket) => {
    //   socket.on('leaveRoom', (num, name) => {
    //     socket.leave(room[num], () => {
    //       console.log(name + ' leave a ' + room[num]);
    //       socket.to(room[num]).emit('leaveRoom', num, name);
    //     });
    //   });
    
    
    //  socket.on('joinRoom', (num, name) => {
    //    console.log("joinROom TEst",num);
    //     socket.join(room[num], () => {
    //       console.log(name + ' join a ' + room[num]);
    //       socket.to(room[num]).emit('joinRoom', num, name);
    //     });
    //   });
      
    //   socket.on('chat message', (num,name,msg) => {
    //     console.log(msg)
    //     console.log(msg["chat message"])
    //     console.log('*************')
    
    //     a = num;
    //     socket.to(room[a]).emit('chat message', name, msg);
    //     console.log(a, name);
    //   })
    // })
  

  
      // const namespace1 = io.of('/namespace1');
      // // connection을 받으면 news 이벤트에 hello 객체를 담아 보낸다
      // namespace1.on('connection', (socket) => {
      //   namespace1.emit('news', {hello: "Someone connected at namespace1"});
      // })
      // const namespace2 = io.of('/namespace2');
      // // connection을 받으면 news 이벤트에 hello 객체를 담아 보낸다
      // namespace2.on('connection', (socket) => {
      //   namespace2.emit('news', {hello: "Someone connected at namespace2"});
      // })

    // io.on('connection', (socket) => {
    //     console.log('a user connected');
    //     socket.on('chat message', (msg) => {
    //       io.emit('chat message', msg);
    //     });
    //     socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //     });
    //   });
    // io.on('connection', (socket) => {
    //   console.log('connection test');
    //   socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });
    
    
    
    //   socket.on('chat message', (num, name, msg) => {
    //     a = num;
    //     io.to(room[a]).emit('chat message', name, msg);
    //     console.log(a, name);
    //   });
    // });
