'use client';
import React, { useEffect, useState } from 'react';

const useResolution = (props) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [windowHeight, setwindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        updateDimensions();
    }, []);

    const updateDimensions = () => {
        setwindowWidth(Window.innerWidth);
        setwindowHeight(Window.innerHeight);
    };

    return { windowWidth, windowHeight };
};

export default useResolution;
