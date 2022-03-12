import { Tile } from "../models/Tile";
import mergePattern from "./MergePattern";

export default function TileSet(roadPattern: Array<Array<Tile>>, length: number, width: number) {
    let i: number;
    let j: number;
    let row: Array<Tile>;
    let _i: number;
    let _j: number;
    let _ref: number;
    let _ref1: number;
    let tempGrid: Array<Array<Tile>> = [];

    for (j = _i = 0, _ref = length; 0 <= _ref ? _i < _ref : _i > _ref; j = 0 <= _ref ? ++_i : --_i) {
        row = [];
        for (i = _j = 0, _ref1 = width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            row.push({
                'activated': false,
                'x': i,
                'y': j,
                'isOver': false
            });
        }
        tempGrid.push(row);
    }

    return mergePattern(tempGrid, roadPattern);
}