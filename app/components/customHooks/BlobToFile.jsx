"use client"
const BlobToFile = (theBlob, fileName) => {

    // theBlob.lastModifiedDate = new Date();
    // theBlob.name = fileName;
    // return theBlob;

    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: 'video/mp4' });
};

export default BlobToFile;