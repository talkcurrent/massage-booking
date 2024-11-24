import React, { useEffect, useState } from 'react'
import DivTag from '../DivTag'
import { useRouter } from 'next/navigation'
import localDate from '../dates/localDate'

const ArticleCard = (props) => {
    const { post } = props
    const router = useRouter();

    useEffect(() => {
        router.prefetch(`/blogs/${post.slug}`);
    }, [])

    const openArticle = () => {
        router.push(`/blogs/${post.slug}`)
    }
    return (
        <DivTag
            gtr={"1fr auto"}
            minHeight={"150px"}
            bShadow={"0px 4px 10px -1px #5f5f5f"}
            bRadius={'30px 0px 30px 0'}
            cursor={"pointer"}
            overflow={'hidden'}
            handleClick={openArticle}
        >
            <DivTag
                position={"relative"}
                overflow={'hidden'}
                bRadius={'30px 0px 0px 0'}
            >
                <img

                    src="/blog.jpeg" alt="article image"
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        // height: '100%'
                    }}
                />
                <DivTag
                    position={'absolute'}
                    top={'0px'}
                    left={'0px'}
                    bottom={'0px'}
                    width={'100%'}
                    height={'100%'}
                    align={'center'}
                    justify={'center'}
                    bgc={'rgba(0,0,0,0.7)'}
                    padding={'0px 10px'}
                    tAlign={'justify'}
                    bSizing={'border-box'}
                >
                    <h1
                        style={{
                            backgroundImage: "linear-gradient(to right, white, silver)",
                            color: 'transparent',
                            backgroundClip: 'text',
                            fontFamily: 'serif'
                        }}
                    >{post.title}</h1>
                </DivTag>
            </DivTag>
            <DivTag
                bgc={"whitesmoke"}
                padding={'0 5px'}
                gap={'10px'}
                // bRadius={'0px 0px 30px 0'}
                overflow={'hidden'}
            >
                <DivTag
                    // bgc
                    tAlign={'justify'}
                >
                    <span>{post.description}</span>
                </DivTag>
                <DivTag
                    fFamily={'serif'}
                    fSize={20}
                >
                    <DivTag><span><span style={{ color: '#454545' }}>Published at:</span><i>{localDate(post.datePublished)}</i></span></DivTag>
                    <DivTag
                        justifySelf={"end"}
                        margin={'0 20px 0 0'}
                    >
                        <i><span style={{ color: '#454545' }}>By:</span> <span>BlueReport Admin</span></i>
                    </DivTag>
                </DivTag>
            </DivTag>
        </DivTag>
    )
}

export default ArticleCard