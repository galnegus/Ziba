import React, { Component } from 'react';
import { select, cluster as d3cluster, radialLine, curveBundle, json, hierarchy } from 'd3';
import './Test.css';

// https://bl.ocks.org/mbostock/1044242
const diameter = 960;
const radius = diameter / 2;
const innerRadius = radius - 120;

const cluster = d3cluster()
  .size([360, innerRadius]);

const line = radialLine()
  .curve(curveBundle.beta(0.85))
  .radius(d => d.y)
  .angle(d => (d.x / 180) * Math.PI);

function packageHierarchy(classes) {
  const map = {};

  function find(name, data) {
    let node = map[name];
    let i;
    if (!node) {
      node = data || { name, children: [] };
      map[name] = node;
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach((d) => { find(d.name, d); });
  return hierarchy(map['']);
}

function packageImports(nodes) {
  const map = {};
  const imports = [];

  // Compute a map from name to node.
  nodes.forEach((d) => { map[d.data.name] = d; });

  // For each import, construct a link frm the source to target node.
  nodes.forEach((d) => {
    if (d.data.imports) {
      d.data.imports.forEach((i) => {
        imports.push(map[d.data.name].path(map[i]));
      });
    }
  });
  return imports;
}

export default class Test extends Component {
  componentDidMount() {
    const svg = select(this.container).append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .append('g')
      .attr('transform', `translate(${radius},${radius})`);
    let link = svg.append('g').selectAll('.link');
    let node = svg.append('g').selectAll('.node');

    json('flare.json', (error, classes) => {
      if (error) throw error;

      const root = packageHierarchy(classes)
        .sum(d => d.size);

      cluster(root);

      console.dir(root);

      link = link
        .data(packageImports(root.leaves()))
        .enter()
        .append('path')
        .each((d) => {
          d.source = d[0];
          d.target = d[d.length - 1];
        })
        .attr('class', 'link')
        .attr('d', line);

      node = node
        .data(root.leaves())
        .enter().append('text')
        .attr('class', 'node')
        .attr('dy', '0.31em')
        .attr('transform', d => `rotate(${d.x - 90}) translate(${d.y + 8}, 0) ${d.x < 180 ? '' : 'rotate(180)'}`)
        .attr('text-anchor', d => (d.x < 180 ? 'start' : 'end'))
        .text(d => d.data.key);
    });
  }

  render() {
    return (
      <div>
        <h1>Hi noobs</h1>
        <div className="container" ref={(container) => { this.container = container; }} />
      </div>
    );
  }
}
