import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const ImageEle = (props) => {
    const {
        linkTo, src, objUrl, height, maxHeight, width,
        border, bRadius, alt, objFit, bgc,
        imgClick, transform
    } = props;
    const navigate = useNavigate();

    const imageClicked = (e) => {
        if (linkTo) {
            navigate(linkTo);
        } else if (imgClick) {
            imgClick(e);
        }
    };
    return (
        <ImageEleStyle
            height={ height }
            maxHeight={ maxHeight }
            width={ width }
            objFit={ objFit }
            border={ border }
            bRadius={ bRadius }
            bgc={ bgc }
            transform={ transform }
            cursor={ props.cursor }
            className={ `image-element ${props.class}` }
        >
            <img
                onClick={ imageClicked }
                key={ src }
                style={ { width: '100%', height: props.height ? props.height : '100%', borderRadius: "inherit" } }
                src={ objUrl ? objUrl : `/storage/image/${src}` } alt={ alt } />
            {props.children }
        </ImageEleStyle>
    );
};

export default ImageEle;
const ImageEleStyle = styled.div`
    height: ${props => props.height};
    max-height: ${props => props.maxHeight};
    width: ${props => props.width};
    border: ${props => props.border};
    border-radius: ${props => props.bRadius};
    background: ${props => props.bgc};
    transform: ${props => props.transform};
    /* overflow: hidden; */
    position: relative;
    box-sizing: content-box;
    img{
        object-fit:${props => props.objFit};
        cursor:${props => props.cursor};
    }
`;