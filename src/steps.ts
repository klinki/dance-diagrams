export enum Leg {
	LF, // left foot 
	RF // right foot
}

export enum Footwork {
	B, // ball
	H, // heel
	T, // toe
	TH, // toe-to-heel
	HT, // heel-to-toe,
	BF, // ball-flat
	WF, // whole-foot
	HF, // whole-foot
	PR // pressure 
}

export enum Direction {
	FW, // facing wall
	DW, // diagonal wall 
	LOD, // line of dance
	FDC, // facing diagonal center
	FC, // facing center
	BDW, // backing diagonal wall
	BLOD, // backing line of dance
	BDC // backing center
}

export enum Wall {
	TOP,
	LEFT,
	BOTTOM,
	RIGHT
}

export enum Timing {
	S,
	Q,
	a, // 1/4
	and // 1/2
}

export enum Sway {
	S,
	L
}

// Step is always transition from one position to another
export interface Step {
	timing: Timing;
	leg: Leg;
	direction: Direction;
	size: StepSize;
	rotation: number;
}

export enum StepSize {
	Small,
	Normal,
	Big
}

export interface Point {
	x: number,
	y: number
}

/*
1, Q, LF fwd in CBMP, To Wall, H, 1/8 to L between 1-2
2, Q, RF to side and slightly back, DW, BH
3, Q, LF back in CBMP, DW, BH
4, Q, RF closes to LF slightly back in PP, Facing DW, BH
*/