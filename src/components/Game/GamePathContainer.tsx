import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import TileComponent from './Tile/TileComponent';

const PathContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
`;

const TileContainer = styled.div`
    height: 600px;
    width: 600px;
    border: 1px solid white;
`;

function GamePathContainer() {

    return (
        <PathContainer>
            <NetworkBtn
                onClick={() => {
                    alert("sample");
                }}
                title={"Connect Wallet"}
            >
                Connect Wallet
            </NetworkBtn>
        </PathContainer>
    );
}

export default GamePathContainer;