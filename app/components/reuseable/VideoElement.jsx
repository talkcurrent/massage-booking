import React, { useContext, useLayoutEffect, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import usePrevState from '../customHooks/usePrevState';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import ProgressBar from '../reuseable/ProgressBar';
import Percentage from '../customHooks/Percentage';

const VideoElement = (props) => {
    const { video, controls } = props;

    const [totalTimePlayed, settotalTimePlayed] = useState(0);
    const [duration, setduration] = useState(0);
    const [hours, sethours] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [seconds, setseconds] = useState(0);
    //
    const [isPlaying, setisPlaying] = useState(false);
    const [showControl, setshowControl] = useState(false);
    const [endTime, setendTime] = useState(0);
    const [startTime, setstartTime] = useState("00:00");
    const [progressBar, setprogressBar] = useState(100);
    const [bufferedProgress, setbufferedProgress] = useState(100);
    const [vidRange, setvidRange] = useState(0);
    const [volRange, setvolRange] = useState(50);
    const [seekBarPercentage, setseekBarPercentage] = useState("");
    const [bottomControlHeight, setbottomControlHeight] = useState(0);
    const [playBtnGotClicked, setplayBtnGotClicked] = useState(false);

    const videoElem = useRef(null);
    const endTimeElem = useRef(null);
    const startTimeElem = useRef(null);
    const progressBarElem = useRef(null);
    const controlRef = useRef(null);
    const playPauseBtn = useRef(null);
    const bufferedBarElem = useRef(null);
    const videoContainer = useRef(null);
    const volProgressBar = useRef(null);
    const bottomControls = useRef(null);
    const timeoutHandler = useRef(null);

    const prevBottomControlHeight = usePrevState(bottomControlHeight);

    useEffect(() => {
        if (bottomControls.current &&
            prevBottomControlHeight != bottomControls.current.offsetHeight
        ) {
            setbottomControlHeight(bottomControls.current.offsetHeight);
        }
        if (videoElem.current) {
            videoElem.current.addEventListener('play', handleVidPlay);
            videoElem.current.addEventListener('seeked', handleSeeked);
            videoElem.current.addEventListener('timeupdate', handleTimeUpdate);
            videoElem.current.addEventListener('progress', handleBuffered);
        }

        return () => {
            if (videoElem.current) {
                videoElem.current.removeEventListener('play', handleVidPlay);
                videoElem.current.removeEventListener('seeked', handleSeeked);
                videoElem.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoElem.current.removeEventListener('progress', handleBuffered);
            }
        };
    });
    // useEffect(() => {
    //     console.info(totalTimePlayed);
    //     return () => { };
    // }, [totalTimePlayed]);

    useEffect(() => {
        if (seconds > 0) {
            settotalTimePlayed(totalTimePlayed + 1); //in seconds
        }
        return () => { };
    }, [seconds]);

    useEffect(() => {
        const smallVid = duration > 10 && duration < 30 && totalTimePlayed == Number(parseInt((50 / 100) * duration).toFixed());
        const mediumVid = duration >= 30 && totalTimePlayed == 30;
        if ((smallVid || mediumVid) && !video.hasViewed && playBtnGotClicked) {
            props.registerVideoView ? props.registerVideoView(video.id) : "";
        }
        return () => { };
    }, [totalTimePlayed]);

    const handleSeeked = (e) => {
        console.info("decreasing");
        // settotalTimePlayed(totalTimePlayed - 1);
    };

    const handleTimeUpdate = (e) => {
        var sec = parseInt(videoElem.current.currentTime % 60);
        var min = parseInt((videoElem.current.currentTime % 3600) / 60);
        var hr = parseInt(videoElem.current.currentTime / 3600);

        setduration(videoElem.current.duration);
        sethours(pad(hr));
        setminutes(pad(min.toFixed()));
        setseconds(pad(sec.toFixed()));
        //
        var progressPosition = videoElem.current.currentTime / videoElem.current.duration;
        var rangePosition = videoElem.current.currentTime * (100 / videoElem.current.duration);

        setprogressBar(rangePosition);
        setvidRange(rangePosition);

        updateSeekBar(videoElem.current);

        if (videoElem.current.ended || videoElem.current.paused) {
            setisPlaying(false);
            //handle control timeout
            setshowControl(false);
        } else {
            // setisPlaying(true);
            //handle control timeout
            // setshowControl(false);
        }
    };

    const handleVidPlay = (e) => {
        const endDuration = calculateDuration(videoElem.current.duration);
        const hours = Number(endDuration.hours) > 0 ? `${endDuration.hours}:` : '';
        setendTime('' + hours + endDuration.minutes + ':' + endDuration.seconds + '');

    };
    const playVideo = (e) => {
        setplayBtnGotClicked(true);
        videoElem.current.play();

        setisPlaying(true);
        //handle control timeout
        setshowControl(false);
    };
    const pauseVideo = (e) => {
        videoElem.current.pause();
        setplayBtnGotClicked(false);
        setisPlaying(false);
        //handle control timeout
        setshowControl(false);
    };

    const fastForward = () => {
        if (!videoElem.current.ended &&
            videoElem.current.duration != undefined &&
            videoElem.current.currentTime > 0 &&
            videoElem.current.currentTime < videoElem.current.duration) {
            videoElem.current.currentTime += 10;
        }
    };
    const fastBackward = () => {
        if (!videoElem.current.ended &&
            videoElem.current.duration != undefined &&
            videoElem.current.currentTime > 0 &&
            videoElem.current.currentTime < videoElem.current.duration) {
            videoElem.current.currentTime -= 10;
        }
    };

    const handleBuffered = () => {
        var duration = videoElem.current.duration;
        if (duration > 0) {
            for (var i = 0; i < videoElem.current.buffered.length; i++) {
                if (videoElem.current.buffered.start(videoElem.current.buffered.length - 1 - i) < videoElem.current.currentTime) {
                    setbufferedProgress((videoElem.current.buffered.end(videoElem.current.buffered.length - 1 - i) / duration) * 100);
                    break;
                }
            }
        }
    };
    var calculateDuration = (duration) => {
        var seconds = parseInt(duration % 60);
        var minutes = parseInt((duration % 3600) / 60);
        var hours = parseInt(duration / 3600);

        return {
            hours: pad(hours),
            minutes: pad(minutes.toFixed()),
            seconds: pad(seconds.toFixed())
        };
    };
    const pad = (number) => {
        if (number > -10 && number < 10) {
            return "0" + number;
        } else {
            return number;
        };
    };

    const handleVidRange = (e) => {
        var seekTo = videoElem.current.duration * (e.target.value / 100);
        var rangePosition = videoElem.current.currentTime * (100 / videoElem.current.duration);

        videoElem.current.currentTime = seekTo;
        setprogressBar(rangePosition);
        updateSeekBar(videoElem.current);
    };

    const handleVolRange = (e) => {
        const { value } = e.target;
        setvolRange(value);
        videoElem.current.volume = value / 100;
    };

    const updateSeekBar = () => {
        const seekBarPercentage = Percentage(videoElem.current.currentTime, videoElem.current.duration);
        setseekBarPercentage(seekBarPercentage);

        const currentDuration = calculateDuration(videoElem.current.currentTime);
        const thisHour = Number(currentDuration.hours) > 0 ? `${currentDuration.hours}:` : "";
        setstartTime('' + thisHour + currentDuration.minutes + ':' + currentDuration.seconds + '');
    };

    const handleFullscreen = () => {
        openFullscreen(videoContainer.current);
    };

    const openFullscreen = (elem) => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };
    const handleHover = (e) => {
        clearTimeout(timeoutHandler.current);
        if (isPlaying) {
            setshowControl(true);
            timeoutHandler.current = setTimeout(() => {
                setshowControl(false);
            }, 4000);
        }
    };
    const handleMouseMove = (e) => {
        const target = e.target;
        clearTimeout(timeoutHandler.current);
        if (isPlaying) {
            setshowControl(true);
            if (!target.closest('.controls')) {
                timeoutHandler.current = setTimeout(() => {
                    setshowControl(false);
                }, 4000);
            }
        }
    };
    const handleMouseLeave = (e) => {
        if (isPlaying) {
            clearTimeout(timeoutHandler.current);
            timeoutHandler.current = setTimeout(() => {
                setshowControl(false);
            }, 4000);
        }
    };
    useEffect(() => {
        // console.info(prevBottomControlHeight, bottomControlHeight);
        return () => { };
    }, [bottomControlHeight]);
    return (
        <VideoElementStyle
            ref={ videoContainer }
            bottom={ bottomControlHeight }
            minHeight={ props.height }
            onMouseEnter={ e => handleHover(e) }
            onMouseMove={ e => handleMouseMove(e) }
            className="video_container"
            style={ { position: "relative", width: "100%" } }
        >
            {/* possible menu */ }
            { props.children }
            <div className={ `videoPlayer ${showControl ? "ctrl-btns" : "playing-mode"}` } id="vid_1">
                { props.linkObj ?
                    <Link to={ props.linkObj }
                        style={ {
                            height: "inherit",
                            background: props.bgc,
                            maxHeight: "inherit"
                        } }
                    >
                        <video
                            style={ {
                                height: "inherit",
                                background: props.bgc,
                                maxHeight: "inherit",
                                width: "inherit",
                                maxWidth: "inherit"
                            } }
                            ref={ videoElem }
                            src={ `/storage/video/${video.name}` }
                            // poster={ `/storage/image/${video.thumbnail}` }
                            preload="true"
                        />
                    </Link>
                    :
                    <video
                        style={ {
                            height: "inherit",
                            background: props.bgc,
                            maxHeight: "inherit",
                            width: "inherit",
                            maxWidth: "inherit"
                        } }
                        ref={ videoElem }
                        src={ `/storage/video/${video.name}` }
                        // poster={ video.thumbnail ? `/storage/image/${video.thumbnail}` : "" }
                        preload="false"
                    />
                }
                { controls !== false ?
                    <div
                        className="controls notActive"
                        onMouseLeave={ e => handleMouseLeave(e) }
                    >
                        <div className="topControls">
                            <div ref={ startTimeElem } className="startTime">{ startTime }</div>
                            <ProgressBar
                                ref={ controlRef }
                                range={ vidRange }
                                height={ "4px" }
                                progressWidth={ progressBar }
                                bufferedProgress={ bufferedProgress }
                                onInputRange={ handleVidRange }
                            />
                            <div ref={ endTimeElem } className="endTime">{ video.duration }</div>
                        </div>

                        <div
                            className="bottomControls"
                            ref={ bottomControls }
                        >
                            <div className="volControl">
                                <div className="vol-icon up">
                                    <i className="fa fa-volume-up"></i>
                                </div>
                                <ProgressBar
                                    ref={ controlRef }
                                    range={ volRange }
                                    height={ "3px" }
                                    progressWidth={ volRange }
                                    onInputRange={ handleVolRange }
                                />
                            </div>

                            <div className="playbackControls">
                                <div className="backward">
                                    <i onClick={ e => fastBackward() } className="fa fa-fast-backward"></i>
                                </div>
                                <div ref={ playPauseBtn } className="playPauseBtn">
                                    { isPlaying ?
                                        <i onClick={ e => pauseVideo() } className="fa fa-pause"></i>
                                        :
                                        <i onClick={ e => playVideo() } className="fa fa-play"></i>
                                    }
                                </div>
                                <div className="forward">
                                    <i onClick={ e => fastForward() } className="fa fa-fast-forward"></i>
                                </div>
                            </div>

                            <div className="fullscreenCtrl">
                                <div className="fullscreen">
                                    <i onClick={ e => handleFullscreen() } className="fa fa-expand"></i>
                                    {/* <i className="fas fa-cog"></i> */ }
                                </div>
                            </div>
                        </div>
                    </div>
                    : "" }
            </div>
            {!isPlaying && controls !== false ?
                <div className="video-play-btn">
                    <div className="play-btn-bg">
                        <IconToolTipBtn
                            linkBtn={ false } class={ `play-btn${video.id}` }
                            toolTip={ false } ancestor={ "mainContainer" }
                            textColor={ "whitesmoke" }
                            display={ "inline-grid" }
                            fontSize={ "xxx-large" }
                            iconClass={ "fas fa-play" }
                            backgroundColor={ "" }
                            hoverBgColor={ "" }
                            hoverColor={ "" }
                            borderRadius={ "" }
                            border={ "unset" }
                            handleClick={ e => playVideo() }
                            closeable={ true }
                            tooltipMounted={ () => { } }
                            closeTooltip={ () => { } }
                        />
                    </div>
                </div>
                : "" }

        </VideoElementStyle >
    );
};

export default VideoElement;
export const VideoElementStyle = styled.div`
    position: relative;
    max-width: 100%;
    height: inherit;
    max-height: inherit;
    .videoPlayer{
        width: 100%;
        max-width: 100%;
        min-height: ${props => props.minHeight};
        height: inherit;
        max-height: inherit;
        // border-radius: 7px;
        overflow: hidden;
        display: grid;
        align-items: center;
        position: relative;
        justify-content: center;
        align-items: center;

        &.ctrl-btns {
            .controls {
                bottom: 0;
                transition: all ease 1s;
            }
        }

        &.playing-mode {
            .controls {
                bottom: -${props => props.bottom}px;
                transition: all ease 1s;
            }
        }
    } 
    .video-play-btn{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        display:grid;
        justify-items: center;
        align-items: center;
        z-index: 1;
        .play-btn-bg{
            padding: 5px;
            border-radius: 10px;
            height: 60px;
            width: 60px;
            background: rgb(0 0 0 / 46%);
            display: grid;
            align-items: center;
            justify-items: end;
        }
    }
`;
