var heatmapData;

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';
//get heatmap data
$.get(url + '/heat', function(data) {
	heatmapData = data;


var indy = new google.maps.LatLng(39.7684, -86.1581);

map = new google.maps.Map(document.getElementById('map'), {
    center: indy,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData
});
heatmap.setMap(map);

