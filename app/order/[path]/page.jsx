"use client"
import slides from '@/app/components/slides'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Navigation from '@/app/components/nav/Navigation';
import DivTag from '@/app/components/DivTag';
import Footer from '@/app/components/nav/Footer';
import useViewPort from '@/app/components/customHooks/useViewPort';
import InputText from '@/app/components/form/InputText';
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnimateBtn from '@/app/components/reuseable/AnimateBtn';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';


const Page = () => {
    const services = slides();
    const [service, setservice] = useState({})
    const [navHeight, setnavHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)
    const [deviceHeight, setdeviceHeight] = useState(0)
    const [form, setform] = useState({
        fullName: '', phoneNumber: '', email: '', address: '', date: ''
    });
    const [error, seterror] = useState({
        address: false, fullName: false, phoneNumber: false, email: false, date: false
    });

    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);
    const cardWidth = useViewPort([
        '320px', '360px', '400px'
    ]);
    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split('/').pop();
        let service = services.find((serv) => serv.url === path)
        setservice(service)
    }, []);

    const router = useRouter();

    useEffect(() => {
        setdeviceHeight(window.innerHeight);
        setdeviceWidth(window.innerWidth);
        router.prefetch(`/`);
        router.prefetch(`/contact`);
        router.prefetch(`/vission`);
    }, [])

    const config = {
        public_key: 'FLWPUBK-b407c2d81af92b2e9df00e00ea51b4d3-X',
        tx_ref: Date.now(),
        amount: service.cost,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: form.email,
            phone_number: form.phoneNumber,
            name: form.fullName,
        },
        customizations: {
            title: 'TheraBonnies',
            description: 'Booking',
            logo: 'https://therabonnies.vercel.app/therabonnie.png',
        },
    };

    const fwConfig = {
        ...config,
        text: 'Proceed to checkout',
        callback: async (response) => {
            setProcessingReport(true)
            let res = await updateReport(phone)
            if (res.ok) {
                const { path } = res.data;
                router.push(path);
                setProcessingReport(false)
            }
            console.log(response);
            closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => { },
    };

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
                        <h1 style={{ color: '#417e38', margin: '0.67em 0' }}>{service.hasOwnProperty('title') ? service.title : ""}</h1>
                        <h3 style={{ color: '#b4b4b4', margin: '0.67em 0' }}>{service.hasOwnProperty('title') ? <>{service.body} {service.duration}</> : ""} </h3>
                        {service.hasOwnProperty('title') ?
                            <p>{service.description.detail}</p>
                            : ""}
                        <h3 style={{ margin: '1rem 0' }}>What We Offer:</h3>
                        <ul style={{ display: 'grid', gap: 8, padding: '0 0 0 2.5em' }}>
                            {service.hasOwnProperty('title') ?
                                service.description.offers.map((offer, index) => {
                                    return <li key={index}>{offer}</li>
                                })
                                : ""}
                        </ul>
                        <h2 style={{ color: '#417e38', margin: '0.67em 0' }}>Appointment Form:</h2>
                        <DivTag
                            gap={"10px"}
                            margin={'0 auto'}
                            width={cardWidth}
                            bSizing={'border-box'}
                            bgc={'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgb(255 255 255))'}
                            minHeight={"max-content"}
                            bRadius={"15px"}
                            color={"black"}
                            padding={'1rem 10px'}
                        >
                            <InputText
                                tabIndex={"1"}
                                label={"Full Name"}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"fullName"}
                                name={"fullName"}
                                value={form.fullName}
                                error={error.fullName}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"E.g Bonnie Vasilios..."}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setform({ ...form, ['fullName']: e.target.value });
                                    seterror({ ...error, ['fullName']: false });
                                }}
                                iconLeft={<PersonIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"2"}
                                label={"Phone Number"}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"phoneNumber"}
                                name={"phoneNumber"}
                                value={form.phoneNumber}
                                error={error.phoneNumber}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"E.g (555) 555-1234"}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setform({ ...form, ['phoneNumber']: e.target.value });
                                    seterror({ ...error, ['phoneNumber']: false });
                                }}
                                iconLeft={<PhoneIphoneIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"3"}
                                label={"E-mail"}
                                inputType={"email"}
                                autoComplete={"false"}
                                padding={0}
                                id={"email"}
                                name={"email"}
                                value={form.email}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"E.g example@gmail.com..."}
                                inputColor={"black"}
                                iconLeft={<EmailIcon fontSize="large" color="action" sx={{ padding: "0px" }} />}
                                onChange={(e) => {
                                    setform({ ...form, ['email']: e.target.value });
                                    seterror({ ...error, ['email']: false });
                                }}
                            />
                            <InputText
                                tabIndex={"4"}
                                label={"Address"}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"address"}
                                name={"address"}
                                value={form.address}
                                error={error.address}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"e.g Mr Walter MDM Enterprises INC 1401 S Main St Plummer's Landing KY 41081-1411..."}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setform({ ...form, ['address']: e.target.value });
                                    seterror({ ...error, ['address']: false });
                                }}
                                iconLeft={<HomeIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"4"}
                                label={"Pick a date"}
                                staticLabel={true}
                                inputType={"date"}
                                autoComplete={"false"}
                                padding={0}
                                id={"date"}
                                name={"date"}
                                value={form.date}
                                error={error.date}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setform({ ...form, ['date']: e.target.value });
                                    seterror({ ...error, ['date']: false });
                                }}
                                iconLeft={<CalendarMonthIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <DivTag
                                bgc={"#fdfdfd"}
                                color={'black'}
                                height={'30px'}
                                gtc={"1fr 1fr"}
                            >
                            </DivTag>
                            <DivTag
                                justifySelf={"end"}
                            >
                                {/* <AnimateBtn
                                    btnText={"Check Out"}
                                    bgc={'#417e38'}
                                    buttonStyle={{ padding: "5px 10px" }}
                                    justify={"center"}
                                    animateColor={"white"}
                                    animateBgColor={"red"}
                                    color={"white"}
                                    handleClick={() => handleClick()}
                                /> */}
                                <FlutterWaveButton className={"btn-pay"} disabled={form.phoneNumber.trim() == "" || form.fullName.trim() == "" || form.email.trim() == ""} {...fwConfig} />
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
