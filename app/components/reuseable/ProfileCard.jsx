import React, { useEffect } from 'react';
import useTheme from '../customHooks/useTheme';
import useViewPort from '../customHooks/useViewPort';
import HomeBanner from '../includes/HomeBanner';
import DivTag from './DivTag';
import ScrollerX from './ScrollerX';

const ProfileCard = (props) => {
    const { profile, hoverShadow, handleClick } = props;

    const theme = useTheme();
    const bannerHeight = useViewPort(["90px", "90px", "120px", "150px"]);
    const dpRect = useViewPort([70, 70, 100, 115]);
    const brandSpacing = useViewPort(["0px",]);
    const brandSize = useViewPort(["small", ""]);
    const labelFontSize = useViewPort(["x-small", "x-small", "small"]);
    const labelMargin = useViewPort(["14px 5px 5px 5px", "14px 5px 5px 5px", "10px 5px 5px 5px"]);

    const onClick = () => {
        if (handleClick) {
            handleClick(profile.title);
        }
    };

    return (
        <DivTag
            bgc={ theme.cardsBgc }
            color={ theme.cardsColor }
            bShadow={ props.bShadow }
            overflow={ "hidden" }
            bRadius={ "10px" }
            hoverShadow={ hoverShadow }
            cursor={ "pointer" }
            handleClick={ onClick }
        >
            <HomeBanner
                bgi={ "/storage/image/backgroundTalk.png" }
                bgc={ theme.nav_color }
                carouselPhotos={ profile.cover } //always one single cover photo which is featured
                height={ bannerHeight }
                afterRight={ false }
                brandSize={ brandSize }
                brandSpacing={ brandSpacing }
                withFlag={ true }
                showBrand={ false }
                showProfileDp={ true }
                withMenu={ false }
                setprofile={ () => { } }
                profile={ profile }//current page profile owner
                dpRect={ dpRect }
                asUserCard={ true }
            />
            <DivTag
                color={ theme.cardsColor }
                bgc={ theme.cover_color }
                margin={ labelMargin }
                fSize={ labelFontSize }
                align={ "center" }
            >
                <ScrollerX >
                    <DivTag
                        wSpace={ "nowrap" }
                        fWeight={ "bolder" }
                        fSize={ "larger" }
                    >{ profile.name }</DivTag>
                </ScrollerX>
                { props.children }
            </DivTag>
        </DivTag>
    );
};

export default ProfileCard;
