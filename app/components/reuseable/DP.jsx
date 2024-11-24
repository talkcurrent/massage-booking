import React from 'react';
import styled from 'styled-components';
import Acronym from '../customHooks/Acronym';
import useViewPort from '../customHooks/useViewPort';
import DivTag from './DivTag';
import ImageEle from './ImageEle';
import TempDP from './TempDP';

const DP = (props) => {
    const { userObj, dpRect, imgClick, withFlag } = props;

    const flagRect = useViewPort(["20px"]);

    const handleClick = () => {
        if (props.imgClick) {
            imgClick();
        }
    };

    return (
        <DPStyle>
            {userObj.dp ?
                <ImageEle
                    src={ userObj.dp.name }
                    height={ dpRect + "px" }
                    width={ dpRect + "px" }
                    bRadius={ "50%" }
                    alt={ "" }
                    objFit={ "cover" }
                    imgClick={ handleClick }
                />
                :
                <TempDP
                    height={ dpRect + "px" }
                    width={ dpRect + "px" }
                    fSize={
                        Acronym(userObj.name).length < 3 ?
                            `${dpRect ? dpRect / 2 : dpRect / 2}px`
                            :
                            `${(dpRect ? dpRect / 2 : dpRect / 2) - 5}px`
                    }
                    // pad={ "3px" }
                    dpName={ userObj.name }
                />
            }
            {withFlag ?
                <DivTag
                    position={ "absolute" }
                    bottom={ "0px" }
                    right={ "-3px" }
                >
                    <img
                        style={ { width: flagRect, height: flagRect, objectFit: "contain" } }
                        src={ `/storage/image/flags/${userObj.country_flag}` } alt={ userObj.country } />
                </DivTag>
                : "" }
        </DPStyle>
    );
};

export default DP;

const DPStyle = styled.div`
    position: relative;
`;