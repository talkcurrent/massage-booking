import React from 'react';
import useTheme from '../customHooks/useTheme';
import DivTag from './DivTag';

const Feedback = (props) => {
    const { error, success } = props;
    const theme = useTheme();

    return (
        <>
            { success && success != "" ?
                <DivTag justify={ "center" } color={ theme.success }>{ success }</DivTag>
                : "" }
            { error && error != "" ?
                <DivTag justify={ "center" } color={ theme.danger } >{ error }</DivTag>
                : "" }
        </>
    );
};

export default Feedback;
