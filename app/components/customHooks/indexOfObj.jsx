"use client"

function indexOfObj(id, arr) {
    const copiedArr = [...arr];

    var index = copiedArr.findIndex(obj => obj.id == id);
    return index;
}

export default indexOfObj;