import React, { useEffect, useState } from 'react';
import useTheme from '../customHooks/useTheme';
import DivTag from '../reuseable/DivTag';
/**
 * Return talkcurrent logo made with JSX.
 * @param {string} [size] -A string value of either "small", "medium", "large" or "x-large" 
 * 
 */

const LogoHtml = (props) => {
    const { size } = props;

    const [state, setstate] = useState({
        height: 0,
        width: 0,
        cLineHeight: 0,
        tSize: 0,
        cSize: 0,
        pad: 0,
    });

    const theme = useTheme();

    useEffect(() => {
        switch (size) {
            case "small":
                setstate({
                    ...state,
                    height: "26px",
                    width: "26px",
                    cLineHeight: 2.0,
                    tSize: "22px",
                    cSize: "19px",
                    pad: "6px 0 0 0",
                });
                break;
            case "medium":
                setstate({
                    ...state,
                    height: "35px",
                    width: "35px",
                    cLineHeight: 2.0,
                    tSize: "30px",
                    cSize: "25px",
                    pad: "7px 0 0 0",
                });
                break;
            case "large":
                setstate({
                    ...state,
                    height: "40px",
                    width: "40px",
                    cLineHeight: 1.9,
                    tSize: "38px",
                    cSize: "33px",
                    pad: "7px 0 0 0",
                });
                break;
            case "x-large":
                setstate({
                    ...state,
                    height: "50px",
                    width: "50px",
                    cLineHeight: 1.9,
                    tSize: "48px",
                    cSize: "41px",
                    pad: "9px 0 0 0",
                });
                break;
        }
        return;
    }, []);
    return (
        <DivTag
            border={ `2px solid ${theme.touch}` }
            bRadius={ "50%" }
            padding={ state.pad }
            height={ state.height }
            width={ state.width }
            justifyContent={ "center" }
            alignContent={ "center" }
            tAlign={ "center" }
        >
            <DivTag
                gridCol={ 1 }
                gridRow={ 1 }
                fSize={ state.tSize }
            >T</DivTag>
            <DivTag
                gridCol={ 1 }
                gridRow={ 1 }
                fSize={ state.cSize }
                lHeight={ state.cLineHeight }
            >C</DivTag>
        </DivTag>
    );
};

export default LogoHtml;
