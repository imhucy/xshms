//
// Helper for draw Sparkline plots on Dashboard page
//
function SparkLineDrawBarGraph(elem, arr, color){
	var stacked_color;
	if (color) {
		stacked_color = color;
	}
	else {
		stacked_color = '#6AA6D6';
	}
	elem.sparkline(arr, { type: 'bar', barWidth: 7, highlightColor: '#000', barSpacing: 2, height: 40, stackedBarColor: stacked_color});
}