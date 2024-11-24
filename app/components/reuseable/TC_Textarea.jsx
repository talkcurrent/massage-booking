import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import useCreatables from '../customHooks/useCreatables';
import randomStr from '../customHooks/randomStr';
import useTheme from '../customHooks/useTheme';
import Emoji from '../includes/Emoji';
import ActionBtn from '../reuseable/ActionBtn';
import Creatables from '../reuseable/Creatables';
import Dictaphone from '../reuseable/Dictaphone';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const TC_Textarea = React.forwardRef((props, ref) => {
    const theme = useTheme();
    const { creatables, authUser } = useCreatables();
    const randStr_photoInput = randomStr(10);
    const randStr_videoInput = randomStr(10);
    const randName = randomStr(10);

    const {
        item, //get the createables in global mode (into a context)
        createable, //if necessary to chose createable
        handleSnapShot, audioRec, handleResetMedia,
        handleReplyMsg,
        replyingToBody, messaging, textareaMaxHeight,
    } = props;

    const [editableEmpty, seteditableEmpty] = useState(true);
    const [data, setdata] = useState("");

    const [dictaphone, setDictaphone] = useState(false);
    const [closeTooltip, setcloseTooltip] = useState(false);
    const [boundingClientRect, setboundingClientRect] = useState('');
    //refs
    const textInput = useRef(null);
    const videFile = React.createRef();
    const imageFileInput = React.createRef();


    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                //each time new node is added, run below function
                // console.info("added!");
            }
        }
    };

    useEffect(() => {
        const observer = new MutationObserver(callback);

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                updateTextareaBoundingRect(entry.target.getBoundingClientRect());
            }
        });
        document.addEventListener('scroll', (e) => {
            updateRect();
        });
        if (textInput.current != null) {
            setboundingClientRect(textInput.current.getBoundingClientRect());
            resizeObserver.observe(textInput.current);
            observer.observe(textInput.current, config);
        }

        return () => {
            if (textInput.current) {
                document.removeEventListener('scroll', updateRect());
                resizeObserver.unobserve(textInput.current);
                observer.disconnect();
            }
        };
    }, []);

    const updateRect = () => {
        const rect = textInput.current.getBoundingClientRect();
        setboundingClientRect(rect);
    };
    const updateTextareaBoundingRect = (clientRect) => {
        // console.info(clientRect);
        if (clientRect != null) {
            setboundingClientRect(clientRect);
        }
    };

    useImperativeHandle(ref, () => ({
        focus: (param) => {
            if (param != "") setdata(param);

            const content = data || param;
            if (content != "") {
                // textInput.current.innerHTML = isURL(data);
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
        }
    }));

    useEffect(() => {
        //reset state if request to upload returns success
        //and audioRecorded is reset to empty ("")
        if (audioRec === "") {
            setDictaphone(false);
        }
    }, [audioRec]);

    const handleOninput = e => {
        const textareaHeight = textInput.current.clientHeight;
        if (editableEmpty != Boolean(!(e.target.textContent.trim().replace(/\s\s+/g, " ").length))) {
            seteditableEmpty(Boolean(!(e.target.textContent.trim().replace(/\s\s+/g, " ").length)));
        };
        const target = e.target;
        const value = target.innerHTML.replace(/&nbsp;/g, ' ').trim();
        setdata(value);

        if (props.collectInput)
            props.collectInput(value);
    };

    const handleEmoji = () => {
        const value = textInput.current.innerHTML;
        setdata(value);
    };

    const handleKeyUp = e => {
        const textareaHeight = textInput.current.clientHeight;
        props.updateTextareaHeight(textareaHeight);
    };

    const handleTruncate = (words, number) => {
        var splitted = words.split(" ");
        var res = splitted.slice(0, number).join(" ");
        var truncated;
        if (splitted.length > number) {
            truncated = res + "...";
        } else {
            truncated = res;
        }
        return truncated;
    };
    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleCreatable = (creatableObj) => {
        props.setcreatable(creatableObj);
        setcloseTooltip(true);
        setTimeout(() => {
            setcloseTooltip(false);
        }, 400);
    };

    const closeToolTip = () => {
        setcloseTooltip(true);
        setTimeout(() => {
            setcloseTooltip(false);
        }, 400);
    };

    // const onEmojiClick = async (event, emojiObject) => {
    //     const { names, emoji, unified } = emojiObject;
    //     const svg = `${unified}.svg`;
    //     const name = names[0];

    //     const data = {
    //         icon: emoji,
    //         unified: unified,
    //         svg: svg,
    //         name: name,
    //         category: "People & smileys",
    //     };
    //     const response = await useFetch("/save_emoji", JSON.stringify(data), "POST", false);

    //     // console.info(emojiObject);
    //     if (response.ok) {
    //         let result = await response.json();
    //     } else {

    //     }

    // };

    const getSelectionText = () => {
        var txt = '';
        if (document.getSelection) {
            txt = document.getSelection();
        }
        else if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        } else { return; }
        return txt;
    };

    const insertEmoji = async (e, imgName) => {
        e.preventDefault();

        var selection = getSelectionText();
        if (document.activeElement != textInput.current) {
            textInput.current.focus();
        }

        if (selection.rangeCount && document.activeElement == textInput.current) {
            var range = selection.getRangeAt(0);
            const img = document.createElement("img");

            img.src = `/storage/image/svg/${imgName}`;
            img.style.objectFit = "contain";
            img.setAttribute("draggable", false);
            img.style.width = "15px";
            img.style.height = "15px";
            img.style.margin = "0 1px";
            range.insertNode(img);
            range.selectNode(img);
            range.collapse();
            handleEmoji();
        }
    };

    const handleEnterKey = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (props.handleSubmit) {
                props.handleSubmit(data);
                // empty editor
                textInput.current.innerHTML = "";
                setdata("");
            }
        } else if (event.key === " " || event.key === "Spacebar") {
            if (data.length < 1) {
                event.preventDefault();
            }
        }
    };
    const handleSubmit = () => {
        if (props.handleSubmit) {
            props.handleSubmit(data);
            // empty editor
            textInput.current.innerHTML = "";
            setdata("");
        }
    };

    const handleAudio = () => {
        if (props.handleAudio) {
            props.handleAudio();
            setDictaphone(false);
        }
    };

    const creatableDatas = {
        closeTooltip: closeTooltip,
        authUser: authUser,
        item: item,
        creatables: creatables, //available creatables
        handleCreatable,
    };

    return (
        <TC_TextareaStyle>
            {/* if textarea is from messaging */}
            {replyingToBody != "" && messaging ?
                <ReplyingTo >
                    <p className="replying-to">
                        <span style={{ alignSelf: "end" }}><img
                            src="/storage/image/replying_black.png"
                            style={{ width: 20, height: 20, objectFit: "contain", opacity: 0.4 }}
                            alt=""
                        /></span>
                        <span
                            className={"replying-to-text"}
                        >{replyingToBody != "talk_cur_rent_files" ? handleTruncate(replyingToBody, 12) : "Replying to file(s)"}</span>
                    </p>
                    <span className={"cancel-replying-to"}><i
                        className="far fa-trash-alt"
                        style={{ fontSize: "11px" }}
                        title="Delete"
                        onClick={e => {
                            handleReplyMsg("", "", e);
                        }}
                    ></i></span>
                </ReplyingTo>
                : <React.Fragment></React.Fragment>
            }
            <div className="user-nd-tceditor">
                {/* user image goes here */}
                <div>
                    {props.children}
                </div>
                <Textarea
                    editableempty={!Boolean(data.trim().length)}
                    width={props.width}
                    miniHeight={props.miniHeight}
                    fSize={props.fSize}
                    padding={`2px 0px ${data.trim().length ? "20px" : "0px"} 0px`}
                    messaging={messaging}
                    borderRadius={props.borderRadius}
                    textareaMaxHeight={textareaMaxHeight}
                    replying={replyingToBody != ""}
                >
                    <div className="placeholder" style={{ opacity: dictaphone ? 0 : 1 }}>
                        {!Boolean(data.trim().length) ? props.placeholder : ""}
                    </div>
                    <div className="customTextarea" style={{ opacity: dictaphone ? 0 : 1 }}>
                        <span
                            className="textarea-custom"
                            width={props.width}
                            onInput={e => handleOninput(e)}
                            onKeyPress={handleEnterKey}
                            name={randName}
                            required
                            ref={textInput}
                            // dangerouslySetInnerHTML={ { __html: props.content } }
                            suppressContentEditableWarning
                            contentEditable={true}
                            autoFocus
                            placeholder={props.placeholder}
                            onPaste={e => handlePaste(e)}
                        ></span>
                    </div>
                    {/* textarea buttons go here */}
                    <TextAreaBtnsStyle>
                        {createable === true ?
                            <Creatables {...creatableDatas} />
                            : ""
                        }
                        {props.dictaphone == true && !Boolean(data.trim().length) ?
                            <IconToolTipBtn
                                btnClass={`tooltip-dicta-btn`}
                                textColor={"#96a5b1"}
                                fontSize={""}
                                iconClass={"fas fa-microphone"}
                                handleClick={() => setDictaphone(true)}
                                tooltipMounted={() => { }}
                                border={"unset"}
                                tooltipBgc={"white"}
                            />
                            : ""}
                        {props.emoji == true ?
                            <IconToolTipBtn
                                toolTip={true} ancestor={"home-root"}
                                class={`btn-emoji`}
                                textColor={"#96a5b1"}
                                fontSize={""}
                                iconClass={"fas fa-smile"}
                                handleClick={() => { }}
                                // tooltipMounted={ () => { } }
                                onMouseDown={(e) => e.preventDefault()}
                                border={"unset"}
                                tooltipBgc={"white"}
                                pointer={false}
                                //changes the position of tooltip to give rect
                                boundingClientRect={boundingClientRect}
                                padding={"18px 5px 5px 5px"}
                            >
                                {/* <EmojiPicker */}
                                <Emoji handleInsert={insertEmoji}>

                                </Emoji>
                            </IconToolTipBtn>
                            : ""}
                        {props.snapshot ?
                            <IconToolTipBtn
                                btnClass={`btn-img-capture`}
                                textColor={"#96a5b1"}
                                fontSize={""}
                                iconClass={"fas fa-camera snapshot"}
                                handleClick={e => handleSnapShot("capture")}
                                tooltipMounted={() => { }}
                                border={"unset"}
                            />
                            : ""}

                        {props.video == true ?
                            <IconToolTipBtn
                                btnClass={`tooltip-video-btn`}
                                textColor={"#96a5b1"}
                                fontSize={""}
                                iconClass={"fas fa-video"}
                                handleClick={(e) => videFile.current.click()}
                                tooltipMounted={() => { }}
                                border={"unset"}
                            />
                            : ""}

                        <IconToolTipBtn
                            btnClass={`btn-chat-img-Upload`}
                            textColor={"#96a5b1"}
                            fontSize={""}
                            iconClass={"fas fa-image"}
                            handleClick={e => imageFileInput.current.click()}
                            tooltipMounted={() => { }}
                            border={"unset"}
                        />
                        {props.showSendBtn && data.trim().length ?
                            <ActionBtn
                                processing={false}
                                progressText={""}
                                fontSize={"small"}
                                btnText={"Send"}
                                border={"unset"}
                                btnClick={handleSubmit}
                                disabled={false} bRadius={"2px"}
                                padding={"1px 5px 0 5px"}
                                justify={"center"} bgc={theme.nav_color}
                                color={theme.nav_bgc} lHeight={"0.9"}
                            />
                            : ""}
                    </TextAreaBtnsStyle>
                    {dictaphone ?
                        <DictaStyle>
                            <TooltipContents
                                padding={"0px 5px 0 0"}
                                cardsBgc={"#2c5853"}
                                alignItems={"center"}
                                justifyItems={"center"}
                                contextSrc={""}
                                height={"100%"}
                                width={"100%"}
                                maxWidth={"100%"}
                                bRadius={"30px"}
                            >
                                <Dictaphone
                                    onClose={() => setDictaphone(false)}
                                    handleAudio={handleAudio}
                                    //carries recorded audio blob
                                    handleResetMedia={handleResetMedia}
                                />
                            </TooltipContents>
                        </DictaStyle>
                        : ""}
                </Textarea>
            </div>
            <input
                onChange={e => props.onchange(e)}
                onClick={e => {
                    e.target.value = "";
                }}
                style={{ display: "none" }}
                id={randStr_photoInput}
                type="file"
                accept="image/*"
                ref={imageFileInput}
                multiple
            />
            <input
                onChange={e => props.onchange(e)}
                onClick={e => {
                    e.target.value = "";
                }}
                style={{ display: "none" }}
                id={randStr_videoInput}
                type="file"
                accept="video/*"
                ref={videFile}
                multiple
            />
        </TC_TextareaStyle>
    );
});

