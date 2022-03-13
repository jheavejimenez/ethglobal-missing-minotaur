
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
import TestActivate from '../../controller/TestActive';


const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {
    const { Moralis, account } = useMoralis();

    const { game_type } = useParams();
    const MAX_LENGTH = 6;
    const [testAccount, setTestAccount] = useState<string | null>(account);


    const [game, setGame] = useState<Grid>({
        clicksLength: 1,
        grid: [],
        length: MAX_LENGTH,
        level: 1,
        width: MAX_LENGTH
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

        // set coordinates to true
        clicks.map((data: number) => {
            tempCoordinate.push({
                x: Math.floor(data / MAX_LENGTH),
                y: data % MAX_LENGTH
            });
            tilesFlat.push([Math.floor(data / MAX_LENGTH), data % MAX_LENGTH]);
        });

        console.log(tempCoordinate);

        // initial puzzle to false
        const initialPuzzle = TileSet(MAX_LENGTH, MAX_LENGTH);

        const newGame = {
            clicksLength: clicks.length,
            grid: initialPuzzle,
            length: MAX_LENGTH,
            width: MAX_LENGTH,
            level: 1
        }
        
        const test = TestActivate({
            game: newGame, 
            length:  MAX_LENGTH, 
            width: MAX_LENGTH, 
            coordinates: tempCoordinate
        });

        // generate pattern
        // const pattern = GeneratePattern(initialPuzzle, tempCoordinate);
        // attach z pattern
        setRoadPattern(ZPattern());
        // change pattern -> z pattern ZPattern()
        // console.log(tempCoordinate);
        
        
        test.grid = [...MergePattern(test.grid, ZPattern())];
        setGame(test);

        // SetClicks({
        //     game: newGame,
        //     setState: setGame,
        //     tilesFlat: tilesFlat
        // });


    }


    const handleFetchGame = async () => {
        const newWeb3Provider = await Moralis.enableWeb3();
        if(newWeb3Provider){
            console.log(testAccount);
            const tokenId = await Moralis.executeFunction({
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "getOwnerOfTokenId",
                abi: CONTRACT_GAME_ABI,
                params: {owner : testAccount}
            });
            await Moralis.executeFunction({
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "puzzle",
                abi: CONTRACT_GAME_ABI,
                params: {tokenId : tokenId}
            }).then((response:any) => {

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