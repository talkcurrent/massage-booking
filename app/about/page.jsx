'use client';
import React, { useEffect, useState } from 'react'
import Navigation from '../components/nav/Navigation'
import DivTag from '../components/DivTag';
import Footer from '../components/nav/Footer';
import useViewPort from '../components/customHooks/useViewPort';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [navHeight, setnavHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)
    const [deviceHeight, setdeviceHeight] = useState(0)
    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);

    const router = useRouter();

    useEffect(() => {
        setdeviceHeight(window.innerHeight);
        setdeviceWidth(window.innerWidth);
        router.prefetch(`/`);
        router.prefetch(`/contact`);
        router.prefetch(`/vission`);
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
                        <h1 style={{ color: '#417e38' }}>ABOUT US:</h1>

                        <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Blank!</p>
                    </DivTag>
                </main>
            </DivTag>
            <Footer />
        </DivTag>
    )
}

export default Page;