import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './ArrowButtons'
import DivTag from '../../DivTag'
import DP from '../../reuseable/DP'

const ReviewCarousel = (props) => {
    const { slides, options, handleClick } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: false })
    ])
    const [isPlaying, setIsPlaying] = useState(false)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const [deviceHeight, setdeviceHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)

    useEffect(() => {
        setdeviceHeight(window.innerHeight);
        setdeviceWidth(window.innerWidth);
    }, [])

    const onButtonAutoplayClick = useCallback(
        (callback) => {
            const autoScroll = emblaApi?.plugins()?.autoScroll
            if (!autoScroll) return

            const resetOrStop =
                autoScroll.options.stopOnInteraction === false
                    ? autoScroll.reset
                    : autoScroll.stop

            resetOrStop()
            callback()
        },
        [emblaApi]
    )

    const toggleAutoplay = useCallback(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return

        const playOrStop = autoScroll.isPlaying()
            ? autoScroll.stop
            : autoScroll.play
        playOrStop()
    }, [emblaApi])

    useEffect(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll
        if (!autoScroll) return

        setIsPlaying(autoScroll.isPlaying())
        emblaApi
            .on('autoScroll:play', () => setIsPlaying(true))
            .on('autoScroll:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
    }, [emblaApi])

    return (
        <DivTag class="embla__text__2">
            <div className="embla__text__viewport" ref={emblaRef}>
                <div className="embla__text__container">
                    {slides.map((slide, index) => {
                        return (
                            <div
                                className="embla__text__slide"
                                key={index}
                            >
                                <DivTag
                                    bRadius={"1.8rem 1.8rem 0rem 1.8rem"}
                                    padding={"10px 10px 2px 10px"}
                                    bShadow={"inset 0 0 0 1.5px #1e1e1e"}
                                    gtr={"1fr auto"}
                                    height={"210px"}
                                >
                                    <DivTag gtr={"auto auto 1fr auto"}>
                                        <DivTag
                                            gtc={"auto 1fr"}
                                            gap={"10px"}
                                        >
                                            <DP obj={slide} dpRect={50} />
                                            <DivTag>
                                                <DivTag color={'#417e38'}>{slide.poster}</DivTag>
                                                <DivTag color={'silver'}><i>{slide.location}</i></DivTag>
                                            </DivTag>
                                        </DivTag>
                                        <hr
                                            style={{
                                                borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
                                                margin: '2px 0 4px 0'
                                            }}
                                        />
                                        <DivTag
                                            tAlign={'left'}
                                        >
                                            <span>{slide.body}</span>
                                        </DivTag>
                                        <DivTag
                                            justify={"end"}
                                            color={"silver"}
                                            fFamily={"serif"}
                                        >
                                            <i><span>{new Date(slide.date).toDateString()}</span></i>
                                        </DivTag>
                                    </DivTag>
                                </DivTag>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>

            <div className="embla__text__controls">
                <div className="embla__text__buttons">
                    <PrevButton
                        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
                        disabled={nextBtnDisabled}
                    />
                </div>

                {/* <button className="embla__text__play" onClick={toggleAutoplay} type="button">
                    {isPlaying ? 'Stop' : 'Start'}
                </button> */}
            </div>
        </DivTag>
    )
}

export default ReviewCarousel;
