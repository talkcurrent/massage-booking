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
        // router.prefetch(`/contact`);
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
                        <h2 style={{ color: '#417e38' }}>{Translate("about", language)}</h2>

                        <p style={{ margin: '1rem 0 0.5rem 0', textAlign: 'justify' }}>{Translate('welcome', language)}</p>
                        <p style={{ margin: '1rem 0', textAlign: 'justify' }}>{Translate("about-p-2", language)}</p>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>{Translate("about-p-3", language)}</p>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>{Translate("about-p-4", language)}</p>
                        <h3 style={{ color: '#417e38' }}><b>{Translate('our services', language)}:</b></h3>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>{Translate('our-services-p1', language)}</p>
                        <h3 style={{ color: '#417e38' }}><b>{Translate('why choose therabonnies?', language)}</b></h3>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>

                        </p>
                        <ul style={{ display: 'grid', gap: 8, padding: '0 0 0 2.5em' }}>
                            <li>{Translate('personalized care', language)}</li>
                            <li>{Translate('convenience', language)}</li>
                            <li>{Translate('professional therapists', language)}</li>
                            <li>{Translate('holistic approach', language)}</li>
                        </ul>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>{Translate('about-p-last', language)}</p>

                    </DivTag>
                </main>
            </DivTag>
            <Footer />
        </DivTag>
    )
}

export default Page;