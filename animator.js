var $ = require('jquery');
var exec = require('child_process').exec;



var $div = $('<div />');
var anim = function(name, from, to, focus, duration) {
duration = +duration;
if(+focus) {
var command = 'wmctrl -x -a "' + name + '"';
exec(command);
}

$div.css({left: from + 'px'}).animate({left: to + 'px'}, {
	step: function(now) {
		now = Math.round(+now);
		var command = 'wmctrl -x -r "' + name + '" -e 0,-1,-1,-1,' + (+now);
		exec(command);
	},
	duration: duration
});

};

var net = require('http');
var url = require('url');

var server = net.createServer(function(req, res) {
	var params = url.parse(req.url, true).query;
	anim(params.name, params.from, params.to, params.focus || 1, params.duration || 600);
	res.end('OK');
});


server.listen(8008, '127.0.0.1');
