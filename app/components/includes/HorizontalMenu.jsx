import React from 'react';
import styled from 'styled-components';

const HorizontalMenu = (props) => {
    const {
        align, justify, gap, bgc, border, bRadius, bShadow,
        margin, width, lineHeight, padding, zIndex
    } = props;
    return (
        <MenuStyle
            align={ align }
            padding={ padding }
            zIndex={ zIndex }
            justify={ justify }
            gap={ gap }
            bgc={ bgc }
            border={ border }
            bRadius={ bRadius }
            bShadow={ bShadow }
            margin={ margin }
            width={ width }
            lineHeight={ lineHeight }
        >
            { props.children }
        </MenuStyle>
    );
};

export default HorizontalMenu;

const MenuStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap:${props => props.gap};
    background-color:${props => props.bgc};
    margin:${props => props.margin};
    padding:${props => props.padding};
    width:${props => props.width};
    line-height:${props => props.lineHeight};
    border-radius:${props => props.bRadius};
    box-shadow:${props => props.bShadow};
    border:${props => props.border};
    justify-items:${props => props.justify};
    align-items:${props => props.align};
    z-index: ${props => props.zIndex ? props.zIndex : 1};
`;