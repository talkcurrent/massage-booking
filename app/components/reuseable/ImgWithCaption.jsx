import React, { useState } from 'react';
import CustomEditor from '../customEditor/CustomEditor';
import Close from './Close';
import DivTag from './DivTag';
import ImageEle from './ImageEle';

const ImgWithCaption = (props) => {
    const {
        caption, preview, captionable,
        src, mapImg, height, width,
        border, bRadius, alt, objFit,
        bgc, imgClick, handleDelPreview
    } = props;

    const [editorCaption, seteditorCaption] = useState("");

    const handleOutput = (output) => {
        const { innerHtml } = output;

        if (props.handleImgCaption) {
            props.handleImgCaption(mapImg[0], innerHtml);
        }
        seteditorCaption(innerHtml);
    };

    const handleKeyUp = () => {
        // if (props.handleImgCaption) {
        //     props.handleImgCaption(mapImg[0], editorCaption);
        // }
    };

    const handleImgClick = () => {
        if (imgClick) {
            imgClick();
        }
    };

    return (
        <DivTag
            height={ height }
            width={ width }
        >
            <ImageEle
                src={ preview ? "" : src }
                objUrl={ preview ? window.URL.createObjectURL(mapImg[1]) : "" }
                bRadius={ bRadius }
                bgc={ bgc }
                imgClick={ handleImgClick }
                height={ height }
                width={ width }
                border={ border }
                alt={ alt }
                objFit={ objFit }
            >
                {/* possible menu for owner */ }
                { props.children }
                { preview ?
                    <Close
                        absolute={ true }
                        top={ 0 }
                        right={ 0 }
                        height={ "20px" }
                        width={ "20px" }
                        fontSize={ "large" }
                        bgc={ "" }
                        handleClick={ e => handleDelPreview(mapImg[0]) }
                    />
                    : "" }
            </ImageEle>
            {preview && captionable ?
                <CustomEditor
                    editorHeight={ "100px" }
                    excludes={ ['close', 'code'] }
                    padding={ "0px" }
                    title={ false }
                    mode={ "editing" }
                    fSizeToolbar={ "small" }
                    notEditable={ false }
                    tolltipFixedTop={ true }
                    handleOutput={ handleOutput } //function, returns all childNodes
                    handleKeyUp={ handleKeyUp } //function, returns all childNodes
                    input={ {} } //for editing
                    initialState={ { title: "", body: caption.length ? caption : "Caption here" } }//string or innerHTML
                    width={ "100%" }
                />
                : ""
            }
        </DivTag>
    );
};

export default ImgWithCaption;
