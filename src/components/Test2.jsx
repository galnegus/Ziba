import React, { Component } from 'react';
import { select, scaleBand, map, json } from 'd3';
import './Test2.css';

// https://gist.github.com/tbadams45/ba2e202ce45f6ed7e60c1220d767a5d2

const width = 1000;
const height = 700;
const radius = 200;

const angle = scaleBand()
  .range([0, 360]);

function curve(link) {
  const a0 = (angle(link.source.name) / 180) * Math.PI;
  const a1 = (angle(link.target.name) / 180) * Math.PI;
  const x0 = Math.cos(a0) * radius;
  const y0 = Math.sin(a0) * radius;
  const x1 = Math.cos(a1) * radius;
  const y1 = Math.sin(a1) * radius;
  const dx = x0 - x1;
  const dy = y0 - y1;
  const l = Math.sqrt((dx * dx) + (dy * dy));
  return `M${x0},${y0}A${l * 2},${l * 2} 0 0 1 ${x1},${y1}`;
}

function sanitizeSelector(str) {
  return str.toLowerCase().trim().replace(/ +/g, '-');
}

export default class Test2 extends Component {
  componentDidMount() {
    this.svg = select(this.container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .classed('network', true)
      .attr('transform', `translate(${width / 2},${height / 2})`);

    json('network.json', (error, nodes) => {
      if (error) throw error;

      const nodeByName = map();
      const links = [];

      nodes.forEach((d) => { nodeByName.set(d.name, d); });

      nodes.forEach((source) => {
        source.connections.forEach((target) => {
          links.push({ source, target: nodeByName.get(target), color: source.color });
        });
      });

      angle.domain(nodes.map(d => d.name));

      const link = this.svg.append('g')
        .classed('links', true)
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('class', d => `link ${sanitizeSelector(d.source.name)}-source ${sanitizeSelector(d.target.name)}-target`)
        .attr('d', curve)
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', '1.5px');

      console.dir(links);

      const node = this.svg.append('g')
        .classed('nodes', true)
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .classed('node', true)
        .attr('id', d => `${sanitizeSelector(d.name)}-node`)
        .attr('transform', d => `rotate(${angle(d.name)})translate(${radius},0)`)
        .on('mouseover', this.handleMouseOver.bind(this))
        .on('mouseout', this.handleMouseOut.bind(this));

      node.append('circle')
        .attr('r', 5)
        .attr('fill', d => d.color);

      node.append('text')
        .attr('dy', '.35em')
        .attr('x', 10)
        .text(d => d.name)
        .style('fill', d => d.color)
        .filter(d => (angle(d.name) + 90) % 360 > 180) // flipped
        .attr('x', -10)
        .attr('transform', 'rotate(-180)')
        .style('text-anchor', 'end');
    });

    console.dir(this.svg);
  }



  handleMouseOver(d) {
    this.svg.classed('hover-network', true);

    this.svg.select(`#${sanitizeSelector(d.name)}-node`)
      .classed('hovered', true)
      .transition()
      .attr('transform', _ => `rotate(${(angle(d.name) + 90) % 360 <= 180 ? 180 : -180})translate(0,0)`);

    d.connections.forEach((c) => {
      this.svg.select(`#${sanitizeSelector(c)}-node`)
        .classed('hovered', true);
    });

    this.svg.selectAll(`.${sanitizeSelector(d.name)}-source`)
      .classed('hovered', true);
  }

  handleMouseOut(d) {
    this.svg.classed('hover-network', false);

    this.svg.select(`#${sanitizeSelector(d.name)}-node`)
      .classed('hovered', false)
      .transition()
      .attr('transform', d2 => `rotate(${angle(d2.name)})translate(${radius},0)`);

    d.connections.forEach((c) => {
      this.svg.select(`#${sanitizeSelector(c)}-node`)
        .classed('hovered', false);
    });

    this.svg.selectAll(`.${sanitizeSelector(d.name)}-source`)
      .classed('hovered', false);
  }

  render() {
    return (
      <div>
        <div className="container" ref={(container) => { this.container = container; }} />
      </div>
    );
  }
}
