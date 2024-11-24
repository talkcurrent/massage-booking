"use client";

const formattedDate = (date = null) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    const monthName = monthNames[d.getMonth()];
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const [hour, minutes, seconds] = [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
    ];

    return { monthName, year, month, day, hour, minutes, seconds };
};

export default formattedDate;
