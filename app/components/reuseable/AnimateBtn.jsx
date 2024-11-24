"use client"
import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { randNumWitRange } from './randNumWitRange';
import LoadingBtn from './LoadingBtn';

const AnimateBtn = (props) => {
    const [direction, setDirection] = useState("to-right");
    var tymout = useRef(null);

    const handleHover = () => {
        const value = randNumWitRange(4, 'number');

        switch (value) {
            case 0:
                tymout.current = setTimeout(() => {
                    setDirection("to-right");
                }, 300);//because animation transition took 0.3s to finish
                break;
            case 1:
                tymout.current = setTimeout(() => {
                    setDirection("to-left");
                }, 300);
                break;
            case 2:
                tymout.current = setTimeout(() => {
                    setDirection("to-bottom");
                }, 300);
                break;
            case 3:
                tymout.current = setTimeout(() => {
                    setDirection("to-top");
                }, 300);
                break;
        }
    };
    useEffect(() => {
        clearTimeout(tymout.current)
        return () => { clearTimeout(tymout.current); };
    }, [direction]);

    const { btnText, bgc, justify, animateColor, animateBgColor, color, loading, boxShadow, loadingText, handleClick } = props;
    return (
        <UploadBtn
            $direction={direction}
            $animatebgcolor={animateBgColor}
            $bgc={bgc}
            $color={color}
            $animatecolor={animateColor}
            $boxShadow={boxShadow}
            $justify={justify}
        >
            <button
                onMouseLeave={handleHover}
                onClick={e => handleClick(e)}
                disabled={loading}
                style={props.buttonStyle}
            >
                <span className={`${loading != true && direction}`}></span>
                <span className={`btn-text`}>{loading ? <LoadingBtn text={loadingText} /> : btnText}</span>
            </button>
        </UploadBtn>
    );
};

export default AnimateBtn;
export const UploadBtn = styled.div`
    display: grid;
    justify-items: ${props => props.$justify};
    align-self: center;
    /* margin-bottom: 5px; */
    position: relative;
    overflow: hidden;
    padding: 4px;
    text-decoration: none;
    button{
        outline-color: unset;
        border: unset;
        color: ${props => props.$color};
        background: ${props => props.$bgc};
        padding: 0px 8px;
        border-radius: 30px;
        position: relative;
        overflow: hidden;
        transition: all ease-in-out 0.3s;
        z-index: 1;
        box-shadow: ${props => props.$boxShadow};
        &:focus{
            outline: none;
        }
        .to-right, .to-left, .to-bottom, .to-top{
            position: absolute;
            background:${props => props.$animatebgcolor};
            z-index: -1;
            transition: all ease-in-out 0.3s;
            /* opacity: 0.7; */
        }
        .to-right{
            top: 0;
            left: 0;
            bottom: 0;
            right: unset;
            width: 0;
        }
        .to-left{
            top: 0;
            bottom: 0;
            right: 0;
            width: 0;
        }
        .to-bottom{
            top: 0;
            left: 0;
            right:0;
            height: 0;
        }
        .to-top{
            left: 0;
            bottom: 0;
            right: 0;
            height: 0;
        }

        &:hover{
            color: ${props => props.$animatecolor ? props.$animatecolor : props.$bgc};
            background: ${props => props.$animatebgcolor};
            .to-left{
                width: 100%;
            }
            .to-right{
                width: 100%;
            }
            .to-bottom{
                height: 100%;
            }
            .to-top{
                height: 100%;
            }
        }
    }
`;