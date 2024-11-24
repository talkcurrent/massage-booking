import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import randomStr from '../customHooks/randomStr';
import useTheme from '../customHooks/useTheme';
import useViewPort from '../customHooks/useViewPort';
import BottonNCounts from '../reuseable/BottonNCounts';
import DivTag from '../reuseable/DivTag';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import TC_Textarea from '../reuseable/TC_Textarea';
import TooltipBtn from '../reuseable/TooltipBtn';
import CommentBlock from './CommentBlock';
import CommentHead from './CommentHead';
import FocusInput from './FocusInput';
import HorizontalMenu from './HorizontalMenu';
import ReplyCard from './ReplyCard';
import UpdateableContent from './UpdateableContent';

const CommentCard = (props) => {
    const {
        cardBgc, color, margin, editable, deleteable,
    } = props;

    const [edit, setedit] = useState(false);
    const [updating, setupdating] = useState(false);
    const [closeTooltip, setcloseTooltip] = useState(false);
    const [replyOpen, setreplyOpen] = useState(false);
    const [repliesBlockHeight, setrepliesBlockHeight] = useState(0);
    const [reply, setreply] = useState("");
    const [emptyTextarea, setEmptyTextarea] = useState(false);
    const [textareaHeight, setTextareaHeight] = useState(45);

    const theme = useTheme();

    const repliesBlock = React.createRef();
    const textInput = useRef();
    const updateableTextSize = useViewPort(["small", "small", "small", ""]);
    const randNum = randomStr(7);

    useEffect(() => {
        setTimeout(() => {
            setcloseTooltip(false);
        }, 500);
    }, [closeTooltip]);

    useEffect(() => {
        updateReplyBlockHeight();
    });

    const handleReplyClick = (userTitle) => {
        setreply("@sirblezed_ ");
        textInput.current.focus("@sirblezed_ ");
    };

    const updateReplyBlockHeight = () => {
        if (repliesBlockHeight != repliesBlock.current.offsetHeight) {
            setrepliesBlockHeight(repliesBlock.current.offsetHeight);
        }
    };

    const updateTextAreaHeight = (height) => {
        setTextareaHeight(height);
    };

    const handleChange = (event, height) => {
        const target = event.target;
        const value = target.textContent.trim().replace(/\s\s+/g, " ");

        setreply(value);
        setEmptyTextarea(false);
        updateTextAreaHeight(height);
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            //run function where media source is.

            // mediaSource.postMediaComment(
            //     reply, media.id,
            //     props.mediaType ? props.mediaType : media.media_type,
            //     creatable
            // );
        }
    };

    const handleFile = (event) => {
        // mediaSource.handleMediaCommentFiles(event);
    };

    const handleDelete = () => {

    };
    const handleEdit = () => {
        setedit(!edit);
        setcloseTooltip(true);
    };
    const handleEditCancel = () => {
        setedit(false);
        setcloseTooltip(true);
    };
    const handleEditUpdate = () => {
        setupdating(true);
    };

    const toggleReply = () => {
        setreplyOpen(!replyOpen);
        textInput.current.focus("");
    };

    const handleLoadMore = () => {

    };

    return (
        <CommentCardStyle
            bgc={cardBgc}
            color={color}
            margin={margin}
        >
            <img src={`/storage/image/imageboy.jpg`} className="img-responsive mx-auto " />
            <div>
                <CommentHead
                    closeTooltip={closeTooltip}
                    lineHeight={1.1}
                >
                    {/* menu here */}
                    {/* scam, misleading, against terms, racism, abuse */}
                    <HorizontalMenu
                        align={"center"}
                        justify={"center"}
                        gap={"1rem"}
                        border={"unset"}
                        bShadow={"0px 0px 5px 0px #e0e0e0"}
                        bRadius={"5px"}
                    >
                        {deleteable ?
                            <IconToolTipBtn
                                textColor={"#d84114"}
                                fontSize={"larger"}
                                iconClass={"fas fa-trash-alt"}
                                handleClick={handleDelete}
                                border={"unset"}
                                padding={"0"}
                            />
                            : ""}
                        {editable ?
                            <IconToolTipBtn
                                textColor={"#5a6269"}
                                fontSize={"larger"}
                                iconClass={"fas fa-edit"}
                                handleClick={handleEdit}
                                border={"unset"}
                                padding={"0"}
                            />
                            : ""}
                    </HorizontalMenu>
                </CommentHead>
                <UpdateableContent
                    edit={edit}
                    fSize={updateableTextSize}
                    updating={updating}
                    handleEditCancel={handleEditCancel}
                    handleEditUpdate={handleEditUpdate}
                >
                    {/* content that maybe edited here */}
                    {"Some content to edit and update here."}
                </UpdateableContent>
                <div>
                    <HorizontalMenu
                        align={"center"}
                        justify={"center"}
                        gap={"1rem"}
                        margin={"0 0 0 1rem"}
                        lineHeight={1.2}
                        width={"max-content"}
                        border={"unset"}
                        bShadow={""}
                        bRadius={"5px"}
                    >
                        <BottonNCounts count={50}>
                            <IconToolTipBtn
                                textColor={"#5a6269"}
                                fontSize={"small"}
                                iconClass={"far fa-comments"}
                                handleClick={toggleReply}
                                tooltipMounted={() => { }}
                                tooltipUnMounted={() => { }}
                                border={"unset"}
                                padding={"0"}
                            />
                        </BottonNCounts>
                        <BottonNCounts count={100}>
                            <IconToolTipBtn
                                textColor={"#5a6269"}
                                fontSize={"small"}
                                iconClass={"far fa-thumbs-up"}
                                handleClick={() => { }}
                                tooltipMounted={() => { }}
                                tooltipUnMounted={() => { }}
                                border={"unset"}
                                padding={"0"}
                            />
                        </BottonNCounts>
                        <BottonNCounts count={10}>
                            <IconToolTipBtn
                                textColor={"#d44012"}
                                fontSize={"small"}
                                iconClass={"far fa-flag"}
                                handleClick={() => { }}
                                tooltipMounted={() => { }}
                                tooltipUnMounted={() => { }}
                                border={"unset"}
                                padding={"0"}
                            />
                        </BottonNCounts>
                        <TooltipBtn
                            textColor={"#969696"}
                            backgroundColor={"white"}
                            fontWeight={100}
                            fontSize={"x-small"}
                            btnText={"2 wks"}
                            handleClick={() => { }}
                            border={"unset"}
                            padding={"0"}
                            btnClass={"seperator"}
                        />

                    </HorizontalMenu>
                    <CommentBlock
                        bgc={""}
                        height={replyOpen ? `${repliesBlockHeight}px` : 0}
                        margin={0}
                        bRadius={"5px"}
                        gtr={"max-content"}
                        fSize={"smaller"}
                        color={"#343a40"}
                    >
                        <DivTag
                            ref={repliesBlock}
                            bgc={theme.cover_color}
                            padding={"1px"}
                            gap={"1px"}
                        >
                            {/* comment card here */}
                            <ReplyCard
                                cardBgc={theme.cardsBgc}
                                handleReplyClick={handleReplyClick}
                                color={theme.color}
                                deleteable={true}
                                editable={true}
                                updateReplyBlockHeight={updateReplyBlockHeight}
                            >

                            </ReplyCard>
                            <ReplyCard
                                cardBgc={"white"}
                                handleReplyClick={handleReplyClick}
                                color={theme.color}
                                deleteable={true}
                                editable={true}
                                updateReplyBlockHeight={updateReplyBlockHeight}
                            >

                            </ReplyCard>
                            <ReplyCard
                                cardBgc={"white"}
                                handleReplyClick={handleReplyClick}
                                color={theme.color}
                                deleteable={true}
                                editable={true}
                                updateReplyBlockHeight={updateReplyBlockHeight}
                            >

                            </ReplyCard>
                            <ReplyCard
                                cardBgc={"white"}
                                handleReplyClick={handleReplyClick}
                                color={theme.color}
                                deleteable={true}
                                editable={true}
                                updateReplyBlockHeight={updateReplyBlockHeight}
                            >

                            </ReplyCard>
                            {/* Load more button and collapse */}
                            <div style={{ background: theme.cardsBgc }}>
                                <HorizontalMenu
                                    align={"center"}
                                    justify={"center"}
                                    gap={"0.4rem"}
                                    lineHeight={1.2}
                                    width={"max-content"}
                                    border={"unset"}
                                    bShadow={""}
                                    bRadius={"5px"}
                                >

                                    <TooltipBtn
                                        loadingText={""}
                                        textColor={"#969696"}
                                        backgroundColor={"transparent"}
                                        fontWeight={100}
                                        fontSize={"small"}
                                        btnText={
                                            <>
                                                <i className="far fa-eye"></i>{" "}
                                                <span>more</span>
                                            </>
                                        }
                                        handleClick={handleLoadMore}
                                        border={"unset"}
                                        padding={"0"}
                                    />

                                    <IconToolTipBtn
                                        textColor={"#ea8d33"}
                                        fontSize={"small"}
                                        iconClass={"fas fa-minus-circle"}
                                        handleClick={toggleReply}
                                        border={"unset"}
                                        padding={"0"}
                                        btnClass={"seperator"}
                                    />
                                </HorizontalMenu>
                            </div>
                            <TC_Textarea
                                width="100%"
                                ref={textInput}
                                textareaMaxHeight={"100px"}
                                dictaphone emoji
                                miniHeight="unset"
                                padding={`0px 0px ${reply !== "" ? "23px" : "0px"} 1px`}
                                oninput={handleChange}
                                onkeypress={handleEnterKey}
                                onchange={handleFile}
                                name={`reply_${randNum}`}
                                editable={`true`}
                                // emptyTextarea={ emptyTextarea }
                                placeholder={`Reply...`}
                                id={`reply_${randNum}`}
                                editableempty={(reply === "").toString()}
                                content={reply}
                                createable={false}//comment as maybe one of the group or page u owned
                                // createables={ [] }//not necessary since createable ii false
                                // fetchCreateables={ () => { } }
                                handleSnapShot={() => { }}
                                audioRec={""}
                                handleAudio={() => { }}
                                handleResetMedia={() => { }}
                            >
                            </TC_Textarea>
                        </DivTag>
                    </CommentBlock>
                </div>
            </div>
        </CommentCardStyle>
    );
};

export default CommentCard;
const CommentCardStyle = styled.div`
    color: ${props => props.color};
    background: ${props => props.bgc};
    margin: ${props => props.margin};
    border-radius: 5px;
    overflow: hidden;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    padding: 2px;
    img{
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
    }
`;