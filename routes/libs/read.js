var xlsx = require('./xlsx');
var util = require('util');

function readXlsx(filename,callback){
	var xls = new xlsx();

	xls.loadFile(filename);

	var sheetNum = xls.sheetsCount();
	// console.log( '============================================================================='  );
	// console.log( 'sheetNum : ' + sheetNum );
	// console.log( '============================================================================='  );
	for(k = 0; k < sheetNum ; k++)
	{
		var sheet = xls.getSheet(k);
		// console.log( '============================================================================='  );
		// console.log( 'sheet['+k+'] : ' + k );
		// console.log( '============================================================================='  );
		readSheet( sheet ,callback);
	}
}

function readSheet (sheet,callback) {
	var all_cell = sheet.dimension();
	var all_data = sheet.read(all_cell);

	var row = all_data.length;
	var col = 10;

	
	callback( all_data ,row , col );
	
}

module.exports = {
	readXlsx : readXlsx,
	readSheet: readSheet
}