import React from "react";
import { styled } from "styled-components";

const UniversalBtn = ({ children, color, bgc, width, padding, ffamily, fweight, border, handleClick, bradius, bshadow, fsize, margin }) => {
    return (
        <Button
            className="universal-btn"
            onClick={() => (handleClick ? handleClick() : {})}
            color={color}
            bgc={bgc}
            bradius={bradius}
            bshadow={bshadow}
            width={width}
            fsize={fsize}
            padding={padding}
            margin={margin}
            ffamily={ffamily}
            fweight={fweight}
            border={border}
        >
            {children}
        </Button>
    );
};

export default UniversalBtn;

const Button = styled.button`
    color: ${(props) => props.color};
    background: ${(props) => props.bgc};
    width: ${(props) => props.width};
    font-size: ${(props) => props.fsize};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.bradius};
    box-shadow: ${(props) => props.bshadow};
    outline: none;
    cursor: pointer;
    font-family: ${(props) => props.ffamily};
    font-weight: ${(props) => props.fweight};
`;
