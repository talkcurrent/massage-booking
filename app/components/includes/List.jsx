import React from 'react';
import styled from 'styled-components';

const List = React.forwardRef((props, ref) => {

    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
        }
    };
    return (
        <ListStyle
            ref={ ref }
            nthChild={ props.nthChild }
            nthChildBgc={ props.nthChildBgc }
            gtc={ props.gtc }
            padding={ props.padding }
            gap={ props.gap }
            cursor={ props.cursor }
            fSize={ props.fSize }
            onClick={ handleClick }
        >
            {props.children }
        </ListStyle>
    );
});

export default List;

const ListStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: ${props => props.gtc};
    padding: ${props => props.padding};
    gap: ${props => props.gap};
    font-size: ${props => props.fSize};
    align-items: center;
    cursor: ${props => props.cursor};
    &:nth-child(${props => props.nthChild}) {
        background: ${props => props.nthChildBgc};
    }
`;