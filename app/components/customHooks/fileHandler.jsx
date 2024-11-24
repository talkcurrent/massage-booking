"use client"

const fileHandler = (event, allowedSize, existingFiles) => {

    let imgCollections = new Map(existingFiles.imgCollections);
    let imgTemplate = new Map(existingFiles.imgTemplate);
    let vidCollections = new Map(existingFiles.vidCollections);
    let vidTemplate = new Map(existingFiles.vidTemplate);
    let response = "";

    const target = event.target;
    const inputFiles = target.files;

    const img_within_limit = inputFiles.length + imgCollections.size <= allowedSize;
    const vid_within_limit = inputFiles.length + vidCollections.size <= allowedSize;
    //check to ensure total files not > allowedSize
    Array.from(inputFiles).forEach(file => {

        const fileType = file.type.split("/")[0];
        var fileName = file.name.split(".").slice(0, (file.name.split(".").length) - 1).join(".");
        const objURL = window.URL.createObjectURL(file);

        if (fileType == "image") {

            if (img_within_limit) {
                imgCollections.set(fileName, file);
                imgTemplate.set(fileName, objURL);
                response = "";
            } else {
                response = `You are not allowed over ${allowedSize} images`;
            }
        } else if (fileType == "video") {
            if (vid_within_limit) {

                vidCollections.set(fileName, file);
                vidTemplate.set(fileName, objURL);
                response = "";
            } else {
                response = `You are not allowed over ${allowedSize} videos`;
            }
        }
    });

    return { imgCollections, imgTemplate, vidCollections, vidTemplate, response };
};

export default fileHandler;
