import { Grid } from "../models/Grid";
import { Tile } from "../models/Tile";

export default function Hovered(tile: Tile, game: Grid) {

    let _ref1, _ref2, top, left, bottom, right;
    const grid = [...game.grid];

    const { x, y } = tile;

    top = (_ref1 = grid[y - 1]) != null ? _ref1[x] : void 0;
    bottom = (_ref2 = grid[y + 1]) != null ? _ref2[x] : void 0;
    left = grid[y][x - 1];
    right = grid[y][x + 1];

    return {
        "top": top,
        "bottom": bottom,
        "right": right,
        "left": left
    };
}