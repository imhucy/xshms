/*-------------------------------------------
	Demo graphs for Morris Chart page (charts_morris.html)
---------------------------------------------*/
//
// Graph1 created in element with id = morris-chart-1
//
function MorrisChart1(){
	var day_data = [
		{"period": "2013-10-01", "licensed": 3407, "sorned": 660},
		{"period": "2013-09-30", "licensed": 3351, "sorned": 629},
		{"period": "2013-09-29", "licensed": 3269, "sorned": 618},
		{"period": "2013-09-20", "licensed": 3246, "sorned": 661},
		{"period": "2013-09-19", "licensed": 3257, "sorned": 667},
		{"period": "2013-09-18", "licensed": 3248, "sorned": 627},
		{"period": "2013-09-17", "licensed": 3171, "sorned": 660},
		{"period": "2013-09-16", "licensed": 3171, "sorned": 676},
		{"period": "2013-09-15", "licensed": 3201, "sorned": 656},
		{"period": "2013-09-10", "licensed": 3215, "sorned": 622}
	];
	Morris.Bar({
		element: 'morris-chart-1',
		data: day_data,
		xkey: 'period',
		ykeys: ['licensed', 'sorned'],
		labels: ['Licensed', 'SORN'],
		xLabelAngle: 60
	});
}
//
// Graph2 created in element with id = morris-chart-2
//
function MorrisChart2(){
	// Use Morris.Area instead of Morris.Line
	Morris.Area({
		element: 'morris-chart-2',
		data: [
			{x: '2011 Q1', y: 3, z: 3, m: 1},
			{x: '2011 Q2', y: 2, z: 0, m: 7},
			{x: '2011 Q3', y: 2, z: 5, m: 2},
			{x: '2011 Q4', y: 4, z: 4, m: 5},
			{x: '2012 Q1', y: 6, z: 1, m: 11},
			{x: '2012 Q2', y: 4, z: 4, m: 3},
			{x: '2012 Q3', y: 4, z: 4, m: 7},
			{x: '2012 Q4', y: 4, z: 4, m: 9}
		],
		xkey: 'x',
		ykeys: ['y', 'z', 'm'],
		labels: ['Y', 'Z', 'M']
		})
		.on('click', function(i, row){
			console.log(i, row);
		});
}
//
// Graph3 created in element with id = morris-chart-3
//
function MorrisChart3(){
	var decimal_data = [];
	for (var x = 0; x <= 360; x += 10) {
		decimal_data.push({ x: x, y: Math.sin(Math.PI * x / 180).toFixed(4), z: Math.cos(Math.PI * x / 180).toFixed(4) });
	}
	Morris.Line({
		element: 'morris-chart-3',
		data: decimal_data,
		xkey: 'x',
		ykeys: ['y', 'z'],
		labels: ['sin(x)', 'cos(x)'],
		parseTime: false,
		goals: [-1, 0, 1]
	});
}
//
// Graph4 created in element with id = morris-chart-4
//
function MorrisChart4(){
	// Use Morris.Bar
	Morris.Bar({
		element: 'morris-chart-4',
		data: [
			{x: '2011 Q1', y: 0},
			{x: '2011 Q2', y: 1},
			{x: '2011 Q3', y: 2},
			{x: '2011 Q4', y: 3},
			{x: '2012 Q1', y: 4},
			{x: '2012 Q2', y: 5},
			{x: '2012 Q3', y: 6},
			{x: '2012 Q4', y: 7},
			{x: '2013 Q1', y: 8},
			{x: '2013 Q2', y: 7},
			{x: '2013 Q3', y: 6},
			{x: '2013 Q4', y: 5},
			{x: '2014 Q1', y: 9}
		],
		xkey: 'x',
		ykeys: ['y'],
		labels: ['Y'],
		barColors: function (row, series, type) {
			if (type === 'bar') {
				var red = Math.ceil(255 * row.y / this.ymax);
				return 'rgb(' + red + ',0,0)';
			}
			else {
				return '#000';
			}
		}
	});
}
//
// Graph5 created in element with id = morris-chart-5
//
function MorrisChart5(){
	Morris.Area({
		element: 'morris-chart-5',
		data: [
			{period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
			{period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
			{period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
			{period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
			{period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
			{period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
			{period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
			{period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
			{period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
			{period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
		],
		xkey: 'period',
		ykeys: ['iphone', 'ipad', 'itouch'],
		labels: ['iPhone', 'iPad', 'iPod Touch'],
		pointSize: 2,
		hideHover: 'auto'
	});
}