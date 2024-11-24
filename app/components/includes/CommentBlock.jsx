import React, { useEffect } from 'react';
import styled from 'styled-components';

const CommentBlock = (props) => {

    return (
        <CommentBlockStyle
            bgc={ props.bgc }
            color={ props.color }
            gap={ props.gap }
            gtr={ props.gtr }
            height={ props.height }
            padding={ props.padding }
            margin={ props.margin }
            bRadius={ props.bRadius }
            fSize={ props.fSize }
        >
            {props.children }
        </CommentBlockStyle>
    );
};

export default CommentBlock;

const CommentBlockStyle = styled.div`
    background-color: ${props => props.bgc};
    color: ${props => props.color};
    height: ${props => props.height};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    border-radius: ${props => props.bRadius};
    transition: all ease-in-out 0.3s;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: ${props => props.gtr};
    overflow: hidden;
`;