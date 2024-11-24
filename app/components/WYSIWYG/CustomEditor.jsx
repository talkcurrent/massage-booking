"use client";

import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import usePrevState from "../customHooks/usePrevState";
import useTheme from "../customHooks/useTheme";
import ScrollerY from "../includes/ScrollerY";
import ActionBtn from "../reuseable/ActionBtn";
import DivTag from "../reuseable/DivTag";
import EditableDiv from "../reuseable/EditableDiv";
import LoadingBtn from "../reuseable/LoadingBtn";
import ToolTip from "../reuseable/ToolTip";
import { EditorContext } from "./EditorContext";
import ToolBar from "./ToolBar";

const CustomEditor = React.forwardRef((props, ref) => {
    const editorContext = useContext(EditorContext);
    const { title, body } = props.initialState;

    const [editorState, setEditorState] = useState("");
    const [toolTipToClose, settoolTipToClose] = useState("");
    const [editorTitle, seteditorTitle] = useState("");
    const [ctrlKeyActive, setctrlKeyActive] = useState(false);

    const [anchorParams, setanchorParams] = useState("");
    const [activeLink, setactiveLink] = useState("");
    const [removeLinkParams, setremoveLinkParams] = useState("");
    const [activeRemoveLink, setactiveRemoveLink] = useState("");
    const [linkTooltip, setlinkTooltip] = useState(false);
    const [removeLinkTooltip, setremoveLinkTooltip] = useState(false);

    const [form, setform] = useState({ href: "" });

    const editableDiv = useRef(null);
    const inputTitle = useRef(null);
    const uploadImg = useRef(null);
    const linkInput = useRef();
    const initialState = useRef(props.initialState);

    const theme = useTheme();

    const prevTitle = usePrevState(editorTitle);
    const prevNodes = usePrevState(editorState);

    const blockElems = [
        "DIV",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "ADDRESS",
        "ASIDE",
        "ARTICLE",
        "BLOCKQUOTE",
        "CANVAS",
        "DD",
        "DL",
        "DT",
        "FIELDSET",
        "FIGCAPTION",
        "FIGURE",
        "FOOTER",
        "FORM",
        "HEADER",
        "HR",
        "LI",
        "MAIN",
        "NAV",
        "NOSCRIPT",
        "OL",
        "UL",
        "TFOOTER",
        "VIDEO",
        "P",
        "PRE",
        "SECTION",
        "TABLE",
    ];

    const inlineElems = [
        "SPAN",
        "I",
        "STRONG",
        "SMALL",
        "SUB",
        "SUP",
        "TIME",
        "TT",
        "SELECT",
        "BUTTON",
        "LABEL",
        "INPUT",
        "CITE",
        "DFN",
        "OBJECT",
        "Q",
        "ABBR",
        "BIG",
        "A",
        "VAR",
        "MAP",
        "LABEL",
        "EM",
        "B",
        "TIME",
        "BDO",
        "ACRONYM",
        "CODE",
        "OUTPUT",
        "SAMP",
        "KBD",
        "EM",
    ];

    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                const str = editableDiv.current.innerHTML.replace(/\s\s+/g, " ");

                const output = {
                    innerHtml: str,
                    editorNodes: editableDiv.current.childNodes,
                    editorTitle: editorTitle,
                };
                props.handleOutput(output, "saveToState");
            }
            // if (!mutation.addedNodes.length) {
            // handleFocus();
            // }

            if (mutation.removedNodes[0] && mutation.removedNodes[0].src) {
                // it is a file
                const fileUrl = mutation.removedNodes[0].src;
                const fileName = fileUrl.split("/").pop();
                editorContext.deletePhoto(fileName);
            }
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(callback);
        observer.observe(editableDiv.current, config);

        return () => {
            if (editableDiv.current) {
                Array.from(editableDiv.current.querySelectorAll("a")).forEach((elem) => {
                    elem.removeEventListener("click", handleAnchorClick);
                });
            }
            // handleSave("saveToState");
            observer.disconnect();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        textarea: (html) => {
            editableDiv.current.innerHTML = html;
        },
    }));

    useEffect(() => {
        const { editorNodes, innerHtml, editorTitle } = props.input;
        if (editorNodes && editorNodes.length) {
            setEditorState(editorNodes);
        }
        if (editorTitle && editorTitle.length) {
            seteditorTitle(editorTitle);
        }

        if (innerHtml && innerHtml.trim().length) {
            editableDiv.current.innerHTML = innerHtml;
        } else if (props.initialState) {
            title ? seteditorTitle(title) : "";
        }
        if (props.notEditable === false) {
            setTimeout(() => {
                blockElems.forEach((elem) => {
                    const el = elem.toLowerCase();
                    if (el != "div" || el != "p") {
                        stripUnwantedNode(el);
                    }
                });
                if (props.initialState) {
                    const output = {
                        innerHtml: props.initialState.body,
                        editorNodes: editableDiv.current.childNodes,
                        editorTitle: title,
                    };
                    if (props.handleOutput) {
                        props.handleOutput(output, "saveToState");
                    }
                }
            }, 500);
        }
    }, []);

    useEffect(() => {
        // if editor received initial state but not modified
        // this block will help keep the datas in sync with the parent state
        if (props.initialState) {
            editableDiv.current.innerHTML = body;
            const output = {
                innerHtml: props.initialState.body,
                editorNodes: editableDiv.current.childNodes,
                editorTitle: title,
            };
            if (props.handleOutput) {
                props.handleOutput(output, "saveToState");
            }
        }
    }, []);

    useEffect(() => {
        if (toolTipToClose != "") {
            setTimeout(() => {
                // settoolTipToClose("");
            }, 200);
        }
    }, [toolTipToClose]);

    const handleEditorChange = (e) => {
        if (props.handleOnInput) {
            props.handleOnInput(e)
        }
        setEditorState(editableDiv.current.childNodes);
        handleSave("saveToState");
    };

    const handleInline = (e, style, styleAttribute) => {
        const styleValue = style.split("-").pop();
        // var test = document.createElement('div');
        // test.style[styleAttribute] = styleValue;
        // console.info(test);
        e.preventDefault();
        var selection = getSelectionText();

        if (!selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            //
            var selKeeper = document.createElement("div");
            var virtualCont = document.createElement("div");
            var newNode = document.createElement("span");

            var selCommonAncestor = getParentNode();
            let clonedParent = selCommonAncestor.cloneNode(true);

            var selectedContents = range.cloneContents();
            //this trick solves probs regarding representing multiple nodes with double quotes
            //usually occur when part of node was styled or has style removed
            virtualCont.appendChild(selectedContents);
            selKeeper.innerHTML = virtualCont.innerHTML;
            //condition to alter range before any other conditions
            if (
                (selCommonAncestor.parentElement.classList.contains(style) && selCommonAncestor.textContent.trim() == selKeeper.textContent.trim()) ||
                (selCommonAncestor.className == style && selCommonAncestor.textContent.trim() == selKeeper.textContent.trim())
            ) {
                // console.info("selectedHasBoldAncestor or parent && isOnlyChildofParent");
                range.setStartBefore(selCommonAncestor);
                range.setEndAfter(selCommonAncestor);
                selection.removeAllRanges();
                selection.addRange(range);

                selectedContents = range.cloneContents();
                virtualCont.innerHTML = "";
                virtualCont.appendChild(selectedContents);
                selKeeper.innerHTML = virtualCont.innerHTML;
                selCommonAncestor = getParentNode();
            }

            const multipleNodesSelected = selKeeper.childNodes.length > 1;
            const multipleChildrenSelected = selKeeper.children.length >= 1;
            const singleElemSelected = selKeeper.children.length < 2; //element
            const singleNodeSelected = selKeeper.childNodes.length < 2; //text
            const isOnlyChildofParent = selCommonAncestor.textContent.trim() == selKeeper.textContent.trim();

            var selectedIsOneElementOnly = false;
            if (selKeeper.firstElementChild) {
                selectedIsOneElementOnly = selKeeper.children.length == 1 && selKeeper.firstElementChild.textContent.trim() == selKeeper.textContent.trim();
            }
            var singleNodeSelectedIsNotBold;
            if (selKeeper.firstElementChild) {
                singleNodeSelectedIsNotBold = !selKeeper.firstElementChild.classList.contains(style);
            } else {
                singleNodeSelectedIsNotBold = true;
            }
            var multipleNodeSelectedHasBold;
            if (selKeeper.children.length) {
                var boldClasses = Array.from(selKeeper.children).map((child) => {
                    if (child.classList.contains(style)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                multipleNodeSelectedHasBold = Boolean(boldClasses.find((bClass) => bClass === true));
            } else {
                multipleNodeSelectedHasBold = false;
            }

            const selectedHasBoldParent = selCommonAncestor.classList.contains(style);
            const selectedHasOnlyBoldParent = selCommonAncestor.className == style;
            const selectedHasBoldAncestor = selCommonAncestor.parentElement.classList.contains(style);

            if (selectedHasBoldParent || selectedHasOnlyBoldParent) {
                //or bold ancestor
                if (selectedHasOnlyBoldParent && isOnlyChildofParent) {
                    console.info("selectedHasBoldParentStrickly and All innerHTML selected!");
                    selCommonAncestor.remove();
                    var fragment = document.createDocumentFragment();
                    Array.from(selKeeper.childNodes).map((node) => {
                        fragment.appendChild(node);
                    });
                    range.extractContents();
                    range.insertNode(fragment);
                } else if (selectedHasBoldParent && isOnlyChildofParent) {
                    // console.info("selectedHasBoldParentNotStrickly and All innerHTML selected!");
                    selCommonAncestor.classList.remove(style);
                    selCommonAncestor.style[styleAttribute] = "";
                } else {
                    // console.info("selectedHasBoldParent and All not innerHTML selected!");
                    var basePart = document.createElement("div");
                    var secondPart = document.createElement("div");
                    var replaceWith = document.createElement("div");
                    var customRange = new Range();
                    var customSel = getSelectionText();

                    //from selection startRange to left 0-index of parent commonAncestor
                    customRange.setStart(selCommonAncestor, 0);
                    customRange.setEnd(range.startContainer, range.startOffset);
                    var base = customRange.cloneContents();
                    basePart.appendChild(base);

                    //from selection endRange to right at end of parent commonAncestor
                    customRange.setStart(range.endContainer, range.endOffset);
                    // customRange.setEnd(selCommonAncestor, selCommonAncestor.childNodes.length);
                    customRange.setEndAfter(selCommonAncestor.lastChild);
                    var secPart = customRange.cloneContents();
                    secondPart.appendChild(secPart);

                    //splitting entire same style elem where selection is found
                    const elStart = document.createElement("span"); //only used when element start has innerHTML
                    elStart.className = selCommonAncestor.className; //in case class contains other styles
                    elStart.style = selCommonAncestor.style;
                    elStart.innerHTML = basePart.innerHTML;

                    const elEnd = document.createElement("span");
                    elEnd.className = selCommonAncestor.className;
                    elEnd.style = selCommonAncestor.style;
                    elEnd.innerHTML = secondPart.innerHTML;

                    //re arrange in dom order as they where before
                    replaceWith.appendChild(elStart); //even if innerHTML is empty, add it to dom to let us get new range with ease
                    var fragment = document.createDocumentFragment();
                    Array.from(selKeeper.childNodes).map((node) => {
                        fragment.appendChild(node);
                    });
                    replaceWith.appendChild(fragment);
                    //even if innerHTML is empty, add it to dom to let us get new range with ease
                    replaceWith.appendChild(elEnd);

                    var f = document.createDocumentFragment();
                    Array.from(replaceWith.childNodes).map((node) => {
                        f.appendChild(node);
                    });

                    selCommonAncestor.replaceWith(f);
                    customRange.setStartAfter(elStart);
                    customRange.setEndBefore(elEnd);
                    //incase any of the element added is empty, remove them before applying range
                    stripUnwantedHTML();

                    customSel.removeAllRanges();
                    customSel.addRange(customRange);
                }
            } else if (selectedIsOneElementOnly && singleNodeSelectedIsNotBold) {
                // console.info("selectedIsOneElementOnly && element not Bold");
                selKeeper.firstElementChild.classList.add(style);
                selKeeper.firstElementChild.style[styleAttribute] = styleValue;

                var fragment = document.createDocumentFragment();
                Array.from(selKeeper.childNodes).map((node) => {
                    fragment.appendChild(node);
                });
                range.extractContents();
                range.insertNode(fragment);
            } else if (!selectedHasBoldParent && !selectedHasOnlyBoldParent && !selectedHasBoldAncestor) {
                //selection has no bold parent
                if (
                    (singleElemSelected && singleNodeSelected && singleNodeSelectedIsNotBold) ||
                    (multipleChildrenSelected && multipleNodesSelected && !multipleNodeSelectedHasBold)
                ) {
                    // console.info("single or multiple node and no bold");

                    if (inlineElems.includes(selCommonAncestor.nodeName) && isOnlyChildofParent) {
                        // console.info("inline elem and only content of parent");
                        selCommonAncestor.classList.add(style);
                        selCommonAncestor.style[styleAttribute] = styleValue;
                        return;
                    }
                    newNode.classList.add(style);
                    newNode.style[styleAttribute] = styleValue;
                    var allNodesSelected = selKeeper.childNodes;
                    var selectedNodes = serializeInnerStyle(allNodesSelected, style);
                    newNode.appendChild(selectedNodes);
                    range.extractContents();
                    //insert elem to give u access to dom
                    range.insertNode(newNode);
                    stripUnwantedHTML();
                    const prevNodeIsStylableElem =
                        (newNode.previousSibling.nodeName == "#text" &&
                            !newNode.previousSibling.wholeText.trim().length &&
                            newNode.previousElementSibling != null &&
                            newNode.previousElementSibling.nodeName == "SPAN") ||
                        newNode.previousSibling.nodeName == "SPAN";
                    const nextNodeIsStylableElem =
                        (newNode.nextSibling.nodeName == "#text" &&
                            !newNode.nextSibling.wholeText.trim().length &&
                            newNode.nextElementSibling != null &&
                            newNode.nextElementSibling.nodeName == "SPAN") ||
                        newNode.nextSibling.nodeName == "SPAN";

                    const clonedNextElSib = newNode.nextElementSibling ? newNode.nextElementSibling.cloneNode(true) : null;
                    const clonedPrevElSib = newNode.previousElementSibling ? newNode.previousElementSibling.cloneNode(true) : null;
                    const prevElSib = newNode.previousElementSibling;
                    const nextElSib = newNode.nextElementSibling;
                    // style
                    const prevElsibHasRequestedStyle = prevElSib ? prevElSib.className == style : false;
                    const nextElsibHasRequestedStyle = nextElSib ? nextElSib.className == style : false;

                    if (prevNodeIsStylableElem || nextNodeIsStylableElem) {
                        //check in case selection is the last or first of parent
                        if (prevNodeIsStylableElem && nextNodeIsStylableElem && prevElsibHasRequestedStyle && nextElsibHasRequestedStyle) {
                            //middle of two same style elements

                            const nextElHasSameStyleStrickly = nextElSib.className == style;
                            const prevElHasSameStyleStrickly = prevElSib.className == style;
                            const nextElSameStyle = nextElSib.classList.contains(style);
                            const prevElSameStyle = prevElSib.classList.contains(style);

                            if (nextElHasSameStyleStrickly && prevElHasSameStyleStrickly) {
                                // console.info("nextElHasSameStyleStrickly && prevElHasSameStyleStrickly");

                                var prevElSibNodes = nodesToFragment(prevElSib.childNodes);
                                var nextElSibNodes = nodesToFragment(nextElSib.childNodes);
                                if (newNode.nextSibling.nodeName == "#text" && newNode.nextSibling.wholeText.length) {
                                    // there's a space btw inserted n next elem
                                    newNode.append(" ", nextElSibNodes);
                                } else {
                                    newNode.append(nextElSibNodes);
                                }
                                if (newNode.previousSibling.nodeName == "#text" && newNode.previousSibling.wholeText.length) {
                                    // there's a space btw inserted n prev elem
                                    newNode.prepend(prevElSibNodes, " ");
                                } else {
                                    newNode.prepend(prevElSibNodes);
                                }

                                // //to add range to the initial selected only,prevElSib and nextElSib
                                // //cloned must be present for easy ranging n selection
                                range.setStart(newNode, clonedPrevElSib.childNodes.length);
                                range.setEnd(newNode, newNode.childNodes.length - clonedNextElSib.childNodes.length);
                            } else if (prevElHasSameStyleStrickly && nextElSameStyle) {
                                // console.info("prevElHasSameStyleStrickly && nextElSameStyle");

                                nextElSib.classList.remove(style);
                                nextElSib.style[styleAttribute] = "";
                                var prevElSibNodes = nodesToFragment(prevElSib.childNodes);

                                if (newNode.nextSibling.nodeName == "#text" && newNode.nextSibling.wholeText.length) {
                                    // there's a space btw inserted n next elem
                                    newNode.append(" ", nextElSib);
                                } else {
                                    newNode.append(nextElSib);
                                }

                                if (newNode.previousSibling.nodeName == "#text" && newNode.previousSibling.wholeText.length) {
                                    // there's a space btw inserted n prev elem
                                    newNode.prepend(prevElSibNodes, " ");
                                } else {
                                    newNode.prepend(prevElSibNodes);
                                }

                                range.setStart(newNode, clonedPrevElSib.childNodes.length);
                                range.setEndBefore(nextElSib);
                            } else if (prevElSameStyle && nextElHasSameStyleStrickly) {
                                prevElSib.classList.remove(style);
                                prevElSib.style[styleAttribute] = "";
                                var nextElSibNodes = nodesToFragment(nextElSib.childNodes);

                                if (newNode.nextSibling.nodeName == "#text" && newNode.nextSibling.wholeText.length) {
                                    // there's a space btw inserted n next elem
                                    newNode.append(" ", nextElSibNodes);
                                } else {
                                    newNode.append(nextElSibNodes);
                                }

                                if (newNode.previousSibling.nodeName == "#text" && newNode.previousSibling.wholeText.length) {
                                    // there's a space btw inserted n prev elem
                                    newNode.prepend(prevElSib, " ");
                                } else {
                                    newNode.prepend(prevElSib);
                                }

                                range.setStartAfter(prevElSib);
                                range.setEnd(newNode, newNode.childNodes.length - clonedNextElSib.childNodes.length);
                            } else if (prevElSameStyle && nextElSameStyle) {
                                // console.info("prevElSameStyle && nextElSameStyle");

                                nextElSib.classList.remove(style);
                                nextElSib.style[styleAttribute] = "";
                                prevElSib.classList.remove(style);
                                prevElSib.style[styleAttribute] = "";

                                if (newNode.nextSibling.nodeName == "#text" && newNode.nextSibling.wholeText.length) {
                                    // there's a space btw inserted n next elem
                                    newNode.append(" ", nextElSib);
                                } else {
                                    newNode.append(nextElSib);
                                }

                                if (newNode.previousSibling.nodeName == "#text" && newNode.previousSibling.wholeText.length) {
                                    // there's a space btw inserted n prev elem
                                    newNode.prepend(prevElSib, " ");
                                } else {
                                    newNode.prepend(prevElSib);
                                }

                                range.setStartAfter(prevElSib);
                                range.setEndBefore(nextElSib);
                            }
                        } else if (prevNodeIsStylableElem && !nextNodeIsStylableElem && prevElsibHasRequestedStyle) {
                            // console.info("prevNodeIsStylableElem n no nextNodeIsStylableElem");
                            const elStart = document.createElement("span");
                            elStart.className = prevElSib.className;
                            elStart.style = prevElSib.style;

                            var prevElSibNodes = nodesToFragment(clonedPrevElSib.childNodes); //elem with same style from left
                            var newlyStyled = nodesToFragment(newNode.cloneNode(true).childNodes); //clone to prevent changes on the dom

                            elStart.append(prevElSibNodes);
                            if (newNode.previousSibling.nodeName == "#text" && newNode.previousSibling.wholeText.length) {
                                // there's a space btw inserted n prev elem
                                elStart.append(" ", newlyStyled);
                            } else {
                                elStart.append(newlyStyled);
                            }
                            range.setStartBefore(prevElSib);
                            range.setEndAfter(newNode);
                            range.extractContents();
                            range.insertNode(elStart);

                            range.setStart(elStart, elStart.childNodes.length - newNode.childNodes.length);
                            range.setEnd(elStart, elStart.childNodes.length);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        } else if (!prevNodeIsStylableElem && nextNodeIsStylableElem && nextElsibHasRequestedStyle) {
                            // console.info("!prevNodeIsStylableElem && nextNodeIsStylableElem && nextElsibHasRequestedStyle");
                            const elStart = document.createElement("span");
                            elStart.className = nextElSib.className;
                            elStart.style = nextElSib.style;

                            var nextElSibNodes = nodesToFragment(clonedNextElSib.childNodes); //elem with same style from left
                            var newlyStyled = nodesToFragment(newNode.cloneNode(true).childNodes); //clone to prevent changes on the dom

                            if (newNode.nextSibling.nodeName == "#text" && newNode.nextSibling.wholeText.length) {
                                // there's a space btw inserted n prev elem
                                elStart.append(newlyStyled, " ");
                            } else {
                                elStart.append(newlyStyled);
                            }
                            elStart.append(nextElSibNodes);

                            range.setStartBefore(newNode);
                            range.setEndAfter(nextElSib);
                            range.extractContents();
                            range.insertNode(elStart);

                            range.setStart(elStart, 0);
                            range.setEnd(elStart, elStart.childNodes.length - nextElSib.childNodes.length);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                    }
                } else if (
                    (multipleChildrenSelected && multipleNodesSelected && multipleNodeSelectedHasBold) ||
                    ((singleElemSelected || singleNodeSelected) && !singleNodeSelectedIsNotBold)
                ) {
                    // console.info("multiple childnodes and at least one bold");
                    var allNodesSelected = selKeeper.childNodes;
                    //serialize children
                    var fragment = serializeInnerStyle(allNodesSelected, style);
                    range.extractContents();
                    range.insertNode(fragment);
                    stripUnwantedHTML();
                }
                // else if ((singleElemSelected || singleNodeSelected) && !singleNodeSelectedIsNotBold) {
                // console.info("singleElemSelected ||singleNodeSelected && !singleNodeSelectedIsNotBold");
                // }
            } else if (selCommonAncestor.parentElement.classList.contains(style) && !(selCommonAncestor.textContent.trim() == selKeeper.textContent.trim())) {
                // console.info("Ancestor bold but not only child of parent");
                const inheritElem = document.createElement(selCommonAncestor.localName);
                inheritElem.className = selCommonAncestor.className;
                inheritElem.style = selCommonAncestor.style;

                Array.from(selKeeper.childNodes).map((node) => {
                    inheritElem.appendChild(node);
                });
                range.extractContents();
                range.insertNode(inheritElem);

                var basePart = document.createElement("div");
                var secondPart = document.createElement("div");
                var replaceWith = document.createElement("div");

                //from selection startRange to left 0-index of parent commonAncestor
                range.setStart(selCommonAncestor.parentElement, 0);
                range.setEndBefore(inheritElem);
                var base = range.cloneContents();
                basePart.appendChild(base);

                //from selection endRange to right at end of parent commonAncestor
                range.setStartAfter(inheritElem);
                // range.setEnd(selCommonAncestor, selCommonAncestor.childNodes.length);
                range.setEndAfter(selCommonAncestor.parentElement.lastChild);
                var secPart = range.cloneContents();
                secondPart.appendChild(secPart);

                //splitting entire same style elem where selection is found
                const elStart = document.createElement("span"); //only used when element start has innerHTML
                elStart.className = selCommonAncestor.parentElement.className; //in case class contains other styles
                elStart.style = selCommonAncestor.parentElement.style;
                elStart.innerHTML = basePart.innerHTML;

                const elEnd = document.createElement("span");
                elEnd.className = selCommonAncestor.parentElement.className;
                elEnd.style = selCommonAncestor.parentElement.style;
                elEnd.innerHTML = secondPart.innerHTML;

                //re arrange in dom order as they where before
                replaceWith.appendChild(elStart); //even if innerHTML is empty, add it to dom to let us get new range with ease
                replaceWith.appendChild(inheritElem);
                //even if innerHTML is empty, add it to dom to let us get new range with ease
                replaceWith.appendChild(elEnd);

                var f = document.createDocumentFragment();
                Array.from(replaceWith.childNodes).map((node) => {
                    f.appendChild(node);
                });

                selCommonAncestor.parentElement.replaceWith(f);
                range.setStartAfter(elStart);
                range.setEndBefore(elEnd);
                //incase any of the element added is empty, remove them before applying range

                selection.removeAllRanges();
                selection.addRange(range);

                stripUnwantedHTML();
            }
        }
        // stripUnwantedHTML();
    };

    const handleBlock = (e, blockType) => {
        e.preventDefault();
        observer.disconnect();
        var selection = getSelectionText();
        const allHeadings = ["H1", "H2", "H3", "H4", "H5", "H6"];

        //if node not selected
        editableDiv.current.focus();
        if (selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            const blockElem = document.createElement(blockType);
            const breakElem = document.createElement("br");
            //remove every empty block type before inserting
            allHeadings.map((elem) => {
                const headings = editableDiv.current.querySelectorAll(elem);
                if (headings) {
                    Array.from(headings).forEach((node) => {
                        if (node.innerHTML.trim().length === 0 || node.firstChild.isEqualNode(breakElem)) {
                            node.remove();
                        }
                    });
                }
            });
            blockElem.appendChild(breakElem);
            range.insertNode(blockElem);
            range.setStart(blockElem, 0);
            range.setEnd(blockElem, breakElem.childNodes.length);
            range.collapse(true);

            Array.from(blockElem.parentElement.childNodes).forEach((node) => {
                if (node.nodeName === "BR") {
                    node.remove();
                }
            });

            const isSingleChild = blockElem.parentElement.children.length < 2; //element
            const isSingleNode = blockElem.parentElement.childNodes.length < 2; //text
            const isOnlyChildofParent = !blockElem.parentElement.textContent.trim().length;
            const parentIsEditor = blockElem.parentElement.isEqualNode(editableDiv.current);

            if (isSingleNode && isOnlyChildofParent && isSingleChild && !parentIsEditor) {
                // console.info("Header only child");
                //header is first and only child. Take it out of parent
                // blockElem.parentElement.replaceWith(blockElem);
                range.setStartBefore(blockElem.parentElement);
                range.insertNode(blockElem);
                range.selectNode(blockElem);
                range.setStart(blockElem, 0);
                range.setEnd(blockElem, 0);
                range.collapse(true);
                stripUnwantedNode("div");
            }
            //After requested element has been inserted
            const elemParent = blockElem.closest("div");
            if (allHeadings.includes(blockElem.nodeName) && allHeadings.includes(blockElem.parentElement.nodeName)) {
                handleSplit(blockElem, elemParent, range, true);
            } else if (!isSingleNode && !isOnlyChildofParent && !parentIsEditor) {
                // console.info("Header not only child");
                handleSplit(blockElem, elemParent, range, true);
            }

            observer.observe(editableDiv.current, config);
        } else if (!selection.isCollapsed && allHeadings.includes(blockType.toUpperCase())) {
            const range = selection.getRangeAt(0);
            // console.info(!editableDiv.current.focus());
            const blockElem = document.createElement(blockType);
            const breakElem = document.createElement("br");
            // at least a node is selected
            var selKeeper = document.createElement("div");
            var virtualCont = document.createElement("div");

            var selCommonAncestor = getParentNode();

            var selectedContents = range.cloneContents();
            //this trick solves probs regarding representing multiple nodes with double quotes
            //usually occur when part of node was styled or has style removed
            virtualCont.appendChild(selectedContents);
            selKeeper.innerHTML = virtualCont.innerHTML;
            var allNodesSelected = selKeeper.childNodes;

            const selectedNodes = serializeBlock(allNodesSelected, blockElems);
            blockElem.appendChild(selectedNodes);
            range.extractContents();
            //insert elem to give u access to dom
            range.insertNode(blockElem);
            range.selectNode(blockElem);

            const closestDiv = blockElem.closest("div");
            handleSplit(blockElem, closestDiv, range, false);
        }
        settoolTipToClose("headings");
    };
    const handleSplit = (blockElem, parentEl, range, collapseTrue) => {
        const parentElIsEditor = parentEl.isEqualNode(editableDiv.current);
        if (!parentElIsEditor) {
            const cloned = blockElem.cloneNode(true);

            var basePart = document.createElement("div");
            var secondPart = document.createElement("div");
            var replaceWith = document.createElement("div");
            //from selection startRange to left 0-index of parent commonAncestor
            range.setStart(parentEl, 0);
            range.setEndBefore(blockElem);
            var base = range.cloneContents();
            basePart.appendChild(base);

            //from selection endRange to right at end of parent commonAncestor
            range.setStartAfter(blockElem);
            // range.setEnd(selCommonAncestor, selCommonAncestor.childNodes.length);
            range.setEndAfter(parentEl.lastChild);
            var secPart = range.cloneContents();
            secondPart.appendChild(secPart);
            // console.info(object);
            //splitting entire same style elem where selection is found
            const elStart = document.createElement(parentEl.localName); //only used when element start has innerHTML
            elStart.className = parentEl.className; //in case class contains other styles
            elStart.style = parentEl.style;
            elStart.innerHTML = basePart.innerHTML;

            const elEnd = document.createElement(parentEl.localName);
            elEnd.className = parentEl.className;
            elEnd.style = parentEl.style;
            elEnd.innerHTML = secondPart.innerHTML;

            //re arrange in dom order as they where before
            elStart.textContent.trim().length > 0 ? replaceWith.appendChild(elStart) : "";
            replaceWith.appendChild(cloned);
            elEnd.textContent.trim().length > 0 ? replaceWith.appendChild(elEnd) : "";

            var f = document.createDocumentFragment();
            Array.from(replaceWith.childNodes).map((node) => {
                f.appendChild(node);
            });

            parentEl.replaceWith(f);
            range.selectNode(cloned);
            range.setStart(cloned, 0);
            range.setEnd(cloned, cloned.childNodes.length);
            range.collapse(collapseTrue);
        }
    };
    const stripUnwantedHTML = (node) => {
        //Remove every span element within editableElem with 0 children
        const editableElem = editableDiv.current;
        if (editableElem) {
            const spans = editableElem.querySelectorAll("span");
            Array.from(spans).forEach((span) => {
                if (span.innerHTML.trim().length === 0) {
                    span.replaceWith(" ");
                }
            });
        }
    };
    const stripUnwantedNode = (node) => {
        //Remove every span element within editableElem with 0 children
        const editableElem = editableDiv.current;
        if (editableElem) {
            const elem = editableElem.querySelectorAll(node);
            Array.from(elem).forEach((node) => {
                if ((node.textContent.trim().length === 0 && !node.children.length) || (node.children.length == 1 && !node.firstElementChild.innerHTML)) {
                    if (node.tagName != "P" && node.children[0].tagName != "BR") {
                        //making sure line break or paragraph are not stripped
                        node.remove();
                    }
                }
            });
        }
    };
    const nodesToFragment = (childNodes) => {
        var nodes = document.createDocumentFragment();
        Array.from(childNodes).map((node) => {
            nodes.appendChild(node);
        });
        return nodes;
    };
    const serializeInnerStyle = (allNodesSelected, styleClass) => {
        Array.from(allNodesSelected).map((child) => {
            if (child.className && child.className == styleClass) {
                var fragment = document.createDocumentFragment();
                Array.from(child.childNodes).map((node) => {
                    fragment.appendChild(node);
                });
                child.replaceWith(fragment);
            } else if (child.classList && child.classList.contains(styleClass)) {
                child.classList.remove(styleClass);
                child.style[styleAttribute] = styleClass.split("-").pop();
            }
        });

        var fragment = document.createDocumentFragment();
        Array.from(allNodesSelected).map((node) => {
            fragment.appendChild(node);
        });
        return fragment;
    };
    const serializeBlock = (allNodesSelected, allowedBlockTypes) => {
        Array.from(allNodesSelected).map((child) => {
            if (allowedBlockTypes.includes(child.nodeName)) {
                var fragment = document.createDocumentFragment();
                Array.from(child.childNodes).map((node) => {
                    fragment.appendChild(node);
                });
                child.replaceWith(fragment);
            }
        });

        var fragment = document.createDocumentFragment();
        Array.from(allNodesSelected).map((node) => {
            fragment.appendChild(node);
        });
        return fragment;
    };

    const getSelectionText = () => {
        var txt = "";
        if (document.getSelection) {
            txt = document.getSelection();
        } else if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        } else {
            return;
        }
        return txt;
    };

    const getParentNode = () => {
        var parentEl = null,
            sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((sel = document.selection) && sel.type != "Control") {
            parentEl = sel.createRange().parentElement();
        }
        return parentEl;
    };

    const pasteHtmlAtCaret = (html) => {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(),
                    node,
                    lastNode;

                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    };
    const handleSelection = (event) => {
        // console.info("Some text selected");
    };
    const handleFocus = (event) => {
        var selection = getSelectionText();
        var range = new Range();

        // if ((editableDiv.current.firstElementChild
        //     && editableDiv.current.firstElementChild.nodeName === "BR")) {
        //     editableDiv.current.firstElementChild.remove();
        //     const division = document.createElement('div');
        //     const breakTag = document.createElement('br');
        //     division.appendChild(breakTag);

        //     range.setStart(editableDiv.current, 0);
        //     range.setEnd(editableDiv.current, editableDiv.current.childNodes.length);
        //     range.collapse(true);
        //     range.insertNode(division);

        //     range.setStart(division, 0);
        //     range.setEnd(division, division.childNodes.length);
        //     range.collapse(true);

        // } else if (!editableDiv.current.firstElementChild ||
        //     !blockElems.includes(editableDiv.current.firstElementChild.nodeName)) {
        //     const division = document.createElement('div');
        //     const breakTag = document.createElement('br');
        //     division.appendChild(breakTag);
        //     division.style.clear = "both";

        //     range.setStart(editableDiv.current, 0);
        //     range.setEnd(editableDiv.current, editableDiv.current.childNodes.length);
        //     range.collapse(true);
        //     range.insertNode(division);

        //     range.setStart(division, 0);
        //     range.setEnd(division, division.childNodes.length);
        //     range.collapse(true);
        // }
        // event.preventDefault();
    };
    const handleKeyDown = (event) => {
        if (event.ctrlKey || event.key === "Meta") {
            setctrlKeyActive(true);
        }

        if (ctrlKeyActive && event.key === "s" && props.ctrlSToSave) {
            // Prevent the Save dialog to open
            event.preventDefault();
            if (props.mode == "editing") {
                handleSave("saveToDB");
            }
        }

        var selection = getSelectionText();
        var range = selection.getRangeAt(0);

        if (event.key === "Enter") {
            const divElem = document.createElement("div");
            const breakElem = document.createElement("br");
            divElem.appendChild(breakElem);

            const commonAncestor = range.commonAncestorContainer;
            const commonAncestorParent = range.commonAncestorContainer.parentElement;
            const localN = commonAncestor.localName;
            const commonAnsParentN = commonAncestorParent.localName;

            if (localN === "h6") {
                range.setStartAfter(commonAncestor);
                range.setEndAfter(commonAncestor);
                range.insertNode(divElem);
                //focus cursor in the new element
                range.selectNode(divElem);
                range.collapse(true);
                event.preventDefault();
            } else if (commonAnsParentN === "h6") {
                range.setStartAfter(commonAncestorParent);
                range.setEndAfter(commonAncestorParent);
                range.insertNode(divElem);
                //focus cursor in the new element
                range.selectNode(divElem);
                range.collapse(true);

                event.preventDefault();
            }
        }
    };

    const handleKeyUp = (event) => {
        if ((event.ctrlKey || event.key === "Meta") && ctrlKeyActive) {
            setctrlKeyActive(false);
        }
        if (props.handleKeyUp && !ctrlKeyActive) {
            props.handleKeyUp();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    };
    const handlePress = (e, action) => {
        e.preventDefault();
        uploadImg.current.click();
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        const imgName = await editorContext.handleContentUpload();
        var selection = getSelectionText();
        editableDiv.current.focus();
        if (selection.rangeCount) {
            var range = selection.getRangeAt(0);
            // const images = [];
            // editorContext.imgTemplate.forEach((val, attr) => {
            //     images.push({ attr: attr, val: val });
            // });
            // const src = images[0];
            const image = document.createElement("img");
            image.src = `/storage/image/${imgName}`;
            image.style.width = "100%";
            // image.style.maxWidth = "260px";
            image.style.maxHeight = "250px";
            image.style.objectFit = "contain";
            image.style.float = "left";
            image.style.padding = "0.3rem";
            image.style.margin = "0 auto";
            range.insertNode(image);
            range.selectNode(image);
            range.collapse();

            settoolTipToClose("imgInsert");
            editorContext.resetSourceMedia();
        }
    };
    const handleSave = (saveTo) => {
        if (editableDiv.current && editableDiv.current.textContent.length) {
            const str = editableDiv.current.innerHTML.replace(/\s\s+/g, " ");

            const output = {
                innerHtml: str,
                editorNodes: editableDiv.current.childNodes,
                editorTitle: editorTitle,
            };
            if (props.title == true && editorTitle.replace(/\s\s+/g, " ").trim().length && str.trim().length) {
                props.handleOutput(output, saveTo);
                settoolTipToClose("save");
            } else if (str.trim().length) {
                settoolTipToClose("save");
                props.handleOutput(output, saveTo);
            }
        }
    };
    const stringCapitalize = (string) => {
        const str = string.replace(/\s\s+/g, " ").split(" ");
        for (let index = 0; index < str.length; index++) {
            if (str[index][0] != undefined) {
                str[index] = str[index][0].toUpperCase() + str[index].substring(1);
            } else {
                str[index] = str[index][0];
            }
        }
        return str.join(" ");
    };

    const handleCode = (e) => {
        e.preventDefault();

        var selection = getSelectionText();
        //if node not selected
        editableDiv.current.focus();
        if (selection.isCollapsed) {
            const range = selection.getRangeAt(0);

            const blockElem = document.createElement("CODE");
            const clearDiv = document.createElement("DIV");
            const codeParent = document.createElement("DIV");
            const breakElem = document.createElement("br");

            blockElem.appendChild(breakElem);
            codeParent.appendChild(blockElem);

            range.insertNode(codeParent);
            range.setStart(blockElem, 0);
            range.setEnd(blockElem, breakElem.childNodes.length);
            range.collapse(true);

            blockElem.parentElement.style.background = "#495057";
            blockElem.parentElement.style.padding = "0 1rem";
            blockElem.style.color = "#97bfe0";

            // if the inserted element is same as the one inserted, remove and come out of it
            if (codeParent.parentElement.nodeName == "CODE") {
                clearDiv.appendChild(breakElem);
                clearDiv.style.clear = "both";

                range.setStartAfter(codeParent.parentElement.closest("div"));
                // range.collapse(true);
                range.insertNode(clearDiv);
                range.setStart(clearDiv, 0);
                range.setEnd(clearDiv, breakElem.childNodes.length);
                range.collapse(true);
                codeParent.remove();
            }
        }
    };

    const handleUL = (e) => {
        e.preventDefault();

        var selection = getSelectionText();
        //if node not selected
        editableDiv.current.focus();
        if (selection.isCollapsed) {
            const range = selection.getRangeAt(0);

            const blockElem = document.createElement("UL");
            const li = document.createElement("LI");
            const clearDiv = document.createElement("DIV");
            const breakElem = document.createElement("br");

            blockElem.appendChild(li);

            range.insertNode(blockElem);
            range.setStart(li, 0);
            range.setEnd(li, breakElem.childNodes.length);
            range.collapse(true);

            // if range is inside inline element
            if (inlineElems.includes(blockElem.parentElement.nodeName)) {
                handleSplit(blockElem, blockElem.parentElement, range, true);
            }
        }
    };

    const handleOL = (e) => {
        e.preventDefault();

        var selection = getSelectionText();
        //if node not selected
        editableDiv.current.focus();
        if (selection.isCollapsed) {
            const range = selection.getRangeAt(0);

            const blockElem = document.createElement("OL");
            const li = document.createElement("LI");
            const clearDiv = document.createElement("DIV");
            const breakElem = document.createElement("br");

            blockElem.appendChild(li);

            range.insertNode(blockElem);
            range.setStart(li, 0);
            range.setEnd(li, breakElem.childNodes.length);
            range.collapse(true);
        }
    };

    const handleAnchor = (e) => {
        e.preventDefault();

        removeTagWithNoHref();

        var selection = getSelectionText();
        //if node not selected
        editableDiv.current.focus();
        const range = selection.getRangeAt(0);
        const selectedContents = range.cloneContents();

        var selKeeper = document.createElement("div"); //selection keeper
        var virtualCont = document.createElement("div");
        const anchor = document.createElement("A");

        virtualCont.appendChild(selectedContents);
        selKeeper.innerHTML = virtualCont.innerHTML;

        anchor.innerHTML = selKeeper.innerHTML;
        // anchor.href = "#";
        anchor.style.cursor = "pointer";

        range.extractContents();
        //insert elem to give u access to dom
        range.insertNode(anchor);
        range.collapse(true);

        let anchorElems = anchor.querySelectorAll("a");
        if (anchorElems.length) {
            //check and remove any child link
            Array.from(anchorElems).forEach((elem) => {
                var f = document.createDocumentFragment();
                Array.from(elem.childNodes).map((node) => f.appendChild(node));
                elem.replaceWith(f);
            });
        }
        anchor.addEventListener("click", handleAnchorClick);
        setanchorParams(anchor.getBoundingClientRect());
        setactiveLink(anchor);
        setlinkTooltip(true);
    };

    const handleAlign = (e, alignValue) => {
        e.preventDefault();

        var selection = getSelectionText();
        //if node not selected
        editableDiv.current.focus();
        const range = selection.getRangeAt(0);
        const selectedContents = range.cloneContents();

        var selKeeper = document.createElement("div"); //selection keeper
        var virtualCont = document.createElement("div");
        const virtualSpan = document.createElement("SPAN");

        virtualCont.appendChild(selectedContents);
        selKeeper.innerHTML = virtualCont.innerHTML;
        virtualSpan.innerHTML = selKeeper.innerHTML;

        range.extractContents();
        //insert elem to give u access to dom
        range.insertNode(virtualSpan);
        // range.collapse(false);

        let virtualParent = virtualSpan.parentElement;
        let virtualAncestor = virtualSpan.parentElement.parentElement;
        const ancestorIsEditor = virtualAncestor.classList.contains("editable-container");
        const ancestorIsInline = inlineElems.includes(virtualAncestor.nodeName);
        const parentIsEditor = virtualParent.classList.contains("editable-container");
        const parentIsInline = inlineElems.includes(virtualParent.nodeName);

        const virtualSpanChildren = Array.from(virtualSpan.children).filter((elem) => blockElems.includes(elem.nodeName));
        const childrenHasBlock = virtualSpanChildren.length;

        if (!parentIsEditor && !parentIsInline) {
            virtualParent.style.textAlign = alignValue;
            // console.info("!parentIsEditor && !parentIsInline");
        } else if (!ancestorIsEditor && !ancestorIsInline && !parentIsEditor) {
            virtualAncestor.style.textAlign = alignValue;
            // console.info("!ancestorIsEditor && !ancestorIsInline && !parentIsEditor");
        } else if (parentIsEditor) {
            const pTag = document.createElement("P");
            pTag.innerHTML = virtualCont.innerHTML;
            pTag.style.textAlign = alignValue;
            range.extractContents();
            range.insertNode(pTag);
            range.collapse(false);
            return;
        }

        if (childrenHasBlock) {
            virtualSpanChildren.forEach((elem, index) => {
                if (elem.style.textAlign != alignValue) {
                    elem.style.textAlign = alignValue;
                }
            });
        }

        // remove virtual span and replace it with the children;
        var fragment = document.createDocumentFragment();
        Array.from(virtualSpan.childNodes).map((node) => {
            fragment.appendChild(node);
        });
        range.extractContents();
        range.insertNode(fragment);
        range.collapse(false);
    };

    const insertLink = (href) => {
        if (href.trim().length) {
            activeLink.href = href;
        } else {
            removeTagWithNoHref();
        }
        handleSave("saveToState");
        setlinkTooltip(false);
    };

    const removeTagWithNoHref = () => {
        let anchorElems = editableDiv.current.querySelectorAll("a");
        Array.from(anchorElems).forEach((elem) => {
            //check if any link has href with just "#"
            //replace the anchor tag with its inner nodes
            if (elem.getAttribute("href") == "#") {
                var f = document.createDocumentFragment();
                Array.from(elem.childNodes).map((node) => f.appendChild(node));
                elem.replaceWith(f);
            }
        });
    };

    const handleAnchorClick = (event) => {
        event.preventDefault(); //stops default behavior of link
        const activeAnchor = event.target.closest("a");

        setremoveLinkParams(activeAnchor.getBoundingClientRect());
        setactiveRemoveLink(activeAnchor);
        setremoveLinkTooltip(true);
    };

    const removeLink = () => {
        var f = document.createDocumentFragment();
        Array.from(activeRemoveLink.childNodes).map((node) => f.appendChild(node));
        activeRemoveLink.replaceWith(f);
        setremoveLinkTooltip(false);
    };

    const handleChange = (e) => {
        const target = e.target;
        const { textContent, id } = target;
        setform({ ...form, [id]: textContent });
    };

    const handleTitleChange = (e) => {
        const target = e.target;
        const { value } = target;
        const title =
            props.titleTransform == "upperCase"
                ? value.replace(/\s\s+/g, " ").toUpperCase()
                : props.titleTransform == "lowerCase"
                    ? value.replace(/\s\s+/g, " ").toLowerCase()
                    : stringCapitalize(value.replace(/\s\s+/g, " "));

        seteditorTitle(title);

        const str = editableDiv.current.innerHTML.replace(/\s\s+/g, " ");
        const output = {
            innerHtml: str,
            editorNodes: editableDiv.current.childNodes,
            editorTitle: title,
        };
        props.handleOutput(output, "saveToState");
    };

    return (
        <>
            <CustomEditorStyle
                $width={props.width}
                $editorheight={props.editorHeight}
                $padding={props.padding}
                $bgc={props.bgc}
                $color={props.color}
            >
                {
                    props.title && !props.notEditable ? (
                        <div
                            className={"inputCont"}
                            // style={ { border: "1px solid silver" } }
                            style={{
                                boxShadow: `${editorTitle.replace(/\s\s+/g, " ").trim().length < 1
                                    ? "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px red, -1px 0px 1px 0px red"
                                    : "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px green, -1px 0px 1px 0px green"
                                    }`,
                            }}
                        >
                            <span className={"span-label"}>Enter Title</span>
                            <input
                                type="text"
                                name="editorTitle"
                                placeholder={`Enter a title...`}
                                id="editorTitle"
                                required
                                value={editorTitle}
                                ref={inputTitle}
                                onChange={(e) => handleTitleChange(e)}
                            />
                        </div>
                    ) : (
                        ""
                    )
                    // <h4>{ editorTitle }</h4>
                }
                {props.notEditable ? (
                    <></>
                ) : (
                    <DivTag position={"sticky"} top={"0px"} zIndex={"10"}>
                        {props.warning ? <DivTag lHeight={"normal"}>{props.warning}</DivTag> : ""}
                        {props.response && props.response != "" ? (
                            <DivTag position={"absolute"} bgc={theme.cover_color} top={"110%"} right={"0.5rem"} padding={"0 1rem 0 0"}>
                                <LoadingBtn text={props.response} lineHeight={"unset"} fontSize={"small"} fontWeight={300} loadMore={false} />
                            </DivTag>
                        ) : (
                            ""
                        )}
                        <ToolBar
                            excludes={props.excludes && props.excludes.length ? props.excludes : []}
                            handleEffect={handleInline}
                            handleBlock={handleBlock}
                            handleCode={handleCode}
                            handleUL={handleUL}
                            handleOL={handleOL}
                            handleAlign={handleAlign}
                            handleAnchor={handleAnchor}
                            handlePress={handlePress}
                            handleInsert={handleInsert}
                            handleSave={handleSave}
                            mode={props.mode}
                            fSize={props.fSizeToolbar}
                            fixedBottom={props.tolltipFixedBottom}
                            fixedTop={props.tolltipFixedTop}
                            closeTooltip={toolTipToClose}
                            handleEditorClose={props.handleEditorClose}
                            contextSrc={editorContext}
                            handleDelPreview={editorContext.handleDelPreview}
                            previewable={editorContext.previewable}
                            imgTemplate={editorContext.imgCollections}
                        />
                    </DivTag>
                )}
                <ScrollerY
                    bRadius={"0px"}
                    gap={"0.5rem"}
                    bgc={theme.cover_color}
                // maxHeight={ "60vh" }
                >
                    <div
                        className={props.notEditable === true ? "" : "editable-container"}
                        ref={editableDiv}
                        onFocus={(e) => handleFocus(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e)}
                        onSelect={(e) => handleSelection(e)}
                        contentEditable={props.notEditable ? false : true}
                        suppressContentEditableWarning
                        // dangerouslySetInnerHTML={ { __html: "hi"} }
                        onInput={(e) => handleEditorChange(e)}
                        onPaste={(e) => handlePaste(e)}
                    ></div>
                </ScrollerY>
                <input
                    type="file"
                    name=""
                    id="dp_input_file"
                    ref={uploadImg}
                    multiple
                    style={{ display: "none" }}
                    onClick={(e) => {
                        e.target.value = "";
                    }}
                    onChange={(event) => editorContext.handleFile(event, "customEditor", 1)}
                />
            </CustomEditorStyle>
            {linkTooltip ? (
                <ToolTip
                    elemParams={anchorParams}
                    closeable={false} //only when the link is inserted
                    overflowY={""}
                    maxHeight={""}
                    minHeight={""}
                    padding={"0.5rem"}
                    tooltipBgc={"white"}
                    handleToolTip={() => setlinkTooltip(false)}
                    handleMounted={() => { }}
                >
                    <DivTag padding={"1rem 0px 0px 0px"} bgc={"white"} align={"center"} justify={"center"} gap={"0.5rem"} width={"260px"}>
                        <EditableDiv
                            ref={linkInput}
                            multipleLines={true}
                            miniHeight={"1.5rem"}
                            padding={"3px 1rem"}
                            handleOninput={handleChange}
                            nameUniq={"href"}
                            placeholder={"Link to..."}
                            error={false}
                            handleEnterKey={() => insertLink(form.href)}
                        />

                        <DivTag justify={"center"}>
                            <ActionBtn btnText={"Insert"} bgc={"#3b7d71"} color={"whitesmoke"} border={"unset"} btnClick={() => insertLink(form.href)} />
                        </DivTag>
                    </DivTag>
                </ToolTip>
            ) : (
                ""
            )}

            {removeLinkTooltip ? (
                <ToolTip
                    elemParams={removeLinkParams}
                    closeable={true} //only when the link is inserted
                    padding={"0.5rem"}
                    tooltipBgc={"white"}
                    handleToolTip={() => setremoveLinkTooltip(false)}
                >
                    <DivTag padding={"1rem 0px 0px 0px"} bgc={"white"} align={"center"} justify={"center"} gap={"0.5rem"} width={"100px"}>
                        <DivTag justify={"center"}>
                            <ActionBtn btnText={"Remove link"} bgc={theme.background_color} color={theme.danger} border={"unset"} btnClick={removeLink} />
                        </DivTag>
                    </DivTag>
                </ToolTip>
            ) : (
                ""
            )}
        </>
    );
});

export default CustomEditor;
export const CustomEditorStyle = styled.div`
    background: ${(props) => (props.$bgc ? (props) => props.$bgc : "white")};
    color: ${(props) => (props.$color ? (props) => props.$color : "#343a40")};
    width: ${(props) => props.$width};
    max-width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: max-content;
    overflow: hidden;
    /* box-shadow: 0px 1px 10px #a2a2a2; */
    padding: ${(props) => (props.$padding ? props.$padding : "20px 5px")};
    position: relative;
    .inputCont {
        position: relative;
        border-radius: 10px;
        margin-bottom: 5px;
        border: 1px solid #e7e8e9;
        display: grid;
        grid-auto-flow: column;
        justify-items: end;
        .span-label {
            position: absolute;
            top: -13px;
            left: 10px;
            padding: 0 10px;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.06), #ffff 60%);
            border-radius: 30%;
            color: #0b2080;
            font-weight: 600;
            letter-spacing: 1.5px;
            line-height: 1.3;
            text-shadow: -1px -1px 1px white;
            font-size: ${(props) => (props.$windowWidth <= 400 ? "smaller" : props.$windowWidth <= 768 ? "small" : "")};
        }
        .span-status {
            position: absolute;
            top: -10px;
            right: 0;
            font-size: smaller;
            color: red;
            background: white;
            line-height: 1.2;
        }
        input {
            border: unset;
            border-radius: 10px;
            padding: 0 0.75rem;
            font-size: smaller;
            height: 26px;
            width: 100%;
            &:focus {
                border: unset;
                outline: unset;
                box-shadow: none;
            }
        }
    }
    .editings {
        display: grid;
        grid-auto-flow: column;
        gap: 2px;
        padding: 0.5rem;
        background: wheat;
        justify-items: center;
        i {
            cursor: pointer;
        }
    }
    .editable-container {
        min-height: ${(props) => (props.$editorheight ? props.$editorheight : "94vh")};
        padding: 0 0.5rem;
        white-space: pre-wrap;
        border: inset;
        border-top-color: rgb(0 0 0 / 21%);
        border-left-color: rgb(0 0 0 / 21%);
        border-right-color: rgb(0 0 0 / 6%);
        border-bottom-color: rgb(0 0 0 / 6%);
        &:focus {
            .placeholder {
                color: rgb(163, 136, 136);
            }
            outline: none;
            outline-width: 0;
        }
        div {
            clear: both;
        }
    }
`;
