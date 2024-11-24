import React from 'react';
import styled from 'styled-components';
import DivTag from './DivTag';

const ScrollerXXShadow = (props) => {
    const { windowWidth, prevShow, nextShow } = props;
    return (
        <React.Fragment>
            { prevShow ?
                <PrevControlStyle
                    windowWidth={ windowWidth }
                >
                    <DivTag
                        visibility={ "visible" }
                        height={ "100%" }
                        width={ "1px" }
                        bShadow={ "0px 0px 8px 3px silver" }
                    />
                </PrevControlStyle>
                : ""
            }
            { nextShow ?
                <NextControlStyle
                    windowWidth={ windowWidth }
                >
                    <DivTag
                        visibility={ "visible" }
                        height={ "100%" }
                        width={ "1px" }
                        bShadow={ "0px 0px 8px 3px silver" }
                    />
                </NextControlStyle>
                : ""
            }
        </React.Fragment>
    );
};

export default ScrollerXXShadow;
export const NextControlStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    position: absolute;
    top: 0;
    right:  0;
    bottom: 0;
    visibility: hidden;
    z-index: 11;
`;
export const PrevControlStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    position: absolute;
    top: 0;
    left:  0;
    bottom: 0;
    visibility: hidden;
    z-index: 11;
`;
