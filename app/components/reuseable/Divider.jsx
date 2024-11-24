import React from 'react';

const Divider = ({ color, height = 1.5, scale = 0.4 }) => {

    return <div style={ { height, backgroundColor: color, transform: `scaleY(${scale})` } }></div>;
};

export default Divider;
