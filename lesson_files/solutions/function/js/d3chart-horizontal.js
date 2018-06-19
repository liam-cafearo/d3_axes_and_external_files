
function d3HorizontalBarChart(svgWidth,svgHeight,margin,spacing,chartId,myData) {

var svgWidth = d3.select(chartId)[0][0].clientWidth -margin.right - margin.left;

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
			  
var canvas = d3.select(chartId)
            .append("svg")
            .attr("width",canvasWidth)
            .attr("height",canvasHeight)
            .attr("style","background-color:#ddd"); /* added some style*/

canvas.append("g")
  .append("text")
  .text("Bar Chart")
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
	
	svg.selectAll("rect")
		   .data(myData)
		   .enter()
		   .append("rect")  
		   .on("mouseover", function(d){    
				d3.select('#'+tooltipId)
				  .style("left", d3.event.pageX + "px")
				  .style("top", d3.event.pageY - 50 + "px")
				  .attr("class", "tooltip showit");
				  tooltip.html(d.score);            
				})
			.on("mouseout", function(){    
					d3.select('#'+tooltipId)
						.attr("class", "tooltip hidden");            
			})
		   .attr("width",0)
		   .transition().duration(2000)
		   .attr("y", function(d, i) {return i * (svgHeight / myData.length);})  
		   .attr("x", function(d){return 0;}) 
		   .attr("height", (svgHeight / myData.length) - spacing)
		   .attr("width", function(d){return svgWidth - widthScale(d.score)})
		   .attr("fill", function(d){return(colorScale(d.score));});
}	 