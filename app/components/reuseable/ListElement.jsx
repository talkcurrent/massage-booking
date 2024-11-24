import React from 'react';
import styled from 'styled-components';

const ListElement = (props) => {

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
        <ListElementStyle
            nthChild={ props.nthChild }
            nthChildBgc={ props.nthChildBgc }
            display={ props.display }
            visibility={ props.visibility }
            bgc={ props.bgc }
            color={ props.color }
            border={ props.border }
            borderB={ props.borderB }
            bRadius={ props.bRadius }
            bShadow={ props.bShadow }
            hoverShadow={ props.hoverShadow }
            hoverColor={ props.hoverColor }
            hoverBgc={ props.hoverBgc }
            fSize={ props.fSize }
            tAlign={ props.tAlign }
            lHeight={ props.lHeight }
            lSpacing={ props.lSpacing }
            fStyle={ props.fStyle }
            wSpace={ props.wSpace }
            fWeight={ props.fWeight }
            fFamily={ props.fFamily }
            padding={ props.padding }
            position={ props.position }
            top={ props.top }
            bottom={ props.bottom }
            left={ props.left }
            right={ props.right }
            margin={ props.margin }
            width={ props.width }
            minWidth={ props.minWidth }
            maxwidth={ props.maxWidth }
            height={ props.height }
            minHeight={ props.minHeight }
            maxHeight={ props.maxHeight }
            overflow={ props.overflow }
            opacity={ props.opacity }
            gap={ props.gap }
            gaf={ props.gaf }
            gtc={ props.gtc }
            gtr={ props.gtr }
            gar={ props.gar }
            gAutoRow={ props.gAutoRow }
            gAutoColumn={ props.gAutoColumn }
            gridCol={ props.gridCol }
            gridRow={ props.gridRow }
            zIndex={ props.zIndex }
            cursor={ props.cursor }
            align={ props.align }
            justify={ props.justify }
            justifyContent={ props.justifyContent }
            alignContent={ props.alignContent }
            alignSelf={ props.alignSelf }
            justifySelf={ props.justifySelf }
            transition={ props.transition }
            textDecoration={ props.textDecoration }
            className={ props.class }
            onClick={ (e) => handleOnClick(e) }
            onScroll={ (e) => handleOnScroll(e) }
            onDragStart={ (e) => handleOnDragStart(e) }
            onMouseDown={ (e) => handleOnMouseDown(e) }
        >
            {props.children }
        </ListElementStyle>
    );
};

export default ListElement;

const ListElementStyle = styled.li`
    display: ${props => props.display ? props.display : "grid"};
    visibility: ${props => props.visibility};
    grid-template-rows: ${props => props.gtr};
    grid-template-columns: ${props => props.gtc};
    grid-auto-rows: ${props => props.gar};
    grid-auto-flow: ${props => props.gaf};
    grid-column: ${props => props.gridCol};
    grid-row: ${props => props.gridRow};
    padding: ${props => props.padding};
    position: ${props => props.position};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    border: ${props => props.border};
    border-bottom: ${props => props.borderB};
    border-radius: ${props => props.bRadius};
    box-shadow: ${props => props.bShadow};
    font-style: ${props => props.fStyle};
    left: ${props => props.left};
    right: ${props => props.right};
    margin: ${props => props.margin};
    gap: ${props => props.gap};
    text-align: ${props => props.tAlign};
    text-decoration: ${props => props.textDecoration};
    align-items: ${props => props.align};
    align-content: ${props => props.alignContent};
    align-self: ${props => props.alignSelf};
    justify-items: ${props => props.justify};
    justify-content: ${props => props.justifyContent};
    justify-self: ${props => props.justifySelf};
    background: ${props => props.bgc};
    height: ${props => props.height};
    min-height: ${props => props.minHeight};
    max-height: ${props => props.maxHeight};
    width: ${props => props.width};
    min-width: ${props => props.minWidth};
    max-width: ${props => props.maxwidth};
    font-size: ${props => props.fSize};
    line-height: ${props => props.lHeight};
    letter-spacing: ${props => props.lSpacing};
    white-space: ${props => props.wSpace};
    color: ${props => props.color};
    cursor: ${props => props.cursor};
    font-weight: ${props => props.fWeight};
    font-family: ${props => props.fFamily};
    overflow: ${props => props.overflow};
    opacity: ${props => props.opacity};
    transition: ${props => props.transition};
    z-index: ${props => props.zIndex};
    &:hover{
        color: ${props => props.hoverColor};
        background: ${props => props.hoverBgc};
        box-shadow: ${props => props.hoverShadow};
    }
    &:nth-child(${props => props.nthChild}) {
        background: ${props => props.nthChildBgc};
    }
`;