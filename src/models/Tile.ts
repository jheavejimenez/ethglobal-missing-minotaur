export class Tile {
    activated: boolean;
    isOver: boolean;
    x: number;
    y: number;

    constructor(
        activated: boolean,
        isOver: boolean,
        x: number,
        y: number
    ) {
        this.activated = activated
        this.isOver = isOver
        this.x = x
        this.y = y
    }

}