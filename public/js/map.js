var heatmapData = [];
var grid;
var gridData;
var crimeCastType = 1;
var crimeCastDay = 1;

var crimeCast = $('#crimeCast');
var crimeTypes = $('#crimeTypes');
var crimeCastTypes = $('#crimeCastTypes');
var radarChart = $('#chart');

crimeCast.fadeOut(0);
crimeTypes.fadeOut(0);
crimeCastTypes.fadeOut(0);
radarChart.fadeOut(0);

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';

$.get(url + '/grid', function (doc) {
    grid = doc;
    $.get(url + '/gridData', function (docData) {
        gridData = docData;
        $.get(url + '/heat', function (heat) {
            for (var i = 1; i < doc.length; i++) {
                heatmapData.push(new google.maps.LatLng(heat[i].latitude, heat[i]["longitude"]));
            }
        });
    });
});

var sanFrancisco = new google.maps.LatLng(39.7684, -86.1581);

var map = new google.maps.Map(document.getElementById('map'), {
    center: sanFrancisco,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

function numberToColor(num) {
    num = num / 12;
    num = Math.floor(num);

    switch (num) {
        case 0:
            return '#fff7ec';
        case 1:
            return '#fee8c8';
        case 2:
            return '#fdd49e';
        case 3:
            return '#fdbb84';
        case 4:
            return '#fc8d59';
        case 5:
            return '#ef6548';
        case 6:
            return '#d7301f';
        case 7:
            return '#b30000';
        case 8:
            return '#7f0000';
    }
}

function setGrid(val) {
    crimeCastTypes.fadeOut(0);
    crimeCast.fadeOut(0);
    crimeTypes.fadeIn(0);
    radarChart.fadeOut(0);
    $('.modelTitle').text('Crime Reports: Type ' + val);

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    val = 5 - val;

    for (var i = 1; i < grid.length; i++) {
        console.log(gridData[(5 * i) - val]);
        var rect = new google.maps.Rectangle({
            strokeColor: numberToColor(gridData[(5 * i) - val].number),
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: numberToColor(gridData[(5 * i) - val].number),
            fillOpacity: 0.35,
            map: map,
            bounds: {
                north: grid[i].latitude1,
                south: grid[i].latitude2,
                east: grid[i].longitude1,
                west: grid[i].longitude2
            }
        });
    }
}

function setHeatmap() {
    crimeCastTypes.fadeOut(0);
    crimeCast.fadeOut(0);
    crimeTypes.fadeOut(0);
    radarChart.fadeOut(0);

    $('.modelTitle').text('911 Call Heatmap');

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 40
    });
    heatmap.setMap(map);
}

function setMethPins() {
    crimeCastTypes.fadeOut(0);
    crimeCast.fadeOut(0);
    crimeTypes.fadeOut(0);

    $('.modelTitle').text('Meth Labs');

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //write ur shit here
    //if you need more data, make another nested get request; alternatively, you could make the get request here
    var marker;
    $.get(url + '/meth', function (doc) {
        console.log(doc);
        for (var i = 1; i < doc.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(doc[i]["latitude"], doc[i]["longitude"]),
                title: doc[i]["address"],
                map: map
            });
            google.maps.event.addListener(marker, 'click', function () {
                radarChart.fadeIn(0);
                var w = 200,
                    h = 250,
                    array = [],
                    i = 0,
                    d,
                    mycfg;

                for (i = 0; i < 9; i++) {
                    array[i] = Math.random();
                }
                d = [
                    [
                        {axis: "Open hours", value: array[0]},
                        {axis: "Availability", value: array[1]},
                        {axis: "Distance", value: array[3]},
                        {axis: "Potential risk", value: array[5]},
                        {axis: "Other", value: array[7]},
                        {axis: "service", value: array[8]}
                    ]
                ];

                mycfg = {
                    w: w,
                    h: h,
                    maxValue: 0.6,
                    levels: 6,
                    ExtraWidthX: 200
                }

                RadarChart.draw("#chart", d, mycfg);
            });
        }
    });
}

function setGridByPrediction(day) {
    crimeCastDay = day;

    crimeCastTypes.fadeIn(0);
    crimeCast.fadeIn(0);
    crimeTypes.fadeOut(0);
    radarChart.fadeOut(0);


    $('.modelTitle').text('Crime Forecast - Day: ' + crimeCastDay + ' Type: ' + crimeCastType);

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    for (var i = 1; i < grid.length; i++) {

        (function (index) {
            $.get('http://54.200.107.111:8006/iot_data/' + i + '/' + crimeCastDay + '/' + crimeCastType, function (doc) {
                var rect = new google.maps.Rectangle({
                    strokeColor: numberToColor(doc),
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: numberToColor(doc),
                    fillOpacity: 0.35,
                    map: map,
                    bounds: {
                        north: grid[index].latitude1,
                        south: grid[index].latitude2,
                        east: grid[index].longitude1,
                        west: grid[index].longitude2
                    }
                });
            });
        })(i)

    }
}

function setGridByPredictionType(type) {
    crimeCastType = type;

    crimeCastTypes.fadeIn(0);
    crimeCast.fadeIn(0);
    crimeTypes.fadeOut(0);
    radarChart.fadeOut(0);


    $('.modelTitle').text('Crime Forecast - Day: ' + crimeCastDay + ' Type: ' + crimeCastType);

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    for (var i = 1; i < grid.length; i++) {

        (function (index) {
            $.get('http://54.200.107.111:8006/iot_data/' + i + '/' + crimeCastDay + '/' + crimeCastType, function (doc) {
                var rect = new google.maps.Rectangle({
                    strokeColor: numberToColor(doc),
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: numberToColor(doc),
                    fillOpacity: 0.35,
                    map: map,
                    bounds: {
                        north: grid[index].latitude1,
                        south: grid[index].latitude2,
                        east: grid[index].longitude1,
                        west: grid[index].longitude2
                    }
                });
            });
        })(i)

    }
}

