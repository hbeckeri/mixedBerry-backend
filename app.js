/**
 * Created by hbeckeri on 12/9/15.
 */

var PORT = 80;

var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(PORT, function () {
    console.log('MixedBerry Server: Listening on port %s', PORT);
}));
var mongoose = require('mongoose');

var methData = require('./app/models/methData.js');
var heatData = require('./app/models/AmbulanceData.js');
var gridData = require('./app/models/output.js');
var grid = require('./app/models/distincitons.js');

mongoose.connect('mongodb://localhost/iot');

//var versions = mongoose.model("versions");

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.get('/gridData', function (req, res) {
    gridData.find({}, function (err, docs) {
        res.send(docs);
    });
});

app.get('/grid', function(req, res){
    grid.find({}, function (err, docs) {
        res.send(docs);
    });
});

app.get('/heat', function(req, res) {
   heatData.find({}, function(err, docs){
       res.send(docs);
   });
});

app.get('/meth', function(req, res) {
   methData.find({}, function(err, docs){
       res.send(docs);
   })
});

app.get('/light', function(req, res){
    var data = req.query.data;
    io.emit('hi', {data: data}, 'everyone');
    res.send({success: 'OK'});
    console.log('Got data ' + data);
});
