import React from 'react';
import styled, { CSSProperties } from "styled-components";

const GameStartBtn = styled.a`
    background-color: #000;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 30px;
`;

export default function NavLink(props: { name: string, urlName: string, style?: CSSProperties }) {
    const { urlName, name, style } = props;
    return (
        <GameStartBtn href={`/${urlName}`} style={style}>
            {name}
        </GameStartBtn>
    );
}