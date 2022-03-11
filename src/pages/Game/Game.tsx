
import React from 'react';
import styled from "styled-components";
import MainHeader from '../../Navigation/MainHeader';
import GameMainContainer from '../../components/Game/GameMainContainer';

const GameContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;

function Game() {

    return (
        <GameContainer>
            <MainHeader btnName='Retry' url='game' />
            <GameMainContainer />
        </GameContainer>
    );
}

export default Game;