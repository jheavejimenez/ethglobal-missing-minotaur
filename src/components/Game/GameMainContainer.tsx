
import styled from "styled-components";
import { Grid } from '../../models/Grid';
import { Tile } from '../../models/Tile';
import GamePlayComponent from './GamePlayComponent';
import GameStatsContainer from './GameStatsContainer';

const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: calc(100vh - 100px);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #222323;
`;

const GameTitle = styled.h1`
    text-align: center;
    color: #fff;
`;

interface IProps {
    game: Grid;
    pattern: Array<Array<Tile>>;
    setGame: (_: Grid) => void;
}

function GameMainContainer(props: IProps) {
    const { game, pattern, setGame } = props;

    return (
        <MainContainer>
            <GamePlayComponent
                game={game}
                roadPattern={pattern}
                setGame={setGame}
            />
            <GameStatsContainer
                pattern={pattern}
            />
        </MainContainer>
    );
}

export default GameMainContainer;