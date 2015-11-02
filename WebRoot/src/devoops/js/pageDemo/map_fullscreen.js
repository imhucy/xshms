
/*-------------------------------------------
	Function for Fullscreen Map page (map_fullscreen.html)
---------------------------------------------*/
//
// Create Fullscreen Map
//
function FullScreenMap(){
	$.getJSON("http://www.telize.com/geoip?callback=?",
		function(json) {
			var osmap = new OpenLayers.Layer.OSM("OpenStreetMap");//создание слоя карты
			var googlestreets = new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 22,visibility: false});
			var googlesattelite = new OpenLayers.Layer.Google( "Google Sattelite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
			var map1_layers = [googlestreets,osmap, googlesattelite];
			var map_fs = drawMap(json.longitude, json.latitude, "full-map", map1_layers);
		}
	);
}