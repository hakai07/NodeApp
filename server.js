var nodeServer = require('http').createServer();

//Node server listening to 8081
var io = require('socket.io').listen(nodeServer);

//Node server listening to 8081
nodeServer.listen(8081);

var users = [];
var activeUsers = [];
io.on('connection',function(socket){

    socket.on('userOnline',function(data){
        socket.username = data.username;
        console.log(users.indexOf(data.username));
        if(users.indexOf(data.username) == -1)
            users.push(data.username);
        if(activeUsers.indexOf(data.username) == -1)
            activeUsers.push(data.username);
        console.log(activeUsers);
        io.sockets.emit('users',{users : users, activeUsers : activeUsers});
    });
    
    socket.on('sendMessage',function(data){
        console.log(data.message);
        io.sockets.emit('getMessage',{message:data.message,username : data.username});
    });
    socket.on('disconnect',()=>{
        var index = users.indexOf(socket.username);
        activeUsers.splice(index,1);
        io.sockets.emit('users',{users : users, activeUsers : activeUsers});
    });
});