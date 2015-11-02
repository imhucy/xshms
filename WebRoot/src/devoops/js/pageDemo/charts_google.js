/*-------------------------------------------
	Demo graphs for Google Chart page (charts_google.html)
---------------------------------------------*/
//
// One function for create all graphs on Google Chart page
//
function DrawAllCharts(){
	//  Chart 1
	var chart1_data = [
		['Smartphones', 'PC', 'Notebooks', 'Monitors','Routers', 'Switches' ],
		['01.01.2014',  1234, 2342, 344, 232,131],
		['02.01.2014',  1254, 232, 314, 232, 331],
		['03.01.2014',  2234, 342, 298, 232, 665],
		['04.01.2014',  2234, 42, 559, 232, 321],
		['05.01.2014',  1999, 82, 116, 232, 334],
		['06.01.2014',  1634, 834, 884, 232, 191],
		['07.01.2014',  321, 342, 383, 232, 556],
		['08.01.2014',  845, 112, 499, 232, 731]
	];
	var chart1_options = {
		title: 'Sales of company',
		hAxis: {title: 'Date', titleTextStyle: {color: 'red'}},
		backgroundColor: '#fcfcfc',
		vAxis: {title: 'Quantity', titleTextStyle: {color: 'blue'}}
	};
	var chart1_element = 'google-chart-1';
	var chart1_type = google.visualization.ColumnChart;
	drawGoogleChart(chart1_data, chart1_options, chart1_element, chart1_type);
	//  Chart 2
	var chart2_data = [
		['Height', 'Width'],
		['Samsung',  74.5],
		['Apple',  31.24],
		['LG',  12.10],
		['Huawei',  11.14],
		['Sony',  8.3],
		['Nokia',  7.4],
		['Blackberry',  6.8],
		['HTC',  6.63],
		['Motorola',  3.5],
		['Other',  43.15]
	];
	var chart2_options = {
		title: 'Smartphone marketshare 2Q 2013',
		backgroundColor: '#fcfcfc'
	};
	var chart2_element = 'google-chart-2';
	var chart2_type = google.visualization.PieChart;
	drawGoogleChart(chart2_data, chart2_options, chart2_element, chart2_type);
	//  Chart 3
	var chart3_data = [
		['Age', 'Weight'],
		[ 8, 12],
		[ 4, 5.5],
		[ 11, 14],
		[ 4, 5],
		[ 3, 3.5],
		[ 6.5, 7]
	];
	var chart3_options = {
		title: 'Age vs. Weight comparison',
		hAxis: {title: 'Age', minValue: 0, maxValue: 15},
		vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
		legend: 'none',
		backgroundColor: '#fcfcfc'
	};
	var chart3_element = 'google-chart-3';
	var chart3_type = google.visualization.ScatterChart;
	drawGoogleChart(chart3_data, chart3_options, chart3_element, chart3_type);
	//  Chart 4
	var chart4_data = [
		['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
		['CAN',    80.66,              1.67,      'North America',  33739900],
		['DEU',    79.84,              1.36,      'Europe',         81902307],
		['DNK',    78.6,               1.84,      'Europe',         5523095],
		['EGY',    72.73,              2.78,      'Middle East',    79716203],
		['GBR',    80.05,              2,         'Europe',         61801570],
		['IRN',    72.49,              1.7,       'Middle East',    73137148],
		['IRQ',    68.09,              4.77,      'Middle East',    31090763],
		['ISR',    81.55,              2.96,      'Middle East',    7485600],
		['RUS',    68.6,               1.54,      'Europe',         141850000],
		['USA',    78.09,              2.05,      'North America',  307007000]
	];
	var chart4_options = {
		title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
		hAxis: {title: 'Life Expectancy'},
		vAxis: {title: 'Fertility Rate'},
		backgroundColor: '#fcfcfc',
		bubble: {textStyle: {fontSize: 11}}
	};
	var chart4_element = 'google-chart-4';
	var chart4_type = google.visualization.BubbleChart;
	drawGoogleChart(chart4_data, chart4_options, chart4_element, chart4_type);
	//  Chart 5
	var chart5_data = [
		['Country', 'Popularity'],
		['Germany', 200],
		['United States', 300],
		['Brazil', 400],
		['Canada', 500],
		['France', 600],
		['RU', 700]
	];
	var chart5_options = {
		backgroundColor: '#fcfcfc',
		enableRegionInteractivity: true
	};
	var chart5_element = 'google-chart-5';
	var chart5_type = google.visualization.GeoChart;
	drawGoogleChart(chart5_data, chart5_options, chart5_element, chart5_type);
	//  Chart 6
	var chart6_data = [
	['Year', 'Sales', 'Expenses'],
		['2004',  1000,      400],
		['2005',  1170,      460],
		['2006',  660,       1120],
		['2007',  1030,      540],
		['2008',  2080,      740],
		['2009',  1949,      690],
		['2010',  2334,      820]
	];
	var chart6_options = {
		backgroundColor: '#fcfcfc',
		title: 'Company Performance'
	};
	var chart6_element = 'google-chart-6';
	var chart6_type = google.visualization.LineChart;
	drawGoogleChart(chart6_data, chart6_options, chart6_element, chart6_type);
	//  Chart 7
	var chart7_data = [
	['Task', 'Hours per Day'],
		['Work',     11],
		['Eat',      2],
		['Commute',  2],
		['Watch TV', 2],
		['Sleep',    7]
	];
	var chart7_options = {
		backgroundColor: '#fcfcfc',
		title: 'My Daily Activities',
		pieHole: 0.4
	};
	var chart7_element = 'google-chart-7';
	var chart7_type = google.visualization.PieChart;
	drawGoogleChart(chart7_data, chart7_options, chart7_element, chart7_type);
	//  Chart 8
	var chart8_data = [
		['Generation', 'Descendants'],
		[0, 1], [1, 33], [2, 269], [3, 2013]
	];
	var chart8_options = {
		backgroundColor: '#fcfcfc',
		title: 'Descendants by Generation',
		hAxis: {title: 'Generation', minValue: 0, maxValue: 3},
		vAxis: {title: 'Descendants', minValue: 0, maxValue: 2100},
		trendlines: {
			0: {
				type: 'exponential',
				visibleInLegend: true
			}
		}
	};
	var chart8_element = 'google-chart-8';
	var chart8_type = google.visualization.ScatterChart;
	drawGoogleChart(chart8_data, chart8_options, chart8_element, chart8_type);
}