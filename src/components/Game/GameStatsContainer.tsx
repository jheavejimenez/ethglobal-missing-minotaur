import React from 'react';
import styled from "styled-components";
import { Tile } from '../../models/Tile';
import { Message, MessageContainer, RowContainer } from './GamePlayComponent';
import TileComponent from './Tile/TileComponent';

const StatContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface IProps {
    pattern: Array<Array<Tile>>;
}

function GameStatsContainer(props: IProps) {
    const { pattern } = props;

    return (
        <StatContainer>
            <MessageContainer>
                <Message>
                    Road Pattern
                </Message>
            </MessageContainer>
            {pattern && pattern.map((_: Array<Tile>, rowIndex: number) => {
                return (
                    <RowContainer key={rowIndex.toString()}>
                        {
                            _.map((tile: Tile, colIndex: number) => (
                                <TileComponent
                                    key={colIndex.toString()}
                                    tile={tile}
                                    onMouseEnter={() => { }}
                                    onMouseLeave={() => { }}
                                    onClick={() => { }}
                                />
                            ))
                        }

                    </RowContainer>
                );
            })}
        </StatContainer>
    );
}

export default GameStatsContainer;