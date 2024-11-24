/**
 * @param {String} date - date object
 * @returns {String} a new formatted date for humans e.g Thu, Sep 26, 2024
 */
function localDate(date) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    var date = new Date(date.toDate());

    return date.toLocaleDateString("en-US", options);
}

export default localDate