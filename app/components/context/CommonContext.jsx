"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { I18n } from "i18n-js";

export const CommonContext = React.createContext();

export const CommonProvider = (props) => {
    const [deviceHeight, setdeviceHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)
    const [language, setlanguage] = useState('')
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
                service, setservice,
                bookingForm, setbookingForm,
                bookingError, setbookingError
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};

export default CommonProvider;
