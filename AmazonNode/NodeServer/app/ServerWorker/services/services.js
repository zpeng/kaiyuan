'use strict';

module.exports = function(serviceSocket) {
	serviceSocket.of('/client').on('connection', function(socket){
	    console.log('socket connection with client established: '+ socket);
	    socket.emit('hello message', 'hi client');
	});
	serviceSocket.of('/supplier').on('connection', function(socket){
	    console.log('socket connection with client established: '+ socket);
	    socket.emit('hello message', 'hi supperlier');
	});
}