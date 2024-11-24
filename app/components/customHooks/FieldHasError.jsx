"use client"

const FieldHasError = (field) => {
    for (var key in field) {
        if (field[key] == true)
            return true;
    }
    return false;
};

export default FieldHasError;
