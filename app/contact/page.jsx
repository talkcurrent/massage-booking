'use client';
import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/nav/Navigation'
import DivTag from '../components/DivTag';
import Footer from '../components/nav/Footer';
import useViewPort from '../components/customHooks/useViewPort';
import { useRouter } from 'next/navigation';
import Translate from '../components/Translate';
import { CommonContext } from '../components/context/CommonContext';

const Page = () => {
    const { deviceHeight, deviceWidth, language } = useContext(CommonContext);
    const [navHeight, setnavHeight] = useState(0);

    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);
    const router = useRouter();

    useEffect(() => {
        // router.prefetch(`/`);
        // router.prefetch(`/about`);
        // router.prefetch(`/vission`);
    }, [])

    const getLayout = (rect) => {
        const { height } = rect
        setnavHeight(height)
    }

    return (
        <DivTag
            // width={windowWidth + "px"}
            height={deviceHeight + "px"}
            bgc={"linear-gradient(0deg, #0a0f15 44%, #14181d)"}
            position={"relative"}
            overflow={"auto"}
            gtr={"auto 1fr auto"}
        >
            <Navigation
                onLayout={getLayout}
            />
            <DivTag
                height={'max-content'}
            >

                <main
                    style={{
                        height: (deviceHeight - navHeight),
                        // width: windowWidth + 'px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'grid',
                        padding: articlePad,
                        boxSizing: 'border-box'
                    }}
                >
                    <DivTag
                        display={"block"}
                        // padding={'0 15px'}
                        bSizing={'border-box'}
                    >
                        <h1 style={{ color: '#417e38' }}>{Translate('our contacts', language)}:</h1>

                        <p style={{ margin: '1rem 0' }}>{Translate('region available', language)} :</p>
                        <DivTag gap={"2rem"}>
                            <DivTag>
                                <p style={{ fontSize: 'large' }}>+1 828 471 7609</p>
                                <p><b>Email:</b> bonnievasilios@gmail.com</p>
                            </DivTag>
                            <DivTag>
                                <p style={{ fontSize: 'large' }}>+61 489 942 698</p>
                            </DivTag>
                            <DivTag>
                                <p><b>Email:</b> bonnievasilios@gmail.com</p>
                            </DivTag>
                        </DivTag>
                    </DivTag>
                </main>
            </DivTag>
            <Footer />
        </DivTag>
    )
}

export default Page;