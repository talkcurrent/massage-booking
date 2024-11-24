import React from 'react';
import styled from 'styled-components';

const Eye = (props) => {
    const { read } = props;

    return (
        <EyeStyle
            read={ read }
        >
            <div className="seen">
                <span></span>
            </div>
        </EyeStyle>
    );
};

export default Eye;
const EyeStyle = styled.div`
    background: ${props => props.read ? "#e3e4e8" : "#368078"};
    transform: rotate(45deg);
    border-radius: 75% 15%;
    height: 13px;
    width: 13px;
    justify-self: end;
    align-self: end;
    position: relative;
    .seen{
        position: relative;
        transform: rotate(0deg);
        display: grid;
        justify-items: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: 1px solid  #368078;
        border-radius: 75% 15%;
        span{
            display: block;
            position: absolute;
            width: 5px;
            height: 5px;
            background: #495057;
            /* border: 1px solid #056733; */
            border-radius: 50%;
            
        }
    }
`;
