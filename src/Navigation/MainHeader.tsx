
import React from 'react';
import styled, { CSSProperties } from "styled-components";
import NavLink from '../components/Button/GameStartBtn';
import { useNavigate } from "react-router-dom";


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
`;

const WalletContainer = styled.div`
    display: flex;
    flex: 0.5;
    justify-content: center;
`;


const RetryBtn = styled.button`
    background-color: #000;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 30px;
`;


const GameStartBtn = styled.button`
    background-color: #000;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 30px;
`;

interface IProps {
    btnName: string;
    onClick?: () => void;
}


function MainHeader(props: IProps) {
    const { btnName, onClick } = props;
    const navigate = useNavigate();

    return (
        <GameHeaderContainer>
            <TitleContainer>
                <GameTitle href='/ethglobal-missing-minotaur/'>
                    Minotaur
                </GameTitle>
            </TitleContainer>
            <WalletContainer>
                {onClick ?
                    <RetryBtn
                        onClick={onClick}
                    >
                        {btnName}
                    </RetryBtn>
                    :
                    <GameStartBtn
                        onClick={() => {
                            navigate("/ethglobal-missing-minotaur/game/demo", {
                                replace: true,
                                state: {
                                    game_start: "demo"
                                }
                            })
                        }}
                    >
                        Start Demo Game
                    </GameStartBtn>
                }
            </WalletContainer>
        </GameHeaderContainer>
    );
}

export default MainHeader;