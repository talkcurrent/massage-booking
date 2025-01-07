import React from 'react'
import styled from 'styled-components'

function EachTestimony() {
    return (
        <Testimony>

        </Testimony>
    )
}

export default EachTestimony

const Testimony = styled.div`
    min-height: 100px;
    &::after {
        content: " ";
        position: absolute;
        top: ;
        bottom: 0px;
        right: 0px;
        height: 30px;
        width: 30px;
        z-index: -1;
        transform: rotate(85deg);
        border-style: solid;
        border-width: 1px;
        background: silver;
        border-color: #a2a2a2 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #a2a2a2;
    }
`;