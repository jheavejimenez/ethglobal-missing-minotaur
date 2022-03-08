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
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TileContainer = styled.div`
    height: 600px;
    width: 600px;
`;

const CardListInnerContainer = styled.div`
    display: flex;
    flex: 1,
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const CardListContainer = styled.div`
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const WalletAddressContainer = styled.div`
    display: flex;
    flex: 1;
    align-self: flex-start;
`;

const WalletAddressText = styled.p`
    display: flex;
    height: 50px;
    color: #fff;
    padding: 0 10px 0 10px;
    align-items: center;
    font-size: 18px;
    border-radius: 10px;
    background-color: #000;
`;


const PolygonLogo = styled.img.attrs({
    src: `${Logo}`
})`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  `;

function GamePathContainer() {
    const { authenticate, isAuthenticated, isAuthenticating, logout, Moralis, account } = useMoralis();
    const [walletAddress, setWalletAddress] = useState<string>("");
    const metamask = useMetaMask();

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
            await authenticate({ signingMessage: "Log in using Moralis" })
                .then(function (user) {
                    SwitchNetwork();
                    console.log("logged in user:", user);
                    setWalletAddress(user!.get("ethAddress"))
                })
                .catch(function (error) { console.log(error); });
        }
    }

    function handleGetUser() {
        if (metamask.account) {
            const wallet = `${metamask.account.slice(0, 5)}...${metamask.account.slice(metamask.account.length - 4, metamask.account.length)}`;
            setWalletAddress(wallet);
        }

    }

    useEffect(() => {
        // TODO wallet address'
        handleGetUser();
    }, []);


    return (
        <PathContainer>
            <CardListContainer>
                <WalletAddressContainer>
                    <WalletAddressText>
                        <PolygonLogo />
                        Wallet: {walletAddress}
                    </WalletAddressText>
                </WalletAddressContainer>
                <CardListInnerContainer>
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                </CardListInnerContainer>
            </CardListContainer>

            <NetworkBtn
                onClick={isAuthenticated ? () => { } : login}
            >
                {isAuthenticated ? "Mint" : "Connect Wallet"}
            </NetworkBtn>
        </PathContainer>
    );
}


export default GamePathContainer;