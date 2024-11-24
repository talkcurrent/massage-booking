import ReactDOM from "react-dom";
import React, { Component, useContext } from 'react';
import styled from "styled-components";
import ToggleNav from "../includes/ToggleNav";
import { Link } from "react-router-dom";
import ControlLeft from "../includes/ControlLeft";
import AdminLink from "../includes/AdminLink";
import StaffLink from "./StaffLink";
import { CommonContext } from "../index/CommonContext";
import useTheme from "../customHooks/useTheme";

const WebView = (props) => {
    const context = useContext(CommonContext);
    const theme = useTheme();

    const styleHeader = {
        color: "whitesmoke",
        background: theme.nav_color,
        width: "100%",
        textAlign: "center",
        padding: "4px 0",
        margin: 0,
        position: "sticky",
        zIndex: 10,
        top: 0,
    };

    return (
        <React.Fragment>
            {props.header !== false ?
                <h3 style={ styleHeader }>Admin System Control Panel</h3>
                : "" }
            <AdminPage windowWidth={ context.windowWidth } header={ props.header }>
                { context.windowWidth > 800 ?
                    <ControlLeft
                        width={ "140px" }
                        context={ context }
                        handleUploadsDP={ context.updloadDp }
                        authUser={ context.authAdmin }
                        color={ theme.nav_color } bgc={ theme.nav_color }
                        signOutPath={ "/sirb/logout" }
                    >
                        <AdminLink
                            context={ context }
                            activeClass={ props.view }
                        />
                    </ControlLeft>
                    : ""
                }
                <React.Fragment>
                    { props.children }
                </React.Fragment>

            </AdminPage>
            { context.windowWidth < 800 ?
                <ToggleNav>
                    <ControlLeft
                        context={ context }
                        width={ "130px" }
                        authUser={ context.authAdmin }
                        color={ theme.nav_color } bgc={ theme.nav_color }
                        signOutPath={ "/sirb/logout" }
                    >
                        <AdminLink
                            context={ context }
                            activeClass={ props.view }
                        />
                    </ControlLeft>
                </ToggleNav>
                : "" }
        </React.Fragment>
    );

};

export default WebView;
export const AdminPage = styled.div`
    display: grid;
    gap: 0;
    grid-template-columns:${props =>
        props.windowWidth <= 800 ? "100%" : "max-content 1fr"};
    width: 100%;
    margin-top: ${props => props.header ? "5px" : 0};
    margin-right: auto;
    margin-left: auto;
    align-items: stretch;
`;
