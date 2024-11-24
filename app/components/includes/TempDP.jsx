import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Acronym from '../customHooks/Acronym';
import { randNumWitRange } from '../reuseable/randNumWitRange';
import FavoriteColors from './FavoriteColors';

const TempDP = (props) => {
    const { width, height, fSize, pad, dpName } = props;
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
            width={ width }
            height={ height }
            pad={ pad }
            bgc={ bgc }
            fSize={ fSize }
        >
            <span>{ acronym }</span>
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
    font-size: ${props => props.fSize};
    padding: ${props => props.pad};
    border-radius: 50%;
    color: whitesmoke;
`;