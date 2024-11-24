import React from 'react';
import styled from 'styled-components';

const FormCheck = (props) => {
    const { remember, handleChange } = props;
    return (
        <FormCheckStyle>
            <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                id="remember"
                checked={ remember }
                onChange={ (e) => handleChange(e) }
            />
            <label className="form-check-label" htmlFor="remember">Remember me</label>
        </FormCheckStyle>
    );
};

export default FormCheck;
const FormCheckStyle = styled.div`

`;