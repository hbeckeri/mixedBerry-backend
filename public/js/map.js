var heatmapData;
var grid;
var gridData;

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';

$.get(url + '/grid', function (doc) {
    $.get(url + '/gridData', function(docData){
        heatmapData = grid;
        grid = doc;
        gridData = docData;
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

    switch (num){
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

function setGrid() {
    var val = $('input[name=radioName]:checked', '#gridSelector').val();
    $('.modelTitle').text('Crime Reports: Type ' + val);

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    val = 5 - val;

    for (var i = 1; i < grid.length; i++ ) {
        console.log(gridData[(5*i) - val]);
        var rect = new google.maps.Rectangle({
            strokeColor: numberToColor(gridData[(5*i) - val].number),
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: numberToColor(gridData[(5*i) - val].number),
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
    $('.modelTitle').text('911 Call Heatmap');

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}



