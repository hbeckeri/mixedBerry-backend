/**
 * Created by hbeckeri on 12/9/15.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var meth = require('./app/models/methData.js');
var heatData = require('./app/models/AmbulanceData.js');
var gridData = require('./app/models/output.js');
var grid = require('./app/models/distincitons.js');

mongoose.connect('mongodb://localhost/iot');

//var versions = mongoose.model("versions");

var PORT = 80;
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
    console.log('MixedBerry Server: Listening on port %s', PORT);
});

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
