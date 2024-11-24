"use client"

const arrayFind = (id, arr) => {
    var copiedArr = JSON.parse(JSON.stringify(arr));
    //get the media object
    var obj = copiedArr.find(arr => arr.id == id);
    return obj;
};

export default arrayFind;
