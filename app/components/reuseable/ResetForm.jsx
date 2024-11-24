import { isArray, isObject } from 'lodash';
import React from 'react';

const ResetForm = (form) => {
    var copyForm = {};

    for (const key in form) {

        if (isArray(form[key])) {
            copyForm[key] = [];
        } else if (isObject(form[key])) {
            copyForm[key] = {};
        } else {
            copyForm[key] = "";
        }
    }
    return copyForm;
};

export default ResetForm;
