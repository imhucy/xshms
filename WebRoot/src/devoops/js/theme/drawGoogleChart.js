//
// Helper for draw Google Chart
//
function drawGoogleChart(chart_data, chart_options, element, chart_type) {
	// Function for visualize Google Chart
	var data = google.visualization.arrayToDataTable(chart_data);
	var chart = new chart_type(document.getElementById(element));
	chart.draw(data, chart_options);
}