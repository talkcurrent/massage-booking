'use client';
import Image from "next/image";
import styles from "./page.module.css";
import DivTag from "./components/DivTag";
import useResolution from "./components/useResolution";
import { useEffect, useState } from "react";
import { EmblaCarousel } from "./components/carousel/EmblaCarousel";
import Navigation from "./components/nav/Navigation";
import ServiceRendered from "./components/ServiceRendered";
import Footer from "./components/nav/Footer";
import useViewPort from "./components/customHooks/useViewPort";
import Link from "next/link";

export default function Home(props) {
  const [deviceHeight, setdeviceHeight] = useState(0)
  const [deviceWidth, setdeviceWidth] = useState(0)

  const mainPad = useViewPort([
    '10px', '10px', '20px', '10px 4%', '10px 10%', '10px 12%'
  ]);

  useEffect(() => {
    setdeviceHeight(window.innerHeight);
    setdeviceWidth(window.innerWidth);
  }, [])

  return (
    deviceHeight > 0 ?
      <DivTag
        height={deviceHeight + "px"}
        maxHeight={deviceHeight + "px"}
        overflow={"hidden auto"}
        color={"white"}
        bgc={'radial-gradient(ellipse at top, rgb(36 92 43 / 40%) 20%, #0a0f15 55%), url("/grid-bg.svg")'}
        gtr={"auto 1fr auto"}
      >
        <DivTag
          position={'sticky'}
          top={'0px'}
          zIndex={"100"}
        ><Navigation /></DivTag>
        <DivTag
          gtc={"repeat(auto-fit, minmax(350px, 1fr))"}
          gap={'10px'}
          align={"center"}
          justify={"center"}
          padding={"0.8rem 2%"}
          height={'max-content'}
          bSizing={"border-box"}
        >
          <DivTag
            maxWidth={"400px"}
            height={'max-content'}
            gap={"10px"}
            bSizing={"border-box"}
          >
            <h1>Website Title or Organisation{"'"}s Name in Full Goes Here</h1>
            <p><strong>Summary of About The Organisation:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel adipisci facilis culpa dolorum ipsum numquam doloremque eligendi ut nisi ratione quidem tempore officia minima, necessitatibus iste consequuntur consequatur? Impedit officiis nesciunt perspiciatis delectus nisi ullam maxime, minima repellat rerum culpa, aut architecto dolorum quidem nulla saepe nihil sed, omnis commodi...</p>

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
            ><Link href={"/about"}>Get to know us</Link></button>
          </DivTag>
          <DivTag
            height={'max-content'}
            bSizing={"border-box"}
          >
            {/* slider goes here  */}
            <EmblaCarousel
              files={[
                { src: '/carousel/sam-img-1.jpg', caption: 'Farm Operation With Tractor' },
                { src: '/carousel/sam-img-2.jpg', caption: 'Apple Fruits On The Farm.' },
                { src: '/carousel/sam-img-3.jpg', caption: 'Cattle Grazing By The River Bank ' },
              ]}
            />
          </DivTag>
        </DivTag>
        <DivTag
          padding={mainPad}
          margin={"0 auto"}
          tAlign={"justify"}
          bgc={"#0a0f15"}
          bSizing={"border-box"}
        >
          <h2>OUR VISSION: </h2>
          <hr
            style={{
              borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
              margin: '1rem 0'
            }}
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quisquam am assumenda. Quam maxime necessitatibus commodi, aspernatur maiores magnam nobis odio earum architecto nihil atque sequi obcaecati ratione excepturi, minima ea ullam dolorum tenetur quisquam modi illum rem est! Commodi voluptatum, natus id harum veniam nesciunt quo excepturi vel assumenda. Laborum alias quia ab eius ex quas voluptatum.
          </p>
        </DivTag>
        <DivTag
          padding={mainPad}
          margin={"0 auto"}
          tAlign={"justify"}
          bgc={"#0a0f15"}
        >
          <h2>PRODUCT & SERVICES:</h2>
          <hr
            style={{
              borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
              margin: '1rem 0'
            }}
          />
          <DivTag
            gtc={"repeat(auto-fit, minmax(300px, 1fr))"}
            gap={"10px"}

          >
            <ServiceRendered bgi={'url("/grains.jpg")'} />
            <ServiceRendered bgi={'url("/transportation.jpeg")'} />
            <ServiceRendered bgi={'url("/yam.jpeg")'} />
          </DivTag>
        </DivTag>
        <DivTag>
          <Footer />
        </DivTag>
      </DivTag>
      : ""
  );
}