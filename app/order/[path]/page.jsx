"use client";
import slides from '@/app/components/slides'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Navigation from '@/app/components/nav/Navigation';
import DivTag from '@/app/components/DivTag';
import Footer from '@/app/components/nav/Footer';
import useViewPort from '@/app/components/customHooks/useViewPort';
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Translate from '@/app/components/Translate';
import { CommonContext } from '@/app/components/context/CommonContext';
import AnimateBtn from '@/app/components/reuseable/AnimateBtn';
import InputText from '@/app/components/form/InputText';
import isValidEmail from '@/app/components/reuseable/isValidEmail';
import { UNSAFE_createBrowserHistory, useLocation } from 'react-router';


const Page = (props) => {
    const his = UNSAFE_createBrowserHistory;
    const {
        deviceHeight, deviceWidth, language, service,
        bookingForm, setbookingForm,
        bookingError, setbookingError, setservice
    } = useContext(CommonContext);
    const services = slides();
    const [navHeight, setnavHeight] = useState(0);

    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);
    const cardWidth = useViewPort([
        '320px', '360px', '400px'
    ]);
    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split('/').pop();
        let service = services.find((serv) => serv.url === path);
        setservice(service)
    }, []);

    const router = useRouter();
    // const locatn = useLocation();

    useEffect(() => {
        history()
        // router.prefetch(`/`);
        // router.prefetch(`/contact`);
        // router.prefetch(`/vission`);
    }, [])

    const history = () => {
        // console.info(locatn)
    }
    const getLayout = (rect) => {
        const { height } = rect
        setnavHeight(height)
    }
    const handleTherapists = () => {
        let err = false;
        for (const key in bookingForm) {
            if (Object.hasOwnProperty.call(bookingForm, key)) {
                const value = bookingForm[key].length ? bookingForm[key].trim() : bookingForm[key];
                if (key == "email" && !isValidEmail(value)) {
                    setbookingError(prev => {
                        return { ...prev, [key]: true }
                    });
                    err = !isValidEmail(value);
                    continue;
                }
                if (value == "") {
                    setbookingError(prev => {
                        return { ...prev, [key]: true }
                    });
                    err = true
                }
            }
        }
        if (!err) {
            router.push('/therapists')
        }
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
                        <h1 style={{ color: '#417e38', margin: '0.67em 0' }}>{service.hasOwnProperty('title') ? Translate(service.title, language) : ""}</h1>
                        <h3 style={{ color: '#b4b4b4', margin: '0.67em 0' }}>{service.hasOwnProperty('title') ? <>{Translate(service.body, language)} {Translate(service.duration, language)}</> : ""} </h3>
                        {/* {service.hasOwnProperty('title') ?
                            <p>{service.description.detail}</p>
                            : ""}
                        <h3 style={{ margin: '1rem 0' }}>What We Offer:</h3>
                        <ul style={{ display: 'grid', gap: 8, padding: '0 0 0 2.5em' }}>
                            {service.hasOwnProperty('title') ?
                                service.description.offers.map((offer, index) => {
                                    return <li key={index}>{offer}</li>
                                })
                                : ""}
                        </ul> */}
                        <h2 style={{ color: '#417e38', margin: '0.67em 0' }}>{Translate("membership and booking bookingForm", language)}:</h2>
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
                                label={Translate("Full Name", language)}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"fullName"}
                                name={"fullName"}
                                value={bookingForm.fullName}
                                error={bookingError.fullName}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"E.g Bonnie Vasilios..."}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setbookingForm({ ...bookingForm, ['fullName']: e.target.value });
                                    setbookingError({ ...bookingError, ['fullName']: false });
                                }}
                                iconLeft={<PersonIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"2"}
                                label={Translate("Phone Number", language)}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"phoneNumber"}
                                name={"phoneNumber"}
                                value={bookingForm.phoneNumber}
                                error={bookingError.phoneNumber}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"(555) 555-1234..."}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setbookingForm({ ...bookingForm, ['phoneNumber']: e.target.value });
                                    setbookingError({ ...bookingError, ['phoneNumber']: false });
                                }}
                                iconLeft={<PhoneIphoneIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"3"}
                                label={Translate("email", language)}
                                inputType={"email"}
                                autoComplete={"false"}
                                padding={0}
                                id={"email"}
                                name={"email"}
                                value={bookingForm.email}
                                error={bookingError.email}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"example@gmail.com..."}
                                inputColor={"black"}
                                iconLeft={<EmailIcon fontSize="large" color="action" sx={{ padding: "0px" }} />}
                                onChange={(e) => {
                                    setbookingForm({ ...bookingForm, ['email']: e.target.value });
                                    setbookingError({ ...bookingError, ['email']: false });
                                }}
                            />
                            <InputText
                                tabIndex={"4"}
                                label={Translate("Address", language)}
                                inputType={"text"}
                                autoComplete={"false"}
                                padding={0}
                                id={"address"}
                                name={"address"}
                                value={bookingForm.address}
                                error={bookingError.address}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                placeholder={"e.g Mr Walter MDM Enterprises INC 1401 S Main St Plummer's Landing KY 41081-1411..."}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setbookingForm({ ...bookingForm, ['address']: e.target.value });
                                    setbookingError({ ...bookingError, ['address']: false });
                                }}
                                iconLeft={<HomeIcon fontSize="large" color="action" sx={{ p: "0px" }} />}
                            />
                            <InputText
                                tabIndex={"4"}
                                label={Translate("appointment day", language)}
                                staticLabel={true}
                                inputType={"date"}
                                autoComplete={"false"}
                                padding={0}
                                id={"date"}
                                name={"date"}
                                value={bookingForm.date}
                                error={bookingError.date}
                                inputBgc={"#fdfdfd"}
                                width={"320px"}
                                inputColor={"black"}
                                onChange={(e) => {
                                    setbookingForm({ ...bookingForm, ['date']: e.target.value });
                                    setbookingError({ ...bookingError, ['date']: false });
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
                                <AnimateBtn
                                    btnText={Translate('Proceed to checkout', language)}
                                    bgc={'#417e38'}
                                    buttonStyle={{ padding: "5px 10px" }}
                                    justify={"center"}
                                    animateColor={"white"}
                                    animateBgColor={"green"}
                                    color={"white"}
                                    handleClick={handleTherapists}
                                />
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
