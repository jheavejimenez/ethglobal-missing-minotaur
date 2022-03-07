
import React, { useState } from 'react';
import styled, { css, keyframes } from "styled-components";
import GameHeader from './GameHeader';
import GameMainContainer from './GameMainContainer';

const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {

    return (
        <GameContainer>
            <GameHeader />
            <GameMainContainer />
        </GameContainer>
    );
}

export default Game;