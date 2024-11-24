import React from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import ScrollerX from '../reuseable/ScrollerX';

const CommentHead = (props) => {
    const { comment, closeTooltip, lineHeight } = props;

    const theme = useTheme();
    // const { owner, comment } = comment;
    // const { firstname, lastname, othername, title } = owner;

    return (
        <CommentHeadStyle
            bgc={ "transparent" }
            color={ theme.nav_color }
            lineHeight={ lineHeight }
        >
            <div className="user-name-n-title">
                <ScrollerX>
                    <span className={ "user-name" }>Enyoojo Akoh</span>
                </ScrollerX>
                <div className="user-title">@sirblezed</div>
            </div>
            <IconToolTipBtn
                toolTip={ true } ancestor={ "dashboardContainer" }
                class={ `tooltip-menu-btn` }
                textColor={ "#96a5b1" }
                fontSize={ "small" }
                iconClass={ "fas fa-ellipsis-h" }
                border={ "unset" }
                minHeight={ "0px" }
                tooltipBgc={ "white" }
                padding={ "3px" }
                closeTooltip={ closeTooltip }
            >
                { props.children }
            </IconToolTipBtn>
        </CommentHeadStyle>
    );
};

export default CommentHead;

const CommentHeadStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr auto;
    gap: 10px;
    background: ${props => props.bgc};
    line-height: ${props => props.lineHeight};
    align-items: center;
    .user-name-n-title{
        line-height: 1.1;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        gap: 3px;
        align-items: center;
        .user-name{
            color: ${props => props.color};
            font-family: serif;
        }
        .user-title{
            color: #96a5b1;
            font-size: small;
        }
    }
`;