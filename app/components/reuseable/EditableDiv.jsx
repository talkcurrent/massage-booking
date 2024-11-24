"use client";
import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import WordCount from './WordCount';
import ScrollerX from './ScrollerX';
import useResolution from '../customHooks/useResolution';
import useTheme from '../customHooks/useTheme';
import ToolTip from './ToolTip';
import DivTag from './DivTag';
import SearchIcon from '@mui/icons-material/Search';

const EditableDiv = React.forwardRef((props, ref) => {
    const { position, top, placeholder, width, miniHeight, padding, color, bgc, errorable,
        borderRadius, searchBar, searching, wordLimit, limit, searchByCategory,
        handleSearch, handleCategorySelect, error, multipleLines, nameUniq, suggestable } = props;
    const { windowWidth } = useResolution();

    const [editableempty, seteditableempty] = useState(true);
    const [searchKeys, setsearchKeys] = useState("");
    const [shifted, setshifted] = useState(false);

    const [suggestToolTip, setsuggestToolTip] = useState(false);
    const [elemParams, setelemParams] = useState(false);

    const textInput = useRef(null);
    const textInputCont = useRef(null);
    const theme = useTheme();

    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                handleEditable(false);
            } else {
                handleEditable(true);
            }
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(callback);
        observer.observe(textInput.current, config);
        textInput.current.focus();
        return () => { observer.disconnect(); };
    }, []);

    useEffect(() => {
        if (suggestToolTip) {
            document.addEventListener('scroll', handleFocus, true);
        }
        return () => {
            document.removeEventListener('scroll', handleFocus, true);
        };
    }, [suggestToolTip]);

    useEffect(() => {
        if (searchKeys.trim().length) {
            setsuggestToolTip(true);
        } else {
            setsuggestToolTip(false);
        }
        return () => {
            setsuggestToolTip(false);
        };
    }, [searchKeys]);

    useEffect(() => {

        if (windowWidth <= 768 && searchKeys.trim().length) {
            setshifted(true);
        } else {
            setshifted(false);
        }
    }, [searchKeys]);

    useImperativeHandle(ref, () => ({
        focus: (param) => {

            const content = param;
            if (content != "") {

                textInput.current.innerHTML = content;

                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(textInput.current);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                // textInput.current.scrollIntoView(false);
                textInput.current.focus();
            } else {
                // textInput.current.scrollIntoView(false);
                textInput.current.focus();
            }
        },
        textarea: () => {
            return textInput.current;
        },
        emptyTextarea: () => {
            textInput.current.innerHTML = "";
            setsearchKeys("");
        }
    }));

    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleEditable = (bool) => {
        seteditableempty(bool);
    };
    const handleOninput = (e) => {
        const target = e.target;
        const { textContent } = target;
        setsearchKeys(textContent);
        props.handleOninput(e);
    };

    const handleKeypress = event => {
        if (event.key == "Enter") {
            event.preventDefault();
            props.handleEnterKey && !searching && textInput.current.textContent.trim().length ?
                props.handleEnterKey(event) : "";
        }
    };

    const handleFocus = (e) => {
        const params = textInputCont.current.getBoundingClientRect();
        setelemParams(params);
    };

    return (
        <EditableDivStyle
            position={position}
            overflow={props.overflow}
            top={top}
            theme={theme}
            editableempty={editableempty}
            width={width}
            height={props.height}
            minHeight={miniHeight}
            padding={padding}
            borderRadius={borderRadius}
            searching={searching}
            searchByCategory={searchByCategory}
            searchBar={searchBar}
            windowWidth={windowWidth}
            shifted={shifted}
            ref={textInputCont}
        >
            <div
                className="editable-con"
                style={{
                    boxShadow: "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px #9E9E9E, -1px 0px 1px 0px #9E9E9E",
                    background: "white",
                    border: error ? "1px solid deeppink" : ""
                }}
            >
                <div className="placeholder">
                    {editableempty && searchKeys.length == 0
                        ? placeholder
                        : ""}
                </div>
                <div className="customTextarea">
                    {multipleLines ?
                        <span
                            ref={textInput}
                            className="textarea-custom"
                            onInput={handleOninput}
                            onFocus={handleFocus}
                            onKeyPress={handleKeypress}
                            required
                            id={nameUniq}
                            suppressContentEditableWarning
                            contentEditable={true}
                            onPaste={e => handlePaste(e)}
                        ></span>
                        :
                        <ScrollerX
                            bRadius={"10px"}
                            padding={"2px"}
                        >
                            <span
                                ref={textInput}
                                className="textarea-custom"
                                onInput={handleOninput}
                                onFocus={handleFocus}
                                onKeyPress={handleKeypress}
                                required
                                id={nameUniq}
                                suppressContentEditableWarning
                                contentEditable={true}
                                onPaste={e => handlePaste(e)}
                            ></span>
                        </ScrollerX>
                    }
                    {searchByCategory ?
                        props.children ?
                            props.children
                            :
                            <select
                                name="category" id="category"
                                onChange={e => handleCategorySelect(e)}
                                value={props.categoryValue}
                            >
                                <option value="all">All</option>
                                <option value="softwares">Softwares</option>
                                <option value="blogs">Blogs</option>
                                {/* <option value="users">Tip stars</option>
                                <option value="predictions">Predictions</option> */}
                            </select>
                        : ""}
                    {searchBar ?
                        <DivTag
                            color={'gray'}
                            cursor={"pointer"}
                            onClick={e => searching ? {} : handleSearch(e)}
                        >
                            <SearchIcon />
                        </DivTag>
                        : ""
                    }
                    {suggestable ?
                        suggestToolTip ?
                            <ToolTip
                                elemParams={elemParams}
                                pointer={false}
                                tooltipBgc={theme.background_color}
                            >
                                <DivTag
                                    width={elemParams.width + "px"}
                                >
                                    {props.children}
                                </DivTag>
                            </ToolTip>
                            : ""
                        : ""
                    }
                </div>
            </div>
            {wordLimit ?
                <div className="textarea-bottom">
                    <React.Fragment>
                        <small> {`${WordCount(searchKeys)}/${limit}  -`}
                            <strong>{limit}{" "}</strong> words maximum</small>
                        {WordCount(searchKeys) > limit ?
                            <div className="error-report" style={{ color: "red" }}>
                                <small>ERROR! Words must be less than or{" "}<strong>{limit}</strong></small>
                            </div>
                            : ""
                        }
                    </React.Fragment>
                </div>
                : ""}
        </EditableDivStyle>
    );
});

