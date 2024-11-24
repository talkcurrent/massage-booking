import React from 'react';
import styled from 'styled-components';

const ArrowLeft = (props) => {
    return (
        <ArrowLeftStyle
            size={ props.size }
            bgc={ props.bgc }
        >
            <div className="arrow"></div>
        </ArrowLeftStyle>
    );
};

export default ArrowLeft;

const ArrowLeftStyle = styled.div` 
    display: grid;
    align-items: center;
    justify-items: start;
    visibility: hidden;
    position: absolute;
    left: 100%;
    z-index: 2;
    top: 0;
    height: 100%;
    .arrow{
        visibility: visible;
        border-right: ${props => props.size} solid transparent;
        border-top: ${props => props.size} solid transparent;
        border-bottom: ${props => props.size} solid transparent;
        border-left: ${props => props.size} solid ${props => props.bgc};
    }
`;