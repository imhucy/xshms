/*-------------------------------------------
	Demo graphs for xCharts page (charts_xcharts.html)
---------------------------------------------*/
//
// Graph1 created in element with id = xchart-1
//
function xGraph1(){
	var tt = document.createElement('div'),
	leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
	topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"main": [
			{
			"className": ".xchart-class-1",
			"data": [
				{
				  "x": "2012-11-05",
				  "y": 6
				},
				{
				  "x": "2012-11-06",
				  "y": 6
				},
				{
				  "x": "2012-11-07",
				  "y": 8
				},
				{
				  "x": "2012-11-08",
				  "y": 3
				},
				{
				  "x": "2012-11-09",
				  "y": 4
				},
				{
				  "x": "2012-11-10",
				  "y": 9
				},
				{
				  "x": "2012-11-11",
				  "y": 6
				},
				{
				  "x": "2012-11-12",
				  "y": 16
				},
				{
				  "x": "2012-11-13",
				  "y": 4
				},
				{
				  "x": "2012-11-14",
				  "y": 9
				},
				{
				  "x": "2012-11-15",
				  "y": 2
				}
			]
			}
		]
	};
	var opts = {
		"dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
		"tickFormatX": function (x) { return d3.time.format('%A')(x); },
		"mouseover": function (d, i) {
			var pos = $(this).offset();
			$(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
				.css({top: topOffset + pos.top, left: pos.left + leftOffset})
				.show();
		},
		"mouseout": function (x) {
			$(tt).hide();
		}
	};
	var myChart = new xChart('line-dotted', data, '#xchart-1', opts);
}
//
// Graph2 created in element with id = xchart-2
//
function xGraph2(){
	var data = {
	"xScale": "ordinal",
	"yScale": "linear",
	"main": [
		{
		"className": ".xchart-class-2",
		"data": [
			{
			  "x": "Apple",
			  "y": 575
			},
			{
			  "x": "Facebook",
			  "y": 163
			},
			{
			  "x": "Microsoft",
			  "y": 303
			},
			{
			  "x": "Cisco",
			  "y": 121
			},
			{
			  "x": "Google",
			  "y": 393
			}
		]
		}
		]
	};
	var myChart = new xChart('bar', data, '#xchart-2');
}
//
// Graph3 created in element with id = xchart-3
//
function xGraph3(){
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"type": "line",
		"main": [
		{
			"className": ".xchart-class-3",
			"data": [
				{
				  "x": "2012-11-05",
				  "y": 1
				},
				{
				  "x": "2012-11-06",
				  "y": 6
				},
				{
				  "x": "2012-11-07",
				  "y": 13
				},
				{
				  "x": "2012-11-08",
				  "y": -3
				},
				{
				  "x": "2012-11-09",
				  "y": -4
				},
				{
				  "x": "2012-11-10",
				  "y": 9
				},
				{
				  "x": "2012-11-11",
				  "y": 6
				},
				{
				  "x": "2012-11-12",
				  "y": 7
				},
				{
				  "x": "2012-11-13",
				  "y": -2
				},
				{
				  "x": "2012-11-14",
				  "y": -7
				}
			]
			}
		]
	};
	var opts = {
		"dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
		"tickFormatX": function (x) { return d3.time.format('%A')(x); }
	};
	var myChart = new xChart('line', data, '#xchart-3', opts);
}