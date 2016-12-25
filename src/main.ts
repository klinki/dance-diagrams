import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg} from './steps';
import {Dancer} from './dancer';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

let svg = d3.select('svg');
svg.append('rect')
	.attr('width', 1000)
	.attr('height', 1000)
	.attr('fill', 'transparent')
	.attr('stroke', 'black')
	.attr('stroke-opacity', 2);

function waltzNaturalTurn() {
	return [
		[{
			leg: Leg.RF,
			x: 50,
			y: -50, // 70.7px movement
			rotation: 0
		}],
		[{
			leg: Leg.LF,
			x: 150,
			y: -75,
			rotation: 90
		},
		{
			leg: Leg.LF,
			x: 0,
			y: 0,
			rotation: 45
		}],
		[{
			leg: Leg.RF,
			x: 55,
			y: -25,
			rotation: 135
		}],
		[{
			leg: Leg.LF,
			x: 55,
			y: -25,
			rotation: 135
		}]
	];
}

let dancer = new Dancer();

d3.select('#waltz')
	.on('click', () => {
		dancer.danceSequence(waltzNaturalTurn());
		//waltz();
		console.log('Button click');
	});

d3.select('#start')
	.on('click', () => {
		dancer.move(100, 0);
		//rotate(45);
		console.log('Button click');
	});
