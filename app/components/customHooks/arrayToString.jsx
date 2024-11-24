"use client"
/**
 * Return a string seperated by seperator from given array.
 * @param {Array} arr - The array to join the elements.
 * @param {string} [seperator] - A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
 * @param {string} [key] - If array is array of objects, argument key is the object key to join
 */

const arrayToString = (arr, seperator = ',', key = null) => {
    if (!key) {
        return arr.join(`${seperator} `);
    } else {
        const array = arr.map(ar => ar[key]);
        return array.join(', ');
    }
};

export default arrayToString;
