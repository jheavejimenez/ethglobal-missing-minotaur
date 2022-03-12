import { Grid } from "../models/Grid";
import { Tile } from "../models/Tile";

interface IProps {
    x: number;
    y: number;
    game: Grid;
    setState: (_: Grid) => void;
}

export default function Activate(props: IProps) {
    const { game, x, y } = props;
    const { length, width } = game;
    const grid = game.grid;

    let tile: Tile = grid[y][x];

    tile.activated = !tile.activated;
    if (y > 0) {
        tile = grid[y - 1][x];
        tile.activated = !tile.activated;
    }
    if (y < length - 1) {
        tile = grid[y + 1][x];
        tile.activated = !tile.activated;
    }
    if (x > 0) {
        tile = grid[y][x - 1];
        tile.activated = !tile.activated;
    }
    if (x < width - 1) {
        tile = grid[y][x + 1];
        tile.activated = !tile.activated;
    }

    props.setState(game);
};