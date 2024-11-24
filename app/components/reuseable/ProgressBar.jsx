import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';

const ProgressBar = React.forwardRef((props, ref) => {
    const { height, progressWidth, bgc, range, bufferedProgress, onInputRange } = props;
    const rangeElement = useRef();
    const bufferedBar = useRef();
    const progressBar = useRef();

    useImperativeHandle(ref, () => ({
        rangeEleVal: () => {
            rangeElement.current.value;
        },
        bufferedBar: () => {
            bufferedBar.current;
        },
        progressBar: () => {
            progressBar.current;
        }
    }));
    return (
        <ProgressBarStyle
            bgc={ bgc }
            height={ height }
        >
            {bufferedProgress ?
                <div
                    ref={ bufferedBar }
                    className="buffered-progress"
                    style={ { width: `${bufferedProgress}%` } }
                ></div>
                : "" }
            {/* playback progress */ }
            <div
                ref={ progressBar }
                className="progress-bar"
                style={ { width: `${progressWidth}%` } }
            ></div>
            <input
                ref={ rangeElement }
                onChange={ e => onInputRange(e) }
                value={ range }
                type="range"
                onInput={ e => onInputRange(e) }
                name="" min="0" max="100"
                className="range" />
        </ProgressBarStyle>
    );
});

export default ProgressBar;

const ProgressBarStyle = styled.div`
    display: grid;
    position: relative;
    height: ${props => props.height ? props.height : "4px"};
    width: 100%;
    border-radius: 30px;
    align-self: center;
    justify-self: center;
    cursor: pointer;
    background: gray;
    overflow: hidden;
    
    .buffered-progress{
        height: inherit;
        background: #9ea0a0;
        grid-row: 1;
        grid-column: 1;
        transition: unset;
    }

    .progress-bar{
        grid-row: 1;
        grid-column: 1;
        height: inherit;
        border-radius: inherit;
        background-color: white;
        position: relative;
        cursor: pointer;
        transition: unset;
        &::after {
            content: "";
            position: absolute;
            top: -3px;
            bottom: 0;
            right: -2px;
            border-radius: 500px;
            transition: all ease-in-out 0.4s;
        }
    }
    .range{
        height: inherit;
        transition: unset;
    }
    &:hover {
        .progress-bar {
            overflow: visible;
            &::after {
                height: 10px;
                width: 10px;
                background-color: white;
            }
        }
    }
    input[type="range"] {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none;
        width: 100%;
        height: 100%;
        outline: none;
        background-color: transparent;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin-left: -0.7px;
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none;
        height: 0px !important;
        width: 0px;
        border-radius: 50%;
        background: transparent;
        outline: none;
        cursor: pointer;
        border: none;
    }

    input[type="range"]:focus {
        outline: none;
    }

    /* MOZILLA FIREFOX INPUT RANGE STYLE */
    input[type="range"]::-moz-range-track {
        width: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
        cursor: pointer;
        background: transparent;
        border-radius: 7px;
    }

    input[type="range"]::-moz-range-thumb {
        height: 0px;
        width: 0px;
        border: none;
        border-radius: 7px;
        background: whitesmoke;
        cursor: pointer;
    }

    /* MICROSOFT EXP STYLING FOR INPUT RANGE */
    input[type="range"]::-ms-track {
        width: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    input[type="range"]::-ms-fill-lower {
        background: #ac51b5;
        border-radius: 50px;
    }

    input[type="range"]::-ms-fill-upper {
        background: transparent;
        border: none;
        border-radius: 7px;
    }

    input[type="range"]::-ms-thumb {
        height: 0px;
        width: 0px;
        border-radius: 7px;
        background: whitesmoke;
        cursor: pointer;
    }
`;
