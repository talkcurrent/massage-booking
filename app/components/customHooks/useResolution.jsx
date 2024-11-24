"use client";

import React, { useEffect, useState } from "react";

const useResolution = (props) => {
    const [windowWidth, setwindowWidth] = useState(globalThis.innerWidth);
    const [windowHeight, setwindowHeight] = useState(globalThis.innerWidth);

    useEffect(() => {
        updateDimensions();
        globalThis.addEventListener("resize", updateDimensions);
        return () => {
            globalThis.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        setwindowWidth(globalThis.innerWidth);
        setwindowHeight(globalThis.innerHeight);
    };

    return { windowWidth, windowHeight };
};

export default useResolution;
