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
import { MonetizationOn } from '@mui/icons-material';
import InputSelect from '../components/form/InputSelect';


const Page = () => {
    const { deviceHeight, deviceWidth, language, bookingForm, service, currency } = useContext(CommonContext);
    const [navHeight, setnavHeight] = useState(0);
    const [processingReport, setprocessingReport] = useState(false);
    const [masseuses, setmasseuses] = useState([])
    const [paymentMethod, setpaymentMethod] = useState(false)

    const imgDimension = useViewPort([
        deviceWidth - 40, deviceWidth - 30, 400, 600
    ]);
    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);
    const cardWidth = useViewPort([
        '320px', '360px', '400px'
    ]);

    const router = useRouter();

    useEffect(() => {
        if (bookingForm.email == "") {
            router.replace('/')
        }
        const paymentMethod = therabonnies(language);
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
        currency: currency.name,
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
        text: processingReport ? "Please wait..." : Translate('pay with card', language),
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
                        <DivTag
                            margin={'2rem 0 0 0'}
                            gap={'10px'}
                            align={'center'}
                            justify={'center'}
                        >
                            <DivTag
                                color={"#417e38"}
                            >
                                <h2>Complete Booking Here</h2>
                            </DivTag>

                            <DivTag
                                gap={"10px"}
                                margin={'5px auto'}
                                width={cardWidth}
                                bSizing={'border-box'}
                                bgc={'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgb(255 255 255))'}
                                minHeight={"max-content"}
                                bRadius={"15px"}
                                color={"black"}
                                padding={'1rem 5px'}
                            >
                                <InputSelect
                                    label={Translate("choose your preferred method", language)}
                                    // padding={'10px 0 0 0'}
                                    id={"bank"}
                                    name={"bank"}
                                    value={paymentMethod}
                                    inputBgc={"#fdfdfd"}
                                    inputColor={"black"}
                                    valueColor={"black"}
                                    width={"320px"}
                                    iconLeft={<MonetizationOn fontSize="large" color="action" sx={{ padding: "0px" }} />}
                                    onChange={(e) => setpaymentMethod(e.target.value)}
                                >
                                    <option value="">-- {Translate('select method', language)} --</option>
                                    <option value="cashapp">{Translate('pay with cash app', language)}</option>
                                    <option value="bitcoin">{Translate('pay with btc', language)}</option>
                                    <option value="card">{Translate('pay with card', language)}</option>

                                </InputSelect>
                                {paymentMethod === "cashapp" ?
                                    <DivTag>
                                        <h2 style={{ margin: "0 0 5px 0" }}>{Translate('pay with cash app', language)}</h2>
                                        <span>$BonnieVasilios</span>
                                    </DivTag>
                                    : paymentMethod === "bitcoin" ?
                                        <DivTag>
                                            <h2 style={{ margin: "0 0 5px 0" }}>{Translate('pay with btc', language)}</h2>
                                            <h5>Wallet ID:</h5> <br />
                                            <span>1Je78DUQQLF6EgaKrsrY5NKDr1shc7fv6g</span>
                                        </DivTag>
                                        : paymentMethod === "card" ?
                                            <DivTag>

                                                <DivTag
                                                    display={"flex"}
                                                    justify={"center"}
                                                    align={"center"}
                                                    gtc={"1fr"}
                                                    margin={"15px 0 0 0"}
                                                >
                                                    <FlutterWaveButton className={"btn-pay"} {...fwConfig} />

                                                </DivTag>
                                            </DivTag>
                                            : ""}
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