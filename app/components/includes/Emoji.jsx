import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useTheme from '../customHooks/useTheme';
import { CommonContext } from '../index/CommonContext';
import DivTag from '../reuseable/DivTag';
import ImageEle from '../reuseable/ImageEle';
import Loading from '../reuseable/Loading';
import ScrollerX from '../reuseable/ScrollerX';
import NewTab from './NewTab';
import StickyContainer from './StickyContainer';

const Emoji = (props) => {
    const { emoji } = useContext(CommonContext);
    const theme = useTheme();

    const activities = emoji.Activities;
    const animals_n_nature = emoji['Animals & nature'];
    const flags = emoji.Flags;
    const food_n_drink = emoji['Food & drink'];
    const objects = emoji.Objects;
    const people_n_smileys = emoji['People & smileys'];
    const symbols = emoji.Symbols;
    const travel_n_places = emoji['Travel & places'];

    const [tabKey, settabKey] = useState(0);
    const [ready, setready] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setready(true);
        }, 400);
    }, []);

    const p_N_s = people_n_smileys ? people_n_smileys.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const a_N_n = animals_n_nature ? animals_n_nature.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const f_N_d = food_n_drink ? food_n_drink.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const act_vity = activities ? activities.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const t_N_p = travel_n_places ? travel_n_places.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const obj = objects ? objects.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const symb = symbols ? symbols.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;

    const flag = flags ? flags.map((emoji, index) => {
        return <div
            key={ index }
            onMouseDown={ (e) => props.handleInsert(e, emoji.svg) }
            style={ {
                backgroundImage: `url(/storage/image/svg/${emoji.svg})`,
                backgroundPosition: "5000% 6900%",
                WebkitBackgroundSize: "contain",
                width: "20px", height: "20px"
            } }
        ></div>;
    })
        : <div></div>;


    const handleAnchor = (key) => {
        settabKey(key);
        const elem = document.getElementById(key);
        elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    };

    return (
        <DivTag
            padding={ "2px" }
            width={ "300px" }
            gap={ "10px" }
        >
            <ScrollerX>
                <DivTag
                    bgi={ "url(/storage/image/svg/1f600.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("p_N_s") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f40e.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("a_N_n") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f354.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("f_N_d") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/26bd.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("act_vity") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f698.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("t_N_p") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f4a1.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("obj") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f523.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("symb") }
                />
                <DivTag
                    bgi={ "url(/storage/image/svg/1f6a9.svg)" } bgp={ "5000% 6900%" }
                    bgs={ "contain" } width={ "20px" } height={ "20px" }
                    handleClick={ () => handleAnchor("flag") }
                />
            </ScrollerX>
            <DivTag
                height={ "350px" }
                maxHeight={ "350px" }
                overflow={ "hidden auto" }
            >
                { ready ?
                    <>
                        <DivTag id="p_N_s">
                            <h5
                                className={ "sticky" }
                                style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Smileys & people</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ p_N_s }</DivTag>
                        </DivTag>
                        <DivTag id="a_N_n">
                            <h5 className={ "sticky" }
                                style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Animals & nature</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ a_N_n }</DivTag>
                        </DivTag>
                        <DivTag id="f_N_d">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Food & drink</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ f_N_d }</DivTag>
                        </DivTag>
                        <DivTag id="act_vity">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Activity</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ act_vity }</DivTag>
                        </DivTag>
                        <DivTag id="t_N_p">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Travel & places</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ t_N_p }</DivTag>
                        </DivTag>
                        <DivTag id="obj">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Objects</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ obj }</DivTag>
                        </DivTag>
                        <DivTag id="symb">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Symbols</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ symb }</DivTag>
                        </DivTag>
                        <DivTag id="flag">
                            <h5 className={ "sticky" } style={ { background: theme.background_color, color: theme.color, margin: 0, padding: "0.5rem" } }
                            >Flags</h5>
                            <DivTag
                                gap={ "0.3rem" }
                                gtc={ "repeat(auto-fill, minmax(20px, 1fr))" }
                            >{ flag }</DivTag>
                        </DivTag>
                    </>
                    :
                    <Loading
                        fixed={ false }
                        loaderPos={ `30%` }
                        borderRadius={ `3px / 6px` }
                        contBorderRadius={ "10px" }
                        transformOrigin={ `1px 10px` }
                        width={ `1px` }
                        height={ `6px` }
                        background={ false }
                        loaderColor={ "#262729" }
                    />
                }
            </DivTag>
        </DivTag>
    );
};

export default Emoji;