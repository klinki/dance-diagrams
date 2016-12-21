import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';

let svg = d3.select('svg');
let nodes = [ {x: 100, y: 100} ];

svg.append('rect')
	.attr('width', 1000)
	.attr('height', 1000)
	.attr('fill', 'transparent')
	.attr('stroke', 'black')
	.attr('stroke-opacity', 2);

let node = svg.selectAll('g.node')
	.data(nodes)
	.enter()
	.append('g')
	.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; } );

node.append('image')
	.attr('xlink:href', './assets/man-shoe.svg')
	.attr('width', 30)
	.attr('height', 30);

svg.append('line');


d3.select('#start')
	.on('click', () => {
		move(100, 0);
		console.log('Button click');
	});


function move(x: number, y: number) {
		nodes[0].x += x;
		nodes[0].y += y;

		let selection = svg.selectAll('g')
			.data(nodes);

		let transition = d3.transition('move')
			.duration(1000);

		selection.transition(transition)
			.attr('transform', (d: any) => {
				console.log(d);
				return `translate(${d.x}, ${d.y})`;
			});
}
