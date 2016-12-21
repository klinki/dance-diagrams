import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';

let svg = d3.select('svg');
let nodes = [ {x: 10, y: 10} ];

svg.append('rect')
	.attr('width', 1000)
	.attr('height', 1000)
	.attr('fill', 'transparent');

let node = svg.selectAll('g.node')
	.data(nodes)
	.enter()
	.append('g')
	.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; } )

node.append('image')
	.attr('xlink:href', './assets/man-shoe.svg')
	.attr('width', 100)
	.attr('height', 100);

svg.append('line');

