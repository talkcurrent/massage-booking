import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DivTag from "../DivTag";
import Divider from "../Divider";

const InputSelect = (props) => {
    const {
        label, inputBgc, color, error,
        valueColor, padding, name, id, value, onChange, tabIndex,
        width, iconLeft, iconRight, containerPadding
    } = props;

    const [labelScale, setlabelScale] = useState(0.85);
    const [labelWidth, setlabelWidth] = useState(0);
    const [labelOffsetX, setlabelOffsetX] = useState(0);

    useEffect(() => {
        if (labelWidth > 0) {
            //offset after scaling
            const labelTextOffesetX = (labelWidth - labelWidth * labelScale) / 2;
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
            padding={containerPadding}
            color={color} bgc={inputBgc}
            bRadius={"5px 5px 0 0"} lHeight={"normal"}
            width={props.width + "px"} overflow={"hidden"}
        >
            <DivTag width={props.width + "px"} color={color} overflow={"hidden"} position={"relative"} zIndex={1} padding={"0 5px"} tabIndex={tabIndex}>
                <DivTag
                    width={props.width + "px"}
                    overflow={"hidden"}
                    gtc={iconLeft && iconRight ? "38px 1fr 38px" : iconLeft ? `38px 1fr` : iconRight ? `1fr 38px` : `1fr`}
                    gap={"2px"}
                >
                    {iconLeft ? <DivTag align="center">{iconLeft}</DivTag> : ""}
                    <DivTag>
                        <DivTag
                            onLayout={onLayout}
                            lHeight={"1.5"}
                            justifySelf={"start"}
                            transform={`translate(${-labelOffsetX}px, 0) scale(${labelScale})`}
                            color={"rgba(0, 0, 0, 0.54)"}
                        >
                            {label}
                        </DivTag>
                        <InputSelectStyle
                            $valuecolor={valueColor}
                            name={name}
                            $width={"100%"}
                            onChange={onChange}
                            id={id}
                            value={value}
                            style={{ padding }}
                        >
                            {props.children}
                        </InputSelectStyle>
                    </DivTag>
                    {iconRight ? <DivTag align="center">{iconRight}</DivTag> : ""}
                </DivTag>
                {props.lineIndicator != false ? <Divider color={error ? "indianred" : "silver"} height={error ? 2 : 1} scale={1} /> : ""}
            </DivTag>
        </DivTag>
    );
};

export default InputSelect;

const InputSelectStyle = styled.select`
    outline: none;
    border: unset;
    background: transparent;
    color: ${(props) => props.$valuecolor};
    width: ${(props) => props.$width};
`;
