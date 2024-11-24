import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StickyContainer = (props) => {

    const container = useRef(null);

    useEffect(() => {
        return () => { };
    }, []);

    return (
        <StickyContainerStyle
            ref={ container }
            display={ props.display }
            pad={ props.pad }
            bgc={ props.bgc }
            color={ props.color }
            bShadow={ props.bShadow }
            top={ props.top }
            className={ props.sticky ? "sticky" : "" }
        >
            {props.children }
        </StickyContainerStyle>
    );
};

export default StickyContainer;

const StickyContainerStyle = styled.div`
    display: ${props => props.display};
    padding: ${props => props.pad};
    background: ${props => props.bgc};
    color: ${props => props.color};
    &.sticky{
        position: sticky;
        top: ${props => props.top};
        /* box-shadow: 0 0px 0px 0px transparent, 0 0px 0px 0px transparent, -1px 6px 9px -3px #e2dede, 0px 0 0px 0px transparent; */

    }
`;