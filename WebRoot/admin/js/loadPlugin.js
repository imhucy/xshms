/*-------------------------------------------
Dynamically load plugin scripts
---------------------------------------------*/
//
//  Dynamically load Bootstrap Validator Plugin
//  homepage: https://github.com/nghuuphuoc/bootstrapvalidator
//
function LoadBootstrapValidatorScript(callback){
	if (!$.fn.bootstrapValidator){
		$.getScript('plugins/bootstrapvalidator/bootstrapValidator.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
// Dynamically load Fullcalendar Plugin Script
// homepage: http://arshaw.com/fullcalendar
// require moment.js
//
function LoadCalendarScript(callback){
	function LoadFullCalendarScript(){
		if(!$.fn.fullCalendar){
			$.getScript('plugins/fullcalendar/fullcalendar.js', callback);
		}
		else {
			if (callback && typeof(callback) === "function") {
				callback();
			}
		}
	}
	if (!$.fn.moment){
		$.getScript('plugins/moment/moment.min.js', LoadFullCalendarScript);
	}
	else {
		LoadFullCalendarScript();
	}
}
//
//  Dynamically load DataTables plugin
//  homepage: http://datatables.net v1.9.4 license - GPL or BSD
//
function LoadDataTablesScripts(callback){
	function LoadDatatables(){
		$.getScript('plugins/datatables/jquery.dataTables.10.js', function(){
			$.getScript('plugins/datatables/ZeroClipboard.js', function(){
				$.getScript('plugins/datatables/TableTools.js', function(){
					$.getScript('plugins/datatables/dataTables.bootstrap.js', callback);
				});
			});
		});
	}
	if (!$.fn.dataTables){
		LoadDatatables();
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load Fancybox 2 plugin
//  homepage: http://fancyapps.com/fancybox/ v2.1.5 License - MIT
//
function LoadFancyboxScript(callback){
	if (!$.fn.fancybox){
		$.getScript('plugins/fancybox/jquery.fancybox.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load Widen FineUploader
//  homepage: https://github.com/Widen/fine-uploader  v5.0.1 license - GPL3
//
function LoadFineUploader(callback){
	if (!$.fn.fineuploader){
		$.getScript('plugins/fineuploader/jquery.fineuploader-5.0.1.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
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
//
//  Dynamically load jQuery-Knob plugin
//  homepage: http://anthonyterrien.com/knob/  v1.2.5 License- MIT or GPL
//
function LoadKnobScripts(callback){
	if(!$.fn.knob){
		$.getScript('plugins/jQuery-Knob/jquery.knob.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load Morris Charts plugin
//  homepage: http://www.oesmith.co.uk/morris.js/ v0.4.3 License - MIT
//  require Raphael http://raphael.js
//
function LoadMorrisScripts(callback){
	function LoadMorrisScript(){
		if(!$.fn.Morris){
			$.getScript('plugins/morris/morris.min.js', callback);
		}
		else {
			if (callback && typeof(callback) === "function") {
				callback();
			}
		}
	}
	if (!$.fn.raphael){
		$.getScript('plugins/raphael/raphael-min.js', LoadMorrisScript);
	}
	else {
		LoadMorrisScript();
	}
}
//
// Dynamically load  OpenStreetMap Plugin
// homepage: http://openlayers.org
//
function LoadOpenLayersScript(callback){
	if (!$.fn.OpenLayers){
		$.getScript('http://www.openlayers.org/api/OpenLayers.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load jQuery Select2 plugin
//  homepage: https://github.com/ivaynberg/select2  v3.4.5  license - GPL2
//
function LoadSelect2Script(callback){
	if (!$.fn.select2){
		$.getScript('plugins/select2/select2.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load Sparkline plugin
//  homepage: http://omnipotent.net/jquery.sparkline v2.1.2  License - BSD
//
function LoadSparkLineScript(callback){
	if(!$.fn.sparkline){
		$.getScript('plugins/sparkline/jquery.sparkline.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load  jQuery Timepicker plugin
//  homepage: http://trentrichardson.com/examples/timepicker/
//
function LoadTimePickerScript(callback){
	if (!$.fn.timepicker){
		$.getScript('plugins/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.min.js', callback);
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}
//
//  Dynamically load xCharts plugin
//  homepage: http://tenxer.github.io/xcharts/ v0.3.0 license - MIT
//  Required D3 plugin http://d3js.org/ v3.4.1 license - MIT
//
function LoadXChartScript(callback){
	function LoadXChart(){
		$.getScript('plugins/xcharts/xcharts.min.js', callback);
	}
	function LoadD3Script(){
		if (!$.fn.d3){
			$.getScript('plugins/d3/d3.v3.min.js', LoadXChart);
		}
		else {
			LoadXChart();
		}
	}
	if (!$.fn.xcharts){
		LoadD3Script();
	}
	else {
		if (callback && typeof(callback) === "function") {
			callback();
		}
	}
}