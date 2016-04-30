var heatmapData;

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';

$.get(url + '/grid', function (doc) {
    $.get(url + '/gridData', function(dataDoc){
        heatmapData = doc;
        var array = [];

        for(var i = 1; i < doc.length; i++) {
            console.log(dataDoc[5*i]);
            console.log(doc[i]);
            var rect = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
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



