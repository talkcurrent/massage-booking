import React from 'react';
import styled from 'styled-components';

const BottonNCounts = (props) => {
    return (
        <BottonNCountsStyle
            countColor={ props.countColor }
            bgc={ props.bgc }
            padding={ props.count ? "0 4px" : "0" }
        >
            {props.children }
            <span className={ "data-count" }>{ props.count }</span>
        </BottonNCountsStyle>
    );
};

export default BottonNCounts;
const BottonNCountsStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    gap: 1px;
    position: relative;
    .data-count{
        align-self: start;
        color: ${props => props.countColor ? props.countColor : "#969696"};
        background: ${props => props.bgc ? props.bgc : "white"};
        /* -webkit-font-smoothing: antialiased; */
        font-weight: 500;
        font-size: x-small;
        position: relative;
        left: -7px;
        display: grid;
        align-content: center;
        justify-content: center;
        padding: 0px 4px;
        padding: ${props => props.padding};
        border-radius: 30px;
        line-height: normal;
    }
`;