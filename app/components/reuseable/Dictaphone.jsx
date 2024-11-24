import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useDate from '../customHooks/useDate';
import AudioElement from '../includes/AudioElement';
import TooltipBtn from './TooltipBtn';

const Dictaphone = (props) => {

    const [recordable, setrecordable] = useState(false);
    const [recording, setrecording] = useState(false);
    const [recorded, setrecorded] = useState(false);
    const [newRecordStarts, setnewRecordStarts] = useState(false);
    const [durationInMilli, setdurationInMilli] = useState(0);
    const [duration, setduration] = useState(0);
    const [recordHours, setrecordHours] = useState(0);
    const [recordMinutes, setrecordMinutes] = useState("0");
    const [recordSeconds, setrecordSeconds] = useState("00");
    const [audioSrc, setaudioSrc] = useState("");

    const closeDicta = useRef();
    const audioTag = useRef();
    const durationIntVal = useRef();
    var milliTime = useRef(null);
    var durationInMill = useRef(0);
    let canvas = useRef();
    let mediaRecorder = useRef();
    let timer = useRef();
    let tracks = useRef();
    let mediaStream = useRef();
    var durationInSeconds = useRef(duration);
    var secFromDate = useRef();

    const { year, month, day, hour, minutes, seconds } = useDate();
    useEffect(() => {
        let audioCtx;
        let canvasCtx;
        if (canvas.current) {
            canvasCtx = canvas.current.getContext("2d");
        }
        //main block for doing the audio recording

        if (navigator.mediaDevices.getUserMedia) {
            //getUserMedia is supported
            const constraints = { audio: true };
            let chunks = [];

            let onSuccess = function (stream) {
                setrecordable(true);
                mediaRecorder.current = new MediaRecorder(stream);

                visualize(stream);
                Window.stream = stream;
                mediaStream.current = stream;

                mediaRecorder.current.onstop = async function (e) {
                    setrecording(false);
                    setrecorded(true);
                    const time = new Date().toLocaleString('en-GB');
                    const blob = new Blob(chunks, { 'type': 'audio/wav; codecs=vp8' });
                    blob.lastModifiedDate = new Date();
                    blob.duration = Math.floor(secFromDate.current / 1000);
                    // blob.duration = durationInSeconds.current;
                    blob.name = time + ".wav";

                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    setaudioSrc(audioURL);

                    //keep/save recorded audio file in parent component
                    props.handleResetMedia(blob, "audio");
                };

                mediaRecorder.current.ondataavailable = function (e) {
                    chunks.push(e.data);
                };

                closeDicta.current.onclick = () => {
                    stream.getTracks().forEach((track) => {
                        track.stop();
                    });
                    handleClose();
                };
            };


            let onError = function (err) {
                //handle error message
            };
            navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

        } else {
            // getUserMedia not supported
        }

        function visualize(stream) {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }

            const source = audioCtx.createMediaStreamSource(stream);

            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            source.connect(analyser);
            //analyser.connect(audioCtx.destination);

            draw();

            function draw() {
                if (canvas.current) {
                    const WIDTH = canvas.current.width;
                    const HEIGHT = canvas.current.height;

                    requestAnimationFrame(draw);

                    analyser.getByteTimeDomainData(dataArray);

                    canvasCtx.fillStyle = '#50a69b';
                    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                    canvasCtx.lineWidth = 1;
                    canvasCtx.strokeStyle = '#266660';

                    canvasCtx.beginPath();

                    let sliceWidth = WIDTH * 1.0 / bufferLength;
                    let x = 0;


                    for (let i = 0; i < bufferLength; i++) {

                        let v = dataArray[i] / 128.0;
                        let y = v * HEIGHT / 2;

                        if (i === 0) {
                            canvasCtx.moveTo(x, y);
                        } else {
                            canvasCtx.lineTo(x, y);
                        }

                        x += sliceWidth;
                    }

                    canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                    canvasCtx.stroke();
                }
            }
        }
        return () => {
            // if (tracks.current) {
            //     tracks.current.forEach((track) => {
            //         track.stop();
            //     });
            // }
            // Window.stream ? Window.stream.getTracks().forEach(track => track.stop()) : "";

        };
    }, [canvas.current]);

    useEffect(() => {
        if (newRecordStarts === true) {
            timer.current = setInterval(() => {
                setduration(prev => { return ++prev; });
            }, 1000);

            milliTime.current = setInterval(() => {
                setdurationInMilli(prev => { return prev + 600; });
            }, 600);

        } else {
            clearInterval(timer.current);
            clearInterval(milliTime.current);
            setduration(0);
        }
    }, [newRecordStarts]);

    useEffect(() => {
        var sec = parseInt(duration % 60);
        var min = parseInt((duration % 3600) / 60);
        var hr = parseInt(duration / 3600);

        setrecordSeconds(pad(sec.toFixed()));
        setrecordMinutes(min.toFixed());
        setrecordHours(hr.toFixed());

    }, [duration]);

    useEffect(() => {
        //each time duration change on record, update ref to new duration
        //to be used as duration for audio playback in AudioElement.jsx
        if (duration) {
            durationInSeconds.current = duration;
        }
    }, [duration]);

    useEffect(() => {
        if (durationInMilli) {
            durationInMill.current = durationInMilli;
        }
    }, [durationInMilli]);

    const startRecord = () => {
        const date = new Date();
        mediaRecorder.current.start();
        secFromDate.current = date.getTime();
        setnewRecordStarts(true);
        setrecording(true);
    };

    const pad = (number) => {
        if (number > -10 && number < 10) {
            return "0" + number;
        } else {
            return number;
        };
    };
    const stopRecord = () => {
        // setduration(`${recordHours != 0 ? recordHours + ":" : ""} ${recordMinutes}:${recordSeconds}`);
        setnewRecordStarts(false);
        setrecording(false);
        mediaRecorder.current.stop();
        const date = new Date();
        secFromDate.current = date.getTime() - secFromDate.current;

        // if (tracks.current) {
        //     tracks.current.forEach((track) => {
        //         track.stop();
        //     });
        // }
        // mediaRecorder.requestData();
    };

    const handleClip = () => {
        audioTag.current.getAudioElem().pause();
        durationInMill.current = 0;
        setdurationInMilli(0);
        setrecorded(false);
        setaudioSrc("");
        props.handleResetMedia("", "audio");
    };

    const handleAudio = () => {
        props.handleAudio();
    };
    const handleClose = () => {
        props.onClose();
    };

    return (
        <DictaphoneStyle
            displayRecorder={ recorded ? "none" : "grid" }
            displayPreview={ recorded ? "grid" : "none" }
        >
            <div className="record-tools">
                <div className={ `record-stop-btn ${recording ? "stop" : "record"}` }
                    onClick={ e => {
                        if (recordable && !recorded) {
                            recording ? stopRecord() : startRecord();
                        }
                    } }
                    style={ { opacity: recordable ? 1 : 0.3 } }
                >
                    <i className={ `fas fa-stop${recording ? " recording" : ""}` }></i>
                </div>
                <div className="timer">
                    <span>{ `${recordHours != 0 ? recordHours + ":" : ""} ${recordMinutes}:${recordSeconds}` }</span>
                </div>
                <canvas className="visualizer" ref={ canvas }></canvas>
                <div className="trash-btn" ref={ closeDicta }>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="record-preview">
                <AudioElement
                    ref={ audioTag }
                    audioSrc={ audioSrc }
                    audioDuration={ Math.floor(secFromDate.current / 1000) }
                />
                <TooltipBtn
                    toolTip={ false }
                    btnText={ "Send" }
                    disabled={ false }
                    borderRadius={ "5px" }
                    align={ "center" }
                    backgroundColor={ "#50a69b" }
                    textColor={ "white" }
                    fontWeight={ 100 }
                    fontSize={ "small" }
                    loadingText={ "" }
                    border={ "unset" } lHeight={ "1.2" }
                    handleClick={ handleAudio }
                />
                <div className="trash-btn" onClick={ () => handleClip() }>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        </DictaphoneStyle>
    );
};

