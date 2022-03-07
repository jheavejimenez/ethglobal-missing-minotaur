import React from 'react';
import styled, { css, keyframes } from "styled-components";

const Tile = styled.div`
    height: 100px;
    width: 100px;
    border: 1px solid red;
`;

function TileComponent() {
    return (
        <Tile />
    );
}


export default TileComponent;