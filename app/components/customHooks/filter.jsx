"use client"

function filter(id, arr) {
    var copiedArr = JSON.parse(JSON.stringify(arr));
    //get the media object
    var filtered = copiedArr.filter(obj => obj.id != id);
    return filtered;
}

export default filter;
