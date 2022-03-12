
import React from 'react';
import styled from "styled-components";


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

const TitleContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`

const ConnectWalletBtn = styled.button`
    background-color: #000; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 30px;
`;

const WalletContainer = styled.div`
    display: flex;
    flex: 0.5;
    justify-content: center;
`

interface IProps {
    children: any;
}

function GameHeader() {
    return (
        <GameHeaderContainer>
            <TitleContainer>
                <GameTitle>
                    Minotaur
                </GameTitle>
            </TitleContainer>
            <WalletContainer>
                <ConnectWalletBtn>
                    Start Demo Game
                </ConnectWalletBtn>
            </WalletContainer>
        </GameHeaderContainer>
    );
}

export default GameHeader;