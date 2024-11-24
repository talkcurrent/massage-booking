import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DisplayPicture from '../reuseable/DisplayPicture';
import LoadingBtn from '../reuseable/LoadingBtn';

const ControlLeft = (props) => {
    const {
        context, handleUploadsDP, displayImgClicke, color, bgc, signOutPath, width
    } = props;

    const authUserLoaded = context.authAdmin && context.authAdmin.hasOwnProperty('id');

    const handleFile = (e) => {
        if (handleUploadsDP) {
            handleUploadsDP(e);
        }
    };
    const handleDpClick = () => {
        if (displayImgClicke) {
            displayImgClicke();
        }
    };
    return (
        <React.Fragment>
            <AdminControl
                windowWidth={ context.windowWidth }
                width={ width }
                color={ color }
                bgc={ bgc }
                className="admin-controls sticky"
            >
                <div className="sticky" style={ { boxShadow: "unset" } }>
                    <div className="admin-dp"
                        style={ { position: "relative" } }
                    >
                        <DisplayPicture
                            previewable={ context.previewable }
                            imgTemplate={ context.imgTemplate } //temp image 
                            userObj={ context.authAdmin } //user details
                            uploading={ context.uploadingDp } //boolean. true when uploading
                            imgClick={ handleDpClick } //fn to run on img click
                            handleFile={ context.handleFile }//handle file
                            uploadDp={ context.updloadDp }//handle file
                        />
                    </div>
                    <div style={ { color: color, textAlign: "center" } }>
                        <strong>{
                            authUserLoaded ? `${context.authAdmin.name}` :
                                <LoadingBtn text={ "" } lineHeight={ "unset" }
                                    fontSize={ "small" } fontWeight={ 400 } />
                        }</strong>
                    </div>
                    <div className="admin-cntrl-menu">
                        { props.children }
                    </div>
                    <hr style={ {
                        width: "100%",
                        borderTop: "1px solid #e4e4e4"
                    } } />
                    <div style={ { color: "navy", textAlign: "center" } }>
                        <a href={ `${location.origin}${signOutPath}` }>Logout</a>
                    </div>
                </div>
            </AdminControl>
        </React.Fragment>
    );
};

export default ControlLeft;
export const AdminControl = styled.div`
    background: rgb(245 245 245);
    box-shadow: 0px 0px 4px 0px silver;
    width: ${props => props.width};
    .sticky{
        display: grid; 
        grid-gap: 10px;
        .admin-cntrls-header{
            font-weight: bolder;
            font-size: ${props => props.windowWidth <= 680 ? "" : "20px"};
            text-align: center;
            color: whitesmoke;
            background-color: ${props => props.bgc};
        }
        .admin-dp{
            display:grid;
            img{
                justify-self: center;
                width: 20vh;
                border-radius: 50%;
                height: 20vh;
                max-width: 100%;
            }
        }
        .admin-cntrl-menu{
            display: grid;
            grid-gap: 5px;
            padding: 0 5px;
        }
    }
    a{
        position: relative;
        font-size: ${props => props.windowWidth < 400 ? "smaller"
        : props.windowWidth < 768 ? "medium"
            : ""};
        padding: 0px 0px 0px 5px;
        font-family: serif; 
        text-decoration: unset;
        color:  ${props => props.color};
        &:hover{
            background-color: silver;
            color: #060606;
        }
        &.active {
            background: ${props => props.bgc};
            color: whitesmoke;
            text-align: center;
            font-weight: bold;
        }
        .unread{
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 50%;
            height: 15px;
            width: 15px;
            display: grid;
            align-content: center;
            justify-content: center;
            font-size: smaller;
            color: whitesmoke;
            background: red;
        }
    }
`;