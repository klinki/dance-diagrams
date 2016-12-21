import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg} from './steps';

let svg = d3.select('svg');
let nodes = [
	{
		x: 100,
		y: 100,
		rotation: 0,
		leg: Leg.LF
	},
	{
		x: 130,
		y: 100,
		rotation: 0,
		leg: Leg.RF
	}
];

svg.append('rect')
	.attr('width', 1000)
	.attr('height', 1000)
	.attr('fill', 'transparent')
	.attr('stroke', 'black')
	.attr('stroke-opacity', 2);

let selection = svg.selectAll('g.node')
	.data(nodes);

selection.enter()
	.append('g')
	.attr('class', 'node')
	.attr('transform', (d) => {
		return `translate(${d.x}, ${d.y})`;
	})
	.append('image')
	.attr('xlink:href', (d: any): string => {
		if (d.leg === Leg.LF) {
			return './assets/man-shoe-left.svg';
		} else {
			return './assets/man-shoe-right.svg';
		}
	})
	.attr('height', 35);

d3.select('#start')
	.on('click', () => {
		move(100, 0);
		//rotate(45);
		console.log('Button click');
	});


function move(x: number, y: number) {
		nodes[0].x += x;
		nodes[0].y += y;

		let selection = svg.selectAll('g.node')
			.data(nodes);

		let transition = d3.transition('move')
			.duration(1000);

		selection.transition(transition)
			.attr('transform', (d: any) => {
				console.log(d);
				return `translate(${d.x}, ${d.y})`;
			});
}

function rotate(rotation: number) {
	nodes[0].rotation += rotation;

	let selection = svg.selectAll('g.node')
		.data(nodes);

	let transition = d3.transition('rotate')
		.duration(1000);

	selection.transition(transition)
		.attr('transform', (d: any) => {
			console.log(d);
			return `translate(${d.x}, ${d.y}) rotate(${d.rotation})`;
		});
}
