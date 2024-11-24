import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from '../reuseable/Form';

const RegisterCard = (props) => {
    const { handleSubmit, handleCancel, registering, animateShake, registerCardMounted } = props;

    const [animateName, setanimateName] = useState("");

    useEffect(() => {
        if (animateShake) {
            setanimateName("shake");
        } else {
            setanimateName("");
        }
        return () => { };
    });

    useEffect(() => {
        if (registerCardMounted) {
            registerCardMounted();
        }
    }, []);

    return (
        <RegisterCardStyle
            className={ `${animateName}` }
            padding={ props.padding }
            bgc={ props.bgc }
            margin={ props.margin }
            width={ props.width }
            bShadow={ props.bShadow }
        >
            <div className="register-inputs-cont" style={ { display: "grid" } }>
                <Form
                    gap={ "10px" }
                    processing={ registering }
                    handleCancel={ handleCancel }
                    progressText={ "Processing" }
                    btnSubmitText={ props.btnSubmitText ? props.btnSubmitText : "Register" }
                    handleSubmit={ handleSubmit }
                    disabled={ registering || props.error }
                    submitBtnBgc={ props.submitBtnBgc }
                    submitBtnColor={ props.submitBtnColor }
                    submitBtnShadow={ props.submitBtnShadow }
                >
                    { props.children }
                </Form>
            </div>
        </RegisterCardStyle>
    );
};

export default RegisterCard;

const RegisterCardStyle = styled.div`
    position: relative;
    display: grid;
    /* margin: 5px;     */
    -webkit-animation-name: registerSlideInLeft;
    animation-name: registerSlideInLeft;
    animation-duration: 0.9s;
    width: ${props => props.width};
    @-webkit-keyframes registerSlideInLeft {
        from {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
        }

        to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        }
    }

    @keyframes registerSlideInLeft {
        from {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
        }

        to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        }
    }
    .register-inputs-cont{
        padding: ${props => props.padding};
        background:${props => props.bgc};
        margin: ${props => props.margin};
        width: ${props => props.width};
        border-radius: 5px;
        box-shadow: ${props => props.bShadow};
    }
    &.shake{
        .register-inputs-cont{
            -webkit-animation-name: shakeRegisterForm;
            animation-name: shakeRegisterForm;
            animation-duration: 0.9s;
            @-webkit-keyframes shakeRegisterForm {
                from,
                to {
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                }
                
                10%,
                30%,
                50%,
                70%,
                90% {
                    -webkit-transform: translate3d(-10px, 0, 0);
                    transform: translate3d(-10px, 0, 0);
                }
                
                20%,
                40%,
                60%,
                80% {
                    -webkit-transform: translate3d(10px, 0, 0);
                    transform: translate3d(10px, 0, 0);
                }
            }
                
                @keyframes shakeRegisterForm {
                from,
                to {
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                }
                
                10%,
                30%,
                50%,
                70%,
                90% {
                    -webkit-transform: translate3d(-10px, 0, 0);
                    transform: translate3d(-10px, 0, 0);
                }
                
                20%,
                40%,
                60%,
                80% {
                    -webkit-transform: translate3d(10px, 0, 0);
                    transform: translate3d(10px, 0, 0);
                }
            }
                                            
        }
    }
    .error{
        font-size: small;
        color: deeppink;
        text-align: center;
    }
`;