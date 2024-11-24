import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import HorizontalMenu from '../includes/HorizontalMenu';
import ActionBtn from './ActionBtn';

function Form(props) {
    const {
        btnWidth, gap, pad, justifyBtns, processing, progressText, btnSubmitText, width,
        handleSubmit, handleCancel, disabled, submitBtnBgc, submitBtnColor, submitBtnShadow,
    } = props;


    const theme = useTheme();
    return (
        <FormStyle
            gap={ gap }
            pad={ pad }
            width={ width }
        >
            {props.children }
            <HorizontalMenu
                align={ "center" }
                justify={ justifyBtns }
                gap={ "1rem" }
                border={ "unset" }
                bRadius={ "unset" }
            >
                { handleCancel ?
                    <ActionBtn
                        fontSize={ "small" }
                        btnText={ "Cancel" }
                        btnClick={ handleCancel }
                        disabled={ processing } bRadius={ "3px" }
                        padding={ "0px 5px 0 5px" }
                        justify={ "center" }
                        bgc={ theme.cardsBgc }
                        color={ processing ? theme.grayed : theme.danger }
                        lHeight={ "1.4" }
                        border={ "unset" }
                    />
                    : "" }
                <ActionBtn
                    processing={ processing }
                    progressText={ progressText }
                    btnText={ btnSubmitText }
                    btnClick={ handleSubmit }
                    disabled={ disabled }
                    bgc={ submitBtnBgc }
                    color={ submitBtnColor }
                    justify={ "center" }
                    border={ "unset" }
                    bRadius={ "3px" }
                    bShadow={ submitBtnShadow }
                    width={ btnWidth ? btnWidth : "max-content" }
                    lHeight={ "1.4" }
                    padding={ "0px 5px 0 5px" }
                />
            </HorizontalMenu>
        </FormStyle>
    );
}

export default Form;
const FormStyle = styled.div`
    display: inline-grid;
    width: ${props => props.width};
    gap: ${props => props.gap};
    pad: ${props => props.pad};
    min-width: 50%;
 `;
