import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg, Direction, Wall, Point} from './steps';

export interface StepLikeInterface {
    leg: Leg;
    x: number;
    y: number;
    rotation: number;
}


export class Dancer {
    protected legs: StepLikeInterface[] = [];
    protected selection: d3.Selection<d3.BaseType, {}, d3.BaseType, {}>;

    protected direction: Direction;
    protected wall: Wall;

    public constructor() {
        this.setPosition({x: 750, y: 500}, Direction.DW, Wall.RIGHT, 30);

        d3.select('svg').selectAll('g.node')
            .data(this.legs)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => {
                let center = this.getCenter(d.leg);
                let rotation = d.leg === Leg.LF ? d.rotation : d.rotation + 10;
                return `rotate(${rotation} ${center.x} ${center.y}) translate(${d.x}, ${d.y})`;
                //return `translate(${d.x}, ${d.y}) rotate(${rotation} 12.37 35)`;
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

        this.selection = d3.select('svg').selectAll('g.node');
    }

    protected getCenter(leg: Leg) {
        let width = 12.87;
        let height = 35;
        return { 
            x: this.legs[leg].x + width / 2,
            y: this.legs[leg].y - height / 2
        };
    }

    public setPosition(position: Point, direction: Direction, facingWall: Wall, distance: number = 30) {
        let rotation = this.wallRotationCorrection(facingWall, this.getDirectionRotation(direction));

        this.legs = [
           {
                x: position.x,
                y: position.y,
                rotation: rotation,
                leg: Leg.LF
            },
            {
                x: position.x + distance,
                y: position.y,
                rotation: rotation,
                leg: Leg.RF
            }
        ];
    }

    public setAlignment(direction: Direction, wall?: Wall) {
        if (!wall) {
            wall = this.wall;    
        }

        let rotation = this.wallRotationCorrection(wall, this.getDirectionRotation(direction));
        
        this.legs[Leg.LF].rotation = rotation;
        this.legs[Leg.RF].rotation = rotation;
    }

    protected getDirectionRotation(direction: Direction) {
        let directionRotation: {[key: number]: number} = {};
        directionRotation[Direction.FW] = 90;
        directionRotation[Direction.DW] = 45;
        directionRotation[Direction.LOD] = 0;
        directionRotation[Direction.FDC] = -40;
        directionRotation[Direction.FC] = -90;
        directionRotation[Direction.BDW] = 135;
        directionRotation[Direction.BLOD] = 180;
        directionRotation[Direction.BDC] = -135;

        return directionRotation[direction];
    }

    protected wallRotationCorrection(wall: Wall, rotation: number) {
        let wallCorrections: {[key: number]: number} = {
            0: -90,
            1: 180,
            2: 90,
            3: 0
        };

        return wallCorrections[wall] + rotation;
    }

    public danceSequence(stepsSequence: StepLikeInterface[][]) {
        let i = 0;

        console.log('When sequence started');
        console.log(this.legs.map((item) => Object.assign({}, item)));

        setInterval(() => {
            if (i < stepsSequence.length) {
                stepsSequence[i].forEach(step => {
                    this.legs = this.legs.map((item) => Object.assign({}, item));

                    this.legs[step.leg].x += step.x;
                    this.legs[step.leg].y += step.y;
                    this.legs[step.leg].rotation += step.rotation;

                    console.log(`After ${i + 1} steps`);
                    console.log(this.legs);

                    let selection = this.selection.data(this.legs);

                    let transition = d3.transition('move')
                        .duration(1000);

                    selection.transition(transition)
                        .attr('transform', (d: any) => {
                            console.log(d);
                            let center = this.getCenter(d.leg);
                            return `rotate(${d.rotation} ${center.x} ${center.y}) translate(${d.x}, ${d.y})`;
                        });
                    
                    });
            }

            i++;
        }, 1000);
    }

    public move(x: number, y: number) {
		this.legs[0].x += x;
		this.legs[0].y += y;

		let selection = this.selection
			.data(this.legs);

		let transition = d3.transition('move')
			.duration(1000);

		selection.transition(transition)
			.attr('transform', (d: any) => {
				console.log(d);
				return `translate(${d.x}, ${d.y})`;
			});
    }

    public rotate(rotation: number) {
        this.legs[0].rotation += rotation;

        let selection = this.selection
            .data(this.legs);

        let transition = d3.transition('rotate')
            .duration(1000);

        selection.transition(transition)
            .attr('transform', (d: any) => {
                console.log(d);
                return `translate(${d.x}, ${d.y}) rotate(${d.rotation})`;
            });
    }
}
