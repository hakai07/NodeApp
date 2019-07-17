var express = require('Express');
//app
var app = express();
var clientServer = require('http').createServer(app);
clientServer.listen(8080);
app.use(express.static("public"));
app.get('/index.html',function(req,res){
	res.sendfile('index.html');
});