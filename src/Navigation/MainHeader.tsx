
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

const GameTitle = styled.a`
    text-align: center;
    color: #fff;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    border-radius: 30px;
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
`;


interface IProps {
    btnName: string;
    url: string;
    onClick: () => void;
}

function MainHeader(props: IProps) {

    return (
        <GameHeaderContainer>
            <TitleContainer>
                <GameTitle href='/'>
                    Minotaur
                </GameTitle>
            </TitleContainer>
            <WalletContainer>
                <ConnectWalletBtn
                    onClick={props.onClick}
                >
                    Retry
                </ConnectWalletBtn>
            </WalletContainer>
        </GameHeaderContainer>
    );
}

export default MainHeader;