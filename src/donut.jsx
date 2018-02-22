import * as d3 from "d3";
var React = require('react');
var createReactClass = require('create-react-class');

export const Donut = createReactClass({
    getInitialState() {
        return {
            data: null,
            labels: null,
        }
    },

    componentWillMount(){
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps(nextProps){
        this.setState({data: nextProps.data, labels:nextProps.labels});
    },

	componentDidMount(){
		this.drawDonut();
	},

	drawDonut(){
		console.log("drawDonut");

		var width = 960,
		    height = 500,
		    radius = Math.min(width, height) / 2;

		var color = d3.scaleOrdinal()
		    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

		var arc = d3.arc()
		    .outerRadius(radius - 10)
		    .innerRadius(radius - 70);

		var pie = d3.pie()
		    .sort(null)
		    .value(function(d) { return d.population; });

		var svg = d3.select("body").append("svg")
					.attr("width", width)
					.attr("height", height)
				  .append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		// d3.csv("data.csv", type, function(error, data) {
		//   if (error) throw error;

		// console.log("keys = ", d3.keys(this.state.labels))
		// console.log("values ", d3.values(this.state.labels))
		// console.log("nest  ", d3.nest()
		// 					  .key(function(d) { 
		// 					  		// console.log("inside nest > ", d.label)
		// 					  		return d.label; 
		// 					  	})
		// 					  .entries(this.state.labels))

		  var g = svg.selectAll(".arc")
		      .data(pie( d3.nest()
							  .key(function(d) { 
							  		// console.log("inside nest > ", d.label)
							  		return d.label; 
							  	})
							  .entries(this.state.labels)))
		    .enter().append("g")
		      .attr("class", "arc");

		  g.append("path")
		      .attr("d", arc)
		      .style("fill", function(d,i) {
		      					// console.log("d = ", d)
		      					// console.log("i = ", i)
		      					// console.log("color = ", color(i))
		      					return color(i); 
		      					});

		  g.append("text")
		      .attr("transform", d3.nest()
							  .key(function(d) { 
							  		console.log(" > ", d.label)
							  		// return "translate(" + arc.centroid(d.label) + ")"; 
							  	}))
		      .attr("dy", ".35em")
		      .text(function(d) { 
		      			return d.label; 
		      		});
		// });

		// function type(d) {
		//   d.population = +d.population;
		//   return d;
		// }

	},

	render() {
		// console.log("[13.1][9.4]= ", this.state.data[this.state.labels["13.1"]][this.state.labels["9.4"]])
		return (
			<div className="Donut">
				Donut
			</div>
		);
	}
});