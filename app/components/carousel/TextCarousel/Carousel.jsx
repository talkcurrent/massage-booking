import React, { useCallback, useContext, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './ArrowButtons'
import DivTag from '../../DivTag'
import Truncate from '../../reuseable/Truncate'
import AnimateBtn from '../../reuseable/AnimateBtn'
import Translate from '../../Translate'
import { CommonContext } from '../../context/CommonContext'

const EmblaCarousel = (props) => {
    const { deviceWidth, currency } = useContext(CommonContext);
    const { slides, options, handleClick, language } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoScroll({ playOnInit: false })
    ])
    const [isPlaying, setIsPlaying] = useState(false)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

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
        <DivTag class="embla__text">
            <div className="embla__text__viewport" ref={emblaRef}>
                <div className="embla__text__container">
                    {slides.map((slide, index) => {
                        return (
                            <div className="embla__text__slide" key={index}>
                                <DivTag
                                    bRadius={"1.8rem"}
                                    padding={"15px 20px 2px 20px"}
                                    bShadow={"inset 0 0 0 0.2rem #1e1e1e"}
                                    gtr={"1fr auto"}
                                    height={deviceWidth > 700 ? "150px" : "190px"}
                                >
                                    <DivTag>
                                        {/* <h3 style={{ marginBottom: 10 }}>{slide.title}</h3> */}
                                        <p style={{ color: 'white', textAlign: 'left' }}>{slide.body && Truncate(Translate(slide.body, language), 30)}</p>
                                        <p style={{ fontFamily: 'monospace', color: '#b4b4b4', fontSize: 'large' }}>
                                            <b>{Translate(slide.duration, language)} - {`${currency.symbol}${slide.cost}`}</b>
                                        </p>
                                    </DivTag>
                                    <DivTag
                                        justifySelf={"end"}
                                    >
                                        <AnimateBtn
                                            btnText={Translate("Book Now", language)}
                                            bgc={'#417e38'}
                                            buttonStyle={{ padding: "5px 10px" }}
                                            justify={"center"}
                                            animateColor={"white"}
                                            animateBgColor={"green"}
                                            color={"white"}
                                            handleClick={() => handleClick(slide.url)}
                                        />
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

export default EmblaCarousel
