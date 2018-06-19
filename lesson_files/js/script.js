var svgWidth = 700,
    svgHeight = 500;
 
var margin = {top: 50, right: 0, bottom: 50, left: 50},
    canvasWidth = svgWidth + margin.right + margin.left;
    canvasHeight = svgHeight + margin.top + margin.bottom;
 
var spacing= 2;

var myData = [ 10, 15, 20, 30, 45, 50, 40, 45 ,50 , 40 ];
myData.sort();

var colorScale = d3.scale.linear()
                   .domain([0,d3.max(myData)])
                   .range(["blue","red"]);
				   
var yAxisScale = d3.scale.linear()
  .domain([0, d3.max(myData)])
  .range([svgHeight , 0]);
  
var yAxis = d3.svg.axis()
              .scale(yAxisScale)
              .orient("left")
              .ticks(5);
			  
var heightScale = d3.scale.linear()
                    .domain([0,d3.max(myData)])
                    .range([0,svgHeight]);
					
var tooltip = d3.select("body")
                 .append("div")
				 .classed("hidden",true)
                 .attr("id","tooltip");
				 
var canvas = d3.select("body")
            .append("svg")
            .attr("width",canvasWidth)
            .attr("height",canvasHeight)
            .attr("style","background-color:#ddd"); /* added some style*/
			
canvas.append("g")
  .attr("class","verticalAxis")  // style axis via CSS
  .attr("transform","translate(48,50)")
  .call(yAxis);
			
var svg = canvas.append("g")
            .attr("width",svgWidth)
            .attr("height",svgHeight)
            .attr("style","background-color:#ddd"); /* added some style*/
  
var g = svg.append('g')
        .attr("transform","translate(50,50)");
		
g.selectAll("rect")
   .data(myData)
   .enter()
   .append("rect")  
   .attr("x", function(d, i) {return i * (svgWidth / myData.length);})  
   .attr("y", function(d){return svgHeight - heightScale(d);}) 
   .attr("width", (svgWidth / myData.length) - spacing)
   .attr("height", function(d){return heightScale(d)})
   .attr("fill", function(d){return colorScale(d)})
   .on("mouseout", function(){    
    d3.select("#tooltip")
      .classed("hidden", true);            
	})
   .on("mouseover", function(d){    
    d3.select("#tooltip")
	  .classed("hidden", false)
      .style("left", d3.event.pageX + "px")  // in this case we need        
      .style("top", d3.event.pageY - 50 + "px")   //to append px as units
      tooltip.html(d);            
});
