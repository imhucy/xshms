//
//  Dynamically load Flot plugin
//  homepage: http://www.flotcharts.org  v0.8.2 license- MIT
//
function LoadFlotScripts(callback){
	function LoadFlotScript(){
		$.getScript('plugins/flot/jquery.flot.js', LoadFlotResizeScript);
	}
	function LoadFlotResizeScript(){
		$.getScript('plugins/flot/jquery.flot.resize.js', LoadFlotTimeScript);
	}
	function LoadFlotTimeScript(){
		$.getScript('plugins/flot/jquery.flot.time.js', callback);
	}
	if (!$.fn.flot){
		LoadFlotScript();
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}