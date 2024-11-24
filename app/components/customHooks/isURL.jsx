"use client"

const isURL = (string) => {

    let words = string.split(' ');

    const newWords = words.map((word, index) => {

        let urlInput = document.createElement("input");
        urlInput.setAttribute('type', 'url');
        urlInput.value = word;

        if (urlInput.validity.valid) {
            return `<a href='${word}'>${word}</a>`;
        }
        return word;
    });

    return newWords.join(' ');
};

export default isURL;
