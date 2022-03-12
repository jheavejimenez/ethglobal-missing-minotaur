import Web3 from "web3"; 
import React, { useEffect, useState } from 'react';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import styled, { css, keyframes } from "styled-components";
import UserNft from "../../../models/UserNft";
import TokenUri from "../../../models/TokenUri";
import axios from "axios";
import { CONTRACT_ADDRESS, MORALIS_APP_ID, MORALIS_SERVER_URL } from "../../../constants/moralisConstants";

interface IProps {
    src: string;
}

const CardContainer = styled.img<IProps>`
    display: flex;
    height: 400px;
    width: 400px;
    border: 1px solid white;
`;

interface IGameCardProps {
    tokenUris: Array<TokenUri>
}

export default function GameCard(props: IGameCardProps) {
    console.log(props.tokenUris);
    return (
        <React.Fragment>
            { props.tokenUris && props.tokenUris.map((tokenUri: TokenUri, index: number) => (
                <CardContainer
                key={index}
                src={`${tokenUri.image}`}
                >
                </CardContainer>
            ))}
        </React.Fragment>

    );
}