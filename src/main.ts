import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg, Direction, Wall, Point, StepDirection, Rotation} from './steps';
import {Dancer} from './dancer';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dragStarted(d: any) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d: any) {
	let x = d3.event.x;
	let y = d3.event.y;

	d3.select(this)
		.attr("transform", `translate(${x}, ${y})`);
}

function dragEnded(d: any) {
	console.log(d);
	console.log(d3.event);
  d3.select(this).classed("active", false);
}

const WIDTH = 800;
const HEIGHT = 700;

let svg = d3.select('#viewport')
	.append('svg')
	.attr('width', WIDTH)
	.attr('height', HEIGHT);

svg.append('rect')
	.attr('width', WIDTH - 1)
	.attr('height', HEIGHT - 1)
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
			rotation: 0
		},
		{
			leg: Leg.LF,
			x: 0,
			y: 0,
			rotation: 135
		}],
		[{
			leg: Leg.RF,
			x: 55,
			y: -25,
			rotation: 135
		}],
	/*	[{
			leg: Leg.LF,
			x: 55,
			y: -25,
			rotation: 135
		}] */
	];
}

let dancers = [
	new Dancer(), /*
	new Dancer(),
	new Dancer(),
	new Dancer() */
];

dancers.forEach((dancer, index) => {
	let x = index >= 2 ? WIDTH - 100 : 100;
	let y = index % 3 === 0 ? 100 : HEIGHT - 50;
	dancer.setPosition({x: x, y: y}, Direction.DW, (index + 1 ) % 4, 30);
	dancer.drawCommonCenter();
});

d3.select('#waltz')
	.on('click', () => {
		dancers.forEach(dancer => dancer.danceSequence(waltzNaturalTurn()));
		//waltz();
		console.log('Button click');
	});

d3.select('#start')
	.on('click', () => {
		//rotate(45);
		console.log('Button click');
	});

let directions: any[] = [];
directions[Direction.FW] = { name: 'Facing wall', value: Direction.FW };
directions[Direction.DW] = { name: 'Diagonal wall', value: Direction.DW };
directions[Direction.LOD] = { name: 'Line of dance', value: Direction.LOD };
directions[Direction.FDC] = { name: 'Facing diagonal center', value: Direction.FDC };
directions[Direction.FC] = { name: 'Facing center', value: Direction.FC };
directions[Direction.BDW] = { name: 'Backing diagonal wall', value: Direction.BDW };
directions[Direction.BLOD] = { name: 'Backing line of dance', value: Direction.BLOD };
directions[Direction.BDC] = { name: 'Backing diagonal center', value: Direction.BDC };

let positionsSelection = d3.select('#positions').selectAll('li')
	.data(directions)
	.enter()
	.append('li')
	.text((item: any) => item.name)
	.on('click', (item: any) => {
		dancers.forEach((aDancer) => {
			aDancer.setAlignment(item.value);
			aDancer.drawCommonCenter();
		});
	});

svg.on('click', (event) => {
	console.log(d3.event);
	console.log(event);
	d3.select('#coordinates').text(`x: ${d3.event.clientX}, y: ${d3.event.clientY}`);
});

let movementOptions: any[] = [
	{ name: 'Step forward', movement: StepDirection.FW, rotation: 0 },
	{ name: 'Step backward', movement: StepDirection.BW, rotation: 0 },	
	{ name: 'Step left', movement: StepDirection.LT, rotation: 0 },
	{ name: 'Step right', movement: StepDirection.RT, rotation: 0 },

	{ name: 'Full rotation', movement: 0, rotation: Rotation.Full },
	{ name: '3/4', movement: 0, rotation: Rotation.ThreeQuarter },	
	{ name: '1/2', movement: 0, rotation: Rotation.Half },
	{ name: '3/8', movement: 0, rotation: Rotation.ThreeEight },
	{ name: '1/8', movement: 0, rotation: Rotation.Eight },
	{ name: '1/4', movement: 0, rotation: Rotation.Quarter },


];

d3.select('#movement').selectAll('li')
	.data(movementOptions)
	.enter()
	.append('li')
	.text((item: any) => item.name)
	.on('click', (item: any) => {
		dancers.forEach((aDancer) => {
			aDancer.danceSequenceRelative([
				[{
					leg: Leg.LF,
					rotation: item.rotation,
					size: item.movement > 0 ? 70 : 0,
					direction: item.movement
				}]
			]);
//			aDancer.setAlignment(item.value);
//			aDancer.drawCommonCenter();
		});
	});
