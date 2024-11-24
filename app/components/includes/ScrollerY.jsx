import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ScrollerY = (props) => {
    const { prependMoreData, appendMoreData } = props;

    const [oldLastElemId, setoldLastElemId] = useState('');
    const [offsetBottom, setoffsetBottom] = useState('');
    const [topShow, settopShow] = useState(false);
    const [bottomShow, setbottomShow] = useState(false);
    //
    const scrollAtBottom = useRef(true);
    const chatContainer = useRef(null);
    const contentContainer = useRef(null);
    //last scroll position
    const lastScrollOffsetBottom = useRef(null);
    const lastScrollOffsetTop = useRef(null);

    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                //each time new node is added, run below function
                //last element id of updated container
                updateScroll();
            }
        }
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (chatContainer.current) {
                    updateScroll();
                }
            }
        });

        const observer = new MutationObserver(callback);

        resizeObserver.observe(contentContainer.current);
        if (chatContainer.current) {
            observer.observe(chatContainer.current, config);
        }
        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, [chatContainer.current, oldLastElemId]);


    useEffect(() => {
        if (chatContainer.current) {
            if (!(lastScrollOffsetTop.current === null)) {
                chatContainer.current.scrollTop = lastScrollOffsetTop.current;
                // chatContainer.current.scrollTop = lastScrollOffsetBottom.current;
            } else {
                handleScroll();
            }
        }
    }, [chatContainer.current]);

    useEffect(() => {
        updateScroll();
        updateLastId();
    }, []);

    //functions
    const handleLastScrollOffsetTop = (pos) => {
        lastScrollOffsetTop.current = pos;
    };
    const handleLastScrollOffsetBottom = (pos) => {
        lastScrollOffsetBottom.current = pos;
    };

    const updateLastId = () => {
        //save last element id
        var elem = chatContainer.current;
        const lastElem = elem.lastElementChild;
        setoldLastElemId(lastElem ? lastElem.getAttribute('id') : "");
    };

    const handleScroll = () => {
        const scrollElem = document.querySelector('.elements-list');//element that has overflow auto
        const scrollPosFromTop = scrollElem.scrollTop;//is the pixels hidden in top due to the scroll
        const scrollHeight = scrollElem.scrollHeight;//is the pixels of the whole div
        const scrollElemHeight = scrollElem.clientHeight;//is the pixels that you see in your browser.

        // scrollElem.scrollTop = scrollHeight - scrollElemHeight; //
    };

    const updateScrollPos = (newLastElemId) => {
        const scrollElem = chatContainer.current;//element that has overflow auto
        setoldLastElemId(newLastElemId);

        var oldScrollBottom = lastScrollOffsetBottom.current;
        if ((newLastElemId == oldLastElemId) || scrollAtBottom.current) {
            //Scroll at the bottom or element has been prepended
            //so maintain bottom offset
            scrollElem.scrollTop = (scrollElem.scrollHeight - oldScrollBottom) - scrollElem.clientHeight;
        } else if ((newLastElemId != oldLastElemId) && !scrollAtBottom.current) {
            //element was appended but scroll not at bottom
            scrollElem.scrollTop = lastScrollOffsetTop.current;
        } else if (!lastScrollOffsetBottom.current) {
            // conversation was established newly
            handleScroll();
        }
    };

    const updateScroll = () => {
        const scrollElem = chatContainer.current;
        const scrollPosFromTop = scrollElem.scrollTop;
        const scrollHeight = scrollElem.firstElementChild.clientHeight;//is the pixels of the whole content div + parent padding bottom
        const scrollElemHeight = scrollElem.clientHeight;
        var scrolledBottom = scrollHeight + 10 - (scrollElemHeight + scrollPosFromTop); //+10 bcos of 10px padding bottom
        // show top shadow as indication for scrolled top
        if (scrollPosFromTop > 0) settopShow(true);
        else settopShow(false);

        // show bottom shadow as indication for scrolled bottom
        if (scrolledBottom > 0) setbottomShow(true);
        else setbottomShow(false);

        if (lastScrollOffsetTop.current > scrollPosFromTop) {
            //Scrolling up, handle request when 100px close to the top
            if (scrollPosFromTop <= 100) {
                prependMoreData ? prependMoreData(oldLastElemId) : "";
            }

        } else if (lastScrollOffsetTop.current < scrollPosFromTop) {
            //Scrolling down, handle request when 100px close to the bottom
            if (scrolledBottom <= 100) {
                appendMoreData ? appendMoreData(oldLastElemId) : "";
            }
        }

        //updates last scroll position offset top
        handleLastScrollOffsetTop(scrollPosFromTop);
        //updates last scroll position offset bottom
        handleLastScrollOffsetBottom(scrolledBottom);
        setoffsetBottom(scrolledBottom);
    };

    return (
        <React.Fragment>
            <ScrollerYStyle
                $gap={props.gap}
                $width={props.width}
                $bgc={props.bgc}
                $margin={props.margin}
                $pad={props.pad}
                $zindex={props.zIndex}
                $bradius={props.bRadius}
                $minheight={props.minHeight}
                $maxheight={props.maxHeight}
            >
                {topShow ?
                    <div className="shadow-top"></div>
                    : ""}
                <div
                    className={'elements-list'}
                    ref={chatContainer}
                    onScroll={e => updateScroll(e)}
                >
                    <div ref={contentContainer} className={"elements-inner"}>
                        {props.children}
                    </div>
                </div>
                {bottomShow ?
                    <div className="shadow-bottom"></div>
                    : ""}
            </ScrollerYStyle>
        </React.Fragment>
    );
};

export default ScrollerY;
const ScrollerYStyle = styled.div`
    overflow: hidden;
    display: grid;
    grid-auto-flow: row;
    /* grid-auto-rows: max-content; */
    /* grid-auto-rows: minmax(auto, 55vh); */
    gap: ${props => props.$gap ? props.$gap : "3px"};
    position: relative;
    padding: ${props => props.$pad};
    margin: ${props => props.$margin};
    z-index: ${props => props.$zindex};
    background: ${props => props.$bgc ? props.$bgc : "#f8f9fa"};
    width: ${props => props.$width ? props.$width : "100%"};
    border-radius: ${props => props.$bradius ? props.$bradius : "5px"};
    /* min-height: ${props => props.$minheight}; */
    max-height: ${props => props.$maxheight};
    .elements-list{
        padding: 0 20px 10px 0px;
        box-sizing: content-box;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: ${props => props.$maxheight};
        .elements-inner{
            display: grid;
            gap: ${props => props.$gap ? props.$gap : "1px"};
            grid-auto-flow: row;
            grid-auto-rows: max-content;
            margin-bottom: 10px;/** padding: 0 20px 10px 0px;*/
        }
    }
    .shadow-top{
        position: absolute;
        left: 0;
        top: -2px;
        width: 100%;
        height: 1px;
        z-index: 11;
        box-shadow: 0px 2px 4px black;
    }
    .shadow-bottom{
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1px;
        z-index: 11;
        /* box-shadow: 0px -2px 4px black; */
        box-shadow: 0px 0px 9px 2px black;
    }
`;
