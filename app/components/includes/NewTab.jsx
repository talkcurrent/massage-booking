import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScrollerX from '../reuseable/ScrollerX';

const NewTab = (props) => {
    const { controls, handleTab, tabKey, gapCntrlCont } = props;
    // const parser = new DOMParser();
    const controlStyle = {
        position: "sticky",
        top: "0",
        zIndex: "12",
        background: props.controlBgc,
    };
    return (
        <NewTabStyle
            bgc={ props.bgc }
            activeColor={ props.activeColor }
            activeBorderB={ props.activeBorderB }
            activeBorderT={ props.activeBorderT }
            activeBgc={ props.activeBgc }
            controlBgc={ props.controlBgc }
            contentBgc={ props.contentBgc }
            contentColor={ props.contentColor }
            contentPadding={ props.contentPadding }
            gapCntrlCont={ props.gapCntrlCont }
        >
            <div
                className={ `tab-controls` }
                style={ props.cntrlSticky ? controlStyle : {} }
            >
                <ScrollerX
                    padding={ "0px" }
                >
                    {/* <div className={ "tab-keys" }> */ }
                    { controls.length > 0 ?
                        controls.map((control, index) => {
                            // control maybe plain string or element 
                            // const doc = parser.parseFromString(control, "text/html");
                            return (
                                <div
                                    key={ index }
                                    className={
                                        `control ${(tabKey == index) || (tabKey == control.toLowerCase()) ?
                                            "active" : ""}`
                                    }
                                    onClick={ e => handleTab(index, control.toLowerCase()) }
                                    style={ { minWidth: props.controlElemMinWidth, width: "100%", whiteSpace: "nowrap" } }
                                    dangerouslySetInnerHTML={ { __html: control } }
                                ></div>
                            );
                        })
                        : "" }
                    {/* </div> */ }
                </ScrollerX>
            </div>
            <div className="tab-contents">
                <div className="content show">
                    { props.children }
                </div>
            </div>
        </NewTabStyle>
    );
};

export default NewTab;
const NewTabStyle = styled.div`
    width: 100%;
    color: #3f5c75;
    display: grid;
    grid-template-rows: auto 3fr;
    gap: ${props => props.gapCntrlCont};
    background: ${props => props.bgc};
    .tab-controls{
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        cursor: default;
        .tab-keys{
            display: grid;
            grid-auto-flow: column;
            gap: 1rem;
            .control{
                background: ${props => props.controlBgc};
                transition: all ease-in-out 0.3s;
                /* filter: grayscale(100%) contrast(80%); */
                padding-bottom: 2px;
                &.active{
                    /* transition: all ease-in-out 0.4s; */
                    color: ${props => props.activeColor};
                    border-bottom: 3px solid ${props => props.activeBgc};
                    border-top: ${props => props.activeBorderT};
                    /* background: ${props => props.activeBgc}; */
                    font-weight: 600;
                    filter: unset;
                }
                cursor: pointer;
                text-align: center;
            }
        }
    }
    .tab-contents{
        min-height: 30vh;
        /* max-height: 35vh; */
        overflow-y: auto;
        overflow-x: hidden;
        background: ${props => props.contentBgc};
        color: ${props => props.contentColor};
        padding: ${props => props.contentPadding};
        cursor: default;
        position: relative;
        .content{
            opacity: 1;
            /* transition: all 0.5s ease-out; */
            animation-delay: 0.3s;
            padding:2px;
            &.show {
                animation: fadeIn 1s;
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            }
        }

    }
`;
