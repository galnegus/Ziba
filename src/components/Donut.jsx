/* eslint indent: 0 */

import React, { Component } from 'react';
import { select, json, pie, arc, scaleQuantize, scaleBand, interpolate } from 'd3';
import Legend from './Legend';
import './Donut.css';

const width = 1400;
const height = 1000;
const firstRadius = 200;
const secondRadius = 300;

const angle = scaleBand()
  .range([0, 360]);

function curve({ center = false, origin = 'source' } = {}) {
  let sourceRadius = firstRadius;
  let targetRadius = firstRadius;
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

const coolPie = pie()
  .value(d => Math.abs(d.weight))
  .sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    return 0;
  });

function coolArc(radius, thickness) {
  return arc()
    .outerRadius(radius)
    .innerRadius(radius - thickness)
    .padAngle(0.01);
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

const weightScale = scaleQuantize()
  .domain([-3, 3])
  .range([-3, -2, -1, 0, 1, 2, 3]);

export default class Donut extends Component {
  constructor(props) {
    super(props);
    this.state = { colorblind: false };

    this.colorblindToggleHandler = this.colorblindToggleHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.clickOutside.bind(this));

    this.svg = select(this.svgRef)
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .classed('network', true)
        .attr('transform', `translate(${width / 2},${height / 2})`);

    this.overview = this.svg.append('g')
        .classed('overview', true);

    this.donuts = this.svg.append('g')
        .classed('donuts', true);

    json('data.json', (error, nodes) => {
      if (error) throw error;
      angle.domain(nodes.map(d => d.name));
      this.nodeByName = new Map();
      nodes.forEach((d) => { this.nodeByName.set(d.name, d); });
      this.nodes = nodes;
      this.links = [];
      this.impact = {};
      this.nodes.forEach((node) => { this.impact[node.name] = 0; });
      this.nodes.forEach((source) => {
        source.connections.forEach((target) => {
          this.impact[source.name] += Math.abs(target.weight);
          this.links.push({
            source,
            target: this.nodeByName.get(target.name),
            color: name2color(source.name),
            weight: target.weight,
          });
        });
      });

      this.createOverview();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside.bind(this));
  }

  colorblindToggleHandler(e) {
    this.setState({
      colorblind: e.target.checked,
    });
  }

  createOverview() {
    if (this.nodes === undefined || this.nodeByName === undefined) {
      console.error('this.nodes or this.nodeByName undefined.');
      return;
    }

    const link = this.overview.append('g')
        .classed('links', true)
      .selectAll('path')
      .data(this.links)
      .enter()
      .append('path')
        .attr('class', d => `link weight_${d.weight} stroke_${d.weight} source-${sanitizeSelector(d.source.name)} target-${sanitizeSelector(d.target.name)}`)
        .attr('d', curve())
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', '1px');

    const node = this.overview.append('g')
        .classed('nodes', true)
      .selectAll('g')
      .data(this.nodes)
      .enter()
      .append('g')
        .classed('node', true)
        .attr('id', d => `node-${sanitizeSelector(d.name)}`)
        .attr('transform', d => `rotate(${angle(d.name)})translate(${firstRadius},0)`)
        .on('mouseover', this.handleMouseOver.bind(this))
        .on('mouseout', this.handleMouseOut.bind(this))
        .on('click', this.handleClick.bind(this));

    node.append('circle')
        .attr('r', d => this.impact[d.name] / 2)
        .attr('fill', d => name2color(d.name));

    node.append('text')
        .attr('dy', '.35em')
        .attr('x', 30)
        .each((d) => { d.x = 30; })
        .text(d => d.name)
        .style('font-weight', 'bold')
        .style('fill', d => name2color(d.name))
      .filter(d => (angle(d.name) + 90) % 360 > 180) // flipped
        .attr('x', -30)
        .each((d) => { d.x = -30; })
        .attr('transform', 'rotate(-180)')
        .attr('text-anchor', 'end');

    node.append('text')
        .attr('dy', '.35em')
        .attr('x', 75)
        .text(d => d['Short Description'])
        .style('fill', d => name2color(d.name))
        .style('font-size', '0.7em')
      .filter(d => (angle(d.name) + 90) % 360 > 180) // flipped
        .attr('x', -75)
        .attr('transform', 'rotate(-180)')
        .style('text-anchor', 'end');
  }

  createDonut(nodeName) {
    if (this.nodes === undefined || this.nodeByName === undefined) {
      console.error('this.nodes or this.nodeByName undefined.');
      return;
    }

    // make sure it's removed first!
    this.donuts.selectAll('g.arc--first')
        .remove();

    this.donuts.selectAll('g.arc--second')
        .remove();

    const firstArc = this.donuts.selectAll('g.arc--first')
      .data(coolPie(this.nodeByName.get(nodeName).connections));

    const pizza = firstArc.enter()
      .append('g')
        .classed('arc arc--first', true);

    const thickness = this.impact[nodeName];

    pizza.append('path')
        .attr('d', coolArc(firstRadius, thickness))
        .attr('class', d => `fill_${weightScale(d.data.weight)}`);
        //.style('fill', d => weightColor(d.data.weight));

    pizza.append('text')
        .attr('transform', (d) => {
          const arcAngle = (180 / Math.PI) * ((d.startAngle + d.endAngle) / 2);
          const flip = arcAngle > 180 ? 90 : -90;
          return `
            translate(${coolArc(firstRadius, thickness).centroid(d)})
            rotate(${arcAngle + flip})
          `;
        })
        .attr('dy', '.35em')
        .attr('x', (thickness / 2) + 10)
        .text(d => d.data.name)
        .style('font-weight', 'bold')
        //.style('fill', d => name2color(d.data.name))
      .filter(d => (d.startAngle + d.endAngle) / 2 > Math.PI)
        .attr('x', -((thickness / 2) + 10))
        .style('text-anchor', 'end');

    const secondArc = this.donuts.selectAll('g.arc--second')
      .data(coolPie([{ name: 'grey', weight: 30 }]));

    const grayCake = secondArc.enter()
      .append('g')
        .classed('arc arc--second', true);

    grayCake.append('path')
        .attr('d', coolArc(secondRadius, 20))
        .style('fill', '#ccc');
  }

  destroyDonut() {
    this.donuts
      .selectAll('g.arc')
      .classed('destroy', true)
      .transition()
        .delay(500)
      .remove();
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
    if (this.svg.classed('click-network')) return;
    if (this.clicked === d) return;
    else if (this.clicked !== undefined) this.unclick();

    this.clicked = d;
    this.createDonut(d.name);
    this.svg.classed('click-network', true);
    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('clicked', true)
      .transition()
      .attr('transform', `${(angle(d.name) + 90) % 360 > 180 ? `rotate(${180})` : ''}translate(0,0)`);

    this.svg.select(`#node-${sanitizeSelector(d.name)} circle`)
      .transition()
      .attr('r', 40);

    this.svg.select(`#node-${sanitizeSelector(d.name)} text`)
      .transition()
      .attr('x', 0)
      .style('text-anchor', 'middle');

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .transition()
      .attr('d', link => curve({
        center: true,
        origin: (link.source.name === d.name ? 'source' : 'target'),
      })(link));
  }

  unclick() {
    const d = this.clicked;
    this.destroyDonut();

    this.svg.classed('click-network', false);
    this.svg.select(`#node-${sanitizeSelector(d.name)}`)
      .classed('clicked', false)
      .transition()
      .attr('transform', `rotate(${angle(d.name)})translate(${firstRadius},0)`);

    this.svg.select(`#node-${sanitizeSelector(d.name)} circle`)
      .transition()
      .attr('r', d2 => this.impact[d2.name] / 2);

    // TODO: Fix
    this.svg.select(`#node-${sanitizeSelector(d.name)} text`)
      .transition()
      .attr('x', d => d.x)
      .style('text-anchor', null);

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
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
        <svg className={`container ${this.state.colorblind ? 'colorblind' : ''}`} ref={(svg) => { this.svgRef = svg; }} />
        <Legend handler={this.colorblindToggleHandler} colorblind={this.state.colorblind} />
      </div>
    );
  }
}
