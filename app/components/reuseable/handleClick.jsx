import React from 'react';

let numClicks = 0;
let singleClickTimer;
const handleClick = (e, handleClick, handleDbClick, param) => {
    clearSelection();
    const target = e.target;
    numClicks++;
    if (numClicks === 1) {
        singleClickTimer = setTimeout(() => {
            numClicks = 0;
            return handleClick(target, param);
        }, 250);
    } else if (numClicks === 2) {
        clearTimeout(singleClickTimer);
        numClicks = 0;
        return handleDbClick(target, param);
    }

};
const clearSelection = () => {
    if (document.selection && document.selection.empty) {
        document.selection.empty();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
};

export default handleClick;
