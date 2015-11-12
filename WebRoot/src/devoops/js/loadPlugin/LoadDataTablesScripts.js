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