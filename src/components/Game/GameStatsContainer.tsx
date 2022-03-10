import React from 'react';
import styled, { css, keyframes } from "styled-components";

const StatContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    border: 1px solid white;
`;

function GameStatsContainer() {
    return (
        <StatContainer />
    );
}

export default GameStatsContainer;