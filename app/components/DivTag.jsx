"use client";

import React, { useImperativeHandle, useRef, useEffect, useState } from "react";
import styled from "styled-components";

const DivTag = React.forwardRef((props, ref) => {
    const [domready, setdomready] = useState(false)
    const element = useRef();

    useEffect(() => {
        setdomready(true)
        if (domready) {
            onLayout();
        }
    }, [domready]);

    const onLayout = () => {
        if (props.onLayout) {
            props.onLayout(element.current.getBoundingClientRect());
        }
    };

    const handleOnClick = (e) => {
        if (props.handleClick) {
            props.handleClick(e);
        }
    };

    const handleOnDragStart = (e) => {
        if (props.handleDragStart) {
            props.handleDragStart(e);
        }
    };
    const handleOnMouseDown = (e) => {
        if (props.handleMouseDown) {
            props.handleMouseDown(e);
        }
    };
    const handleOnScroll = (e) => {
        if (props.handleScroll) {
            props.handleScroll(e);
        }
    };

    return (
        domready ?
            <DivTagStyle
                ref={element || ref}
                id={props.id}
                style={props.styles}
                tabIndex={props.tabIndex}
                onFocus={props.handleFocus}
                onBlur={props.handleBlue}
                $nthchild={props.nthChild}
                $nthchildcolor={props.nthChildColor}
                $nthchildbgc={props.nthChildBgc}
                $display={props.display}
                $visibility={props.visibility}
                $bgi={props.bgi}
                $bgr={props.bgr}
                $bga={props.bga}
                $bgc={props.bgc}
                $bgp={props.bgp}
                $bgs={props.bgs}
                $color={props.color}
                $border={props.border}
                $bsizing={props.bSizing}
                $borderb={props.borderB}
                $borderl={props.borderL}
                $bordert={props.borderT}
                $borderr={props.borderR}
                $bradius={props.bRadius}
                $bshadow={props.bShadow}
                $bImage={props.bImage}
                $bWidth={props.bWidth}
                $bStyle={props.bStyle}
                $tshadow={props.tShadow}
                $hovershadow={props.hoverShadow}
                $hovercolor={props.hoverColor}
                $hoverbgc={props.hoverBgc}
                $fsize={props.fSize}
                $talign={props.tAlign}
                $lheight={props.lHeight}
                $lspacing={props.lSpacing}
                $fstyle={props.fStyle}
                $wspace={props.wSpace}
                $fweight={props.fWeight}
                $ffamily={props.fFamily}
                $padding={props.padding}
                $position={props.position}
                $top={props.top}
                $bottom={props.bottom}
                $left={props.left}
                $right={props.right}
                $margin={props.margin}
                $width={props.width}
                $minwidth={props.minWidth}
                $maxwidth={props.maxWidth}
                $height={props.height}
                $minheight={props.minHeight}
                $maxheight={props.maxHeight}
                $overflow={props.overflow}
                $opacity={props.opacity}
                $gap={props.gap}
                $gaf={props.gaf}
                $gtc={props.gtc}
                $gtr={props.gtr}
                $gar={props.gar}
                $gac={props.gac}
                $gridcol={props.gridCol}
                $gridrow={props.gridRow}
                $zindex={props.zIndex}
                $cursor={props.cursor}
                $align={props.align}
                $justify={props.justify}
                $justifycontent={props.justifyContent}
                $aligncontent={props.alignContent}
                $alignself={props.alignSelf}
                $justifyself={props.justifySelf}
                $transition={props.transition}
                $transform={props.transform}
                $hoverTransform={props.hoverTransform}
                $textdecoration={props.textDecoration}
                className={props.class}
                onClick={(e) => handleOnClick(e)}
                onScroll={(e) => handleOnScroll(e)}
                onDragStart={(e) => handleOnDragStart(e)}
                onMouseDown={(e) => handleOnMouseDown(e)}
            >
                {props.children}
            </DivTagStyle>
            : ""
    );
});

export default DivTag;
const DivTagStyle = styled.div`
    display: ${(props) => (props.$display ? props.$display : "grid")} !important;
    visibility: ${(props) => props.$visibility};
    grid-template-rows: ${(props) => props.$gtr};
    grid-template-columns: ${(props) => props.$gtc};
    grid-auto-rows: ${(props) => props.$gar};
    grid-auto-columns: ${(props) => props.$gac};
    grid-auto-flow: ${(props) => props.$gaf};
    grid-column: ${(props) => props.$gridcol};
    grid-row: ${(props) => props.$gridrow};
    padding: ${(props) => props.$padding};
    position: ${(props) => props.$position};
    top: ${(props) => props.$top};
    bottom: ${(props) => props.$bottom};
    border: ${(props) => props.$border};
    box-sizing: ${(props) => props.$bsizing};
    border-bottom: ${(props) => props.$borderb};
    border-top: ${(props) => props.$bordert};
    border-left: ${(props) => props.$borderl};
    border-right: ${(props) => props.$borderr};
    border-radius: ${(props) => props.$bradius};
    border-image: ${(props) => props.$bImage};
    border-width: ${(props) => props.$bWidth};
    border-style: ${(props) => props.$bStyle};
    text-shadow: ${(props) => props.$tshadow};
    box-shadow: ${(props) => props.$bshadow};
    font-style: ${(props) => props.$fstyle};
    left: ${(props) => props.$left};
    right: ${(props) => props.$right};
    margin: ${(props) => props.$margin};
    gap: ${(props) => props.$gap};
    text-align: ${(props) => props.$talign};
    text-decoration: ${(props) => props.$textdecoration};
    align-items: ${(props) => props.$align};
    align-content: ${(props) => props.$aligncontent};
    align-self: ${(props) => props.$alignself};
    justify-items: ${(props) => props.$justify};
    justify-content: ${(props) => props.$justifycontent};
    justify-self: ${(props) => props.$justifyself};
    background: ${(props) => props.$bgc};
    background-image: ${(props) => props.$bgi};
    background-repeat: ${(props) => props.$bgr};
    background-attachment: ${(props) => props.$bga};
    background-position: ${(props) => props.$bgp};
    background-size: ${(props) => props.$bgs};
    height: ${(props) => props.$height};
    min-height: ${(props) => props.$minheight};
    max-height: ${(props) => props.$maxheight};
    width: ${(props) => props.$width};
    min-width: ${(props) => props.$minwidth};
    max-width: ${(props) => props.$maxwidth};
    font-size: ${(props) => props.$fsize};
    line-height: ${(props) => props.$lheight};
    letter-spacing: ${(props) => props.$lspacing};
    white-space: ${(props) => props.$wspace};
    color: ${(props) => props.$color};
    cursor: ${(props) => props.$cursor};
    font-weight: ${(props) => props.$fweight};
    font-family: ${(props) => props.$ffamily};
    overflow: ${(props) => props.$overflow};
    opacity: ${(props) => props.$opacity};
    transition: ${(props) => props.$transition};
    transform: ${(props) => props.$transform};
    z-index: ${(props) => props.$zindex};
    &:hover {
        transform: ${(props) => props.$hoverTransform};
        color: ${(props) => props.$hovercolor};
        background: ${(props) => props.$hoverbgc};
        box-shadow: ${(props) => props.$hovershadow};
    }
    &:nth-of-type(${(props) => props.$nthchild}) {
        color: ${(props) => props.$nthchildcolor};
        background-color: ${(props) => props.$nthchildbgc};
    }
`;
