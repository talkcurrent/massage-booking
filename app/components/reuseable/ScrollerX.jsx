"use client";

import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Title from "./Title";
import useResolution from "../customHooks/useResolution";
import ScrollerXXShadow from "./ScrollerXXShadow";
import useSelection from "../customHooks/useSelection";
import DivTag from "./DivTag";

const ScrollerX = (props) => {
    const [scrolledLeft, setscrolledLeft] = useState(0);
    const [prevShow, setprevShow] = useState(false);
    const [nextShow, setnextShow] = useState(false);
    const [firstChildWidth, setfirstChildWidth] = useState(0);
    const [scrollContextReady, setscrollContextReady] = useState(false);
    const [scrollerContHeight, setscrollerContHeight] = useState("");

    const { windowWidth } = useResolution();

    const scrollXElem = React.useRef();
    const scrollContent = React.useRef();
    var selection = useSelection();
    //calculate first container element width
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                setscrollerContHeight(scrollContent.current?.clientHeight);
                updateFirstChildWidth();
                handleScrollContentCont(true);
            } else {
                handleScrollContentCont(false);
            }
        }
    };


    useEffect(() => {

        const observer = new MutationObserver(callback);
        setscrollerContHeight(scrollContent.current?.clientHeight);
        // start observing for resize
        // start observing for mutations
        observer.observe(scrollXElem.current, config);
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const editable = scrollXElem.current.querySelector("[contenteditable=true]");
        if (editable) {
            scrollXElem.current.addEventListener("click", focusEditable, true);
            editable.addEventListener("input", handleScrollPos, true);
        }
        return () => {
            if (editable) {
                editable.removeEventListener("input", handleScrollPos, true);
            }
            if (scrollXElem.current) {
                scrollXElem.current.removeEventListener("click", focusEditable, true);
            }
        };
    }, []);

    const focusEditable = () => {
        const editable = scrollXElem.current.querySelector("[contenteditable=true]");
        editable.focus();
    };
    const handleScrollPos = () => {
        // if no text after cursor position scroll content full left
        // only run this for cursor at d end to prevent scroll during editing
        //this will work for elem with only text children

        if (selection.rangeCount) {
            var range = selection.getRangeAt(0);
            let rangeCont = range.commonAncestorContainer.parentElement;
            if (!(rangeCont.getAttribute("contenteditable") === "true")) {
                rangeCont = rangeCont.closest("[contenteditable=true]");
            }
            if (rangeCont && rangeCont.childNodes.length) {
                //only work if list is 1
                const elem = scrollXElem.current;
                const scrolledLeft = elem.scrollLeft;
                const physicalWidth = elem.offsetWidth; //width excluding padding
                const scrollableElemWidth = elem.scrollWidth;
                if (range.endOffset === rangeCont.textContent.length && scrolledLeft > 0) {
                    scrollXElem.current.scrollLeft = scrollableElemWidth - physicalWidth;
                }
            }
        }
    };

    const updateFirstChildWidth = () => {
        //used when handling scroll on next or prev click
        scrollXElem.current && scrollXElem.current.children[0] ? setfirstChildWidth(scrollXElem.current.children[0].offsetWidth + 10) : "";
    };

    const handleScrollContentCont = (bool) => {
        setscrollContextReady(bool);
    };

    const handleScroll = () => {
        const elem = scrollXElem.current;
        const scrolledLeft = elem.scrollLeft;
        const physicalWidth = elem.offsetWidth; //width including padding
        const scrollableElemWidth = elem.scrollWidth; //width of entire element that may be scrolled

        setprevShow(scrolledLeft > 0);
        setnextShow(scrollableElemWidth > scrolledLeft + physicalWidth + 1);
    };

    useEffect(() => {
        const scrolled_Left = scrollXElem.current.scrollLeft;
        const physical_Width = scrollXElem.current.offsetWidth; //width including padding and scroolbar
        const scrollable_ElemWidth = scrollXElem.current.scrollWidth; //width of entire element that may be scrolled

        setprevShow(scrolled_Left > 0);
        setnextShow(scrollable_ElemWidth > scrolled_Left + physical_Width + 1);
        updateFirstChildWidth();
    }, [scrollContextReady]);

    return (
        <ScrollerXXStyle
            $top={props.top}
            $position={props.position ? props.position : 'relative'}
            $padding={props.padding}
            $bgc={props.bgc}
            $fSize={props.fSize}
            $color={props.color}
            $width={props.width}
            $height={scrollerContHeight > 4 ? scrollerContHeight + "px" : ""}
            $observerContPad={props.observerContPad}
            $autoColumns={props.autoColumns}
            $autoRows={props.autoRows}
            $justifyItems={props.justifyItems}
        >
            {props.title ? (
                <Title color={props.titleColor} mBottom={"0.5rem"} windowWidth={windowWidth} boxShadow={props.boxShadow} textAlign={"center"}>
                    {props.title}
                </Title>
            ) : (
                ""
            )}

            {/* <div className="scroller-shield">
                <div className="scroller-cont">
                    <div className="observer-cont"
                        ref={ scrollXElem }
                        onScroll={ e => handleScroll(e) }
                    >
                        <div className="section-middle-contents" dir="ltr">
                            { props.children }
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div className="observer-cont"
                ref={ scrollXElem }
                onScroll={ e => handleScroll(e) }
            >
                <div className="section-middle-contents" dir="ltr">
                    { props.children }
                </div>
            </div> */}
            <DivTag
                position={"relative"}
                overflow={"auto hidden"}
                height={scrollerContHeight > 4 ? scrollerContHeight + 30 + "px" : ""}
                bgc={props.bgc}
                wSpace={"nowrap"}
                ref={scrollXElem}
                handleScroll={(e) => handleScroll(e)}
                align={"start"}
                fSize={props.fSize}
            >
                <DivTag
                    // height={ scrollerContHeight > 4 ? scrollerContHeight + "px" : "" }
                    wSpace={"nowrap"}
                    gaf={"column"}
                    alignContent={"center"}
                    gap={"1rem"}
                    ref={scrollContent}
                >
                    {props.children}
                </DivTag>
            </DivTag>
            <ScrollerXXShadow windowWidth={windowWidth} prevShow={prevShow} nextShow={nextShow} />
        </ScrollerXXStyle>
    );
};

