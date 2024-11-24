import React from 'react';
import styled from 'styled-components';
import TooltipBtn from './TooltipBtn';

const SeeMoreCard = (props) => {
    const { seeMoreLink, cardShadow, textColor, fontSize, bgc, btnText, btnShadow, btnRadius, btnPadding } = props;
    return (
        <SeeMoreCardStyle
            bgc={ bgc }
            btnRadius={ btnRadius }
            cardShadow={ cardShadow }
        >
            <div className="btn-shadow">
                <TooltipBtn
                    linkBtn={ true } btnLink={ seeMoreLink } class={ `see-more-btn` }
                    toolTip={ false } ancestor={ "react-house" }
                    textColor={ textColor } fontSize={ fontSize }
                    closeTooltip={ "" }
                    backgroundColor={ "" }
                    hoverBgColor={ "" }
                    hoverColor={ "" }
                    borderRadius={ btnRadius }
                    border={ "unset" }
                    padding={ btnPadding }
                    btnShadow={ btnShadow }
                    loadingText={ "" }
                    handleClick={ () => { } }
                    tooltipMounted={ () => { } }
                    btnText={ btnText }
                    animateBtn={ false }
                    disabled={ false }
                ></TooltipBtn>
            </div>
        </SeeMoreCardStyle>
    );
};

export default SeeMoreCard;
const SeeMoreCardStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    background: ${props => props.bgc};
    border-radius: ${props => props.btnRadius};
    box-shadow: ${props => props.cardShadow};
`;
