import React, { useEffect } from 'react';
import styled from 'styled-components';

function Dialog(props) {

    useEffect(() => {
        if (props.dialogMounted) {
            props.dialogMounted();
        }
        const body = document.querySelector("body");
        if (body) body.style.overflow = 'hidden';

        return () => {
            if (body) body.style.overflow = 'auto';
            if (props.dialogUnmounted) {
                props.dialogUnmounted();
            }
        };
    }, []);

    return (
        <DialogStyle
            $overflow={props.overflow}
            $align={props.align}
            $top={props.top}
        >
            {props.children}
        </DialogStyle>
    );
}

export default Dialog;
const DialogStyle = styled.div`
    position: fixed;
    top: ${props => props.$top ? props.$top : "0px"};
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: grid;
    justify-items: center;
    align-items: ${props => props.$align ? props.$align : "center"};
    overflow: ${props => props.$overflow ? props.$overflow : "auto"};
    -webkit-animation-name: dialog;
    animation-name: dialog;
    animation-duration: 0.6s;
    @-webkit-keyframes dialog {
        from{
            opacity: 0;
        }
        to{
            opacity: 1
        }
    }
    @keyframes dialog {
        from{
            opacity: 0;
        }
        to{
            opacity: 1
        }
    }
`;
