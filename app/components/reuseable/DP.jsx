import React from 'react';
import styled from 'styled-components';
import Acronym from '../customHooks/Acronym';
import useViewPort from '../customHooks/useViewPort';
import DivTag from './DivTag';
import TempDP from './TempDP';
import Image from 'next/image';

const DP = (props) => {
    const { obj, dpRect, imgClick, withFlag } = props;

    const flagRect = useViewPort(["20px"]);


    return (
        <DPStyle>
            {obj.dp ?
                <Image
                    src={`/reviews/${obj.dp}`}
                    height={dpRect}
                    width={dpRect}
                    alt={obj.poster}
                    style={{ borderRadius: "50%" }}
                />
                :
                <TempDP
                    height={dpRect + "px"}
                    width={dpRect + "px"}
                    fSize={
                        Acronym(obj.poster).length < 3 ?
                            `${dpRect ? dpRect / 2 : dpRect / 2}px`
                            :
                            `${(dpRect ? dpRect / 2 : dpRect / 2) - 5}px`
                    }
                    // pad={ "3px" }
                    dpName={obj.poster}
                />
            }
            {withFlag ?
                <DivTag
                    position={"absolute"}
                    bottom={"0px"}
                    right={"-3px"}
                >
                    <img
                        style={{ width: flagRect, height: flagRect, objectFit: "contain" }}
                        src={`/storage/image/flags/${obj.country_flag}`} alt={obj.country} />
                </DivTag>
                : ""}
        </DPStyle>
    );
};

export default DP;

const DPStyle = styled.div`
    position: relative;
`;