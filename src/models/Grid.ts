import { Tile } from "./Tile";

export class Grid {
    length: number;
    width: number;
    level: number;
    clicksLength: number;
    grid: Array<Array<Tile>>;

    constructor(
        length: number,
        width: number,
        level: number,
        clicksLength: number,
        grid: Array<Array<Tile>>
    ) {
        this.length = length
        this.width = width
        this.level = level
        this.clicksLength = clicksLength
        this.grid = grid
    }

}