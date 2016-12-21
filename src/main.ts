import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg} from './steps';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let svg = d3.select('svg');
let nodes = [
	{
		x: 750,
		y: 500,
		rotation: 45,
		leg: Leg.LF
	},
	{
		x: 780,
		y: 500,
		rotation: 45,
		leg: Leg.RF
	}
];

function dragStarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
	let x = d3.event.x;
	let y = d3.event.y;

	d3.select(this)
		.attr("transform", `translate(${x}, ${y})`);
}

function dragEnded(d) {
	console.log(d);
	console.log(d3.event);
  d3.select(this).classed("active", false);
}


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
		let rotation = d.leg === Leg.LF ? d.rotation : d.rotation + 10;
		return `translate(${d.x}, ${d.y}) rotate(${rotation} 12.37 35)`;
	})
	.call(d3.drag()
		.on('start', dragStarted)
		.on('drag', dragged)
		.on('end', dragEnded)
	)
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

async function waltz() {

	let steps = [
		{
			leg: Leg.RF,
			x: 50,
			y: -50,
			rotation: 0
		},
		{
			leg: Leg.LF,
			x: 150,
			y: -75,
			rotation: 90
		},
		{
			leg: Leg.RF,
			x: 25,
			y: -20,
			rotation: 135
		}
	];

	let i = 0;

	setInterval(() => {
		if (i < steps.length) {
			let step = steps[i];

			if (step.leg === Leg.LF) {
				nodes[0].x += step.x;
				nodes[0].y += step.y;
				nodes[0].rotation += step.rotation;
			} else {
				nodes[1].x += step.x;
				nodes[1].y += step.y;
				nodes[1].rotation += step.rotation;
			}

			let selection = svg.selectAll('g.node')
				.data(nodes);

			let transition = d3.transition('move')
				.duration(1000);

			selection.transition(transition)
				.attr('transform', (d: any) => {
					console.log(d);
					return `translate(${d.x}, ${d.y}) rotate(${d.rotation})`;
				});
		}

		i++;
	}, 1000);

}

d3.select('#waltz')
	.on('click', () => {
		waltz();
		console.log('Button click');
	});
