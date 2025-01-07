"use client";

import React, { useContext } from "react";
import { CommonContext } from "../context/CommonContext";

const useViewPort = (pixels) => {
    const { deviceHeight, deviceWidth } = useContext(CommonContext);


    if (deviceWidth <= 400) {
        return pixels[0];
    }
    if (pixels[1] && deviceWidth <= 500) {
        return pixels[1];
    }
    if (pixels[2] && deviceWidth <= 768) {
        return pixels[2];
    }
    if (pixels[3] && deviceWidth <= 900) {
        return pixels[3];
    }
    if (pixels[4] && deviceWidth <= 1280) {
        return pixels[4];
    }
    if (pixels[5]) {
        return pixels[5];
    }
    return pixels[pixels.length - 1];
};

export default useViewPort;
