import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';
import { useEffect } from 'react';

export function EmblaCarousel({ files }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {
                    files.map((file, index) => {
                        return (
                            <img
                                className={'embla__slide'}
                                key={index}
                                src={file.src}
                                alt={file.caption}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        )
                    })}
            </div>
        </div>
    )


}
