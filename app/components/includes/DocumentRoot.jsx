import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import useResolution from '../customHooks/useResolution';
import useTheme from '../customHooks/useTheme';
import { CommonContext } from '../index/CommonContext';
import FooterNav from '../nav/FooterNav';
import ActionBtn from '../reuseable/ActionBtn';
import DivTag from '../reuseable/DivTag';

const DocumentRoot = (props) => {
    const { navHeight } = useContext(CommonContext);

    const [navBarHeight, setnavBarHeight] = useState(0);
    const [bodyHeight, setbodyHeight] = useState(0);
    const [display, setdisplay] = useState("block");

    const { windowWidth, windowHeight } = useResolution();
    const theme = useTheme();

    useEffect(() => {
        const bHeight = windowHeight - navHeight;
        setnavBarHeight(navHeight);
        setbodyHeight(bHeight);
        if (Number(navHeight) > 10) {
            setdisplay("grid");
        }
        return () => { };
    }, [windowHeight, navHeight]);

    return (
        <DocumentRootStyle
            //if children props contain nav, navable should be true
            gtr={props.navable !== false ? `${navBarHeight}px 1fr` : "1fr"} //`${navBarHeight}px max-content`
            display={props.navable !== false ? "grid" : display}
            bgc={props.bgc}
            width={
                window.screen.width <= 768 ? window.screen.width + "px" :
                    windowWidth < 1366 ? windowWidth + "px" : "1366px"
            }
            windowHeight={window.innerHeight}
            windowWidth={window.innerWidth}
            className={"document-base"}
        >
            {props.children}
            {props.showPostButton === true ?
                <DivTag
                    position={"fixed"}
                    bottom={"2px"}
                    right={"2px"}
                    lSpacing={"2px"}
                    fFamily={"serif, san-serif"}
                    zIndex={30}
                >
                    <ActionBtn
                        btnText={<><i className={"fa-solid fa-bullhorn"}></i></>}
                        bRadius={"50%"}
                        bShadow={`0px 0px 20px 3px #6d6d6d`}
                        btnClick={() => props.createPost()}
                        bgc={theme.nav_color}
                        color={theme.touch}
                        border={"unset"}
                        fWeight={600}
                        fontSize={"xx-large"}
                        width={"55px"}
                        height={"55px"}
                    />
                </DivTag>
                : ""}
            {props.showFooter !== false ? <FooterNav /> : ""}
        </DocumentRootStyle>
    );
};

export default DocumentRoot;
export const DocumentRootStyle = styled.div`
    display: ${props => props.display};
    background-color: ${props => props.bgc};
    grid-template-rows: ${props => props.gtr};
    min-height: ${props => props.windowHeight + "px"};
    max-width: ${props => props.width};
    width: ${props => props.width};
    margin: ${props => props.windowWidth < 1366 ? "" : "0 auto"};
    /* max-height: 100vh; */
    /* overflow: auto; */
    /* overflow-x: hidden; */
    position: relative;
`;
