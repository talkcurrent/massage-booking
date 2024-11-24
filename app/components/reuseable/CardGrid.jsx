import React from 'react';
import styled from 'styled-components';

const CardGrid = (props) => {
    const { gtcMin, gAutoRows, gap, padding, justify, align } = props;
    return (
        <CardGridStyle
            gtcMin={ gtcMin }
            gAutoRows={ gAutoRows }
            gap={ gap }
            padding={ padding }
            justify={ justify }
            align={ align }
        >
            {props.children }
        </CardGridStyle>
    );
};

export default CardGrid;
const CardGridStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${props => props.gtcMin}, 1fr));
    grid-auto-rows: ${props => props.gAutoRows};
    justify-items: ${props => props.justify};
    align-items: ${props => props.align};
    gap: ${props => props.gap};
    padding: ${props => props.padding};
    a{
        text-decoration: none;
    }
`;
