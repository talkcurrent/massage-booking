import React from 'react';
import Image from '../Carousel/Image';
import Acronym from '../customHooks/Acronym';
import useTheme from '../customHooks/useTheme';
import useViewPort from '../customHooks/useViewPort';
import DivTag from '../reuseable/DivTag';
import ImageEle from '../reuseable/ImageEle';
import ScrollerX from '../reuseable/ScrollerX';
import TempDP from '../reuseable/TempDP';

const SimpleUserCard = (props) => {
    const { bgc, profile, withFlag, justifySelf, minWidth } = props;

    const theme = useTheme();
    const dpRect = useViewPort([28, 28, 35, 40]);

    return (
        <DivTag
            gtc={ "auto 3fr" }
            bgc={ bgc }
            gap={ "3px" }
            padding={ "2px" }
            bRadius={ "5px" }
            align={ "center" }
            minWidth={ minWidth }
            justifySelf={ justifySelf }
        >
            {profile.dp ?
                <ImageEle
                    linkTo={ `/${profile.title}` }
                    src={ profile.dp.name }
                    height={ dpRect + "px" }
                    width={ dpRect + "px" }
                    border={ `2px solid ${theme.background_color}` }
                    bgc={ theme.background_color }
                    bRadius={ "50%" }
                    objFit={ "cover" }
                    cursor={ "pointer" }
                >
                    { withFlag ?
                        <DivTag
                            position={ "absolute" }
                            bottom={ "-2px" }
                            right={ "0px" }
                        >
                            <Image
                                handleClick={ e => { } }
                                objFit={ "contain" }
                                src={ `/storage/image/flags/${profile.country_flag}` }
                                height={ (dpRect / 2.4) + "px" }
                                width={ (dpRect / 2.4) + "px" }
                                bRadius={ "50%" }
                            />
                        </DivTag>
                        : "" }
                </ImageEle>
                :
                <TempDP
                    height={ dpRect + "px" }
                    width={ dpRect + "px" }
                    fSize={ Acronym(profile.name).length > 2 ? `${dpRect / 2.6}px` : `${dpRect / 2}px` }
                    // pad={ "3px" }
                    dpName={ profile.name }
                    cursor={ "pointer" }
                >
                    { withFlag ?
                        <DivTag
                            position={ "absolute" }
                            bottom={ "-2px" }
                            right={ "0px" }
                        >
                            <Image
                                handleClick={ e => { } }
                                objFit={ "contain" }
                                src={ `/storage/image/flags/${profile.country_flag}` }
                                height={ (dpRect / 2.4) + "px" }
                                width={ (dpRect / 2.4) + "px" }
                                bRadius={ "50%" }
                            />
                        </DivTag>
                        : "" }
                </TempDP>
            }
            <DivTag>
                <ScrollerX >
                    <DivTag
                        wSpace={ "nowrap" }
                        fWeight={ "bolder" }
                        fSize={ "larger" }
                        lHeight={ "normal" }
                    >{ profile.name }</DivTag>
                </ScrollerX>
                { props.children }
            </DivTag>
        </DivTag>
    );
};

export default SimpleUserCard;
