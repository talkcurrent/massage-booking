import React from 'react';

const Fetch = (url, body, method, formData, signal, socketId) => {
    //formData hold a boolean value
    let token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    const jsonHeaders = {
        "X-CSRF-TOKEN": token, ...socketId,
        "Content-Type": "application/json",
        Accept: "application/json",
        "REQUEST-TYPE": "fetch_api",//custom header to confirm that request is fetch api
    };
    const formDataHeaders = { "X-CSRF-TOKEN": token, ...socketId };
    return fetch(url,
        {
            mode: "cors",
            method: method,
            signal: signal ? signal : undefined,
            body: body,
            headers: formData ? formDataHeaders : jsonHeaders
        });
};

export default Fetch;
