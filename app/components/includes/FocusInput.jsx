import React from 'react';

const FocusInput = (inputEl) => {
    const textCont = inputEl.textContent;
    const offSet = textCont.length;
    const range = document.createRange();
    const sel = window.getSelection();
    if (offSet) {
        range.setStart(inputEl.childNodes[0], offSet);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        inputEl.focus();
    } else {
        inputEl.focus();
    }
};

export default FocusInput;
