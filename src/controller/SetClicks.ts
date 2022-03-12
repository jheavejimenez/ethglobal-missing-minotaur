import { Grid } from "../models/Grid";
import Activate from "./Activate";
import Shuffle from "./Suffle";

interface IProps {
    game: Grid;
    setState: (_: Grid) => void;
}

export default function SetClicks(props: IProps) {
    const { width, length, clicksLength } = props.game;

    let clicks, i, tile, tilesFlat, x, y, _i, _j, _k, _ref, _ref1, _ref2, _results;
    tilesFlat = [];
    for (x = _i = 0, _ref = width; 0 <= _ref ? _i < _ref : _i > _ref; x = 0 <= _ref ? ++_i : --_i) {
        for (y = _j = 0, _ref1 = length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
            tilesFlat.push([x, y]);
        }
    }

    clicks = [];
    _results = [];
    for (i = _k = 0, _ref2 = clicksLength; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
        tile = tilesFlat[i];
        if (tile) {
            _results.push(Activate({
                x: tile[0],
                y: tile[1],
                game: props.game,
                setState: props.setState
            }));
        }
    }
    return _results;
};