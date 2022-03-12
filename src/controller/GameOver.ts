import { Tile } from "../models/Tile";

export default function GameOver(grid: Array<Array<Tile>>, pattern: Array<Array<Tile>>) {
    let _i, _j, _len, _len1, _ref1, _ref2, row1, row2, column1, column2;
    _ref1 = grid;
    _ref2 = pattern;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        row1 = _ref1[_i];
        row2 = _ref2[_i];
        for (_j = 0, _len1 = row1.length; _j < _len1; _j++) {
            column1 = row1[_j];
            column2 = row2[_j];
            if (column1.activated !== column2.activated) {
                return false;
            }
        }
    }
    return true;
}