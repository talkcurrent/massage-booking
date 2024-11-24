import React from 'react';
import styled from 'styled-components';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';

const SearchBtn = (props) => {
    const { color, fontSize, context } = props;
    return (
        <SearchBtnStyle >
            <IconToolTipBtn
                linkBtn={ false } class={ `react-search-btn` }
                toolTip={ true } ancestor={ "unset" }
                closeable={ true }
                textColor={ color }
                fontSize={ fontSize }
                iconClass={ "fas fa-search" }
                backgroundColor={ "" }
                tooltipBgc={ context.theme.nav_bgc }
                hoverBgColor={ "" }
                hoverColor={ "" }
                borderRadius={ "" }
                border={ "unset" }
                btnText={ '' }
                handleClick={ () => { } }
                tooltipMounted={ () => { } }
                closeTooltip={ false }
                pointer={ false }
                context={ context }
            >
                { props.children }
            </IconToolTipBtn>
        </SearchBtnStyle>
    );
};

export default SearchBtn;
const SearchBtnStyle = styled.div`
    
`;
