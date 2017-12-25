const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app
	.get('/', function (req, res) {
	  res.sendFile(__dirname + '/index.html');
	})
	.use('/assets', express.static(__dirname + '/assets/'));


io.on('connection', function (socket) {
  socket.emit('news', { data: 'message from server' });
  socket.on('update', function (data) {
		//var newData = {"nps":47,"responses":643,"detractors":73,"passives":194,"promoters":376,"response_rate":96,"email_response_rate":48,"scores_histogram":[11,10,13,8,7,11,13,112,82,211,165],"mean_score":8.1,"nps_trend":47,"response_trend":641,"detractor_trend":73,"passive_trend":192,"promoter_trend":376,"response_rate_trend":-4,"email_response_rate_trend":48,"mean_score_trend":0.6};
		var newData = {"aveage":9.150943396226415,"scored":106,"dimissed":425,"response_rate":"8.15","scores_histogram":[0,1,0,0,2,3,1,5,12,11,71]};
		io.sockets.emit('newData', newData);
		/*socket.broadcast.emit('news2', {
			data: data.data
		});*/
	});

});


