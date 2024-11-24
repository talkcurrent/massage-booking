import React from 'react';
import styled from 'styled-components';
import useResolution from '../customHooks/useResolution';
import useTheme from '../customHooks/useTheme';
import DivTag from './DivTag';

const FormDataList = (props) => {

    const { windowWidth, windowHeight } = useResolution();
    const {
        justifySelf, width, error, label, placeholder,
        handleChange, value, disabled, nameUniq
    } = props;

    const theme = useTheme();

    return (
        <FormDataListStyle
            justifySelf={ justifySelf }
            width={ width }
            windowWidth={ windowWidth }
        >
            <DivTag
                position={ "relative" }
                bRadius={ props.bRadius ? props.bRadius : "10px" }
                bShadow={ error ? `0px 0px 0px 1px ${theme.danger}` : `0px 0px 0px 1px #f1f0f0` }
                bgc={ theme.background_color }
                margin={ props.margin ? props.margin : "0 0 5px 0" }
            >
                <span className={ 'span-label' }>{ label }</span>
                <input list={ nameUniq }
                    name={ nameUniq }
                    placeholder={ placeholder }
                    value={ value }
                    disabled={ disabled }
                    onChange={ e => handleChange(e) }
                />
                <datalist id={ nameUniq }>
                    {/* options */ }
                    { props.children }
                </datalist>
            </DivTag>
        </FormDataListStyle>
    );
};

export default FormDataList;
const FormDataListStyle = styled.div`
    justify-self: ${props => props.justifySelf};
    width: ${props => props.width};
    .span-label{
        position: absolute;
        top: -13px;
        left: 10px;
        padding: 0 10px;
        background: linear-gradient(180deg,rgba(0, 0, 0, 0.06),#ffff 60%);
        border-radius: 30%;
        color:#212529;
        font-weight: 500;
        line-height: 1.3;
        text-shadow: -1px -1px 1px white;
        font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : ""};
    }
    .span-status{
        position: absolute;
        top: -10px;
        right: 0;
        font-size: smaller;
        color: red;
        background: white;
        line-height: 1.2;
    }
    input, select{
        border: unset;
        border-radius: 10px;
        padding: 0 0.75rem;
        font-size: smaller;
        height: 26px; 
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