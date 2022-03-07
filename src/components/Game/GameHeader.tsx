
import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';


const GameHeaderContainer = styled.div`
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: #1D1E21;
`;

const GameTitle = styled.h1`
    text-align: center;
    color: #fff;
`;


const ConnectWalletBtn = styled.button`
    
`;

interface IProps {
    children: any;
}

function GameHeader() {


    return (
        <GameHeaderContainer>
            <GameTitle>
                Minotaur
            </GameTitle>
        </GameHeaderContainer>
    );
}

export default GameHeader;