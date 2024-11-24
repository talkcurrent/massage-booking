import React from 'react';
import styled from 'styled-components';
import inThousands from '../customHooks/inThousands';
import useTheme from '../customHooks/useTheme';
import DivTag from './DivTag';

const Price = (props) => {
    const { price, fSize, } = props;
    const theme = useTheme();

    return (
        <PriceStyle
            fSize={ fSize }
            priceBefore={ theme.danger }
            priceNow={ theme.price }
        >
            {price ?
                <>
                    {price.before ?
                        <DivTag
                            wSpace={ "nowrap" }
                            color={ theme.danger }
                            textDecoration={ "line-through" }
                            fWeight={ 400 }
                        >{ price.currency }{ inThousands(price.before) }</DivTag>
                        : "" }

                    <DivTag
                        wSpace={ "nowrap" }
                        color={ theme.price }
                        fWeight={ 600 }
                    >{ price.currency }{ inThousands(price.current) }</DivTag>

                    {price.discount ?
                        <DivTag
                            wSpace={ "nowrap" }
                            color={ "#4CAF50" }
                        >{ `-${price.discount}` }</DivTag> : "" }
                </>
                :
                <DivTag
                    fSize={ fSize }
                    justify={ "center" }
                    wSpace={ "nowrap" }
                >Price not set</DivTag>
            }
        </PriceStyle>
    );
};

export default Price;
const PriceStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    gap: 0.5rem;
    width: max-content;
    font-size: ${props => props.fSize};
    margin: 0 auto;
`;