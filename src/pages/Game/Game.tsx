
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import MainHeader from '../../Navigation/MainHeader';
import GameMainContainer from '../../components/Game/GameMainContainer';
import { Grid } from '../../models/Grid';
import { SetClicks, TileSet } from '../../controller';

const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {


    const [game, setGame] = useState<Grid>({
        clicksLength: 1,
        grid: [],
        length: 4,
        level: 1,
        width: 4
    });

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



    const setupGame = async () => {
        const { length, width } = game;
        const newGame = {
            clicksLength: 1,
            grid: TileSet(roadPattern, length, width),
            length: 4,
            width: 4,
            level: 1
        }
        setGame(newGame);

        SetClicks({
            game: newGame,
            setState: setGame
        });
    }

    useEffect(() => {
        setupGame();
    }, []);


    return (
        <GameContainer>
            <MainHeader
                btnName='Retry'
                url='game'
                onClick={() => {
                    setupGame();
                }}
            />
            <GameMainContainer
                game={game}
                pattern={roadPattern}
                setGame={setGame}
            />
        </GameContainer>
    );
}

export default Game;