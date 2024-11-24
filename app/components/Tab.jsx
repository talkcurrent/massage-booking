import React, { useState } from 'react';
import DivTag from './DivTag';
import ScrollerX from './reuseable/ScrollerX';

const Tab = ({ menu, gap, menuHeight, color, activeBgc, activeColor, gtr, tabsBgc, tabContents, active }) => {
    const [tab, settab] = useState(active);

    return (
        <DivTag gtr={gtr} gap={gap}>
            <ScrollerX
                width={'100%'}
                position={'sticky'}
                top={'0px'}
            >
                <DivTag
                    overflow={"hidden"}
                    width={"100%"}
                    bgc={tabsBgc}
                    height={menuHeight}
                    // margin={"0 auto 7px auto"}
                    borderB={"1px solid silver"}
                    gaf={"column"}
                >

                    {menu.map((title, index) => {
                        return (
                            <DivTag
                                key={index + 1}
                                justifyContent={"center"}
                                alignContent={"center"}
                                bgc={tab == index ? activeBgc : "transparent"}
                                color={tab == index ? activeColor : color}
                                fWeight={tab == index ? "700" : " 400"}
                                handleClick={() => settab(index)}
                                transition={"all ease-in-out 0.4s"}
                                wSpace={'nowrap'}
                            >
                                {title}
                            </DivTag>
                        )
                    })}
                </DivTag>
            </ScrollerX>
            {
                // tabContents[tab]
                tabContents.map((el, index) => {
                    if (index == tab)
                        return <div key={index}>{el}</div>
                })
            }
        </DivTag>
    )
}

export default Tab