$(document).ready(function() {
  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 32.645930,
        lng: 51.668386
      },
      zoom: 10
    },
    apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjczMDJiN2ZkMThiOThjMWVhN2M0ZTk1ZGY3MjExZDlmODFiOWE2ZjEwMjY5NzQxYzAyZjdhZmJhZWIxN2FmOWVjZDViMmM1MmEzYzNmZTVkIn0.eyJhdWQiOiIxMzM0MyIsImp0aSI6IjczMDJiN2ZkMThiOThjMWVhN2M0ZTk1ZGY3MjExZDlmODFiOWE2ZjEwMjY5NzQxYzAyZjdhZmJhZWIxN2FmOWVjZDViMmM1MmEzYzNmZTVkIiwiaWF0IjoxNjE3MDA3NDUzLCJuYmYiOjE2MTcwMDc0NTMsImV4cCI6MTYxOTU5OTQ1Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.ogsMwm_1twsFGQnDGdRe6h-Fy22Q77ENXfBdsciydhXUxkHNR5zvCGsSprLSHMpN8EA7iax39geh1R_jhlGHV6R2tmZDqUVtGNgEGlQYnWzEpOC2cdNsiR2L3Wp3KfA6qkLkVpBB1s43Tg-aHv6UrfQhjAXoI5YvWy9TDfLg79UxRlXBqOXZRDOciaq-epTLWwBf-mPUMQE3l35OPf-9ejbrx7v1VkpG_ZvVH__kKQpryHBYgt0wV3uN_r_ikqfX83IF_LesIPFc1PRWiE41akFZ8TMVn_RBixbzIfXkmZkbrg38RosVr_YJgzmoxg2HyB60I85QVIzvu8l-scGAGg"
  });
  app.addVectorLayers();

  // Add in a crosshair for the map
  var crosshairIcon = L.icon({
    iconUrl: 'app/css/images/crosshair.png',
    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  });

  crosshairMarker = new L.marker(app.map.getCenter(), {icon: crosshairIcon, clickable:false});
  crosshairMarker.addTo(app.map);

  // Move the crosshair to the center of the map when the user pans
  app.map.on('move', function(e) {
    crosshairMarker.setLatLng(app.map.getCenter());
    console.log(app.map.getCenter())
    $('#lat').val(app.map.getCenter().lat)
    $('#lng').val(app.map.getCenter().lng)
  });

  crosshairMarker.on('click', function(event){
    console.log(event.latlng)
  });
});
