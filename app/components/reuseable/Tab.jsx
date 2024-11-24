import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useViewPort from '../customHooks/useViewPort';
import SrollableContent from './SrollableContent';

const Tab = (props) => {
    const { controls, handleTab, tabKey } = props;
    return (
        <TabStyle
            activeColor={ props.activeColor }
            activeBorderB={ props.activeBorderB }
            activeBorderT={ props.activeBorderT }
            activeBgc={ props.activeBgc }
            controlBgc={ props.controlBgc }
            contentBgc={ props.contentBgc }
            contentMaxHeight={ props.contentMaxHeight }
            contentColor={ props.contentColor }
            contentPadding={ props.contentPadding }
            bShadow={ props.bShadow }
        >
            <div className="tab-controls">
                <SrollableContent
                    width={ "100%" }
                    padding={ "6px 0px 15px 6px" }
                    // autoColumns={ "minmax(max-content, 1fr)" }
                    autoRows={ "" }
                    justifyItems="center"
                >
                    { controls.length > 0 ?
                        controls.map((control, key) => {
                            return (
                                <React.Fragment key={ key }>
                                    <div
                                        className={ `control ${tabKey == control ? "active" : ""}` }
                                        onClick={ e => handleTab(control) }
                                        style={ {
                                            width: "100%",
                                            borderRadius: "5px",
                                            boxShadow: props.bShadow ? props.bShadow : "#c1c1c1 0px 0px 5px"
                                        } }
                                    >{ control }</div>
                                </React.Fragment>
                            );
                        })
                        : "" }
                </SrollableContent>
            </div>
            <div className="tab-contents">
                <div className="content show">
                    { props.children }
                </div>
            </div>
        </TabStyle>
    );
};

export default Tab;
export const TabStyle = styled.div`
    width: 100%;
    color: #3f5c75;
    display: grid;
    grid-template-rows: auto 1fr;
    .tab-controls{
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        .control{
            background: ${props => props.controlBgc};
            transition: all ease-in-out 0.3s;
            padding: 0 2px;
            position: relative;
            &.active{
                /* transition: all ease-in-out 0.4s; */
                color: ${props => props.activeColor};
                border-bottom: ${props => props.activeBorderB};
                border-top: ${props => props.activeBorderT};
                background: ${props => props.activeBgc};
                font-weight: 600;
            }
            cursor: pointer;
            text-align: center;
        }
    }
    .tab-contents{
        min-height: 40vh;
        max-height: ${props => props.contentMaxHeight ? props.contentMaxHeight : "80vh"};
        overflow-y: auto;
        background: ${props => props.contentBgc};
        color: ${props => props.contentColor};
        padding: ${props => props.contentPadding};
        /* border: 1px solid ${props => props.activeBgc}; */
        border-top-width: 3px;
        .content{
            opacity: 1;
            /* transition: all 0.5s ease-out; */
            animation-delay: 0.3s;
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
