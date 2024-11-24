import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import useResolution from '../customHooks/useResolution';
import useTheme from '../customHooks/useTheme';

const AppBase = (props) => {
    const { navHeight } = props.context;
    const theme = useTheme();
    const { windowHeight } = useResolution();

    const [color, setcolor] = useState("#3f5c75");
    const [bgc, setbgc] = useState("#fcfcfd");
    const [navBgc, setnavBgc] = useState("#0d7739");
    const [navColor, setnavColor] = useState("white");
    const [buttonStyle, setbuttonStyle] = useState("solid");
    const [bgcImg, setbgcImg] = useState("");

    const [navBarHeight, setnavBarHeight] = useState(0);
    const [bodyHeight, setbodyHeight] = useState(0);

    useEffect(() => {
        if (theme.hasOwnProperty("color")) {
            setcolor(theme.color);
            setbgc(theme.background_color);
            setnavBgc(theme.nav_bgc);
            setnavColor(theme.nav_color);
            setbuttonStyle(theme.button_style);
            setbgcImg(theme.background_img);
        }
        return () => { };
    }, [theme]);


    useEffect(() => {
        const bHeight = windowHeight - navHeight;
        setnavBarHeight(navHeight);
        setbodyHeight(bHeight);

        return () => { };
    }, [windowHeight, navHeight]);

    return (
        <AppBaseStyle
            bodyHeight={props.minHeight ? bodyHeight + "px" : ""}
            setMaxBodyHeight={props.setMaxBodyHeight}
            color={color}
            bgc={bgc}
            width={props.width}
            margin={props.margin}
            padding={props.padding}
            display={props.display}
            gTR={props.gTR}
            gap={props.gap}
            buttonStyle={buttonStyle}
            bgcImg={bgcImg == null || bgcImg == undefined || bgcImg == "" ? `` : `url(/storage/image/${bgcImg})`}
        >
            {props.children}
        </AppBaseStyle>
    );
};

export default AppBase;
export const AppBaseStyle = styled.div`
    position: relative;
    display: ${props => props.display};
    grid-template-rows: ${props => props.gTR};
    color: ${props => props.color};
    gap: ${props => props.gap};
    background-color: ${props => props.bgc}; 
    background-image: ${props => props.bgcImg};
    min-height: ${props => props.bodyHeight};
    height: max-content;
    max-height: ${props => props.setMaxBodyHeight ? `${props.bodyHeight}px` : ""};
    padding: ${props => props.padding ? props.padding : "10px 0"};
    width: ${props => props.width};
    margin: ${props => props.margin};
    position: relative;
`;
