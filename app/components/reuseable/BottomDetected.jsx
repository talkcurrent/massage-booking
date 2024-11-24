"use client"
import React, { useRef, useEffect } from 'react';
import LoadingBtn from './LoadingBtn';

const BottomDetected = (props) => {
    const { getMoreDatas, datas, noMoreDatas, gettingDatas, infoText } = props;

    const gettingMore = useRef();
    const recentData = useRef();
    const bottom = useRef();
    const options = {
        root: props.elem ? props.elem : null,
        rootMargin: props.rootMargin ? props.rootMargin : "0px 0px 200px 0px",
        threshold: 0
    };
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting > 0 || entry.isIntersecting == true) {
                getMore();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    useEffect(() => {
        if (bottom.current) {
            observer.observe(bottom.current);
        }
    }, []);

    useEffect(() => {
        // helps keep most recent data
        //as observe callback wont catch the latest data but the very 1st ones
        gettingMore.current = gettingDatas;
        recentData.current = datas;
    }, [gettingDatas, datas]);

    const getMore = () => {
        if (gettingMore.current == false) {
            getMoreDatas(recentData.current.map(d => d.id));
        }
    };
    return (
        <div ref={ bottom } className="bottom">
            { datas.length ?
                <div style={ { textAlign: "center" } }>
                    { noMoreDatas ?
                        <span>{ infoText }</span>
                        :
                        gettingDatas ?
                            <LoadingBtn text={ "Loading more" }
                                lineHeight={ "unset" } loadMore={ true }
                                fontSize={ "small" } />
                            : ""
                    }
                </div>
                : ""
            }
        </div>
    );
};

export default BottomDetected;
