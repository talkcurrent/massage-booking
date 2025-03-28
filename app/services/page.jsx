'use client';
import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/nav/Navigation'
import DivTag from '../components/DivTag';
import Footer from '../components/nav/Footer';
import useViewPort from '../components/customHooks/useViewPort';
import { useRouter } from 'next/navigation';
import Truncate from '../components/reuseable/Truncate';
import slides from '../components/slides';
import AnimateBtn from '../components/reuseable/AnimateBtn';
import Translate from '../components/Translate';
import { CommonContext } from '../components/context/CommonContext';

const Page = () => {
    const { deviceHeight, deviceWidth, language, setservice, currency } = useContext(CommonContext);
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

    const serviceClicked = (url) => {
        const services = slides();
        let service = services.find((serv) => serv.url === url)
        setservice(service)
        router.push('/order/' + url)
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
            <DivTag
                position={'sticky'}
                top={'0px'}
                zIndex={"100"}
                maxWidth={deviceWidth + "px"}
            >
                <Navigation onLayout={getLayout} />
            </DivTag>
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
                        <h2 style={{ color: '#417e38' }}>{Translate('therabonnies services', language)}</h2>
                        <DivTag
                            margin={'2rem 0 0 0'}
                            gap={'10px'}
                        >
                            {slides().map((service, index) => {
                                return <DivTag
                                    key={index}
                                    bRadius={"1.8rem"}
                                    padding={"15px 20px 2px 20px"}
                                    bShadow={"inset 0 0 0 0.2rem #1e1e1e"}
                                    gtr={"1fr auto"}
                                    height={"200px"}
                                >
                                    <DivTag>
                                        <h3 style={{ marginBottom: 10 }}>{Translate(service.title, language)}</h3>
                                        <p style={{ color: '#b4b4b4', textAlign: 'left' }}>{service.body && Truncate(Translate(service.body, language), 30)}</p>
                                        <p style={{ fontFamily: 'monospace', color: '#b4b4b4', fontSize: 'large' }}><b>{Translate(service.duration, language)} - {currency.symbol}{service.cost}</b></p>
                                    </DivTag>
                                    <DivTag
                                        justifySelf={"end"}
                                    >
                                        <AnimateBtn
                                            btnText={Translate("Book Now", language)}
                                            bgc={'#417e38'}
                                            buttonStyle={{ padding: "5px 10px" }}
                                            justify={"center"}
                                            animateColor={"white"}
                                            animateBgColor={"green"}
                                            color={"white"}
                                            handleClick={() => serviceClicked(service.url)}
                                        />
                                    </DivTag>
                                </DivTag>
                            })}
                        </DivTag>
                    </DivTag>
                </main>
            </DivTag>
            <Footer />
        </DivTag>
    )
}

export default Page;