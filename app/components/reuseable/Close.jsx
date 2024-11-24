"use client";

import React from 'react';
import styled from 'styled-components';
import useViewPort from '../customHooks/useViewPort';
import CloseIcon from '@mui/icons-material/Close';

const Close = (props) => {
    const { top, right, bottom, left, handleClick, absolute } = props;

    const LxB = useViewPort(["30px"]);
    const fontSize = useViewPort(["20px",]);
    const fWeight = useViewPort(["400", "300", "100"]);

    return (
        <ClosePop
            $top={top}
            $right={right}
            $bottom={bottom}
            $absolute={absolute}
            $left={left}
            $height={LxB}
            $width={LxB}
            $fontSize={props.fontSize ? props.fontSize : fontSize}
            $fWeight={fWeight}
            $bgc={props.bgc}
            $color={props.color}
            $pad={props.pad}
            $onClick={e => handleClick(e)}
        >
            <CloseIcon />
        </ClosePop>
    );
};

export default Close;
export const ClosePop = styled.div`
    position: ${props => props.$absolute === true ? "absolute" : ""};
    top: ${props => props.$top};
    right: ${props => props.$right};
    bottom: ${props => props.$bottom};
    left: ${props => props.$left};
    /* padding:  ${props => props.$pad}; */
    display: grid;
    align-items: center;
    align-content: center;
    justify-items: center;
    color: ${props => props.$color ? props.$color : "indianred"};
    background: ${props => props.$bgc ? props.$bgc : "#f8f9fac9"};
    height: ${props => props.$height ? props.$height : "30px"};
    width: ${props => props.$width ? props.$width : "30px"};
    border-radius: 50%;
    cursor: pointer;
    z-index: 30;
    font-size: 20px;
`;