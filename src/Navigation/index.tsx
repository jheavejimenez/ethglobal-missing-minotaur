import React from 'react';
import styled from "styled-components";

import {
    Routes,
    Route,
    Link,

} from "react-router-dom";
import Home from '../pages/Home/Home';
import Game from '../pages/Game/Game';


const MainContainer = styled.div`
    flex: 1;
    height: 100vh;
    width: 100%;
`;


export default function Navigation() {
    return (
        <MainContainer>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:game_type" element={<Game />} />
            </Routes>
        </MainContainer>

    );
}