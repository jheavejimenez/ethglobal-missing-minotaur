import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import TileComponent from './Tile/TileComponent';
import { chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl} from '../../constants/moralisConstants'
import { useMoralis } from "react-moralis";
import detectEthereumProvider from '@metamask/detect-provider';


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
        const provider = await detectEthereumProvider();

        if (provider) {
            try {
                await Moralis.switchNetwork(chainId);
            } catch (error: any) {
                try {
                    await Moralis.addNetwork(
                        chainId, 
                        chainName, 
                        currencyName, 
                        currencySymbol, 
                        rpcUrl,
                        blockExplorerUrl
                    );
                    await Moralis.switchNetwork(chainId);
                } catch (error: any) {
                    console.log(error);
                }
                
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        }
    }

    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({signingMessage: "Log in using Moralis"})
            .then(function (user) {
                SwitchNetwork();
                console.log("logged in user:", user);
                console.log(user!.get("ethAddress"));
            })
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