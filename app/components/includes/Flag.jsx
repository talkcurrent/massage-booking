import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import useViewPort from '../customHooks/useViewPort';
import EditableDiv from '../reuseable/EditableDiv';
import Form from '../reuseable/Form';
import FormSelInput from '../reuseable/FormSelInput';
import WordCount from '../reuseable/WordCount';

const Flag = (props) => {
    const { processing, registerFlag, handleFlag } = props;

    const [form, setform] = useState({ reason: "", comment: "" });
    const [errorField, seterrorField] = useState({ reason: false, comment: false });

    const formWidth = useViewPort(['95%', '90%', '350px', '400px']);
    const theme = useTheme();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value });
        seterrorField({ ...errorField, [name]: false });
    };

    const handleEditableChange = (e) => {
        const target = e.target;
        const { textContent, id } = target;
        setform({ ...form, [id]: textContent });
        seterrorField({ ...errorField, [id]: false });
    };

    const handleForm = () => {
        const { reason, comment } = form;
        if (WordCount(form.comment) <= 20) {
            registerFlag(reason, comment);
        }
    };

    return (
        <FlagStyle>

            <Form
                gap={ "1rem" }
                pad={ "1rem 0 0 0" }
                justifyBtns={ "center" }
                processing={ processing }
                progressText={ "Processing" }
                btnSubmitText={ "Flag content" }
                width={ formWidth }
                handleSubmit={ handleForm }
                handleCancel={ handleFlag }
                disabled={ form.reason == '' || processing || WordCount(form.comment) > 20 }
                submitBtnBgc={ theme.danger }
                submitBtnColor={ "white" }
            >

                <FormSelInput
                    label={ "Reason" }
                    handleChange={ handleChange }
                    disabled={ false }
                    thisValue={ form.reason }
                    nameUniq={ "reason" }
                    error={ errorField.reason }
                    selectText={ "Choose" }
                    inputHeight={ "1.5rem" }
                >
                    <option value="Misleading">Misleading</option>
                    <option value="Pornography">Pornography</option>
                    <option value="Scam">Scam</option>
                    <option value="Racism">Racism</option>
                    <option value="Hate speach">Hate speach</option>
                </FormSelInput>

                <EditableDiv
                    wordLimit={ true }
                    multipleLines={ true }
                    limit={ 20 }
                    miniHeight={ "1.5rem" }
                    padding={ "3px 1rem" }
                    handleOninput={ handleEditableChange }
                    nameUniq={ "comment" }
                    placeholder={ "Describe this item in few words..." }
                    error={ errorField.comment }
                ></EditableDiv>
                { props.children }
            </Form>
        </FlagStyle>
    );
};

export default Flag;
const FlagStyle = styled.div`

`;
