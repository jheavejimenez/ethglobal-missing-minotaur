import { Grid } from "../models/Grid";
import Activate from "./Activate";
import Shuffle from "./Suffle";

interface IProps {
    game: Grid;
    setState: (_: Grid) => void;
    tilesFlat: any[];
}

export default function SetClicks(props: IProps) {
    const { clicksLength } = props.game;
    const { tilesFlat } = props;

    let clicks, i, tile, _k, _ref, _results;

    clicks = [];
    _results = [];

    for (i = _k = 0, _ref = clicksLength; 0 <= _ref ? _k < _ref : _k > _ref; i = 0 <= _ref ? ++_k : --_k) {
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