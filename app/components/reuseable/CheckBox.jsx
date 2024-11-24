"use client"
import React from 'react';
import useTheme from '../customHooks/useTheme';
import DivTag from './DivTag';

const CheckBox = (props) => {
    const { name, label, checked, handleChange } = props;

    const theme = useTheme();

    return (
        <DivTag
            gtc={ "auto 3fr" }
            align={ "center" }
            gap={ "1rem" }
            color={ theme.color }
        >
            <input
                type="checkbox"
                name={ name }
                id={ name }
                checked={ checked }
                onChange={ (e) => handleChange(e) }
            />
            <label style={ { margin: "0" } } htmlFor={ name }>{ label }</label>
        </DivTag>
    );
};

export default CheckBox;