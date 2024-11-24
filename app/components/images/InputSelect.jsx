import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DivTag from '../DivTag';

const InputSelect = (props) => {
    const {
        label, bgc, color, valueColor, padding, name,
        id, value, onChange,
        iconLeft, iconRight
    } = props;

    const [labelScale, setlabelScale] = useState(0.85);
    const [labelWidth, setlabelWidth] = useState(0);
    const [labelOffsetX, setlabelOffsetX] = useState(0);

    useEffect(() => {
        if (labelWidth > 0) {
            //offset after scaling
            const labelTextOffesetX = (labelWidth - (labelWidth * labelScale)) / 2;
            setlabelOffsetX(labelTextOffesetX);
        }
    }, [labelWidth]);

    const onLayout = (rect) => {
        const { width } = rect;
        // This rect is updated on every render 
        // so it's very important to check is past value is nt same as current
        if (labelWidth != width) {
            setlabelWidth(width);
        }
    };
    return (
        <DivTag
            color={ color }
            bgc={ bgc }
            bRadius={ "5px 5px 0 0" }
            lHeight={ "normal" }
        >

            <DivTag
                color={ color }
                position={ "relative" }
                zIndex={ 1 }
                padding={ "0 5px" }
            >
                <DivTag
                    onLayout={ onLayout }
                    lHeight={ 1 }
                    justifySelf={ "start" }
                    transform={ `translate(${-labelOffsetX}px, 0) scale(${labelScale})` }
                    color={ color }
                >{ label }</DivTag>

                <DivTag
                    gtc={ "auto 1fr auto" }
                    gap={ "2px" }
                >
                    { iconLeft ?
                        <DivTag align="center">
                            { iconLeft }
                        </DivTag>
                        : "" }
                    <InputSelectStyle
                        valueColor={ valueColor }
                        name={ name }
                        onChange={ onChange }
                        id={ id }
                        value={ value }
                        style={ { padding } }
                    >
                        { props.children }
                    </InputSelectStyle>
                    { iconRight ?
                        <DivTag align="center">
                            { iconRight }
                        </DivTag>
                        : "" }
                </DivTag>
            </DivTag>
        </DivTag>
    );
};

export default InputSelect;

const InputSelectStyle = styled.select`
    outline: none;
    border: unset;
    background: transparent;
    color: ${props => props.valueColor};
`;