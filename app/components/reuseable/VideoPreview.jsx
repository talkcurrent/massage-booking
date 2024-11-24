import React, { Component, useEffect } from "react";
import styled from "styled-components";
import Close from "./Close";

const VideoPreview = (props) => {
    const { min, max, vidTemplate, handleDelPreview } = props;

    useEffect(() => {
        if (props.comMounted) {
            props.comMounted();
        }
    }, []);

    const videos = [];

    vidTemplate.forEach((val, attr) => {
        videos.push({ attr: attr, val: val });
    });
    return (
        <VidPreview min={ min } max={ max }>
            { videos.map(preview => {
                return (
                    <div className="prod-img-prev-cont" key={ preview.attr }>
                        <video
                            src={ window.URL.createObjectURL(preview.val) }
                            alt="Recorded video" controls
                            style={ {
                                borderRadius: "7px",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            } }
                        ></video>

                        <Close
                            absolute={ true }
                            top={ 0 }
                            right={ 0 }
                            height={ "20px" }
                            width={ "20px" }
                            fontSize={ "large" }
                            bgc={ "" }
                            handleClick={ e => handleDelPreview(preview.attr, "video") }
                        />
                    </div>
                );
            }) }
        </VidPreview>
    );
};

export default VideoPreview;

const VidPreview = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(${props => props.min}, 1fr));
    grid-auto-rows: 1fr;
    gap: 5px;
    padding: 4px 0px 0px 0px;
    opacity: 1;
    transition: all ease-in 2s;

    .prod-img-prev-cont {
        position: relative;
    }
`;
