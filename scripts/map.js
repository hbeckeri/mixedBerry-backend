var heatmapData;
$.get('https://ec2-52-35-101-218.us-west-2.compute.amazonaws.com/ambulance', function(res) {
	heatmapData = res;	
		});
var sanFrancisco = new google.maps.LatLng(39.7684 ,-86.1581);

map = new google.maps.Map(document.getElementById('map'), {
  center: sanFrancisco,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.HYBRID
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(map);
