import React from 'react';
import styled from 'styled-components';

function ErrorBlock(props) {
    return (
        <ErrorBlockStyle>
            {props.children }
        </ErrorBlockStyle>
    );
}

export default ErrorBlock;
const ErrorBlockStyle = styled.div`
    color: rgb(195, 63, 48);
    font-size: small;
    text-align: center;
`;
