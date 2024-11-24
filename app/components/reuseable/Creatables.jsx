import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import IconToolTipBtn from './IconToolTipBtn';
import TooltipContents from './TooltipContents';
import Response from './Response';
import NoRecord from './NoRecord';
import Loading from './Loading';
import Image from 'next/image';

const Creatables = (props) => {
    const {
        handleCreatable, closeTooltip, creatables,
        tooltipMounted, loadingCreatables, authUser, context
    } = props;

    return (
        <CreatablesStyle >
            < IconToolTipBtn
                linkBtn={false} class={`tooltip-creatable-btn`}
                toolTip={true} ancestor={"mainContainer"}
                textColor={"gray"}
                fontSize={"small"}
                iconClass={"fas fa-caret-down"}
                handleClick={() => { }}
                tooltipMounted={tooltipMounted}
                border={"unset"}
                closeTooltip={closeTooltip}
                context={context}
                tooltipBgc={"white"}
            >

                <TooltipContents
                    padding={"0 5px"}
                >
                    <strong>Post as any of the following:</strong>
                    {/* Auth user */}
                    {authUser && authUser.hasOwnProperty('id') ?
                        <div className={"creatable"}
                            onClick={e => handleCreatable(authUser)}
                        >
                            <Image
                                src={`/storage/image/${authUser.dp ? authUser.dp.name : "no_image.png"}`}
                                alt=""
                                style={{ width: 25, height: 25, borderRadius: "50%", objectFit: "cover" }}
                            />
                            <div>{authUser.name}</div>
                        </div>
                        : ""
                    }

                    {/* If auth user has some pages, store, clubs */}
                    {creatables && creatables.length ?
                        creatables.map((creator, key) => {
                            return (
                                <div
                                    key={key}
                                    className={"creatable"}
                                    onClick={e => handleCreatable(creator)}
                                >
                                    <Image
                                        src={`/storage/image/${creator.dp ? creator.dp.name : "no_image.png"}`}
                                        alt=""
                                        style={{ width: 25, height: 25, borderRadius: "50%", objectFit: "cover" }}
                                    />
                                    <div>{creator.name}</div>
                                </div>
                            );
                        })
                        : loadingCreatables ?
                            <NoRecord>
                                <Loading
                                    fixed={false}
                                    loaderPos={`25%`}
                                    borderRadius={`3px / 6px`}
                                    contBorderRadius={"10px"}
                                    transformOrigin={`1px 10px`}
                                    width={`1px`}
                                    height={`6px`}
                                    background={false}
                                    loaderColor={"#6b757d"}
                                />
                            </NoRecord>
                            : ""
                    }

                </TooltipContents>
            </IconToolTipBtn>
        </CreatablesStyle >
    );
};

export default Creatables;
export const CreatablesStyle = styled.div`
    .creatable{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        align-items: center;
        cursor: pointer;
    }
`;