export default EditableDiv;
export const EditableDivStyle = styled.span`
    position: ${props => props.position};
    top: ${props => props.top};
    width:  ${props => props.width ? props.width : "100%"};
    height:  ${props => props.height ? props.height : "100%"};
    border-radius: 10px;
    overflow:${props => props.overflow != "" ? props.overflow : "hidden"} ;
    grid-gap: 5px;
    padding: 1px;
    z-index: 1;
    box-sizing: content-box;
    .editable-con{
        display: grid;
        border-radius: inherit;
        overflow: visible;
        .placeholder {
            grid-row: 1;
            grid-column: 1;
            height: 100%;
            color: rgb(155, 155, 155);
            font-size: ${props => props.windowWidth <= 600 ? "smaller" : "small"};
            background: #f5f5f5;
            font-style: italic;
            font-family: serif;
            border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
            padding: ${props => props.padding};
            display: grid;
            align-items: center;
            border-radius: inherit;
        }
        .customTextarea {
            position: relative;
            grid-row: 1;
            grid-column: 1;
            display: grid;
            grid-template-columns:  ${props => props.searchBar && !props.shifted && props.searchByCategory ? "9fr 2fr 1fr" : props.searchBar ? "9fr 1fr" : "unset"};
            align-items: center;
            border-radius: inherit;
            .textarea-custom {
                align-self: center;
                min-height: ${props => props.minHeight};
                width: ${props => props.width};
                white-space: ${props => props.searchBar ? "nowrap" : "break-spaces"};
                border: none;
                word-wrap: break-word;
                word-break: break-word;
                border-radius: ${props => props.borderRadius ? "10px" : "unset"};
                color: gray !important;
                line-height: 1.2;
                font-size: ${props => props.windowWidth <= 600 ? "smaller" : "small"};
                background-color: rgb(0, 0, 0, 0) !important;
                padding: ${props => props.padding};
                display: inline-block;
                z-index: 1;
                cursor: text;
                border-radius: inherit;
                /* Standard syntax */
                &:focus {
                    .placeholder {
                        color: rgb(163, 136, 136);
                    }
                    outline: none;
                    outline-width: 0;
                    background-color: ${props =>
        props.editableempty
            ? "rgb(0, 0, 0, 0)"
            : "rgb(238, 238, 238)"};
                }
    
                &:empty:before {
                    content: "\feff";
                    display: block;
                    /* min-height: 10vh; */
                    /* For Firefox */
                }
    
                &:focus:before {
                    color: rgb(156, 18, 18);
                    opacity: 0.4;
                    font-style: italic;
                }
            }
            select{
                border: unset;
                background: whitesmoke;
                color:${props => props.theme.nav_color};
                caret-color:${props => props.theme.nav_color};
                &:focus{
                    border: unset;
                    outline: unset;

                }
                position: ${props => props.shifted ? "absolute" : ""};
                right:  ${props => props.shifted ? "40%" : ""};
                box-shadow: ${props => props.shifted ? "0px 2px 4px -1px silver" : ""};
                border-radius: ${props => props.shifted ? "0 0 10px 10px" : ""};
                top: ${props => props.shifted ? "100%" : ""};
                transition: all ease-in-out 0.5s;
            }
            .search-query{
                font-size: large;
                padding: 3px;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .textarea-bottom{
        padding: 0 5px;
        color: #6c757d;
    }

`;