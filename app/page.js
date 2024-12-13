'use client';
import DivTag from "./components/DivTag";
import useResolution from "./components/useResolution";
import { useEffect, useState } from "react";
import { EmblaCarousel } from "./components/carousel/EmblaCarousel";
import Carousel from "./components/carousel/TextCarousel/Carousel";
import Navigation from "./components/nav/Navigation";
import Footer from "./components/nav/Footer";
import useViewPort from "./components/customHooks/useViewPort";
import Link from "next/link";
import slides from "./components/slides";
import { useRouter } from "next/navigation";

export default function Home(props) {
  const [deviceHeight, setdeviceHeight] = useState(0)
  const [deviceWidth, setdeviceWidth] = useState(0)

  const mainPad = useViewPort([
    '10px', '10px', '20px', '10px 4%', '10px 10%', '10px 12%'
  ]);
  const router = useRouter();

  useEffect(() => {
    setdeviceHeight(window.innerHeight);
    setdeviceWidth(window.innerWidth);
  }, [])

  const OPTIONS = { loop: true }

  const serviceClicked = (url) => {
    const services = slides();
    let service = services.find((serv) => serv.url === url)
    router.push('/order/' + url)
  }

  return (
    deviceHeight > 0 ?
      <DivTag
        height={deviceHeight + "px"}
        maxHeight={deviceHeight + "px"}
        maxWidth={deviceWidth + "px"}
        overflow={"hidden auto"}
        color={"white"}
        bgc={'radial-gradient(ellipse at top, rgb(36 92 43 / 40%) 20%, #0a0f15 55%), url("/grid-bg.svg")'}
      // gtr={"auto 1fr auto"}
      >
        <DivTag
          position={'sticky'}
          top={'0px'}
          zIndex={"100"}
          maxWidth={deviceWidth + "px"}
        ><Navigation /></DivTag>
        <DivTag
          gtc={"repeat(auto-fit, minmax(350px, 1fr))"}
          gap={'10px'}
          align={"center"}
          justify={"center"}
          padding={"0.8rem 2%"}
          height={'max-content'}
          bSizing={"border-box"}
          maxWidth={deviceWidth + "px"}
        >
          <DivTag
            height={'max-content'}
            gap={"10px"}
            bSizing={"border-box"}
          >
            <h1>TheraBonnies (private massage therapists)</h1>
            <p style={{ textAlign: 'justify' }}>
              Are you feeling stressed, sore or need to relax? Discover a world of greater pleasure and unparalleled experiences with TheraBonnies, private massage therapists providing the perfect escape from the hustle and bustle of everyday life. Whether you are looking for relief from chronic pain, quiet time, or relaxation, TheraBonnies will help you feel better with optional services like Erotic/Sensual and Happy Ending.
            </p>

            <button
              style={{
                width: '70%',
                border: "1px solid rgba(36, 92, 43, 0.4)",
                justifySelf: 'center',
                padding: '10px 0',
                borderRadius: 10,
                backgroundColor: 'rgba(36, 92, 43, 0.28)',
                fontSize: 'large'
              }}
            ><Link href={"/about"}>Get to know TheraBonnies</Link></button>
          </DivTag>
          <DivTag
            height={'max-content'}
            bSizing={"border-box"}
          >
            <EmblaCarousel
              files={[
                { src: '/carousel/massage-oil.jpeg', caption: 'Couple massage' },
                { src: '/carousel/massage-stone.jpeg', caption: 'Apple Fruits On The Farm.' },
                { src: '/carousel/thera-massage.jpg', caption: 'TheraBonnies ' },
                { src: '/carousel/erotic-massage-2.webp', caption: 'TheraBonnies ' },
                { src: '/carousel/erotic-massage.webp', caption: 'TheraBonnies ' },
              ]}
            />
          </DivTag>
        </DivTag>

        <DivTag
          padding={mainPad}
          // margin={"0 auto"}
          tAlign={"justify"}
          bgc={"#0a0f15"}
          maxWidth={deviceWidth + "px"}
        >
          <h2>SERVICES:</h2>
          <hr
            style={{
              borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
              margin: '1rem 0'
            }}
          />
          <p style={{ marginBottom: 10, color: 'rgb(87 145 94)' }}>Let <b>TheraBonnies</b> melt away your stress with soothing techniques designed to relax both body and mind</p>
          <DivTag>
            {/* <ServiceRendered bgi={'url("/yam.jpeg")'} /> */}
            <Carousel
              slides={slides()}
              options={OPTIONS}
              handleClick={serviceClicked}
            />
          </DivTag>
        </DivTag>
        <DivTag>
          <Footer />
        </DivTag>
      </DivTag>
      : ""
  );
}