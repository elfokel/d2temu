var sockets = function (server){
	var io = require('socket.io').listen(server);
	//Heroku does not support web sockets, so we fallback to polling:
	io.configure(function () {
		io.set("transports", ["xhr-polling"]);
		io.set("polling duration", 10);
	});

	var onJoin = function (data) {

	};

	var onAttack = function (data) {

	};

	//connect the socket
	io.sockets.on('connection', function (socket) {

		//we use broadcast per gameId.
		socket.on('broadcast', function (data) {
			console.log(data);
			var gameId = data.gameId;
			//check the event type 
			if (data.message.eventType === 'join') {
				onJoin(data);
			}
			if(data.message.eventType === 'onAttack') {
				onAttack(data);
			}

			//we emit the event to the other clients.
            io.sockets.in(roomName).emit('event', data);
		});

		//when user joins the game make sure they use the gameId 
        socket.on('joinGame', function (data) {
            socket.set('game', data.gameId, function () {});
            socket.join(data.room);
        });
	});
};

module.exports = sockets;