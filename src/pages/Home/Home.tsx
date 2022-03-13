
import React from 'react';
import styled from "styled-components";
import HomeComponent from '../../components/Home/HomeComponent';
import MainHeader from '../../Navigation/MainHeader';


const MainContainer = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    flex-direction: column;
    background-color: #222323;
`;

interface IProps {
    children: any;
}

function Home() {

    return (
        <MainContainer>
            <MainHeader btnName='Start Demo Game' url='../game/demo' />
            <HomeComponent />
        </MainContainer>
    );
}

export default Home;