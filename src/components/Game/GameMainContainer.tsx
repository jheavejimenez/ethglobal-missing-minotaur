
import React from 'react';
import styled, { css, keyframes } from "styled-components";
import GamePathContainer from './GamePathContainer';
import GameStatsContainer from './GameStatsContainer';

const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: calc(100vh - 100px);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #222323;
`;

const GameTitle = styled.h1`
    text-align: center;
    color: #fff;
`;

interface IProps {
    children: any;
}

function GameMainContainer() {
    return (
        <MainContainer>
            <GamePathContainer />
            {/* <GameStatsContainer /> */}
        </MainContainer>
    );
}

export default GameMainContainer;