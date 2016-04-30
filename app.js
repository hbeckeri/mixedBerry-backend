/**
 * Created by hbeckeri on 12/9/15.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var meth = require('./app/models/methData.js');
//var ambulance = require('./app/models/AmbulanceData.js');
var ambulance = require('./app/models/output.js');
var distinction = require('./app/models/distinctions.js');

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

app.get('/ambulance', function (req, res) {
    ambulance.find({}, function (err, docs) {
        res.send(docs);
    });
});

app.get('/distiction', function(req, res){
    distinction.find({}, function (err, docs) {
        res.send(docs);
    });
});
