import React, { Component } from 'react';
import { select, scaleBand, map, json } from 'd3';
import './Test2.css';

// https://gist.github.com/tbadams45/ba2e202ce45f6ed7e60c1220d767a5d2

const width = 1400;
const height = 1000;
const radius = 300;

const angle = scaleBand()
  .range([0, 360]);

function curve({ center = false, origin = 'source' } = {}) {
  let sourceRadius = radius;
  let targetRadius = radius;
  if (center) {
    if (origin === 'source') sourceRadius = 1;
    else if (origin === 'target') targetRadius = 1;
  }

  return function innerCurve(link) {
    const a0 = (angle(link.source.name) / 180) * Math.PI;
    const a1 = (angle(link.target.name) / 180) * Math.PI;
    const x0 = Math.cos(a0) * sourceRadius;
    const y0 = Math.sin(a0) * sourceRadius;
    const x1 = Math.cos(a1) * targetRadius;
    const y1 = Math.sin(a1) * targetRadius;
    const dx = x0 - x1;
    const dy = y0 - y1;
    const l = Math.sqrt((dx * dx) + (dy * dy));
    return `M${x0},${y0}A${l * 2},${l * 2} 0 0 1 ${x1},${y1}`;
  };
}

function sanitizeSelector(str) {
  return str.toLowerCase().trim().replace(/ +/g, '-').replace(/\./g, '_');
}

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

export default class Test2 extends Component {
  componentDidMount() {
    document.addEventListener('click', this.clickOutside.bind(this));

    this.svg = select(this.container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .classed('network', true)
      .attr('transform', `translate(${width / 2},${height / 2})`);

    json('data.json', (error, nodes) => {
      if (error) throw error;

      const nodeByName = map();
      const links = [];

      nodes.forEach((d) => { nodeByName.set(d.name, d); });

      const impact = {};
      nodes.forEach((source) => {
        source.connections.forEach((target) => {
          if (impact[target.name] === undefined) impact[target.name] = 0;
          impact[source.name] += Math.abs(target.weight);
          links.push({
            source,
            target: nodeByName.get(target.name),
            color: name2color(source.name),
            weight: target.weight,
          });
        });
      });

      angle.domain(nodes.map(d => d.name));


      const link = this.svg.append('g')
        .classed('links', true)
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .attr('class', d => `link weight_${d.weight} source-${sanitizeSelector(d.source.name)} target-${sanitizeSelector(d.target.name)}`)
        .attr('d', curve())
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', '1px');

      const node = this.svg.append('g')
        .classed('nodes', true)
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .classed('node', true)
        .attr('id', d => `node-${sanitizeSelector(d.name)}`)
        .attr('transform', d => `rotate(${angle(d.name)})translate(${radius},0)`)
        .on('mouseover', this.handleMouseOver.bind(this))
        .on('mouseout', this.handleMouseOut.bind(this))
        .on('click', this.handleClick.bind(this));

      node.append('circle')
        .attr('r', d => impact[d.name] / 2)
        .attr('fill', d => name2color(d.name));

      node.append('text')
        .attr('dy', '.35em')
        .attr('x', 30)
        .text(d => d.name)
        .style('font-weight', 'bold')
        .style('fill', d => name2color(d.name))
        .filter(d => (angle(d.name) + 90) % 360 > 180) // flipped
        .attr('x', -30)
        .attr('transform', 'rotate(-180)')
        .style('text-anchor', 'end');

      node.append('text')
        .attr('dy', '.35em')
        .attr('x', 75)
        .text(d => d['Short Description'])
        .style('fill', d => name2color(d.name))
        .style('font-size', '0.8em')
        .filter(d => (angle(d.name) + 90) % 360 > 180) // flipped
        .attr('x', -75)
        .attr('transform', 'rotate(-180)')
        .style('text-anchor', 'end');
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside.bind(this));
  }

  handleMouseOver(d) {
    this.svg.classed('hover-network', true);

    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('hovered', true);

    d.connections.forEach((c) => {
      this.svg.select(`#node-${sanitizeSelector(c.name)}`)
        .classed('hovered', true);
    });

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .classed('hovered', true);
  }

  handleMouseOut(d) {
    this.svg.classed('hover-network', false);

    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('hovered', false);

    d.connections.forEach((c) => {
      this.svg.select(`#node-${sanitizeSelector(c.name)}`)
        .classed('hovered', false);
    });

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .classed('hovered', false);
  }

  handleClick(d) {
    if (this.clicked === d) return;
    else if (this.clicked !== undefined) this.unclick();
    this.clicked = d;

    this.svg.classed('click-network', true);

    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('clicked', true)
      .transition()
      .attr('transform', `${(angle(d.name) + 90) % 360 > 180 ? `rotate(${180})` : ''}translate(0,0)`);

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .each((link) => {
        // const nodeName = link.source.name === d.name ? link.target.name : link.source.name;
        this.svg.select(`#node-${sanitizeSelector(link.target.name)}`)
          .classed('clicked', true);
      })
      .classed('clicked', true)
      .transition()
      .attr('d', link => curve({
        center: true,
        origin: (link.source.name === d.name ? 'source' : 'target'),
      })(link));
  }

  unclick() {
    const d = this.clicked;

    this.svg.classed('click-network', false);

    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('clicked', false)
      .transition()
      .attr('transform', `rotate(${angle(d.name)})translate(${radius},0)`);

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .each((link) => {
        // const nodeName = link.source.name === d.name ? link.target.name : link.source.name;
        this.svg.select(`#node-${sanitizeSelector(link.target.name)}`)
          .classed('clicked', false);
      })
      .classed('clicked', false)
      .transition()
      .attr('d', link => curve()(link));

    this.clicked = undefined;
  }

  clickOutside(e) {
    if (this.clicked !== undefined && !e.target.parentNode.classList.contains('node')) {
      this.unclick();
    }
  }

  render() {
    return (
      <div>
        <div className="container" ref={(container) => { this.container = container; }} />
      </div>
    );
  }
}
