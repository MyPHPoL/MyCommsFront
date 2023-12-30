import React from "react";
import styled from "styled-components";

interface ButtonProps {
    name: string;
    picture?: string;
}

export var colors = ['#d4ac0d', '#d35400', '#a9cce3', '#d7bde2', '#28b463', '#34495e', '#abebc6', '#eaecee', '#633974', '#ebdef0', '#17a589', '#2e86c1'];

// using styled-components as a test (works fine)
const StyledButton1 = styled.button<{ $color: string; $picture?: string;}>`
    background-image: url(${props => props.$picture});
    background-size: cover;
    background-color: ${props =>props.$color};
    border: none;
    color: black;
    font-weight: bold;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: ${props => props.$picture ? '0px' : '25px'};
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 200ms ease-in-out;
    &:hover {
        border-radius: 40%;
        filter: brightness(0.85);
    }
`;

export default function StyledButton({ name, picture }: ButtonProps) {
    return (
        <div className="relative flex items-center justify-center m-5">
            <StyledButton1 $color={colors[Math.floor(Math.random() * colors.length)]} $picture={picture}>{name[0].toUpperCase()}</StyledButton1>
        </div>
    );
}
