import { Grid } from "../models/Grid";
import { Tile } from "../models/Tile";
import Hovered from "./Hovered";

interface IProps {
    game: Grid;
    length: number;
    width: number;
    coordinates: Array<{x: number, y: number}>;
}

export default function TestActivate(props: IProps) {
    const { game, length, width, coordinates } = props;
    
    for (let index = 0; index < coordinates.length; index++) {
        const {x, y } = coordinates[index];
        let tile = game.grid[y][x];
        handleHover(tile, game);
    }

    return { ...game };
};


const handleHover = (tile: Tile, game: Grid) => {
    const { top, bottom, left, right } = Hovered(tile, game);
    if (bottom) {
        game.grid[bottom.y][bottom.x].activated = !bottom.activated;
    }
    if (top) {
        game.grid[top.y][top.x].activated = !top.activated;
    }
    if (left) {
        game.grid[left.y][left.x].activated = !left.activated;
    }
    if (right) {
        game.grid[right.y][right.x].activated = !right.activated;
    }

    game.grid[tile.y][tile.x].activated = !tile.activated;
}