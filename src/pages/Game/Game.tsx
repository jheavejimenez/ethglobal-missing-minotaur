
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import MainHeader from '../../Navigation/MainHeader';
import GameMainContainer from '../../components/Game/GameMainContainer';
import { Grid } from '../../models/Grid';
import { MergePattern, SetClicks, TileSet } from '../../controller';
import { CONTRACT_GAME_ABI, CONTRACT_GAME_ADDRESS } from '../../constants/moralisConstants';
import { useMoralis } from "react-moralis";
import { useParams } from 'react-router';
import { Tile } from '../../models/Tile';
import ZPattern from '../../data/ZPattern';
import SetActivate from '../../controller/SetActivate';
import { useMetaMask } from 'metamask-react';


const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {
    const { Moralis, account } = useMoralis();

    const { game_type } = useParams();
    const MAX_LENGTH = 6;
    const [walletAddress, setWalletAddress] = useState<string | null>(account);
    const [roadPattern, setRoadPattern] = useState<Array<Array<Tile>> | null>(null);

    const metamask = useMetaMask();

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

        // initial puzzle to false
        const initialPuzzle = TileSet(MAX_LENGTH, MAX_LENGTH);

        const newGame = {
            clicksLength: clicks.length,
            grid: initialPuzzle,
            length: MAX_LENGTH,
            width: MAX_LENGTH,
            level: 1
        }

        const setActivate = SetActivate({
            game: newGame,
            length: MAX_LENGTH,
            width: MAX_LENGTH,
            coordinates: tempCoordinate
        });

        setRoadPattern(ZPattern());

        setActivate.grid = [...MergePattern(setActivate.grid, ZPattern())];
        setGame(setActivate);

    }


    const handleFetchGame = async (address?: string) => {
        const newWeb3Provider = await Moralis.enableWeb3();
        if (newWeb3Provider) {
            const tokenId = await Moralis.executeFunction({
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "getOwnerOfTokenId",
                abi: CONTRACT_GAME_ABI,
                params: { owner: address ? address : walletAddress }
            });
            await Moralis.executeFunction({
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "puzzle",
                abi: CONTRACT_GAME_ABI,
                params: { tokenId: tokenId }
            }).then((response: any) => {

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
        if (game_type && game_type === 'demo') {
            let clicks = [
                15,
                10,
                5,
            ];
            setupGame(clicks);
        }
    }, []);


    function handleGetUser() {

        if (metamask.account && metamask.status === "connected") {
            setWalletAddress(metamask.account);

            if (game_type && game_type === 'start') {
                handleFetchGame(metamask.account);
            }
        }
    }

    useEffect(() => {
        let isMount = true;

        if (isMount) {
            // TODO wallet address'
            handleGetUser();
        }

        return () => {
            isMount = false;
        }

    }, [metamask.status]);

    return (
        <GameContainer>
            <MainHeader
                btnName='Retry'
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