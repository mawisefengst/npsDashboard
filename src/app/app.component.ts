import { Component,OnInit } from '@angular/core';
import { PhotositeServiceService } from "./service/photosite-service.service";
declare var d3: any;
declare var _:any;
declare var io:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string;
  npsData : any;
  constructor(private photoService: PhotositeServiceService) { }
  svg: any;
  socket: any;
  
  ngOnInit() {
  		this.photoService.getNpsScore().subscribe(data =>{
  			this.npsData = data;
  			this.title = 'test';
  			for (var i = 0; i < 11; i++) {
                this.npsData.scores_histogram[i] = {
                    score: i,
                    responses: this.npsData.scores_histogram[i]
                }
            }
			this.initChart();
  		});
  		this.socket = io.connect('http://localhost:3000');


  		this.socket.on('newData', (data => {
		    console.log(data);
		    //document.getElementById("npsAverage").innerHTML = data.data;
		    /*socket.emit('my other event', { 
		    	data : 'message from browser' 
		    });*/
			    this.npsData = data;
	  			for (var i = 0; i < 11; i++) {
	                this.npsData.scores_histogram[i] = {
	                    score: i,
	                    responses: this.npsData.scores_histogram[i]
	                }
	            }
				this.initChart();
				//setChart_revised();
		  }));

  }

  updateMessage(){
  	this.socket.emit('update', { 
    	data: '' 
    });
  }



  initChart(){
	  		var margin = {
			            top: 20,
			            bottom: 40,
			            left: 50,
			            right: 30
			        },
			        chartWidth = 450, 
	        		chartHeight = 190,
	        		height,
	        		barWidth = 37,
	        		transitionDuration = 500;
            //console.log(scoresHistogram);

            function formatBigNumbers(number:any, symbol:any) {
		        var symbolsForValues = {
		            K: 1e3,
		            M: 1e6
		        };
		        var value = parseFloat(number / symbolsForValues[symbol]).toFixed(1);
		        return value.replace(".0", "") + symbol
		    };

           var formatYAxis = function(number) {
		        if (number < 1e3) {
		            return number
		        } else if (number < 1e6) {
		            return formatBigNumbers(number, "K")
		        } else {
		            return formatBigNumbers(number, "M")
		        }
		    };
				      


	  		//set chart
	  		if (!this.svg) {
		  		this.svg = d3.select("#svgWrapper_revised").append("svg").attr("class","svgWrapper_revised_class").style("height", "202px").style("width", "100%");
		  	}
		  	this.svg.selectAll("*").remove();

				height = chartHeight - margin.top - margin.bottom;
	        var attrs = {
	            transform: "translate(" + margin.left + "," + margin.top + ")"
	        };

				//var bars = svg.append("g").classed("chart-group",true).attr(attrs);

			var container = this.svg.append("g").classed("container-group", true).attr(attrs);
	        container.append("g").classed("chart-group", true);
	        container.append("g").classed("x axis", true);
	        container.append("g").classed("y axis", true);
	        this.svg.append("line").classed("mean", true).attr(attrs);


				var chart = d3.selectAll(".chart-group");
				var responseType = chart.selectAll(".response-layer").data([this.npsData.scores_histogram]);
				responseType.enter().append("g").attr("class","response-layer");


				//set scale
	  		var xScale = d3.scale.linear().range([0,chartWidth]);
			var yScale = d3.scale.linear().range([0,height]);
			xScale.domain([0,11.4]);
			var yMax = d3.max(this.npsData.scores_histogram,function(d){
				return d.responses;
			});
			yScale.domain([1.1* yMax,0]).nice();


			//buildAxis
			var xAxisFormat = d3.format(".0f");
	        var range = [0,11][1];
	        var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(xAxisFormat).tickValues(_.range(range));
	        this.svg.select("path.domain").remove();
	        var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickFormat(formatYAxis);
	        this.svg.append("text").attr("x", 26).attr("y", height + 66).attr("text-anchor", "start").style("font-size", "18px").style("font-weight", "500").style("fill", "#605a5c").text("Responses by Score")


			//draw bars
				var bars = responseType.selectAll("rect").data(function(d) {
					return d
				});
				bars.exit().transition().duration(transitionDuration).remove();
				bars.enter().append("rect").attr("height",0);

				bars.transition().duration(transitionDuration).attr("x",function(d){
					return xScale(d.score);
				}).attr("y",function(d){
					return yScale(d.responses);
				}).attr("height",function(d){
					return height - yScale(d.responses);
				}).attr("width",barWidth)
				.attr("class", function(d) {
	            //var type = $filter("scoreType")(d.score, accountMode);
	            var filter = "";
	            if(d.score < 4) filter = "detractors";
	            else if(d.score < 8) filter = "passives";
	            else filter = "promoters";
	            return "chart-bar "+ filter +" score-" + d.score
	        });

	        setTimeout(function(){
        	    d3.selectAll(".chart-bar").on("mouseover", function(d) {
	                console.log(d.responses);
	            })
	        },transitionDuration)

				//drawAxis
	        var xAxisLine = this.svg.select(".x.axis").attr("transform", function() {
	            return "translate(" + barWidth / 2 + "," + height + ")"
	        }).transition().duration(transitionDuration).call(xAxis);
	        xAxisLine.selectAll("text").style("text-anchor", "middle").attr("dx", "0em").attr("dy", "1em").style("font-size", "16px").style("fill", "#7f7c7d");
	        this.svg.select(".y.axis").transition().duration(transitionDuration).call(yAxis);
	        this.svg.select(".y.axis").selectAll("text").style("font-size", "12px").style("fill", "#7f7c7d");
		   


		  /*var socket = io.connect('http://localhost:3000');
		   socket.on('news', function (data) {
		    socket.emit('update', { 
		    	data: 'data' 
		    });
		  });
		  socket.on('newData', function (data) {
		    	console.log(data);
		    //document.getElementById("npsAverage").innerHTML = data.data;
		    socket.emit('my other event', { 
		    	data : 'message from browser' 
		    });
			    window.scoresHistogram = data.scores_histogram;
	  			for (var i = 0; i < 11; i++) {
	                scoresHistogram[i] = {
	                    score: i,
	                    responses: data.scores_histogram[i]
	                }
	            }
				setChart_revised();
		  });


		  */

  }
}
