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
        router.prefetch(`/vission`);
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
                        <h2 style={{ color: '#417e38' }}>About Therabonnies</h2>

                        <p style={{ margin: '1rem 0 0.5rem 0', textAlign: 'justify' }}>Welcome to Therabonnies – Your Sanctuary for Healing and Relaxation.</p>
                        <p style={{ margin: '1rem 0', textAlign: 'justify' }}>TheraBonnies are a team of dedicated, licensed massage therapists who are passionate about helping you achieve balance, relieve stress, and enhance your well-being. We understand that life can be demanding, and our mission is to provide a peaceful retreat where you can unwind, recharge, and experience the therapeutic benefits of touch.</p>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>With years of training and experience, our therapists specialize in a wide range of massage techniques, from soothing Swedish and deep tissue to more targeted therapies like sports massage and trigger point therapy. Each session is tailored to meet your unique needs, whether you are seeking relief from chronic pain, recovering from an injury, or simply looking for a moment of calm in your busy day.</p>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>TheraBonnies believe in the power of healing through connection and care. We are committed to offering a serene and welcoming environment, where you can feel comfortable and supported throughout your entire journey to wellness. Your comfort, privacy, and relaxation are our top priority.</p>
                        <h3 style={{ color: '#417e38' }}><b>Our Services:</b></h3>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>We offer a range of therapeutic massage techniques tailored to your unique needs. From soothing Swedish massages to deep tissue therapy for chronic pain relief, our services are designed to address both physical and emotional well-being. We also specialize in couples{"'"} massages, prenatal massage, and wellness packages that focus on long-term health and relaxation.</p>
                        <h3 style={{ color: '#417e38' }}><b>Why Choose Therabonnies?</b></h3>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>

                        </p>
                        <ul style={{ display: 'grid', gap: 8, padding: '0 0 0 2.5em' }}>
                            <li><b>Personalized Care: </b><span>We take the time to understand your specific needs and preferences to create a customized massage experience.</span></li>
                            <li><b>Convenience: </b>With our mobile service, we bring the spa experience directly to you—whether at home, in the office, or even at your hotel.</li>
                            <li><b>Professional Therapists: </b>Our licensed and experienced therapists are trained in a variety of techniques, ensuring you receive the highest quality care.</li>
                            <li><b>Holistic Approach: </b>We believe in a holistic approach to wellness, addressing both your physical and mental health to help you feel balanced and rejuvenated.</li>
                        </ul>
                        <p style={{ margin: '0.5rem 0', textAlign: 'justify' }}>Therabonnies are more than just a group of massage therapists, we are your partners in wellness. We are committed to creating a safe, peaceful, and professional environment where you can relax and let go of the stresses of daily life. Whether it is a quick escape from your busy routine or a regular part of your self-care regimen, we are here to help you feel your best.</p>

                    </DivTag>
                </main>
            </DivTag>
            <Footer />
        </DivTag>
    )
}

export default Page;