/**
 * Created by hbeckeri on 12/9/15.
 */
var express = require('express');
var app = express();

var PORT = process.env.PORT;
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log('MixedBerry Server: Listening on port %s', PORT);
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});