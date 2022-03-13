import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { NetworkBtn } from '../Button';
import { chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl, CONTRACT_ADDRESS, CONTRACT_ABI, MORALIS_SERVER_URL, MORALIS_APP_ID, CONTRACT_GAME_ADDRESS, CONTRACT_GAME_ABI } from '../../constants/moralisConstants'
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import detectEthereumProvider from '@metamask/detect-provider';
import GameCard from '../../components/Game/Card/GameCard';
import { useMetaMask } from "metamask-react";
import Logo from "../../assets/images/polygonlogo.png";
import UserNft from "../../models/UserNft";
import TokenUri from "../../models/TokenUri";
import axios from "axios";
import NavLink from "../Button/GameStartBtn";
import { GameStakeBtn } from "../Button/GameStakeBtn";
import { useNavigate } from "react-router-dom";

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
    justify-content: space-evenly;
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
    const navigation = useNavigate();
    const { authenticate, isAuthenticated, isAuthenticating, logout, Moralis, account } = useMoralis();
    const [walletAddress, setWalletAddress] = useState<string>("");
    const metamask = useMetaMask();
    const web3 = useWeb3ExecuteFunction();
    Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID })

    const Web3Api = useMoralisWeb3Api();
    const [nfts, setNfts] = useState<Array<UserNft> | null>(null);
    const [tokenUris, setTokenUris] = useState<Array<TokenUri> | null>(null);

    const fetchNFTsForContract = async () => {
        const polygonNFTs = await Web3Api.account.getNFTsForContract({
            chain: "mumbai",
            address: account!,
            token_address: CONTRACT_ADDRESS,
        })

        if (polygonNFTs.result && polygonNFTs.result.length > 0) {
            const fetchNFTS = polygonNFTs.result.map((response: any, index: number) => {
                return new UserNft(
                    response.amount,
                    response.block_number,
                    response.block_number_minted,
                    response.contract_type,
                    response.frozen,
                    response.is_valid,
                    response.metadata,
                    response.name,
                    response.owner_of,
                    response.symbol,
                    response.synced_at,
                    response.syncing,
                    response.token_address,
                    response.token_id,
                    response.token_uri,
                )
            });

            setNfts(fetchNFTS);
            return handleGetTokenUri(fetchNFTS);
        }
    };

    const handleGetTokenUri = async (data: Array<UserNft>) => {
        const tempTokenUris: Array<TokenUri> = [];
        const gateWayURL = "https://gateway.moralisipfs.com/ipfs";
        let promises: any[] = [];

        console.log("test");

        data.map((nft: UserNft, index: number) => {
            promises.push(
                axios.get(nft.token_uri)
                    .then((response: any) => {
                        const data = response.data;
                        const newTokenUri = new TokenUri(
                            data.name,
                            data.description,
                            data.image,
                            data.dna,
                            data.edition,
                            data.date,
                            data.attributes,
                            data.compiler,
                        );
                        newTokenUri.image = `${gateWayURL}${newTokenUri.image.slice(6, newTokenUri.image.length)}`;
                        tempTokenUris.push(newTokenUri);
                    }).catch((error: any) => {
                        throw error;
                    })
            );
        });

        Promise.all(promises).then(() => {
            setTokenUris(tempTokenUris);
        });
    }

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
                //TODO: edit ETH value
                msgValue: Moralis.Units.ETH(0.01),
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const stakeMatic = async () => {
        console.log('stake')
        await web3.fetch({
            params: {
                contractAddress: CONTRACT_GAME_ADDRESS,
                functionName: "mint",
                abi: CONTRACT_GAME_ABI,
                //TODO: edit ETH value
                msgValue: Moralis.Units.ETH(0.01),
            }
        })
            .then((response) => {
                console.log(response);
                navigation("../game/start", { replace: true })
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
                    fetchNFTsForContract();
                })
                .catch(function (error) { console.log(error); });
        }
    }

    const logOut = async () => {
        await logout();
        console.log("logged out");
    }

    function handleGetUser() {
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


    useEffect(() => {
        fetchNFTsForContract();
    }, []);

    return (
        <PathContainer>
            <CardListContainer>
                {isAuthenticated &&
                    <React.Fragment>
                        <GameStakeBtn
                            onClick={stakeMatic}
                        >
                            Game Start
                        </GameStakeBtn>
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
                    </React.Fragment>
                }

                <CardListInnerContainer>
                    <GameCard tokenUris={tokenUris!} />
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