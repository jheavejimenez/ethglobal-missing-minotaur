import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import { chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl, CONTRACT_ADDRESS, CONTRACT_ABI } from '../../constants/moralisConstants'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import detectEthereumProvider from '@metamask/detect-provider';
import GameCard from '../../components/Game/Card/GameCard';
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

function HomeComponent() {
    const { authenticate, isAuthenticated, isAuthenticating, logout, Moralis, account } = useMoralis();
    const [walletAddress, setWalletAddress] = useState<string>("");
    const metamask = useMetaMask();
    const web3 = useWeb3ExecuteFunction();

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

    const chainIdSlice = (chainId: string) => {
        const wallet = `${chainId.slice(0, 5)}...${chainId.slice(chainId.length - 4, chainId.length)}`;
        setWalletAddress(wallet);
    }

    const mintNft = async () => {
        console.log('mint')
        await web3.fetch({
            params: {
                contractAddress: CONTRACT_ADDRESS,
                functionName: "mintNFT",
                abi: CONTRACT_ABI,
                msgValue: Moralis.Units.ETH(0.00001),
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({ signingMessage: "Log in using Moralis" })
                .then(function (user) {
                    SwitchNetwork();
                    console.log("logged in user:", user);
                    chainIdSlice(user!.get("ethAddress"));
                })
                .catch(function (error) { console.log(error); });
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    function handleGetUser() {
        console.log(metamask);
        if (metamask.account) {
            chainIdSlice(metamask.account);
        }
    }

    useEffect(() => {
        let isMount = true;

        if (isMount) {
            // TODO wallet address'
            handleGetUser();
        }

        return () => {
            isMount = false;
        }

    }, [metamask.status]);

    return (
        <PathContainer>
            <CardListContainer>
                {isAuthenticated &&
                    <WalletAddressContainer>
                        <WalletAddressText>
                            <PolygonLogo />
                            Wallet: {
                                metamask.status === "initializing" ?
                                    "Initializing" : metamask.status === "connected" ?
                                        walletAddress : "Not Connected"
                            }
                        </WalletAddressText>
                    </WalletAddressContainer>
                }
                <CardListInnerContainer>
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                    <GameCard />
                </CardListInnerContainer>
            </CardListContainer>

            <NetworkBtn
                onClick={isAuthenticated ? mintNft : login}
            >
                {isAuthenticated ? "Mint" : "Connect Wallet"}
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


export default HomeComponent;