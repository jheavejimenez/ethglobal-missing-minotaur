import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import TileComponent from './Tile/TileComponent';
import { chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl } from '../../constants/moralisConstants'
import { useMoralis } from "react-moralis";
import detectEthereumProvider from '@metamask/detect-provider';
import GameCard from './Card/GameCard';
import Web3 from "web3";
import { useMetaMask } from "metamask-react";
import Logo from "../../assets/images/polygonlogo.png";

const PathContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
`;


function GamePathContainer() {

    return (
        <PathContainer>

        </PathContainer>
    );
}


export default GamePathContainer;