export default TC_Textarea;

const TC_TextareaStyle = styled.div`
    .user-nd-tceditor{
        background: rgb(238,238,238);
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        position: relative;
        gap: 1px;
        width: 100%;
        &:nth-child(1) {
            align-self: flex-start;
        }
    }
`;

export const ReplyingTo = styled.span`
    position: relative;
    max-width: 95%;
    display: block;
    .replying-to{
        padding: 0px 3px 2px 1px;
        margin: 0;
        background: #dee2e6;
        border-radius: 10px 10px 0 0;
        font-size: smaller;
        border: 1px solid #adc5bb;
        border-bottom: unset;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        .replying-to-text{
            color: rgb(122, 141, 158);
            font-weight: 100;
        }
    }
    .cancel-replying-to{
        position: absolute;
        right: -10px;
        top: 0;
        color: deeppink;
        cursor: pointer;
    }
`;
export const Textarea = styled.span`
    display: grid;
    width: 100%;
    font-size: ${props => props.fSize};
    position: relative;
    margin: ${props => props.messaging ? "2px 0" : "unset"};
    .placeholder {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        color: rgb(155, 155, 155);
        font-size: inherit;
        background: rgb(238, 238, 238);
        font-style: italic;
        font-family: serif;
        border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
        padding: ${props => props.padding};
        line-height: 1;
    }
    
    .customTextarea {
        position: relative;
        grid-row: 1;
        grid-column: 1;
        display: grid;
        align-items: center;
        .textarea-custom {
            min-height: ${props => props.miniHeight};
            width: ${props => props.width};
            border: none;
            overflow-x: hidden;
            word-wrap: break-word;
            word-break: break-word;
            border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
            color: #5d5d5d !important;
            line-height: 1.2;
            font-size: small;
            background-color: ${props => props.editableempty === true ? "rgb(0, 0, 0, 0)" : "rgb(238, 238, 238)"} !important;
            margin: ${props => props.padding};
            max-height: ${props => props.textareaMaxHeight};
            overflow: ${props => props.textareaMaxHeight ? "auto" : ""};
            display: inline-block;
            /* z-index: 1; */
            cursor: text;
            
            &:focus {
                .placeholder {
                    color: rgb(163, 136, 136);
                }
                outline: none;
                outline-width: 0;
                background-color: ${props => props.editableempty === true ? "rgb(0, 0, 0, 0)" : "rgb(238, 238, 238)"};
            }

            &:empty:before {
                content: "\feff";
                display: block;
                // min-height: 10vh;
                /* For Firefox */
            }

            &:focus:before {
                color: rgb(156, 18, 18);
                opacity: 0.4;
                font-style: italic;
            }
        }
        .close-chat-back{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0px 8px;
            justify-self: start;
            border-radius: 30px;
            background: transparent;
            &:hover {
                outline: none;
                outline-width: 0;
                color: green;
            }
        }
    }
`;

const TextAreaBtnsStyle = styled.div`
    display: grid;
    gap: 1rem;
    position: absolute;
    grid-auto-flow: column;
    right: 10px;
    bottom: 0px;
    line-height: 1;
    background: transparent;
    /* z-index: 1; */
    align-items: center;
    font-size: medium;
    .btn-emoji {
        display: block;
        cursor: pointer;
    }
`;

const DictaStyle = styled.div`
    position: relative;
    grid-row: 1;
    grid-column: 1;
    z-index: 2;
    height: max-content;
    align-self: end;
`;