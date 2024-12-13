import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Divider from "../Divider";
import DivTag from "../DivTag";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const InputText = React.forwardRef((props, ref) => {
    const {
        label,
        color,
        inputColor,
        padding,
        name,
        disabled,
        inputType,
        listable,
        lists,
        listTitle,
        handleRemoveList,
        placeholder,
        id,
        value,
        onChange,
        width,
        error,
        iconLeft,
        iconRight,
        inputBgc,
        tabIndex,
        containerPadding,
    } = props;

    const [labelScale, setlabelScale] = useState(0.85);
    const [focused, setfocused] = useState(false);
    const [labelWidth, setlabelWidth] = useState(0);
    const [labelOffsetX, setlabelOffsetX] = useState(0);

    const inputField = useRef();

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

    const handleFocus = () => {
        setfocused(true);
        if (inputField.current) inputField.current.focus();
    };
    const handleBlue = () => {
        setfocused(false);
    };

    return (
        <DivTag
            color={color} bgc={inputBgc}
            bRadius={"5px 5px 0 0"}
            lHeight={"normal"}
            width={width + "px"}
            padding={containerPadding}
        >
            {listable && lists.length ? (
                <DivTag>
                    <h4>{listTitle}:</h4>
                    <DivTag gap={"3px"}>
                        {lists.map((list, index) => {
                            return (
                                <DivTag key={index} gtc={"auto 1fr auto"} gap={"3px"} color={"#424242"}>
                                    <span>{index + 1}.</span>
                                    <span>{list}</span>
                                    <span style={{ cursor: "pointer", color: "indianred", padding: "0 10px" }} onClick={() => handleRemoveList(index)}>
                                        <HighlightOffIcon />
                                    </span>
                                </DivTag>
                            );
                        })}
                    </DivTag>
                </DivTag>
            ) : (
                ""
            )}
            <DivTag gtc={iconLeft && iconRight ? "auto 1fr auto" : iconLeft ? "auto 1fr" : iconRight ? "1fr auto" : "1fr"} gap={"2px"}>
                {iconLeft ? (
                    <DivTag align="center" alignSelf="end">
                        {iconLeft}
                    </DivTag>
                ) : (
                    ""
                )}
                <DivTag
                    color={color}
                    position={"relative"}
                    zIndex={1}
                    padding={"0 5px"}
                    tabIndex={tabIndex} //important to let it trigger focus and blur event
                    handleFocus={handleFocus}
                    handleBlue={handleBlue}
                >
                    <DivTag onLayout={onLayout} opacity={0} lHeight={1} justifySelf={"start"} transform={`scale(${labelScale})`}>
                        {label}
                    </DivTag>

                    <DivTag position={"absolute"} left={0} top={0} bottom={0} width={"100%"} align={"end"} justify={"start"} zIndex={"-1"} padding={"5px 5px 0px 5px"}>
                        <DivTag
                            lHeight={"1.5"}
                            transition={"all 0.2s ease-in-out"}
                            transform={
                                value.length || focused || props.staticLabel ? `translate(${-(labelOffsetX + 2)}px, -16px ) scale(${labelScale})` : `translate(0px, 0px ) scale(1)`
                            }
                            color={value.length || focused || props.staticLabel ? "rgba(0, 0, 0, 0.54)" : "black"}
                        >
                            {label}
                        </DivTag>
                    </DivTag>

                    <DivTag>
                        <InputTextStyle
                            ref={ref || inputField}
                            type={inputType}
                            name={name}
                            width={width}
                            placeholder={focused ? placeholder : ""}
                            onChange={onChange}
                            id={id}
                            value={value}
                            disabled={disabled}
                            autoComplete={props.autoComplete}
                            autoFocus={props.autoFocus}
                            style={{ padding, color: inputColor }}
                            maxLength={props.maxLength}
                        // onFocus={ handleFocus }
                        // onBlur={ handleBlue }
                        />
                    </DivTag>
                </DivTag>
                {iconRight ? (
                    <DivTag align="center" alignSelf="end">
                        {iconRight}
                    </DivTag>
                ) : (
                    ""
                )}
            </DivTag>
            {props.lineIndicator != false ? <Divider color={error ? "indianred" : "silver"} height={focused || error ? 2 : 1} scale={1} /> : ""}
        </DivTag>
    );
});

export default InputText;

const InputTextStyle = styled.input`
    outline: none;
    border: unset;
    background: transparent;
    &::-webkit-calendar-picker-indicator {
        background-color: black;
    }
    &::placeholder {
        font-weight: 400;
        color: black;
        font-size: small;
    }
`;
