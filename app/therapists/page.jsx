'use client';
import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/nav/Navigation'
import DivTag from '../components/DivTag';
import Footer from '../components/nav/Footer';
import useViewPort from '../components/customHooks/useViewPort';
import { useParams, useRouter } from 'next/navigation';
import Translate from '../components/Translate';
import { CommonContext } from '../components/context/CommonContext';
import Image from 'next/image';
import therabonnies from '../components/therabonnies';
import { FlutterWaveButton } from 'flutterwave-react-v3';


const Page = () => {
    const { deviceHeight, deviceWidth, language, bookingForm, service } = useContext(CommonContext);
    const [navHeight, setnavHeight] = useState(0);
    const [processingReport, setprocessingReport] = useState(false);
    const [masseuses, setmasseuses] = useState([])

    const imgDimension = useViewPort([
        deviceWidth - 40, deviceWidth - 30, 400, 600
    ]);
    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);

    const router = useRouter();

    useEffect(() => {
        if (bookingForm.email == "") {
            router.replace('/')
        }
        const masseuses = therabonnies(language);
        setmasseuses(masseuses);
    }, [language])

    const getLayout = (rect) => {
        const { height } = rect
        setnavHeight(height)
    }

    const serviceClicked = (url) => {

        router.push('/order/' + url)
    }

    const config = {
        public_key: 'FLWPUBK-b407c2d81af92b2e9df00e00ea51b4d3-X',
        tx_ref: Date.now(),
        amount: service.cost,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: bookingForm.email,
            phone_number: bookingForm.phoneNumber,
            name: bookingForm.fullName,
        },
        customizations: {
            title: 'TheraBonnies',
            description: 'Booking',
            logo: 'https://therabonnies.vercel.app/therabonnie.png',
        },
    };

    const fwConfig = {
        ...config,
        text: processingReport ? "Please wait..." : Translate('book now', language),
        callback: async (response) => {
            setprocessingReport(true)
            let res = await updateReport(phone)
            if (res.ok) {
                const { path } = res.data;
                router.push(path);
                setprocessingReport(false)
            }
            closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => { },
    };

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
                        <h2 style={{ color: '#417e38', textAlign: 'center' }}>{"TheraBonnies"}</h2>
                        <DivTag
                            margin={'2rem 0 0 0'}
                            gap={'10px'}
                            align={'center'}
                            justify={'center'}
                        >
                            {masseuses.map((masseuse, index) => {
                                return <DivTag
                                    key={index}
                                    bRadius={"1.8rem"}
                                    padding={"5px 5px 5px 7px"}
                                    bShadow={"inset 0 0 0 0.2rem #1e1e1e"}
                                    gtr={"1fr auto"}
                                    overflow={'hidden'}
                                >
                                    <DivTag>
                                        <Image
                                            src={`/masseuses/${masseuse.photo}`}
                                            height={imgDimension}
                                            width={imgDimension}
                                            alt={masseuse.name}
                                            style={{ borderRadius: "20px", objectFit: 'cover' }}
                                        // objectFit='cover'
                                        />
                                        <DivTag tAlign={"center"} wSpace={"nowrap"}><strong>{masseuse.name}</strong></DivTag>
                                        {/* <DivTag tAlign={"center"} wSpace={"nowrap"}><span><small>TheraBonnies,</small> {masseuse.location}</span></DivTag> */}
                                    </DivTag>
                                    <DivTag
                                        justifySelf={"center"}
                                    >
                                        <FlutterWaveButton className={"btn-pay"} {...fwConfig} />
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