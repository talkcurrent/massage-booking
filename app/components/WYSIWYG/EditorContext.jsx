"use client";

import React, { useState } from 'react';
import Fetch from '../customHooks/Fetch';

export const EditorContext = React.createContext();

export const EditorProvider = (props) => {
    const [state, setState] = useState({
        uploadingPhoto: false,
        uploadingError: false,
        previewable: "",
    });

    const [form, setform] = useState({
        sort: "all"
    });

    const [files, setfiles] = useState({
        imgCollections: new Map(),
        imgTemplate: new Map(),
    });

    const controller = React.useRef();

    const handleDelPreview = (index) => {
        const imgTemplate = new Map(files.imgTemplate);
        const imgCollections = new Map(files.imgCollections);
        imgTemplate.delete(index);
        imgCollections.delete(index);
        setfiles({
            ...files,
            imgTemplate: imgTemplate,
            imgCollections: imgCollections
        });
    };
    const resetSourceMedia = () => {
        setfiles({
            ...files,
            imgCollections: new Map(),
            imgTemplate: new Map(),
        });
    };

    const handleResetField = (obj) => {
        var newSate = JSON.parse(JSON.stringify(state));

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                newSate[key] = obj[key];
            }
        }
        setState(newSate);
    };

    const alterStateProps = (field, data) => {
        setState({ ...state, [field]: data });
    };

    const handleFile = async (event, filesFor) => {
        const target = event.target;
        const inputFiles = target.files;

        setState({
            ...state, previewable: filesFor
        });
        Array.from(inputFiles).forEach(file => {
            var fileName = file.name.split(".").slice(0, (file.name.split(".").length) - 1).join(".");
            const objURL = window.URL.createObjectURL(file);

            setfiles({
                ...files, imgCollections: files.imgCollections.set(fileName, file),
            });
            setfiles({
                ...files, imgTemplate: files.imgTemplate.set(fileName, objURL),
            });
        });

    };

    const handleContentUpload = async () => {
        setState({
            ...state,
            uploadingPhoto: true,
            uploadingError: false,
        });
        const { imgCollections } = files;

        var dataCollections = new FormData();

        for (const [key, value] of imgCollections) {
            dataCollections.append("imgCollections[]", value);
        }

        const response = await Fetch("/put_contents", dataCollections, "POST", true);
        if (response.ok) {
            setState({
                ...state,
                uploadingPhoto: false,
                uploadingError: false,
            });
            resetSourceMedia();
        } else {
            setState({
                ...state,
                uploadingPhoto: false,
                uploadingError: true,
            });
        }
        return await response.json();
    };

    const deletePhoto = async (file_name) => {

        const response = await Fetch("/delete_photo", JSON.stringify({ file_name }), "POST", false);
        if (!response.ok) {
            // deletePhoto(file_name);
        };
    };


    return (
        <React.Fragment>
            <EditorContext.Provider
                value={{
                    ...state, ...files,
                    alterStateProps, handleFile, resetSourceMedia,
                    handleDelPreview, handleContentUpload, deletePhoto,
                    handleResetField,
                }}
            >
                {props.children}
            </EditorContext.Provider>
        </React.Fragment>
    );
};

export default EditorProvider;
