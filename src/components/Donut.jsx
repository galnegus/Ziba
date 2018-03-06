/* eslint indent: 0 */

import React, { Component } from 'react';
import { select, json, pie, arc, scaleThreshold, scaleBand } from 'd3';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import Legend from './Legend';
import Labels from './Labels';
import logo from '../assets/logo-vertical.svg';
import './Donut.css';

const width = 850;
const height = 900;
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

function nameSort(a, b) {
  const aSplit = a.split('.');
  const bSplit = b.split('.');
  const aHead = parseInt(aSplit[0], 10);
  const bHead = parseInt(bSplit[0], 10);
  const aTail = aSplit.slice(1).join('.');
  const bTail = bSplit.slice(1).join('.');

  if (aHead < bHead) return -1;
  else if (aHead > bHead) return 1;
  else if (aTail === bTail) return 0;
  return nameSort(aTail, bTail);
}

function weightSort(a, b) {
  const second = a.color !== undefined; // hårdkod :(
  const aWeight = second ? a.color : a.weight;
  const bWeight = second ? b.color : b.weight;
  return aWeight - bWeight;
}


const coolPie = pie()
  .value(d => Math.abs(d.weight))
  .sort((a, b) => nameSort(a.name, b.name));
  //.sort(weightSort);

function coolArc(radius, thickness) {
  return arc()
    .outerRadius(radius)
    .innerRadius(radius - thickness)
    .padAngle(0.01)
    .startAngle(d => d.startAngle + (Math.PI / 2))
    .endAngle(d => d.endAngle + (Math.PI / 2))
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

const weightScale = scaleThreshold()
  .domain([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5])
  .range([-3, -2, -1, 0, 1, 2, 3]);

export default class Donut extends Component {
  constructor(props) {
    super(props);
    this.state = { colorblind: false, clicked: null };

    this.colorblindToggleHandler = this.colorblindToggleHandler.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.labelButtonHandler = this.labelButtonHandler.bind(this);
  }

  componentDidMount() {
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

  // NOTE: realWeight = actual weights
  //       weight = absolute weights
  secondDonut(nodeName) {
    let weights = new Map();
    weights.set(nodeName, { realWeight: 1 });
    const realThickness = [];
    const thickness = [];
    for (let i = 0; i < 2; i += 1) {
      const output = new Map();
      weights.forEach((v, k) => {
        this.nodeByName.get(k).connections.forEach((connection) => {
          const x = v.realWeight * connection.weight;
          const n = connection.name;
          if (output.has(n)) {
            output.set(n, {
              realWeight: output.get(n).realWeight + x,
              weight: output.get(n).weight + Math.abs(x),
              kColor: output.get(n).kColor + v.realWeight,
              nColor: output.get(n).nColor + 1,
            });
          } else {
            output.set(n, {
              realWeight: x,
              weight: Math.abs(x),
              kColor: v.realWeight,
              nColor: 1,
            });
          }
        });
      });
      weights = output;
      realThickness.push(0);
      thickness.push(0);
      weights.forEach((v) => {
        realThickness[i] += v.realWeight;
        thickness[i] += v.weight;
      });
    }
    const ret = {
      realThickness,
      thickness,
      connections: [],
    };
    weights.forEach((v, k) => {
      ret.connections.push({ ...v, name: k, color: v.kColor / v.nColor });
    });

    return ret;
  }

  colorblindToggleHandler(e) {
    this.setState({ colorblind: e.target.checked });
  }

  backHandler() {
    this.unclick();
  }

  labelButtonHandler(e) {
    this.hideNodes();
    this.showNode(e.target.innerText);
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
    this.donuts.selectAll('g.arc')
        .remove();

    const firstArc = this.donuts.selectAll('g.arc--first')
      .data(coolPie(this.nodeByName.get(nodeName).connections));

    const firstSlice = firstArc.enter()
      .append('g')
        .classed('arc arc--first', true);

    const thickness = this.impact[nodeName];


    firstSlice.append('path')
        .attr('d', coolArc(firstRadius, thickness))
        .attr('class', d => `fill_${weightScale(d.data.weight)}`)
        .on('mouseover', (d) => {
           tooltip.style("visibility", "visible")
                  .text(this.nodeByName.get(d.data.name)["Short Description"])
                  .style("fill", "red")
                  .attr("x", 10)
                  .attr("y", 10)
        })
        .on("mouseout", (d) => {
            tooltip.style("visibility", "hidden");
          })
        //.style('fill', d => weightColor(d.data.weight));

    var tooltip = select("g.arc--first")
        .append("text")


    firstSlice.append('text')
        .attr('transform', (d) => {
          const arcAngle = ((180 / Math.PI) * ((d.startAngle + d.endAngle + Math.PI) / 2)) % 360;
          const flip = arcAngle > 180 ? 90 : -90;
          return `
            translate(${coolArc(firstRadius, thickness).centroid(d)})
            rotate(${arcAngle + flip})
          `;
        })
        .attr('dy', '.35em')
        .attr('x', (thickness / 2) + 10)
        .text(d => d.data.name)
        .style('font-size', '0.9em')
        .style('font-weight', 'bold')
        //.style('fill', d => name2color(d.data.name))
      .filter(d => ((d.startAngle + d.endAngle) / 2 > (Math.PI / 2) && (d.startAngle + d.endAngle) / 2 < (3 * Math.PI) / 2))
        .attr('x', -((thickness / 2) + 10))
        .style('text-anchor', 'end');


    // second order, (this could definitely be generalized...)
    const secondOrderData = this.secondDonut(nodeName);
    const secondArc = this.donuts.selectAll('g.arc--second')
      .data(coolPie(secondOrderData.connections));

    const secondThickness = (
      secondOrderData.realThickness[0] + (secondOrderData.realThickness[1] / 2)
      ) / 20;

    const secondSlice = secondArc.enter()
      .append('g')
        .classed('arc arc--second', true);

    secondSlice.append('path')
        .attr('d', coolArc(secondRadius, secondThickness))
        .attr('class', d => `fill_${weightScale(d.data.color)}`);

    secondSlice.append('text')
        .attr('transform', (d) => {
          const arcAngle = ((180 / Math.PI) * ((d.startAngle + d.endAngle + Math.PI) / 2)) % 360;
          const flip = arcAngle > 180 ? 90 : -90;
          return `
            translate(${coolArc(secondRadius, secondThickness).centroid(d)})
            rotate(${arcAngle + flip})
          `;
        })
        .attr('dy', '.35em')
        .attr('x', (secondThickness / 2) + 30)
        .text(d => d.data.name)
        .style('font-size', '0.9em')
        .style('text-anchor', 'middle')
        //.style('font-weight', 'bold')
        //.style('fill', d => name2color(d.data.name))
      .filter(d => ((d.startAngle + d.endAngle) / 2 > (Math.PI / 2) && (d.startAngle + d.endAngle) / 2 < (3 * Math.PI) / 2))
        .attr('x', -((secondThickness / 2) + 30))
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
    if (this.state.clicked === d) return;
    else if (this.state.clicked !== null) this.unclick();

    this.showNode(d.name);
  }

  unclick() {
    this.destroyDonut();
    this.hideNodes();
  }

  showNode(nodeName) {
    this.setState({ clicked: this.nodeByName.get(nodeName) });
    this.createDonut(nodeName);
    this.svg.classed('click-network', true);
    this.svg.select(`#node-${sanitizeSelector(nodeName)}`)
      .classed('clicked', true)
      .transition()
      .attr('transform', `${(angle(nodeName) + 90) % 360 > 180 ? `rotate(${180})` : ''}translate(0,0)`);

    this.svg.select(`#node-${sanitizeSelector(nodeName)} circle`)
      .transition()
      .attr('r', 40);

    this.svg.select(`#node-${sanitizeSelector(nodeName)} text`)
      .transition()
      .attr('x', 0)
      .style('text-anchor', 'middle');

    this.svg.selectAll(`.source-${sanitizeSelector(nodeName)}`)
      .transition()
      .attr('d', link => curve({
        center: true,
        origin: (link.source.name === nodeName ? 'source' : 'target'),
      })(link));
  }

  hideNodes() {
    if (this.state.clicked === null) return;
    const d = this.state.clicked;

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
      .attr('x', d2 => d2.x)
      .style('text-anchor', null);

    this.svg.selectAll(`.source-${sanitizeSelector(d.name)}`)
      .transition()
      .attr('d', link => curve()(link));

    this.setState({ clicked: null });
  }

  render() {
    return (
      <div className="wrapper">
        { /* <img className="logo" src={logo} alt="GLOBAL GOALS - For sustainable development" /> */ }
        <div className="svg-container">
            <svg className={`${this.state.colorblind ? 'colorblind' : ''}`} ref={(svg) => { this.svgRef = svg; }} />
            <div className={`back-container ${this.state.clicked ? 'back-container--shown' : ''}`}>
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.backHandler} />
            </div>
        </div>
        <Legend handler={this.colorblindToggleHandler} colorblind={this.state.colorblind} />
        <Labels handler={this.labelButtonHandler} />
      </div>
    );
  }
}
