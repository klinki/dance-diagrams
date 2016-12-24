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

        this.selection = d3.select('svg').selectAll('g.node');
    }


    public danceSequence(steps: StepLikeInterface[]) {
        let i = 0;

        setInterval(() => {
            if (i < steps.length) {
                let step = steps[i];

                if (step.leg === Leg.LF) {
                    this.legs[0].x += step.x;
                    this.legs[0].y += step.y;
                    this.legs[0].rotation += step.rotation;
                } else {
                    this.legs[1].x += step.x;
                    this.legs[1].y += step.y;
                    this.legs[1].rotation += step.rotation;
                }

                let selection = this.selection.data(this.legs);

                let transition = d3.transition('move')
                    .duration(1000);

                selection.transition(transition)
                    .attr('transform', (d: any) => {
                        console.log(d);
                        return `translate(${d.x}, ${d.y}) rotate(${d.rotation})`;
                    });
            }

            i++;
        }, 1020);
    }
}