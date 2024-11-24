"use client"
import React, { useEffect, useState } from 'react';

const useTheme = (props) => {

    const [theme, settheme] = useState(
        {
            color: "#53575a",
            background_color: "#eee",
            background_img: "",
            nav_bgc: "white",
            cardsBgc: "white",
            cardsColor: "#354f69",
            nav_color: "#354f69",
            // headColor: "#343A3F",
            headColor: "#1e3d59",
            headBgc: "rgb(245 245 245)",
            cover: "#354f69",
            cover_color: "#f3f3f3",//for card description bgc
            btn_color: "#f8f9fa",
            btn_bgc: "#416482",
            iconColor: "#c1c8ce",
            grayed: "#96a5b1",
            danger: "#de6666",
            touch: "#ca785e",
            success: "#007d71",
            messengerBgc: "#f8f9fa",
            hr: "#ececec",
            link: "#3490dc",
            price: "#607D8B",
            shortcut: "#e9ecef",

        });

    useEffect(() => {
        //request to load theme from db
        return () => { };
    }, []);

    return theme;
};

export default useTheme;
