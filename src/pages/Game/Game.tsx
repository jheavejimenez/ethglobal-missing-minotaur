
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import MainHeader from '../../Navigation/MainHeader';
import GameMainContainer from '../../components/Game/GameMainContainer';
import { Grid } from '../../models/Grid';
import { MergePattern, SetClicks, TileSet } from '../../controller';
import { CONTRACT_ABI, CONTRACT_ADDRESS, CONTRACT_GAME_ABI, CONTRACT_GAME_ADDRESS } from '../../constants/moralisConstants';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useParams } from 'react-router';
import GeneratePattern from '../../controller/GeneratePattern';
import { Tile } from '../../models/Tile';
import ZPattern from '../../data/ZPattern';


const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {
    const { game_type } = useParams();
    const MAX_LENGTH = 6;
    
    const { Moralis } = useMoralis();

    const [game, setGame] = useState<Grid>({
        clicksLength: 1,
        grid: [],
        length: 4,
        level: 1,
        width: 4
    });

    const [clicks, setClicks] = useState<Array<number>>(
        [
            15,
            10,
            5,
        ]
    );

    const [roadPattern, setRoadPattern] = useState<Array<Array<Tile>> | null>(null);

    const setupGame = async (clicks: number[]) => {
        const tempCoordinate: Array<{ x: number, y: number }> = [];
        let tilesFlat: any[] = [];

        clicks.map((data: number) => {
            tempCoordinate.push({
                x: Math.floor(data / MAX_LENGTH),
                y: data % MAX_LENGTH
            });
            tilesFlat.push([Math.floor(data / MAX_LENGTH), data % MAX_LENGTH]);
        });

        const initialPuzzle = TileSet(MAX_LENGTH, MAX_LENGTH);
        // generate pattern
        const pattern = GeneratePattern(TileSet(MAX_LENGTH, MAX_LENGTH), tempCoordinate);
        // attach z pattern
        setRoadPattern(ZPattern());
        // change pattern -> z pattern ZPattern()
        const newGame = {
            clicksLength: clicks.length,
            grid: MergePattern(initialPuzzle, pattern),
            length: MAX_LENGTH,
            width: MAX_LENGTH,
            level: 1
        }

        setGame(newGame);

        SetClicks({
            game: newGame,
            setState: setGame,
            tilesFlat: tilesFlat
        });
    }


    const handleFetchGame = async () => {
        const newWeb3Provider = await Moralis.enableWeb3();
        if(newWeb3Provider){
            await Moralis.executeFunction({
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "puzzle",
                abi: CONTRACT_GAME_ABI,
                params: {tokenId : 1}
            }).then((response:any) => {
                console.log(response);
                let tempClicks: number[] = [];
                
                response.clicks.map((value: any) => {
                    tempClicks.push(parseInt(value._hex, 16));
                });

                setClicks(tempClicks);
                setupGame(tempClicks);


            });
        }
        
    }

    useEffect(() => {
        if (game_type) {
            if (game_type === 'demo') {
                let clicks = [
                    15,
                    10,
                    5,
                ];
                setupGame(clicks);
            } else {
                handleFetchGame();
            }
        }
    }, []);

    return (
        <GameContainer>
            <MainHeader
                btnName='Retry'
                url='game'
                onClick={() => {
                    setupGame(clicks);
                }}
            />
            {roadPattern &&
                <GameMainContainer
                    game={game}
                    pattern={roadPattern}
                    setGame={setGame}
                />

            }
        </GameContainer>
    );
}

export default Game;