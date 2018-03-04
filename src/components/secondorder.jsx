import React, { Component } from 'react';
import { select, scaleBand, map, arc, pie, scaleOrdinal, json } from 'd3';
import { schemeCategory10 } from 'd3';

export default class SecondOrder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nodes: [],
			selectedNode: null,
			colorMap: null,
		};
	}

	componentWillReceiveProps(newProps){
		if (newProps.selectedNode !== this.props.selectedNode){
			this.setState({selectedNode:newProps.selectedNode})
		}

		if (newProps.nodes.length !== this.props.nodes.length){
			this.setState({nodes:newProps.nodes})
		}

		if (newProps.colorMap !== this.props.colorMap){
			this.setState({colorMap:newProps.colorMap})
		}
	}

    componentDidUpdate(){
        var width = 1000;
        var height = 500;
        var fullAngle = 2 * Math.PI;
        var radius = Math.min(width, height) / 2 - 10;

        var svgContainer = select(".container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid");

        var color = scaleOrdinal(schemeCategory10);

        //////////////////////////

        var secondOrderList = [];
        if(this.state.selectedNode){
        	const nodeByName = map();
        	this.state.nodes.forEach((d) => { nodeByName.set(d.name, d); });

        	this.state.selectedNode.connections.forEach(target => {
     //    		console.log("target", target)
     //    		console.log("name", nodeByName.get(target.name))
        		
     //    		nodeByName.get(target.name).connections.forEach(connection => {
     //    			console.log("connection", connection)
					// // if (secondOrderList.some(e => e.name === connection.name) > 0){
					// // 	console.log(secondOrderList)
					// // }

     //    		});

     			var sum = nodeByName.get(target.name).connections.map((c) => {return c.weight;})
																   .reduce(function(a,b) {return a + b;});
	        	var sign = target.weight > 0 ? 1 : -1;

        		secondOrderList.push({
        			name: target.name,
        			firstOrderWeight: target.weight,
		            secondOrderWeight: sum,
		            secondOrderTargets: nodeByName.get(target.name).connections,
		            secondOrderImpact: target.weight + sign * (1/2) * sum,
		        });
        	});
        	console.log("secondOrderList", secondOrderList)
        	var s = 0;
        	secondOrderList.forEach( x => {
        		s += x.secondOrderImpact;
        	})
        	console.log("sum of secondOrderImpacts", s)

	        var one_arc = arc()
	            .outerRadius(100)
	            .innerRadius(50);

	        var group = svgContainer.append("g")
	            .attr("transform", "translate(" + 200 + "," + 250 + ")")

	        var data = secondOrderList.map( d => d.secondOrderImpact )
	        var arcs = pie()(data);

	        arcs.forEach((d, i) => {
	            group.append("path")
	                .attr("d", one_arc(d))
	                .attr("fill", this.props.colorMap[i]);
	                // .attr('fill', this.name2color(secondOrderList[i].name));
	        });
        }

    	



    }

    name2color(name) {
    	console.log("name2color > name", name)
        return this.state.colorMap[name.match(/[0-9]+(?=\.)/)[0]];
    }

    render() {
        // console.log("this.state.selectedNode: ", this.state.selectedNode)
        // console.log("this.state.nodes: ", this.state.nodes)
        // console.log("this.props.colorMap", this.props.colorMap)
        // console.log("this.props.links", this.props.links)
        return (
            <div>
                <div className="donut" ref={(donut) => { this.donut = donut; }} />
            </div>
            );
        }
    }