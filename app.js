/**
 * Created by hbeckeri on 12/9/15.
 */
var express = require('express');
var app = express();

var PORT = 80;
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log('MixedBerry Server: Listening on port %s', PORT);
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res){
    //query mongo
    //return data
});