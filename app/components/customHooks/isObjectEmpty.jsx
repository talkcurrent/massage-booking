"use client"

function isObjectEmpty(obj) {
    const object = {};
    return JSON.stringify(object) === JSON.stringify(obj);
    // return Object.entries(obj).length === 0 && obj.constructor === Object
};

export default isObjectEmpty;

