import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import Percentage from '../customHooks/Percentage';
import useDuration from '../customHooks/useDuration';
import useTheme from '../customHooks/useTheme';
import ProgressBar from '../reuseable/ProgressBar';

const AudioElement = forwardRef((props, ref) => {
    const { audioSrc, audioDuration } = props;
    const [isPlaying, setisPlaying] = useState(false);
    const [endTime, setendTime] = useState("0:00");
    const [duration, setduration] = useState(0);
    const [durationChanged, setdurationChanged] = useState(false);
    const [hours, sethours] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [seconds, setseconds] = useState(0);
    const [progressBar, setprogressBar] = useState(100);
    const [vidRange, setvidRange] = useState(0);
    const [bufferedProgress, setbufferedProgress] = useState(100);
    const [seekBarPercentage, setseekBarPercentage] = useState("");
    const [startTime, setstartTime] = useState("0:00");

    const controlRef = useRef(null);
    const audioElem = useRef();
    var audioInterval = useRef(null);
    var mediaDuration = useDuration(audioDuration);
    const { nav_color } = useTheme();

    useImperativeHandle(ref, () => ({
        getAudioElem: () => {
            return audioElem.current;
        }
    }));

    // useEffect(() => {
    //     console.info(audioElem.current.duration);
    // });

    useEffect(() => {

        if (audioElem.current) {
            audioElem.current.addEventListener('play', handleAudioPlay);
            // audioElem.current.addEventListener('seeked', handleSeeked);
            audioElem.current.addEventListener('timeupdate', handleTimeUpdate);
            audioElem.current.addEventListener('progress', handleBuffered);
        }

        return () => {
            if (audioElem.current) {
                audioElem.current.removeEventListener('play', handleAudioPlay);
                // audioElem.current.removeEventListener('seeked', handleSeeked);
                audioElem.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioElem.current.removeEventListener('progress', handleBuffered);
            }
        };
    });

    const handleAudioPlay = (e) => {
        const endDuration = calculateDuration(audioDuration);
        const hours = Number(endDuration.hours) > 0 ? `${endDuration.hours}:` : '';
        setendTime('' + hours + endDuration.minutes + ':' + endDuration.seconds + '');

    };

    const handleTimeUpdate = (e) => {
        var sec = parseInt(audioElem.current.currentTime % 60);
        var min = parseInt((audioElem.current.currentTime % 3600) / 60);
        var hr = parseInt(audioElem.current.currentTime / 3600);

        setduration(audioDuration);
        sethours(hr);
        setminutes(min.toFixed());
        setseconds(pad(sec.toFixed()));
        //
        var progressPosition = parseInt(audioElem.current.currentTime) / audioDuration;
        var rangePosition = parseInt(audioElem.current.currentTime) * (100 / audioDuration);

        setprogressBar(rangePosition);
        setvidRange(rangePosition);

        updateSeekBar(audioElem.current);

        if (audioElem.current.ended || audioElem.current.paused) {
            setisPlaying(false);
        }
    };

    const handleBuffered = () => {
        var duration = audioDuration;
        if (duration > 0) {
            for (var i = 0; i < audioElem.current.buffered.length; i++) {
                if (audioElem.current.buffered.start(audioElem.current.buffered.length - 1 - i) < audioElem.current.currentTime) {
                    setbufferedProgress((audioElem.current.buffered.end(audioElem.current.buffered.length - 1 - i) / duration) * 100);
                    break;
                }
            }
        }
    };

    const updateSeekBar = () => {
        const seekBarPercentage = Percentage(audioElem.current.currentTime, audioDuration);
        setseekBarPercentage(seekBarPercentage);

        const currentDuration = calculateDuration(audioElem.current.currentTime);
        const thisHour = Number(currentDuration.hours) > 0 ? `${currentDuration.hours}:` : "";
        setstartTime('' + thisHour + currentDuration.minutes + ':' + currentDuration.seconds + '');
    };

    var calculateDuration = (duration) => {
        var seconds = parseInt(duration % 60);
        var minutes = parseInt((duration % 3600) / 60);
        var hours = parseInt(duration / 3600);

        return {
            hours: hours,
            minutes: minutes.toFixed(),
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
    const playAudio = (e) => {
        audioElem.current.play();
        setisPlaying(true);
    };
    const pauseAudio = (e) => {
        audioElem.current.pause();
        setisPlaying(false);
    };
    const handleDuration = (e) => {
        // var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // audioContext.decodeAudioData(e.target.src, function (buffer) {
        //     // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        //     var duration = parseInt(buffer.duration);
        //     console.log(duration);
        // });
        // console.info("meta dat loaded");
    };
    const handleDurationChange = (e) => {
        setdurationChanged(true);
    };

    // useEffect(() => {
    //     console.info(audioSrc);
    // }, [audioSrc]);

    const handleAudioRange = (e) => {
        var seekTo = audioDuration * (e.target.value / 100);
        var rangePosition = parseInt(audioElem.current.currentTime) * (100 / audioDuration);

        audioElem.current.currentTime = seekTo;
        setprogressBar(rangePosition);
        updateSeekBar(audioElem.current);
    };
    // useEffect(() => {
    //     console.info(isPlaying);
    // }, [isPlaying]);

    return (
        <AudioElementStyle
            bgc={ "#7c8790" }
            margin={ props.margin }
            className={ "audio-element" }
        >
            <div
                className={ `play-pause-btn ${isPlaying ? "pause" : "play"}` }
                onClick={ e => isPlaying ? pauseAudio() : playAudio() }
            >
                { isPlaying ?
                    <i className={ `fas fa-pause` }></i>
                    :
                    <i className={ `fas fa-play` }></i>
                }
            </div>
            <ProgressBar
                ref={ controlRef }
                range={ vidRange }
                height={ "2px" }
                progressWidth={ progressBar }
                bufferedProgress={ bufferedProgress }
                onInputRange={ handleAudioRange }
            />
            <div className="audio-countdown">
                <span>{ startTime }</span><strong>/</strong><span>{ mediaDuration }</span>
            </div>
            <audio
                ref={ audioElem }
                src={ audioSrc }
                preload={ "metadata" }
                onLoadedMetadata={ e => handleDuration(e) }
                onDurationChange={ e => handleDurationChange(e) }
            ></audio>
        </AudioElementStyle>
    );
});

export default AudioElement;
const AudioElementStyle = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: auto 3fr auto;
    align-items: center;
    gap: 2px;
    background: ${props => props.bgc};
    margin: ${props => props.margin};
    padding: 0 3px;
    border-radius: 10px;
    .play-pause-btn{
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #979fa7;
        color: white;
        display: grid;
        align-items: center;
        margin: 1px 0;
        justify-items: center;
        font-size: small;
    }
    .audio-countdown{
        justify-self: end;
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        gap: 2px;
        padding: 1px 3px;
        background: #979fa7;
        color: white;
        border-radius: 10px;
        font-size: x-small;
    }
    audio{
        position: absolute;
        height: 0px;
        width: 0px;
    }
`;