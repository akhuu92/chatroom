const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => { 
    console.log(`User: ${socket.id} has connected`);
    
    //socket.emit('message', {user: 'admin', text: 'dumaMuy'});
    
    socket.on('message', (message) => {
        //receive from client
        //console.log(msg);
        io.emit('message', message);
    });

    socket.on('sendMessage', (message) => {
        let newText = "<" + socket.id + ">: " + message;
        io.emit('message', newText);
    })

    socket.on('disconnect', () => {
        console.log(`User: ${socket.id} has disconnected`);
    });
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));