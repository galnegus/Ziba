import React, { Component } from 'react';
import { select, json, pie, arc, scaleQuantize } from 'd3';
import './Test2.css';

const width = 1400;
const height = 1000;
const radius = 300;
const thickness = 50;

// https://prismic-io.s3.amazonaws.com/globalgoals%2Fd0d19c85-8b76-4549-a24c-59d40eb9985f_the-global-goals-style-guide-20180214.pdf
const colorMap = {
  1: '#E5243B',
  2: '#DDA63A',
  3: '#4C9F38',
  4: '#C5192D',
  5: '#FF3A21',
  6: '#26BDE2',
  7: '#FCC30B',
  8: '#A21942',
  9: '#FD6925',
  10: '#DD1367',
  11: '#FD9D24',
  12: '#BF8B2E',
  13: '#3F7E44',
  14: '#0A97D9',
  15: '#56C02B',
  16: '#00689D',
  17: '#19486A',
};

function name2color(name) {
  return colorMap[name.match(/[0-9]+(?=\.)/)[0]];
}


const colors = scaleQuantize()
  .domain([-3, 3])
  .range(['#A64A44', '#EC6769', '#F3AA75', '#FCE789', '#CCDF80', '#97CE7D', '#62BF79']);

export default class Donut extends Component {
  componentDidMount() {
    this.svg = select(this.container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .classed('network', true)
        .attr('transform', `translate(${width / 2},${height / 2})`);

    json('data.json', (error, nodes) => {
      if (error) throw error;

      const nodeByName = new Map();

      nodes.forEach((d) => { nodeByName.set(d.name, d); });

      const coolPie = pie()
        .value(d => Math.abs(d.weight))
        .sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))); // not correct, just testing

      const coolArc = arc()
        .outerRadius(radius)
        .innerRadius(radius - thickness)
        .padAngle(0.01);

      const svgArc = this.svg.selectAll('.arc')
        .data(coolPie(nodeByName.get('1.3').connections))
        .enter()
        .append('g')
          .classed('arc', true);

      svgArc.append('path')
        .attr('d', coolArc)
        .style('fill', d => colors(d.data.weight));

      svgArc.append('text')
        .attr('transform', (d) => {
          const arcAngle = (180 / Math.PI) * ((d.startAngle + d.endAngle) / 2);
          const flip = arcAngle > 180 ? 90 : -90;
          return `
            translate(${coolArc.centroid(d)})
            rotate(${arcAngle + flip})
          `;
        })
        .attr('dy', '.35em')
        .attr('x', thickness / 2)
        .text(d => d.data.name)
        .filter(d => (d.startAngle + d.endAngle) / 2 > Math.PI)
        .attr('x', -thickness / 2)
        .style('text-anchor', 'end');
    });
  }

  render() {
    return (
      <div>
        <div className="container" ref={(container) => { this.container = container; }} />
      </div>
    );
  }
}
