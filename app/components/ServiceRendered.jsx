'use client';
import React from 'react'
import DivTag from './DivTag'

function ServiceRendered({ bgi }) {

    return (
        <DivTag
            minHeight={"200px"}
            minWidth={'200px'}
            border={'1px solid rgba(36, 92, 43, 0.4)'}
            bRadius={"20px 0"}
            overflow={"hidden"}
            bgi={bgi}
            bgs={'contain'}
            bga={'local'}
            color={"silver"}
        >
            <DivTag
                hoverbgc={"rgba(0,0,0,0.95)"}
                bgc={'rgba(0,0,0,0.87)'}
                gtr={"1fr auto"}
                // padding={"10px"}
                hoverTransform={"scale(0.5)"}
                transition={"all 800s ease-in-out"}
            >
                <DivTag
                    align={"center"}
                    justify={"center"}
                    padding={"0 1rem"}
                >
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsam facere expedita voluptate quidem repellat cum, laudantium laborum perspiciatis corporis!...</p>
                </DivTag>
                <button
                    style={{
                        width: '50%',
                        border: "1px solid rgba(36, 92, 43, 0.4)",
                        justifySelf: 'flex-end',
                        padding: '5px 0',
                        borderRadius: 10,
                        backgroundColor: 'rgba(36, 92, 43, 0.28)',
                        fontSize: 'large'
                    }}
                >Learn more</button>
            </DivTag>
        </DivTag>
    )
}

export default ServiceRendered