export default Dictaphone;
const DictaphoneStyle = styled.section`
    display: grid;
    width: 100%;
    height: 100%;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    -ms-transition: none;
    transition: none;
    .record-tools{
        display:${props => props.displayRecorder};
        grid-template-columns: auto auto 3fr auto;
        align-items: center;
        gap: 4px;
        width: 100%;
        padding: 0 0 0 6px;
        grid-row: 1;
        grid-column: 1;
    }
    .record-preview{
        display: ${props => props.displayPreview};
        grid-template-columns: 3fr auto auto;
        width: 100%;
        align-items: center;
        gap: 4px;
        grid-row: 1;
        grid-column: 1;
        audio{
            max-width: 100%;
            height: 19px;
            padding: 2px 0;
            outline-color: unset;
            border: unset;
            outline-width: 0;
        }
    }
    .record-stop-btn{
        color: red;
        .recording{
            text-decoration: blink;
            animation: blink 1s infinite;
        }
        @keyframes blink {
            from {opacity: 1.0;}
            to {opacity: 0.0;}
        }
        @-webkit-keyframes blink {
            from {opacity: 1.0;}
            to {opacity: 0.0;}
        }
    }
    .visualizer{
        width: 100%;
        height: 19px;
    }
    .timer{
        bottom: 0;
        font-size: x-small;
        color: white;
    }
    .trash-btn{
        cursor: pointer;
        i{
            color: whitesmoke;
        }
    }
`;