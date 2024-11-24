import React from 'react';

const timeZOneOffset = () => {

    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;

    // Timezone difference in minutes such as 330 or -360 or 0
    return timezone_offset_minutes;

};

export default timeZOneOffset;
