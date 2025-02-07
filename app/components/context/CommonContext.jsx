"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { I18n } from "i18n-js";

export const CommonContext = React.createContext();

export const CommonProvider = (props) => {
    const [deviceHeight, setdeviceHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)
    const [language, setlanguage] = useState('')
    const [currency, setcurrency] = useState({ name: '', symbol: "" })
    const [service, setservice] = useState({});
    const [bookingForm, setbookingForm] = useState({
        fullName: '', phoneNumber: '', email: '', address: '', date: ''
    });
    const [bookingError, setbookingError] = useState({
        address: false, fullName: false, phoneNumber: false, email: false, date: false
    });

    useEffect(() => {
        if (global?.window !== undefined) {
            setdeviceHeight(window.innerHeight);
            setdeviceWidth(window.innerWidth);
        }
        if (currency.name == "") {
            const international = Intl?.DateTimeFormat().resolvedOptions();
            let timeZ = international.timeZone;
            let locale = international.locale;

            const continent = timeZ.split('/')[0];


            if (locale == 'en-CA') {
                // it is the UK 
                setcurrency({ name: "CAD", symbol: '$' });
            } else if (continent.toLowerCase() == 'europe' && locale == 'en-GB') {
                // it is the UK 
                setcurrency({ name: "GBP", symbol: '£' });
            } else if (continent.toLowerCase() == 'europe') {
                // other part of Europe
                setcurrency({ name: "EUR", symbol: '€' });
            } else {
                setcurrency({ name: "USD", symbol: '$' });
            }
        }
    });

    useEffect(() => {
        const storedLang = window?.localStorage?.getItem("language");
        if (storedLang) {
            setlanguage(storedLang);

        } else {
            let localLang = navigator.language || navigator.userLanguage;
            const code = localLang.split('-')[0];
            window?.localStorage?.setItem("language", code);
        }
    }, []);

    useEffect(() => {
        const storedLang = window?.localStorage?.getItem("language");
        if (language && storedLang != language) {
            // setlanguage(storedLang);
            // console.info(storedLang)
            window?.localStorage?.setItem("language", language);
        }
    }, [language]);

    return (
        <CommonContext.Provider
            value={{
                deviceHeight, deviceWidth, language, setlanguage,
                service, setservice, currency,
                bookingForm, setbookingForm,
                bookingError, setbookingError
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};

export default CommonProvider;
