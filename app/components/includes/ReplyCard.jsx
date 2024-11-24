import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import randomStr from '../customHooks/randomStr';
import useViewPort from '../customHooks/useViewPort';
import BottonNCounts from '../reuseable/BottonNCounts';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import TooltipBtn from '../reuseable/TooltipBtn';
import CommentHead from './CommentHead';
import HorizontalMenu from './HorizontalMenu';
import UpdateableContent from './UpdateableContent';

const ReplyCard = (props) => {
    const {
        cardBgc, color, margin, editable, deleteable,
        updateReplyBlockHeight, handleReplyClick
    } = props;

    const [edit, setedit] = useState(false);
    const [updating, setupdating] = useState(false);
    const [closeTooltip, setcloseTooltip] = useState(false);

    const updateableTextSize = useViewPort(["x-small", "x-small", "small", "small"]);
    useEffect(() => {
        updateReplyBlockHeight();
    });

    useEffect(() => {
        setTimeout(() => {
            setcloseTooltip(false);
        }, 500);
    }, [closeTooltip]);

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

    return (
        <ReplyCardStyle
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
                    Some content to edit and update here.
                </UpdateableContent>
                <div>
                    <HorizontalMenu
                        align={"center"}
                        justify={"center"}
                        gap={"1rem"}
                        lineHeight={1.2}
                        margin={"0 0 0 1rem"}
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
                                handleClick={handleReplyClick}
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
                        <TooltipBtn
                            textColor={"#969696"}
                            backgroundColor={"white"}
                            fontWeight={100}
                            fontSize={"x-small"}
                            btnText={"3 days"}
                            handleClick={() => { }}
                            border={"unset"}
                            padding={"0"}
                            btnClass={"seperator"}
                        />

                    </HorizontalMenu>
                </div>
            </div>
        </ReplyCardStyle >
    );
};

export default ReplyCard;
const ReplyCardStyle = styled.div`
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
        width: 25px;
        height: 25px;
        object-fit: cover;
        border-radius: 50%;
    }
`;