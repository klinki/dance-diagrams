import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import {Leg} from './steps';

export interface StepLikeInterface {
    leg: Leg;
    x: number;
    y: number;
    rotation: number;
}


export class Dancer {
    protected legs: StepLikeInterface[] = [];
    protected selection: d3.Selection<d3.BaseType, {}, d3.BaseType, {}>;

    public constructor() {
        this.legs = [
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
                    })
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
