var express = require('Express');
var app = express();
var clientServer = require('http').createServer(app);
clientServer.listen(8080);
app.use(express.static("public"));

app.get('/',function(req,res){
	res.sendfile('index.html');
});