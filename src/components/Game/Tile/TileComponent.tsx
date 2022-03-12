import styled, { css } from "styled-components";
import { ActiveTile, TileImage } from '../../../assets/images';
import { Tile as TileModel } from '../../../models/Tile';

interface IHoverProps {
    isHover: boolean;
    isActivated: boolean;
}

const Tile = styled.div<IHoverProps>`
    height: 100px;
    width: 100px;
    border: 1px solid black;
    background-image: url("${ActiveTile}");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    ${props => props.isActivated && css`background-image: url("${TileImage}");`}
    ${props => props.isActivated && props.isHover && css`background-image: url("${ActiveTile}");`}
    ${props => !props.isActivated && props.isHover && css`background-image: url("${TileImage}");`}
    
    // ${props => props.isActivated && css`background-color: red;`} // activated
    // ${props => props.isActivated && props.isHover && css`background-color: #F0BAB2`} // activated true and isover true
    // ${props => !props.isActivated && props.isHover && css`background-color: red;`} // change inactive to tile active

    
`;

interface IProps {
    tile: TileModel;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
}

function TileComponent(props: IProps) {
    const { activated, isOver } = props.tile;

    return (
        <Tile
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={{
                opacity: isOver ? 0.5 : 1
            }}
            isHover={isOver}
            isActivated={activated}
            onClick={() => {
                props.onClick();
            }}
        />
    );
}

export default TileComponent;