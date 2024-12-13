import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DivTag from '../DivTag';
import useViewPort from '../customHooks/useViewPort';

export function EmblaCarousel({ files }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

    const [deviceHeight, setdeviceHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)

    const height = useViewPort([
        '200px', '200px', '300px', '400px'
    ]);

    useEffect(() => {
        setdeviceHeight(window.innerHeight);
        setdeviceWidth(window.innerWidth);
    })

    return (
        <div
            className="embla"
            style={{ height: height, backgroundColor: '#0a0f15', }}
            ref={emblaRef}
        >
            <div className="embla__container"
                style={{
                    // overflow: 'hidden'
                    backgroundColor: '#0a0f15',
                }}
            >
                {
                    files.map((file, index) => {
                        return (
                            <img
                                className={'embla__slide'}
                                key={index}
                                src={file.src}
                                alt={file.caption}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )
                    })}
            </div>
        </div>
    )


}
