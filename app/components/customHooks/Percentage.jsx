"use client"

const Percentage = (present, end) => {
    var calcPercentage = (present / end) * 100;
    return parseFloat(calcPercentage.toString());
};

export default Percentage;
