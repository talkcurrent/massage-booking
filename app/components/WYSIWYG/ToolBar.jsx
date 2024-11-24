"use client"
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import { ImagePreview } from '../reuseable/ImagePreview';
import LoadingBtn from '../reuseable/LoadingBtn';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TitleIcon from '@mui/icons-material/Title';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const ToolBar = (props) => {
    const linkInput = useRef();

    const {
        handleEffect, handleBlock, handleCode, handleUL, handleOL,
        handleAlign,
        handleSave, handleEditorClose, mode,
        handlePress, handleInsert, handleAnchor,
        handleDelPreview, previewable, imgTemplate,
    } = props;

    return (
        <ToolBarStyle
            className={"editor-toolbar"}
            $fSize={props.fSize}
        >
            <div className="editings">
                <IconToolTipBtn
                    linkBtn={false} class={`editor-save-btn`}
                    toolTip={true} ancestor={"admin-dashboard"}
                    textColor={"black"}
                    fontSize={""}
                    iconElement={<TitleIcon />}
                    handleClick={() => { }}
                    tooltipMounted={() => { }}
                    onMouseDown={e => e.preventDefault()}
                    border={"unset"}
                    fixedBottom={true}
                    tooltipBgc={"white"}
                    closeTooltip={props.closeTooltip == "headings"}
                >
                    <TooltipContents
                        padding={"10px"}
                        cardsBgc={"white"}
                        alignItems={"center"}
                        justifyItems={"center"}
                    >
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h1")}>H1</span>
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h2")}>H2</span>
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h3")}>H3</span>
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h4")}>H4</span>
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h5")}>H5</span>
                        <span className={"h-list"} onMouseDown={e => handleBlock(e, "h6")}>H6</span>
                    </TooltipContents>
                </IconToolTipBtn>
                <FormatBoldIcon onMouseDown={e => handleEffect(e, "text-bold", 'fontWeight')} />
                <FormatItalicIcon onMouseDown={e => handleEffect(e, "text-italic", 'fontStyle')} />
                {props.excludes.includes("code") ?
                    <></>
                    :
                    <CodeIcon onMouseDown={e => handleCode(e, "CODE")} />
                }
                {props.excludes.includes("list") ?
                    <></>
                    :
                    <>
                        <small className={"cursor-pointer"} onMouseDown={e => handleUL(e)}>UL</small>
                        <small className={"cursor-pointer"} onMouseDown={e => handleOL(e)}>OL</small>
                    </>
                }

                <FormatUnderlinedIcon onMouseDown={e => handleEffect(e, "text-underline", 'textDecoration')} />
                {props.excludes.includes("link") ?
                    <></>
                    :
                    <AddLinkIcon onMouseDown={e => handleAnchor(e)} />
                }
                {props.excludes.includes("textAlign") ?
                    <></>
                    :
                    <>
                        <FormatAlignLeftIcon onMouseDown={e => handleAlign(e, "left")} />
                        <FormatAlignCenterIcon onMouseDown={e => handleAlign(e, "center")} />
                        <FormatAlignJustifyIcon onMouseDown={e => handleAlign(e, "justify")} />
                        <FormatAlignRightIcon onMouseDown={e => handleAlign(e, "right")} />
                    </>
                }
                {props.excludes.includes("camera") ?
                    <></>
                    :
                    <IconToolTipBtn
                        linkBtn={false} class={`editor-camera-btn`}
                        toolTip={true} ancestor={"admin-dashboardn"}
                        textColor={"black"}
                        fontSize={""}
                        iconElement={<CameraAltIcon />}
                        tooltipBgc={"white"}
                        backgroundColor={imgTemplate.size ? "#63b385" : ""}
                        border={"unset"}
                        onMouseDown={(e) => e.preventDefault()}
                        closeable={true}
                        fixedBottom={props.fixedBottom}
                        fixedTop={props.fixedTop}
                        closeTooltip={props.closeTooltip == "imgInsert"}
                    >
                        <TooltipContents
                            padding={"10px 5px 0px 5px"}
                            cardsBgc={"white"}
                            alignItems={"center"}
                            justifyItems={"center"}
                        >
                            {previewable == "customEditor" && imgTemplate.size ?
                                <div className="preview">
                                    <ImagePreview
                                        handleDelPreview={handleDelPreview}
                                        min={"100px"}
                                        max={"150px"}
                                        imgTemplate={imgTemplate} />
                                </div>
                                : ""
                            }
                            {!props.contextSrc.uploadingPhoto ?
                                <TooltipBtn
                                    linkBtn={false} btnLink={""} class={`insert-to-editor-btn`}
                                    toolTip={false} ancestor={"admin-dashboard"}
                                    textColor={"black"} fontSize={"small"}
                                    closeTooltip={""}
                                    tooltipBgc={"white"}
                                    backgroundColor={"whitesmoke"}
                                    hoverBgColor={""}
                                    hoverColor={""}
                                    borderRadius={"5px"}
                                    border={"unset"}
                                    padding={""}
                                    btnShadow={""}
                                    loadingText={""}
                                    handleClick={() => { }}
                                    tooltipMounted={() => { }}
                                    onMouseDown={(e) => {
                                        imgTemplate.size ? handleInsert(e) : handlePress(e, "photo");
                                    }}
                                    btnText={imgTemplate.size ? "Insert" : "Choose photo"}
                                    animateBtn={false}
                                    disabled={false}
                                    closeable={true}
                                />
                                :
                                <LoadingBtn text={"Uploading"} color={""} lineHeight={"unset"}
                                    fontSize={"small"} fontWeight={300} loadMore={false} />
                            }
                        </TooltipContents>
                    </IconToolTipBtn>
                }
                {mode == "editing" ?
                    <IconToolTipBtn
                        linkBtn={false} class={`editor-save-btn`}
                        toolTip={true} ancestor={"admin-dashboard"}
                        textColor={"black"}
                        fontSize={""}
                        iconElement={<SaveIcon />}
                        handleClick={() => { }}
                        tooltipMounted={() => { }}
                        onMouseDown={e => e.preventDefault()}
                        border={"unset"}
                        closeable={true}
                        fixedBottom={true}
                        tooltipBgc={"white"}
                        closeTooltip={props.closeTooltip == "save"}
                    >
                        <TooltipContents
                            padding={"10px"}
                            cardsBgc={"white"}
                            alignItems={"center"}
                            justifyItems={"center"}
                        >
                            <div>Click {"'Confirm'"} to save</div>
                            <button
                                style={{ border: "unset" }}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    handleSave("saveToDB");
                                }}>Confirm</button>
                        </TooltipContents>
                    </IconToolTipBtn>
                    : ""}
                {props.excludes.includes("close") ?
                    <></>
                    :
                    <CloseIcon onClick={e => handleEditorClose(e)} />
                }
            </div>
        </ToolBarStyle>
    );
};

export default ToolBar;
export const ToolBarStyle = styled.div`
    position: sticky;
    font-size: ${props => props.$fSize};
    top: 0;
    .editings{
        display: grid;
        grid-auto-flow: column;
        gap: 2px;
        padding: 0.5rem;
        background: wheat;
        justify-items: center;
        align-items: center;
        i{
            cursor: pointer;
        }
    }
    .h-list{
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
    }
`;

export const BLOCK_TYPES = [
    { label: " “ ” ", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "{ }", style: 'code-block' },
    { label: "CODE", style: 'code-element' },
];
export const BLOCK_TYPE_HEADINGS = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" }
];