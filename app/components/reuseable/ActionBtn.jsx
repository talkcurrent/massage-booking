"use client"
import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoadingBtn from './LoadingBtn';

const ActionBtn = (props) => {
    const { processing, progressText, btnText, btnClick, handleMouseDown, disabled } = props;

    return (
        <ActionBtnStyle
            $justify={props.justify}
            $display={props.display}
            $bgc={props.bgc}
            $color={props.color}
            $width={props.width}
            $height={props.height}
            $padding={props.padding}
            $border={props.border}
            $bShadow={props.bShadow}
            $bRadius={props.bRadius}
            $fWeight={props.fWeight}
            $fontSize={props.fontSize}
            $disabled={disabled}
        >
            <button
                disabled={disabled}
                onClick={e => { btnClick ? btnClick() : ""; }}
                onMouseDown={e => { handleMouseDown ? handleMouseDown() : ""; }}
            >

                {processing ?
                    <LoadingBtn text={progressText} lineHeight={"unset"}
                        fontSize={"small"} fontWeight={300} loadMore={false} />
                    : btnText}
            </button>
        </ActionBtnStyle>
    );
};

export default ActionBtn;
export const ActionBtnStyle = styled.div`
    display:${props => props.$display ? props.$display : "grid"};
    align-items: center;
    justify-items: ${props => props.$justify};
    /* margin: 2px 0; */
    button{
        border-radius: ${props => props.$bRadius ? props.$bRadius : "5px"};
        background: ${props => props.$bgc};
        box-shadow: ${props => props.$bShadow};
        color: ${props => props.$color};
        border: ${props => props.$border ? `${props.$border}!important` : ""};
        font-weight: ${props => props.$fWeight ? props.$fWeight : 400};
        width: ${props => props.$width};
        height: ${props => props.$height};
        padding: ${props => props.$padding};
        font-size: ${props => props.$fontSize};
        outline: none;
        cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
        &:hover{
            opacity: 0.8;
        }
    }
`;
