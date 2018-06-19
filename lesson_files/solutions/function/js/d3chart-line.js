
function d3LineChart(svgWidth,svgHeight,margin,spacing,chartId,myData) {

var svgWidth = d3.select(chartId)[0][0].clientWidth - margin.right - margin.left;

var canvasWidth = svgWidth + margin.right + margin.left;
var canvasHeight = svgHeight + margin.top + margin.bottom;
var widthScale = d3.scale.linear()
                    .domain([0,d3.max(myData, function(d) {return d.score})])
                    .range([svgWidth,0]);
					
var xAxisScale = d3.scale.linear()
  .domain([0, d3.max(myData, function(d) {return d.score})])
  .range([0 , svgWidth]);
  
var yAxisScale = d3.scale.ordinal()
    .domain(myData.map(function(d) { return d.username; }))
    .rangeBands([0, svgHeight]);
  
var colorScale = d3.scale.linear()
                   .domain([0,d3.max(myData, function(d) {return d.score})])
                   .range(["blue","red"]);
				   
var tooltipId = (chartId + "tooltip").slice(1);

var tooltip = d3.select('body')
                 .append("div")
                 .attr("class","tooltip hidden")
				 .attr("id",tooltipId);
				 
var yAxis = d3.svg.axis()
              .scale(yAxisScale)
              .orient("left")
              .ticks(myData.length);
			  
var xAxis = d3.svg.axis()
    .scale(xAxisScale)
    .orient("bottom")
	.ticks(myData.length + 1);
	
var lineGen = d3.svg.line()
  .x(function(d) {
    return xAxisScale(d.score);
  })
  .y(function(d) {
    return yAxisScale(d.username);
  });	 
  
var canvas = d3.select(chartId)
            .append("svg")
            .attr("width",canvasWidth)
            .attr("height",canvasHeight)
            .attr("style","background-color:#ddd"); /* added some style*/

canvas.append("g")
  .append("text")
  .text("Line Chart")
  .attr("x", canvasWidth / 2)
  .attr("y", 30)
  .attr("class","title");
  
canvas.append("g")
  .attr("class", "axis")  // style axis via CSS
  .attr("transform","translate("+ (margin.left - 2) +"," + margin.bottom + ")")
  .call(yAxis);
  
canvas.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+ margin.left +","+ (canvasHeight - (margin.bottom - 2)) + ")")
    .call(xAxis);
	  		
var svg = canvas.append("g")
            .attr("width",svgWidth)
            .attr("height",svgHeight)
            .attr("style","background-color:#ddd")
			.attr("transform","translate("+ margin.left +"," + margin.bottom + ")");
	
	svg.append("path")
		   .attr('d', lineGen(myData))
		   .attr('stroke', 'green')
			.attr('stroke-width', 2)
			.attr('fill', 'none');
}	 