import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Acronym from '../customHooks/Acronym';
import FavoriteColors from './FavoriteColors';

const TempDP = (props) => {
    const { width, height, fSize, pad, dpName, border } = props;
    const [bgc, setbgc] = useState("gray");

    const acronym = Acronym(dpName);

    useEffect(() => {
        // const colorIndex = randNumWitRange(10);
        // const color = FavoriteColors(colorIndex);
        const color = FavoriteColors(0);
        if (color) {
            setbgc(color);
        }
    }, []);

    return (
        <TempDPStyle
            width={width}
            height={height}
            pad={pad}
            bgc={bgc}
            fsize={fSize}
            border={border}
            cursor={props.cursor}
        >
            <span>{acronym}</span>
            {props.children}
        </TempDPStyle>
    );
};

export default TempDP;
const TempDPStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    background: ${props => props.bgc};
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.fsize};
    padding: ${props => props.pad};
    border: ${props => props.border};
    border-radius: 50%;
    color: whitesmoke;
    box-sizing: content-box;
    position: relative;
`;