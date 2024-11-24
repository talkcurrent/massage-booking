'use client';
import React, { useEffect, useState } from 'react'
import Navigation from '../components/nav/Navigation'
import DivTag from '../components/DivTag';
import Footer from '../components/nav/Footer';
import useViewPort from '../components/customHooks/useViewPort';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [navHeight, setnavHeight] = useState(0)
    const [deviceWidth, setdeviceWidth] = useState(0)
    const [deviceHeight, setdeviceHeight] = useState(0)
    const articlePad = useViewPort([
        '10px', '10px', '20px', '10px 10%', '10px 20%', '10px 30%'
    ]);

    const router = useRouter();

    useEffect(() => {
        setdeviceHeight(window.innerHeight);
        setdeviceWidth(window.innerWidth);
        router.prefetch(`/`);
        router.prefetch(`/contact`);
        router.prefetch(`/about`);
    }, [])

    const getLayout = (rect) => {
        const { height } = rect
        setnavHeight(height)
    }

    return (

        <DivTag
            // width={windowWidth + "px"}
            height={deviceHeight + "px"}
            bgc={"linear-gradient(0deg, #0a0f15 44%, #14181d)"}
            position={"relative"}
            overflow={"auto"}
            gtr={"auto 1fr auto"}
        >
            <Navigation
                onLayout={getLayout}
            />
            {deviceHeight > 0 ?
                <>
                    <DivTag
                        height={'max-content'}
                    >

                        <main
                            style={{
                                height: (deviceHeight - navHeight),
                                // width: windowWidth + 'px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                display: 'grid',
                                padding: articlePad,
                                boxSizing: 'border-box'
                            }}
                        >
                            <DivTag
                                display={"block"}
                                // padding={'0 15px'}
                                bSizing={'border-box'}
                            >
                                <h1 style={{ color: '#417e38' }}>OUR VISSION</h1>

                                <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reprehenderit omnis dolores tempore beatae similique. Optio neque obcaecati eos rem quae, voluptatem repudiandae. Labore quo eligendi omnis repellendus accusantium autem, amet nemo expedita a velit quos quam atque doloremque incidunt modi quibusdam voluptatibus iure magni fugit. Possimus iure cum voluptatem ab neque similique numquam amet aliquid harum quaerat? Eaque repellendus perferendis, hic accusamus tempore iusto quis numquam aliquam tenetur deserunt fugit eligendi voluptatibus incidunt minima est facere architecto quibusdam expedita aliquid dolorum recusandae odit. Deleniti, quae tempora laudantium explicabo nihil reiciendis cum error nobis tempore perspiciatis, molestias inventore quos ipsum.</p>
                                <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reprehenderit omnis dolores tempore beatae similique. Optio neque obcaecati eos rem quae, voluptatem repudiandae. Labore quo eligendi omnis repellendus accusantium autem, amet nemo expedita a velit quos quam atque doloremque incidunt modi quibusdam voluptatibus iure magni fugit. Possimus iure cum voluptatem ab neque similique numquam amet aliquid harum quaerat? Eaque repellendus perferendis, hic accusamus tempore iusto quis numquam aliquam tenetur deserunt fugit eligendi voluptatibus incidunt minima est facere architecto quibusdam expedita aliquid dolorum recusandae odit. Deleniti, quae tempora laudantium explicabo nihil reiciendis cum error nobis tempore perspiciatis, molestias inventore quos ipsum.</p>
                                <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reprehenderit omnis dolores tempore beatae similique. Optio neque obcaecati eos rem quae, voluptatem repudiandae. Labore quo eligendi omnis repellendus accusantium autem, amet nemo expedita a velit quos quam atque doloremque incidunt modi quibusdam voluptatibus iure magni fugit. Possimus iure cum voluptatem ab neque similique numquam amet aliquid harum quaerat? Eaque repellendus perferendis, hic accusamus tempore iusto quis numquam aliquam tenetur deserunt fugit eligendi voluptatibus incidunt minima est facere architecto quibusdam expedita aliquid dolorum recusandae odit. Deleniti, quae tempora laudantium explicabo nihil reiciendis cum error nobis tempore perspiciatis, molestias inventore quos ipsum.</p>
                                <p style={{ marginTop: '1rem', textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni reprehenderit omnis dolores tempore beatae similique. Optio neque obcaecati eos rem quae, voluptatem repudiandae. Labore quo eligendi omnis repellendus accusantium autem, amet nemo expedita a velit quos quam atque doloremque incidunt modi quibusdam voluptatibus iure magni fugit. Possimus iure cum voluptatem ab neque similique numquam amet aliquid harum quaerat? Eaque repellendus perferendis, hic accusamus tempore iusto quis numquam aliquam tenetur deserunt fugit eligendi voluptatibus incidunt minima est facere architecto quibusdam expedita aliquid dolorum recusandae odit. Deleniti, quae tempora laudantium explicabo nihil reiciendis cum error nobis tempore perspiciatis, molestias inventore quos ipsum.</p>
                            </DivTag>
                        </main>
                    </DivTag>
                    <Footer />
                </>
                : ""}
        </DivTag>
    )
}

export default Page;