import React from 'react';

const Divider = ({ color, margin, height = 1.5, scale = 0.4 }) => {

    return <div style={ { margin, height, backgroundColor: color, transform: `scaleY(${scale})` } }></div>;
};

export default Divider;
