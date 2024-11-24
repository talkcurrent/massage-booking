import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import strCapitalize from '../customHooks/strCapitalize';
import useViewPort from '../customHooks/useViewPort';
import DivTag from './DivTag';
import DP from './DP';
import ScrollerX from './ScrollerX';

const VerticalUserCard = (props) => {
    const {
        userObj, bShadow, cardBgc, cardElemBgc,
        gtr, fSize, lHeight,
        handleClick, margin, cardElemGap
    } = props;

    const dpRect = useViewPort([140]);

    useEffect(() => {

        return () => { };
    }, []);

    const handleOnClick = (action, e) => {
        if (handleClick) {
            handleClick(action, e);
        }
    };

    return (
        <Card
            bShadow={bShadow}
            margin={margin}
            cardBgc={cardBgc}
            cardElemBgc={cardElemBgc}
            gtr={gtr}
            gap={cardElemGap}
            fSize={fSize}
            lHeight={lHeight}
        >
            <DivTag align={"center"} justify={"center"} >
                <DP
                    userObj={userObj}
                    dpRect={dpRect}
                    imgClick={handleClick}
                    withFlag={true}
                />
            </DivTag>
            <DivTag align={"center"} justify={"center"}>
                <ScrollerX>
                    <h3>{strCapitalize(userObj.name)}</h3>
                </ScrollerX>
            </DivTag>
            <DivTag bShadow={"0px 0px 0px 1px #dee2e6"} />
            <div className="card-elem" onClick={e => handleOnClick("label", e)}>
                {props.children}
            </div>
        </Card>
    );
};

export default VerticalUserCard;
const Card = styled.div`
    display: grid;
    grid-template-rows: ${props => props.gtr};
    position: relative;
    gap: 2px;
    padding: 3px;
    box-shadow: ${props => props.bShadow};
    margin: ${props => props.margin};
    background: ${props => props.cardBgc};
    color: #343a40;
    font-size: ${props => props.fSize};
    line-height: ${props => props.lHeight};
    border-radius: 5px;
    cursor: default;

    .card-elem{
        display: grid;
        gap: ${props => props.gap};
        background: ${props => props.cardElemBgc};
        padding: 0 3px 0 0;
    }
`;