export default ScrollerX;
export const ScrollerXXStyle = styled.div`
    position: ${(props) => props.$position};
    top: ${(props) => (props.$top ? props.$top : "unset")};
    width: ${(props) => (props.$width ? props.$width : "100%")};
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;
    padding: ${(props) => props.$padding};
    height: ${(props) => props.$height};
    font-size: ${(props) => props.$fSize};
    .scroller-shield {
        position: relative;
        background: transparent;
        width: 100%;
        color: ${(props) => (props.$color ? props.$color : "#5a6269")};
        .scroller-cont {
            position: relative;
            width: 100%;
            overflow: hidden;
            background: ${(props) => props.$bgc};
            height: fit-content;
            .observer-cont {
                /* display: grid; */
                padding: ${(props) => props.$observerContPad};
                /* overflow: hidden; */
                /* grid-auto-flow: column;
                grid-template-columns: max-content;
                padding: 10px 0;
                .observer-left, .observer-right{
                    width: 2px;
                } */
                overflow-y: hidden;
                overflow-x: scroll;
                margin-bottom: -15px;
                padding-bottom: 15px;
                .section-middle-contents {
                    scroll-snap-type: x mandatory;
                    scroll-padding: 6px;
                    /* padding: ${(props) => props.$padding}; */
                    display: grid;
                    width: 100%;
                    white-space: nowrap;
                    grid-auto-flow: column;
                    grid-auto-columns: ${(props) => props.$autoColumns};
                    justify-items: ${(props) => props.$justifyItems};
                    /* grid-template-columns: repeat(auto-fill,minmax(250px,1fr)); */
                    grid-auto-rows: ${(props) => props.$autoRows};
                    gap: 10px;
                    position: relative;
                    /* padding:2px 0; */
                    div {
                        scroll-snap-align: start;
                        scroll-snap-stop: always;
                    }
                }
            }
        }
    }
`;
