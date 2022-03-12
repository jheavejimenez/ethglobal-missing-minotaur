import React, { createContext, useState } from "react";
import { Grid } from "../models/Grid";
import { Tile } from "../models/Tile";

let current_grid: Grid | null = null;
let current_tile: Tile | null = null;

export interface IGameState {
    game: Grid;
}

export const initialGameState: IGameState = {
    game: new Grid(4, 4, 1, 1, [])
};

export interface IGameActions {
    type: 'set_game' | 'update_grid' | 'hovered';
    payload: { game?: Grid, grid?: Array<Array<Tile>>, tile?: Tile };
}

export const GameOver = () => {
    let _i, _j, _len, _len1;
    let _ref1: Array<Array<Tile>>;
    let _ref2: Array<Array<Tile>>;
    let row1: Array<Tile>;
    let row2: Array<Tile>;
    let column1: Tile;
    let column2: Tile;

    const roadPattern = [ // one cross
        [
            // FIRST ARRAY
            {
                'activated': true,
                'x': 0,
                'y': 0,
                'isOver': false
            },
            {
                'activated': true,
                'x': 1,
                'y': 0,
                'isOver': false
            }
            , {
                'activated': true,
                'x': 2,
                'y': 0,
                'isOver': false
            }, {
                'activated': true,
                'x': 3,
                'y': 0,
                'isOver': false
            },
        ],
        // SECOND ARRAY
        [
            {
                'activated': false,
                'x': 0,
                'y': 1,
                'isOver': false
            },
            {
                'activated': false,
                'x': 1,
                'y': 1,
                'isOver': false
            }
            , {
                'activated': true,
                'x': 2,
                'y': 1,
                'isOver': false
            }, {
                'activated': false,
                'x': 3,
                'y': 1,
                'isOver': false
            },
        ],
        [
            //  THIRD ARRAY
            {
                'activated': false,
                'x': 0,
                'y': 2,
                'isOver': false
            },
            {
                'activated': true,
                'x': 1,
                'y': 2,
                'isOver': false
            }
            , {
                'activated': false,
                'x': 2,
                'y': 2,
                'isOver': false
            }, {
                'activated': false,
                'x': 3,
                'y': 2,
                'isOver': false
            },
        ],
        [
            // FOURTH ARRAY
            {
                'activated': true,
                'x': 0,
                'y': 3,
                'isOver': false
            },
            {
                'activated': true,
                'x': 1,
                'y': 3,
                'isOver': false
            }
            , {
                'activated': true,
                'x': 2,
                'y': 3,
                'isOver': false
            }, {
                'activated': true,
                'x': 3,
                'y': 3,
                'isOver': false
            },
        ],
    ];

    _ref1 = initialGameState.game.grid;
    _ref2 = roadPattern;
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

const hovered = (tile: Tile, state: IGameState) => {

    let _ref1, _ref2, top, left, bottom, right;
    const grid = [...state.game.grid];

    const { x, y, activated, isOver } = tile;

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

export const gameReducer = (state: IGameState, action: IGameActions) => {
    let getGame = action.payload;
    let game = { ...state.game };


    switch (action.type) {
        case 'set_game':
            if (getGame.game) {
                game = getGame.game
            }
            return { ...state, game }
        case 'update_grid':
            if (getGame.grid) {
                game.grid = getGame.grid;
            }
            return { ...state, game }
        case 'hovered':
            if (getGame.tile) {
                const { top, bottom, left, right } = hovered(getGame.tile, state);
                if (bottom) {
                    game.grid[bottom.y][bottom.x].isOver = !bottom.isOver;
                }
                if (top) {
                    game.grid[top.y][top.x].isOver = !top.isOver;
                }
                if (left) {
                    game.grid[left.y][left.x].isOver = !left.isOver;
                }
                if (right) {
                    game.grid[right.y][right.x].isOver = !right.isOver;
                }

                game.grid[getGame.tile.y][getGame.tile.x].isOver = !getGame.tile.isOver;
            }
            return { ...state, game }
        default:
            return state;
    }
};

export interface IGameContextProps {
    gameState: IGameState;
    gameDispatch: React.Dispatch<IGameActions>;
}

const GameContext = createContext<IGameContextProps>({
    gameState: initialGameState,
    gameDispatch: () => { }
});

export const GameContextConsumer = GameContext.Consumer;
export const GameContextProvider = GameContext.Provider;
export default GameContext;
