"use client"

import React, { useEffect, useState } from 'react';

const useDuration = (duration) => {

    const [recordHours, setrecordHours] = useState(0);
    const [recordMinutes, setrecordMinutes] = useState("0");
    const [recordSeconds, setrecordSeconds] = useState("00");

    useEffect(() => {
        if (duration != 0) {
            var sec = parseInt(duration % 60);
            var min = parseInt((duration % 3600) / 60);
            var hr = parseInt(duration / 3600);

            setrecordSeconds(pad(sec.toFixed()));
            setrecordMinutes(min.toFixed());
            setrecordHours(hr.toFixed());
        }

        return () => { };
    }, [duration]);

    const pad = (number) => {
        if (number > -10 && number < 10) {
            return "0" + number;
        } else {
            return number;
        };
    };

    return `${recordHours != 0 ? recordHours + ":" : ""} ${recordMinutes}:${recordSeconds}`;
};

export default useDuration;
