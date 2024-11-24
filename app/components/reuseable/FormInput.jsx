import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import DivTag from './DivTag';
import IconToolTipBtn from './IconToolTipBtn';
import LoadingBtn from './LoadingBtn';

const FormInput = (props) => {
    const [elemParams, setParams] = useState({});
    const [openTooltip, setopenTooltip] = useState(false);

    const {
        inputHeight, inputTextColor, help, type, thisValue, handleChange, handleKeypress, windowWidth,
        label, disabled, nameUniq, placeholder, error, ancestor,
        availabilityCheck, checking, checkResult, textarea, compulsory
    } = props;

    const refTooltip = React.createRef();
    const theme = useTheme();

    const handleKeyUp = (e) => {
        if (props.handleKeyUp) {
            props.handleKeyUp(e);
        }
    };
    const onFocus = (e) => {
        if (props.onFocus) {
            props.onFocus(e);
        }
        showTooltip();
    };
    const onBlur = (e) => {
        if (props.onBlur) {
            props.onBlur(e);
        }
    };

    const showTooltip = () => {
        if (refTooltip.current) {
            refTooltip.current.click();
        }
    };

    return (
        <TextInputStyle
            windowWidth={windowWidth}
            justifySelf={props.justifySelf}
            width={props.width}
            fSize={props.fSize}
        >
            <DivTag
                position={"relative"}
                bRadius={props.bRadius ? props.bRadius : "10px"}
                bShadow={error ? `0px 0px 0px 1px ${theme.danger}` : `0px 0px 0px 1px #f1f0f0`}
                bgc={theme.background_color}
                margin={props.margin ? props.margin : "0 0 5px 0"}
            >
                <span className="span-label">
                    <div className="span-label-inside">
                        {label != "" ? <span className={'span'}>{label}</span> : ""}
                        {compulsory ?
                            <i
                                className={'fas fa-asterisk'}
                                style={{ color: "deeppink", fontSize: "7px", verticalAlign: "super", marginLeft: "5px" }}
                            ></i> : ""}
                        {help ?
                            <IconToolTipBtn
                                linkBtn={false}
                                fixedTop={true}
                                ref={refTooltip}
                                toolTip={true}
                                ancestor={ancestor}
                                class={nameUniq}
                                textColor={"#929598"}
                                fontSize={"small"}
                                tooltipBgc={props.tooltipBgc}
                                iconClass={"fas fa-question-circle"}
                                border={"unset"}
                                openTooltip={openTooltip}
                            >
                                {props.children}
                            </IconToolTipBtn>
                            : ""}
                    </div>
                </span>
                {textarea == true ?
                    <textarea
                        style={{ height: inputHeight, color: inputTextColor }}
                        rows={4}
                        name={nameUniq}
                        id={nameUniq} required
                        autoCapitalize="true" value={thisValue}
                        onChange={e => handleChange(e)}
                        onFocus={e => onFocus ? onFocus(e) : {}}
                        onBlur={e => onBlur ? onBlur(e) : {}}
                        disabled={disabled}
                        onKeyPress={e => handleKeypress ? handleKeypress(e) : {}}
                        onKeyUp={e => handleKeyUp ? handleKeyUp(e) : {}}
                        placeholder={placeholder}
                    ></textarea>
                    :
                    <input
                        style={{ height: inputHeight, color: inputTextColor }}
                        type={type} name={nameUniq}
                        id={nameUniq} required
                        autoFocus={props.autoFocus}
                        autoComplete={props.autoComplete}
                        autoCapitalize="true" value={thisValue}
                        onChange={e => handleChange(e)}
                        onFocus={e => onFocus ? onFocus(e) : {}}
                        onBlur={e => onBlur ? onBlur(e) : {}}
                        onKeyPress={e => handleKeypress ? handleKeypress(e) : {}}
                        onKeyUp={e => handleKeyUp ? handleKeyUp(e) : {}}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                }
                {availabilityCheck ?
                    <span className={"span-status"}>
                        {checking ?
                            <LoadingBtn text={"Checking"} fontSize={"small"} />
                            :
                            <span>{checkResult}</span>
                        }
                    </span>
                    : ""}
            </DivTag>
        </TextInputStyle>
    );
};

export default FormInput;
export const TextInputStyle = styled.div`
    justify-self: ${props => props.justifySelf};
    width: ${props => props.width};
    .span-label{
        position: absolute;
        top: -13px;
        left: 10px;
        padding: 0 10px;
        background: linear-gradient(180deg,rgba(0, 0, 0, 0.06),#ffff 60%);
        border-radius: 30%;
        color: #212529;
        font-weight: 500;
        line-height: 1.3;
        font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "medium" : ""};
        .span-label-inside{
            position: relative;
            display: grid;
            grid-auto-flow: column;
            align-items: center;
            gap: 1rem;
            .tooltip-insider{
                background: white;
                width: 200px;
                p{
                    margin: 0;
                    text-shadow: unset;
                }
            }
        }
    }
    .span-status{
        position: absolute;
        top: 0px;
        right: 0px;
        visibility: hidden;
        font-size: smaller;
        color: #808080;
        background: white;
        line-height: 1.2;
        display: grid;
        align-items: center;
        font-family: serif;
        border-radius: inherit;
    }
    .span-status span:first-child {
        visibility: visible;
        background: white;
        padding: 0 2px;
        border-radius: inherit;
    }
    input, select, textarea{
        border: unset;
        border-radius: 10px;
        padding: 05px 0.75rem 0 0.75rem;
        font-size: ${props => props.fSize ? props.fSize : "smaller"};
        /* height: 26px;  */
        width: 100%;  
        &:focus{
            border: unset;
            outline: unset;
            box-shadow: none;
        }
        &::-webkit-input-placeholder {
            color: #a2a2a2;
            font-size:  12px;
            font-style: italic;
            font-family: serif;
        }
        &::-moz-placeholder {
            color: #a2a2a2;
            font-size:  12px;
            font-style: italic;
            font-family: serif;
        }
        &:-ms-input-placeholder {
            color: #a2a2a2;
            font-size:  12px;
            font-style: italic;
            font-family: serif;
        }
        &::placeholder {
            color: #a2a2a2;
            font-size:  12px;
            font-style: italic;
            font-family: serif;
        }
    }
`;