var heatmapData = [];

console.log('here');

var url = 'http://ec2-52-35-101-218.us-west-2.compute.amazonaws.com';
//get heatmap data
console.log('here');
$.get(url + '/heat', function(doc) {
	console.log(doc);
	for(var i = 1; i < doc.length; i++) {
		console.log(doc[i]);

		heatmapData.push(new google.maps.LatLng(doc[i]["latitude"], doc[i]["longitude"]));
	}
}).done(function(doc) {
	for(var i = 1; i < doc.length; i++) {
		console.log(doc[i]);

		heatmapData.push(new google.maps.LatLng(doc[i]["latitude"], doc[i]["longitude"]));

	}
});


var indy = new google.maps.LatLng(39.7684, -86.1581);

map = new google.maps.Map(document.getElementById('map'), {
    center: indy,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});
console.log(heatmapData);
var heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData,
	radius: 40
});
heatmap.setMap(map);

