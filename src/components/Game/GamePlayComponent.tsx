import React, { useState } from "react";
import styled from "styled-components";
import { Activate, GameOver, Hovered } from "../../controller";
import { Grid } from "../../models/Grid";
import { Tile } from "../../models/Tile";
import TileComponent from "./Tile/TileComponent";

const PathContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const MessageContainer = styled.div`
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Message = styled.p`
    color: #fff;
    font-size: 20px;
`

interface IProps {
    game: Grid;
    setGame: (_: Grid) => void;
    roadPattern: Array<Array<Tile>>;
}

function GamePlayComponent(props: IProps) {
    const { game, setGame, roadPattern } = props;
    const [message, setMessage] = useState<string>("Good luck!");

    const [overrideClick, setOverrideClick] = useState<boolean>(false);

    const handleHover = (tile: Tile) => {

        const { top, bottom, left, right } = Hovered(tile, game);
        if (bottom) {
            game.grid[bottom.y][bottom.x].isOver = !bottom.isOver;
        }
        if (top) {
            game.grid[top.y][top.x].isOver = !top.isOver;
        }
        if (left) {
            game.grid[left.y][left.x].isOver = !left.isOver;
        }
        if (right) {
            game.grid[right.y][right.x].isOver = !right.isOver;
        }

        game.grid[tile.y][tile.x].isOver = !tile.isOver;

        setGame({ ...game });
    }


    const handleOnPressActivate = (x: number, y: number,) => {
        Activate({
            x: x,
            y: y,
            game: game,
            setState: setGame
        });

        if (GameOver(game.grid, roadPattern)) {
            console.log("Game Over");
            setMessage("Game Over! You win!");
        }
    }


    return (
        <PathContainer>
            <MessageContainer>
                <Message>
                    {message}
                </Message>
            </MessageContainer>
            {game && game.grid.map((_: Array<Tile>, rowIndex: number) => {
                return (
                    <RowContainer key={rowIndex.toString()}>
                        {
                            _.map((tile: Tile, colIndex: number) => (
                                <TileComponent
                                    key={colIndex.toString()}
                                    tile={tile}
                                    onMouseEnter={() => {
                                        handleHover(tile);
                                        setOverrideClick(false);
                                    }}
                                    onMouseLeave={() => {
                                        if (!overrideClick) {
                                            handleHover(tile);
                                        }
                                    }}
                                    onClick={() => {
                                        setOverrideClick(true);
                                        handleOnPressActivate(tile.x, tile.y);
                                        handleHover(tile);
                                    }}
                                />
                            ))
                        }

                    </RowContainer>
                );
            })}
        </PathContainer>
    );
}

export default GamePlayComponent;