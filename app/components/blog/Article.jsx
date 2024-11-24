'use client';
import { CommonContext } from '@/app/components/context/CommonContext';
import useResolution from '@/app/components/customHooks/useResolution';
import DivTag from '@/app/components/DivTag'
import LoadingBtn from '@/app/components/reuseable/LoadingBtn'
import Navigation from '@/app/components/nav/Navigation';
import localDate from '@/app/components/dates/localDate';
import server from '@/app/server';
import React, { useContext, useEffect, useState } from 'react'
import useViewPort from '@/app/components/customHooks/useViewPort';


export default function Article({ params }) {
    const { articles, setarticles } = useContext(CommonContext);

    const [navHeight, setnavHeight] = useState(0)
    const [gettingArticle, setgettingArticle] = useState(false)
    const [thisArticle, setthisArticle] = useState(null)

    const { windowWidth, windowHeight } = useResolution();
    const articlePad = useViewPort([
        '5px', '10px', '20px', '40px', '50px', '70px'
    ]);
    const { getArticle } = server()

    useEffect(() => {
        const { slug } = params
        const thisArticles = articles.find(article => article.slug == slug);
        // console.info(thisArticles)
        if (!thisArticles) {
            handleArticle(slug);
        } else {
            setthisArticle(thisArticles)
        }
    }, [articles])

    const handleArticle = async (slug) => {
        setgettingArticle(true)
        const response = await getArticle(slug)
        if (response.ok) {
            setarticles([response.data, ...articles])
        }
        setgettingArticle(false)
    }

    const getLayout = (rect) => {
        const { height } = rect
        setnavHeight(height)
    }
    return (
        <DivTag
            // width={windowWidth + "px"}
            height={windowHeight + "px"}
            bgc={"linear-gradient(0deg, #141a1f 20%, #1f4566 70%, #2c4d69)"}
            position={"relative"}
            overflow={"auto"}
        >
            <DivTag
                height={'max-content'}
            >
                <Navigation
                    onLayout={getLayout}
                />

                <main
                    style={{
                        height: (windowHeight - navHeight),
                        // width: windowWidth + 'px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'grid',
                        padding: '0 5%',
                        boxSizing: 'border-box'
                    }}
                >
                    <DivTag
                        display={"block"}
                        // padding={'0 15px'}
                        bSizing={'border-box'}
                        bgc={'linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgb(255 255 255) 35%)'}
                    >
                        {gettingArticle ?
                            <DivTag
                                height={'100%'}
                                align={'center'}
                                justify={'center'}
                            >
                                <LoadingBtn
                                    text={'Getting article'}
                                    fontSize={'large'}
                                    fontWeight={'600'}
                                    color={'black'}
                                />
                            </DivTag>
                            :
                            <DivTag>
                                <DivTag
                                    padding={'0 15px'}
                                >
                                    <h1 style={{
                                        textAlign: 'left',
                                    }}>{thisArticle?.title}</h1>
                                    <DivTag><span><span style={{ color: '#454545' }}>Published at:</span> {thisArticle ? localDate(thisArticle.datePublished) : ''}</span></DivTag>
                                    <DivTag>
                                        <i><span style={{ color: '#454545' }}>By:</span> <span style={{ fontFamily: 'serif', fontSize: 18 }}>BlueReport Admin</span></i>
                                    </DivTag>
                                </DivTag>
                                <DivTag
                                    tAlign={"justify"}
                                    margin={"0 auto"}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{ __html: thisArticle?.article }}
                                        style={{
                                            width: windowWidth - ((10 / 100) * windowWidth),
                                            maxWidth: windowWidth - ((10 / 100) * windowWidth),
                                            boxSizing: 'border-box',
                                            padding: `0 ${articlePad}`,
                                        }}
                                    ></div>
                                </DivTag>
                            </DivTag>
                        }
                    </DivTag>
                </main>
            </DivTag>
        </DivTag>
    )
}
