
/**
 * Return a random number or float
 * @param {object} fields - collection of all fields
 * 
 */
const fieldIsEmpty = (fields) => {
    for (var key in fields) {
        if (fields[key] == "")
            return true;
    }
    return false;
}

export default fieldIsEmpty