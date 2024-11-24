import React, { useEffect } from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import TooltipBtn from '../reuseable/TooltipBtn';
import FocusInput from './FocusInput';

const UpdateableContent = React.forwardRef((props, ref) => {
    const {
        edit, updating, fSize,
        handleEditCancel, handleEditUpdate
    } = props;
    const textBody = React.createRef();
    const theme = useTheme();

    useEffect(() => {
        FocusInput(textBody.current);

    }, [props.edit]);

    return (
        <UpdateableContentStyle edit={ edit && !updating } fSize={ fSize }>
            <div
                className={ `editable` }
                contentEditable={ edit && !updating }
                suppressContentEditableWarning
                ref={ textBody }
            >
                { props.children }
            </div>
            {edit ?
                <div className="edit-cancel-btn">
                    { !updating ?
                        <TooltipBtn
                            fontSize={ "small" }
                            border={ "unset" }
                            btnText={ "Cancel" }
                            hoverBgColor={ " " }
                            hoverColor={ " " }
                            fontWeight={ 200 }
                            handleClick={ handleEditCancel }
                            borderRadius={ "5px" }
                            textColor={ "#d84114" }
                            backgroundColor={ "white" }
                            lineHeight={ "1.2" }
                            fontFamily={ "serif" }
                        />
                        : "" }
                    <TooltipBtn
                        fontSize={ "small" }
                        btnText={ "Update" }
                        hoverBgColor={ " " }
                        loadingText={ updating ? "Updating" : "" }
                        hoverColor={ " " }
                        fontWeight={ 200 }
                        handleClick={ handleEditUpdate }
                        borderRadius={ "5px" }
                        textColor={ theme.btn_bgc }
                        backgroundColor={ "inherit" }
                        lineHeight={ "1.2" }
                        fontFamily={ "serif" }
                    />
                </div>
                : "" }
        </UpdateableContentStyle>
    );
});

export default UpdateableContent;
const UpdateableContentStyle = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: max-content;
    gap: 2px;
    position: relative;
    font-size: ${props => props.fSize};
    .editable{
        box-shadow: ${props => props.edit ? "inset 0px 0px 2px #3c2714" : "unset"};
        padding: 3px 3px 3px 1rem;
        line-height: 1;
        outline: none;
    }
    .edit-cancel-btn{
        justify-self: end;
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    }
    -webkit-animation: cubic .3s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
    animation: cubic .3s cubic-bezier(0.895,0.030,0.685,0.220) forwards;

    @keyframes cubic {
        from {
            opacity: 0;
            /* transform: scale(0.3); */
        }
        to {
            opacity: 1;
            /* transform: scale(1) */
        }
    }
`;