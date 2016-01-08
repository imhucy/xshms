var Excute = require('./routes/libs/excute');
var excute = new Excute(__dirname);
console.log(excute)

setTimeout(function () {
	excute.query('update student set student_mobile = ? where student_id = ?;select * from useres ;select * from task;',
		[ '13973129851','201286250124' ],
		function (results) {
			
			console.log('================>\n' + JSON.stringify( results ) );

			excute.close();
		}
		
	);
},3000);