"use client"

const useSelection = (props) => {
    var txt = '';
    if ((typeof window !== "undefined")) {
        if (document.getSelection) {
            txt = document.getSelection();
        }
        else if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        } else { return; }
    }
    return txt;
};

export default useSelection;
