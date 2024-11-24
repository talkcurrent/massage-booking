"use client"

const Acronym = (string) => {

    if (string) {
        let acronym = string.split(/\s/).
            reduce((prevVal, nowVal) => prevVal += nowVal.slice(0, 1), '');
        return acronym;
    }
    return string;
};

export default Acronym;