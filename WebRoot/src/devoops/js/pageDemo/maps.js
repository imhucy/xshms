
/*-------------------------------------------
	Function for OpenStreetMap page (maps.html)
---------------------------------------------*/
//
// Load GeoIP JSON data and draw 3 maps
//
function LoadTestMap(){
	$.getJSON("http://www.telize.com/geoip?callback=?",
		function(json) {
			var osmap = new OpenLayers.Layer.OSM("OpenStreetMap");//создание слоя карты
			var googlestreets = new OpenLayers.Layer.Google("Google Streets", {numZoomLevels: 22,visibility: false});
			var googlesattelite = new OpenLayers.Layer.Google( "Google Sattelite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
			var map1_layers = [googlestreets,osmap, googlesattelite];
			// Create map in element with ID - map-1
			var map1 = drawMap(json.longitude, json.latitude, "map-1", map1_layers);
			$("#map-1").resize(function(){ setTimeout(map1.updateSize(), 500); });
			// Create map in element with ID - map-2
			var osmap1 = new OpenLayers.Layer.OSM("OpenStreetMap");//создание слоя карты
			var map2_layers = [osmap1];
			var map2 = drawMap(json.longitude, json.latitude, "map-2", map2_layers);
			$("#map-2").resize(function(){ setTimeout(map2.updateSize(), 500); });
			// Create map in element with ID - map-3
			var sattelite = new OpenLayers.Layer.Google( "Google Sattelite", {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
			var map3_layers = [sattelite];
			var map3 = drawMap(json.longitude, json.latitude, "map-3", map3_layers);
			$("#map-3").resize(function(){ setTimeout(map3.updateSize(), 500); });
		}
	);
}