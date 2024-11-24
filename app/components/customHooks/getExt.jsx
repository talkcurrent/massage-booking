"use client"
/**
 * Return a string seperated by seperator from given array.
 * @param {string} [filepath] -A string of either URL absolute file path or filename  
 */
const getExt = (filepath) => {
    return filepath.split("?")[0].split("#")[0].split('.').pop();
};

export default getExt;