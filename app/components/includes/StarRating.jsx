import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StarRating = (props) => {
    const { width, height, rate, fSize, color } = props;

    const canvasRef = useRef(null);
    const starTextRef = useRef(null);


    useEffect(() => {
        canvasRef.current.height = height;
        canvasRef.current.width = width;
        handleRate();

    }, []);

    const handleRate = () => {

        const starText = starTextRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const height = canvas.height;
        const width = canvas.width;

        // star style
        const ratingColor = 'orange';
        const starColor = '#ccc';
        const borderColor = 'transparent';
        const borderWidth = 0;

        // star config
        const disabled = false;
        const starNum = 5;
        const step = 0.1;
        const toFixed = 1;
        const starGap = 0;
        const oneStarPercent = 100 / starNum;
        const oneStepPercent = oneStarPercent * step;
        const starWidth = Math.floor((width - starNum * starGap) / starNum);

        let percent = rate * oneStarPercent;

        const deg = 72; // degree

        drawRating(percent);

        function drawRating(value) {
            const stepNum = Math.ceil(value / oneStepPercent);

            percent = stepNum * oneStepPercent;

            starText.innerText = (percent / oneStarPercent).toFixed(toFixed);

            draw();
        }

        function draw() {
            for (let i = 0; i < starNum; i++) {
                drawStar({
                    x: starWidth / 2 + i * (starWidth + starGap) + starGap / 2,
                    y: height / 2,
                    r: starWidth / 4,
                    R: starWidth / 2,
                    rot: 0,
                    index: i
                });
            }
        }

        function drawStar({ x, y, r, R, rot, index }) {
            const ctx = context;
            const gradient = ctx.createLinearGradient(x - R, 0, x + R, 0);
            const stop = Math.min(Math.max((index + 1) * oneStarPercent - percent, 0), oneStarPercent);
            const rate = (oneStarPercent - stop) / oneStarPercent;

            gradient.addColorStop(rate, ratingColor);
            gradient.addColorStop(Math.min(1, rate + 0.01), starColor);

            ctx.beginPath();
            for (let i = 0; i < 360 / deg; i++) {
                ctx.lineTo(Math.cos((18 + i * deg - rot) / 180 * Math.PI) * R + x,
                    -Math.sin((18 + i * deg - rot) / 180 * Math.PI) * R + y);
                ctx.lineTo(Math.cos((54 + i * deg - rot) / 180 * Math.PI) * r + x,
                    -Math.sin((54 + i * deg - rot) / 180 * Math.PI) * r + y);
            }
            ctx.closePath();
            ctx.lineWidth = borderWidth;
            ctx.fillStyle = gradient;
            ctx.strokeStyle = borderColor;
            ctx.lineJoin = "round";

            ctx.fill();
            ctx.stroke();
        }
    };

    return (
        <StarRatingStyle fSize={ fSize } color={ color }>
            <canvas ref={ canvasRef }></canvas>
            <div ref={ starTextRef }>{ rate }</div>
        </StarRatingStyle>
    );
};

export default StarRating;
const StarRatingStyle = styled.div`
    display: grid;
    gap: 0.5rem;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    align-items: center;
    justify-items: start;
    font-size: ${props => props.fSize};
    color: ${props => props.color};
`;