import React from 'react';
import styled from 'styled-components';

const ListItems = (props) => {
    return (
        <ListItemsStyle
            gap={ props.gap }
            bgc={ props.bgc }
            padding={ props.padding }
            color={ props.color }
            margin={ props.margin }
            fontFamily={ props.fontFamily }
        >
            {props.children }
        </ListItemsStyle>
    );
};

export default ListItems;

const ListItemsStyle = styled.div`
    display: grid;
    grid-template-rows: max-content;
    gap: ${props => props.gap};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    background: ${props => props.bgc};
    color: ${props => props.color};
    font-family: ${props => props.fontFamily};
    /* width: 100%; */
`;
