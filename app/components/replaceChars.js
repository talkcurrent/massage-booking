/**
 * @param {String} pattern - accepts a string or RegExp
 * @param {String} text - string to search
 * @param {String} replacement - a string or function to be called for each match 
 * @returns {String} a new string with all matches of a pattern replaced by a replacement
 */

export default function replaceChars(pattern, text, replacement) {
    let matched = text.replaceAll(pattern, replacement)
    return matched;
}