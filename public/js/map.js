var heatmapData;

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';

$.get(url + '/grid', function (doc) {
    $.get(url + '/gridData', function(dataDoc){
        heatmapData = doc;


        var array = [];

        for(var i = 1; i < doc.length; i++) {
            console.log(dataDoc[5* i]);
            console.log(doc[i]);
            var rect = new google.maps.Rectangle({
                strokeColor: numberToColor(dataDoc[5*i].number),
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: numberToColor(dataDoc[5*i].number),
                fillOpacity: 0.35,
                map: map,
                bounds: {
                    north: doc[i].latitude1,
                    south: doc[i].latitude2,
                    east: doc[i].longitude1,
                    west: doc[i].longitude2
                }
            });
        }
    });
});
var sanFrancisco = new google.maps.LatLng(39.7684, -86.1581);

map = new google.maps.Map(document.getElementById('map'), {
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



