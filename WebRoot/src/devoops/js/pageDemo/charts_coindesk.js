/*-------------------------------------------
	Demo graphs for CoinDesk page (charts_coindesk.html)
---------------------------------------------*/
//
// Main function for CoinDesk API Page
// (we get JSON data and make 4 graph from this)
//
function CoinDeskGraph(){
	var dates = PrettyDates();
	var startdate = dates[0];
	var enddate = dates[1];
	// Load JSON data from CoinDesk API
	var jsonURL = 'http://api.coindesk.com/v1/bpi/historical/close.json?start='+startdate+'&end='+enddate;
	$.getJSON(jsonURL, function(result){
		// Create array of data for xChart
		$.each(result.bpi, function(key, val){
			xchart_data.push({'x': key,'y':val});
		});
		// Set handler for resize and create xChart plot
		var graphXChartResize;
		$('#coindesk-xchart').resize(function(){
			clearTimeout(graphXChartResize);
			graphXChartResize = setTimeout(DrawCoinDeskXCharts, 500);
		});
		DrawCoinDeskXCharts();
		// Create array of data for Google Chart
			$.each(result.bpi, function(key, val){
				google_data.push([key,val]);
			});
		// Set handler for resize and create Google Chart plot
		var graphGChartResize;
		$('#coindesk-google-chart').resize(function(){
			clearTimeout(graphGChartResize);
			graphGChartResize = setTimeout(DrawCoinDeskGoogleCharts, 500);
		});
		DrawCoinDeskGoogleCharts();
		// Create array of data for Flot and Sparkline
		$.each(result.bpi, function(key, val){
			var parseDate=key;
			parseDate=parseDate.split("-");
			var newDate=parseDate[1]+"/"+parseDate[2]+"/"+parseDate[0];
			var new_date = new Date(newDate).getTime();
			exchange_rate.push([new_date,val]);
		});
		// Create Flot plot (not need bind to resize, cause Flot use plugin 'resize')
		DrawCoinDeskFlot();
		// Set handler for resize and create Sparkline plot
		var graphSparklineResize;
		$('#coindesk-sparklines').resize(function(){
			clearTimeout(graphSparklineResize);
			graphSparklineResize = setTimeout(DrawCoinDeskSparkLine, 500);
		});
		DrawCoinDeskSparkLine();
	});
}
//
// Draw Sparkline Graph on Coindesk page
//
function DrawCoinDeskSparkLine(){
	$('#coindesk-sparklines').sparkline(exchange_rate, { height: '100%', width: '100%' });
}
//
// Draw xChart Graph on Coindesk page
//
function DrawCoinDeskXCharts(){
	var data = {
		"xScale": "ordinal",
		"yScale": "linear",
		"main": [
			{
			  "className": ".pizza",
			  "data": xchart_data
			}
		  ]
		};
	var myChart = new xChart('line-dotted', data, '#coindesk-xchart');
}
//
// Draw Flot Graph on Coindesk page
//
function DrawCoinDeskFlot(){
	var data1 = [
		{ data: exchange_rate, label: "Bitcoin exchange rate ($)" }
	];
	var options = {
		canvas: true,
		xaxes: [
			{ mode: "time" }
		],
		yaxes: [
			{ min: 0 },
			{
				position: "right",
				alignTicksWithAxis: 1,
				tickFormatter: function (value, axis) {
					return value.toFixed(axis.tickDecimals) + "€";
				}
			}
		],
		legend: { position: "sw" }
	};
	$.plot("#coindesk-flot", data1, options);
}
//
// Draw Google Chart Graph on Coindesk page
//
function DrawCoinDeskGoogleCharts(){
	var google_options = {
		backgroundColor: '#fcfcfc',
		title: 'Coindesk Exchange Rate'
	};
	var google_element = 'coindesk-google-chart';
	var google_type = google.visualization.LineChart;
	drawGoogleChart(google_data, google_options, google_element, google_type);
}