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

const CardContainer = styled.div<IProps>`
    display: flex;
    height: 400px;
    width: 400px;
    border: 1px solid white;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    ${props => css`background-image: url("${props.src}")`}

`;

export default function GameCard() {
    const Web3Api = useMoralisWeb3Api();
    const [nfts, setNfts] = useState<Array<UserNft> | null>(null);
    const [tokenUris, setTokenUris] = useState<Array<TokenUri> | null>(null);

    const { Moralis, isAuthenticated, account } = useMoralis();
    Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID })
    const fetchNFTsForContract  = async () => {
        const polygonNFTs = await Web3Api.account.getNFTsForContract({
            chain: "mumbai",
            address: account!,
            token_address: CONTRACT_ADDRESS,
        })

        if(polygonNFTs.result && polygonNFTs.result.length > 0){
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
            handleGetTokenUri(fetchNFTS);
        } 
    };

    const handleGetTokenUri = (data: Array<UserNft>) => {
        const tempTokenUris: Array< TokenUri > =[];
        const gateWayURL = "https://gateway.moralisipfs.com/ipfs"
        data.map(async (nft: UserNft, index: number) => {
            await axios.get(nft.token_uri)
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
                    newTokenUri.image =  `${gateWayURL}${newTokenUri.image.slice(6, newTokenUri.image.length)}`;
                    tempTokenUris.push(newTokenUri);
                }).catch((error: any) => {
                    throw error;
                }); 
        });

        setTokenUris(tempTokenUris);
    }


    useEffect(() => {
        fetchNFTsForContract();
    }, []);

    return (
        <React.Fragment>
            {isAuthenticated && tokenUris && tokenUris.map((tokenUri: TokenUri, index: number) => (
                <CardContainer
                key={index}
                src={tokenUri.image}
                >
                </CardContainer>
            ))}
        </React.Fragment>

    );
}