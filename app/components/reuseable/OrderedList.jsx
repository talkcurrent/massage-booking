import React from 'react';
import styled from 'styled-components';

const UnOrderedList = (props) => {
    const {
        lStyle, display, gtr, gtc, gaf, gap,
        align, justify, alignContent, justifyContent,
        padding, margin
    } = props;

    return (
        <UnOrderedListStyle
            lStyle={ lStyle }
            padding={ padding }
            margin={ margin }
            display={ display }
            gtr={ gtr }
            gtc={ gtc }
            gap={ gap }
            gaf={ gaf }
            align={ align }
            justify={ justify }
            alignContent={ alignContent }
            justifyContent={ justifyContent }
        >
            {props.children }
        </UnOrderedListStyle>
    );
};

export default UnOrderedList;
const UnOrderedListStyle = styled.ul`
    display: ${props => props.display};
    grid-auto-flow: ${props => props.gaf};
    grid-template-rows: ${props => props.gtr};
    grid-template-columns: ${props => props.gtc};
    gap: ${props => props.gap};
    align-items: ${props => props.align};
    justify-items: ${props => props.justify};
    align-content: ${props => props.alignContent};
    justify-content: ${props => props.justifyContent};
    list-style: ${props => props.lStyle};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
`;