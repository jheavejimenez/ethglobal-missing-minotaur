import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import TileComponent from './Tile/TileComponent';
import { chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl} from '../../constants/moralisConstants'
import { useMetaMask } from "metamask-react";
import { useMoralis } from "react-moralis";
import Web3 from 'web3';


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
    const { authenticate, isAuthenticated, isAuthenticating, logout, Moralis } = useMoralis();

    const SwitchNetwork = async () => {
        const test = await Moralis.enableWeb3();

        if (!test) {
            try {
                await Moralis.switchNetwork(chainId);
            } catch (error: any) {
                if (error.code === '4902') {
                    try {
                        await test.provider.request({
                            method: "wallet_addEthereumChain",
                            params: [
                            {
                                chainId: "0x13881",
                                chainName: "Mumbai",
                                rpcUrls: ["https://rpc-mumbai.matic.today"],
                                nativeCurrency: {
                                    name: "Matic",
                                    symbol: "Matic",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
                                },
                            ],
                        });
                        await Moralis.switchNetwork(chainId);
                    } catch (error: any) {
                        console.log(error);
                    }
                }
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        }
    }

    const login = async () => {
        // const test = await Moralis.enableWeb3();
        // const ethers = Moralis.web3Library
        // const a = test.provider.request
        // console.log(a);
        if (!isAuthenticated) {
            await authenticate({signingMessage: "Log in using Moralis"})
            .then(function (user) {})
            .catch(function (error) 
            {console.log(error);});
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    return (
        <PathContainer>
            <NetworkBtn
                onClick={login}
                title={"Connect Wallet"}
            >
                Connect Wallet
            </NetworkBtn>
        <button 
            onClick={logOut} 
            disabled={isAuthenticating}
            >
                Logout
        </button>

        </PathContainer>
    );
}


export default GamePathContainer;