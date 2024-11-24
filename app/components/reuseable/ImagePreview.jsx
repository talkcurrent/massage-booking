import React, { Component } from "react";
import styled from "styled-components";
import Close from "./Close";

export class ImagePreview extends Component {
    componentDidMount() {
        if (this.props.comMounted) {
            this.props.comMounted();
        }
    }
    render() {
        const { min, max, imgTemplate, fileObj, fileObjName,
            handleDelPreview, autoFill, padding } = this.props;

        const images = [];
        imgTemplate.forEach((val, attr) => {
            images.push({ attr: attr, val: val });
        });

        return (
            <ImgPreview
                $min={min} $max={max}
                $autoFill={autoFill}
                $padding={padding}
            >
                {images.map(preview => {
                    return (
                        <div className="prod-img-prev-cont" key={preview.attr}>
                            <img
                                src={window.URL.createObjectURL(preview.val)}
                                alt="An image"
                                style={{
                                    borderRadius: "7px",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "#e9ecef",
                                }}
                            />
                            <Close
                                absolute={true}
                                top={0}
                                right={0}
                                height={"20px"}
                                width={"20px"}
                                fontSize={"large"}
                                bgc={""}
                                handleClick={e => handleDelPreview(preview.attr, "image")}
                            />
                        </div>
                    );
                })}
            </ImgPreview>
        );
    }
}
export const ImgPreview = styled.div`
    display: grid;
    grid-template-columns:${props => props.$autoFill ?
        `repeat(auto-fill,minmax(${props.$min}, ${props.$max}))` :
        `repeat(auto-fit,minmax(${props.$min}, ${props.$max}))`};
    grid-auto-rows: 1fr;
    gap: 5px;
    padding: ${props => props.$padding ? "4px" : "4px 0 0 0"};
    opacity: 1;
    transition: all ease-in 2s;

    .prod-img-prev-cont {
        position: relative;
    }
`;
