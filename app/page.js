'use client';
import DivTag from "./components/DivTag";
import { useContext, useEffect, useState } from "react";
import { EmblaCarousel } from "./components/carousel/EmblaCarousel";
import Carousel from "./components/carousel/TextCarousel/Carousel";
import Navigation from "./components/nav/Navigation";
import Footer from "./components/nav/Footer";
import useViewPort from "./components/customHooks/useViewPort";
import Link from "next/link";
import slides from "./components/slides";
import { useRouter } from "next/navigation";
import Translate from "./components/Translate";
import strCapitalize from "./components/customHooks/strCapitalize";
import testimonies from "./components/testimonies";
import ReviewCarousel from "./components/carousel/TextCarousel/ReviewCarousel";
import therabonnies from "./components/therabonnies";
import Image from "next/image";
import Dialog from "./components/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import { CommonContext } from "./components/context/CommonContext";

export default function Home(props) {
  const { deviceHeight, deviceWidth, language, setservice } = useContext(CommonContext);

  const [coupleMassage, setcoupleMassage] = useState([])
  const [eroticMassage, seteroticMassage] = useState([])
  const [individualMassage, setindividualMassage] = useState([])
  const [deluxeMassage, setdeluxeMassage] = useState([])
  const [reviews, setreviews] = useState([])
  const [masseuses, setmasseuses] = useState([])
  const [showModal, setshowModal] = useState(false);

  const [currentMasseuse, setcurrentMasseuse] = useState(null);

  const mainPad = useViewPort([
    '10px', '10px', '20px', '10px 4%', '10px 10%', '10px 12%'
  ]);
  const cardWidth = useViewPort([
    320, 360, 500
  ]);
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/extra`);
    const reviews = testimonies();
    setreviews(reviews);

    const services = slides();
    let individualM = services.filter((serv) => serv.title === 'Individual Massage');
    let eroticM = services.filter((serv) => serv.title === 'Erotic/Nuru Massage');
    let coupleM = services.filter((serv) => serv.title === "Couple's Massage");
    let deluxe = services.filter((serv) => serv.title === "Deluxe Massage");

    setindividualMassage(individualM);
    setcoupleMassage(coupleM);
    seteroticMassage(eroticM)
    setdeluxeMassage(deluxe)
  }, [])

  useEffect(() => {
    const masseuses = therabonnies(language);
    setmasseuses(masseuses);
  }, [language])

  const OPTIONS = { loop: true }

  const serviceClicked = (url) => {
    const services = slides();
    let service = services.find((serv) => serv.url === url)
    setservice(service);
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
            <h1>{Translate('title', language)}</h1>
            <p style={{ textAlign: 'justify' }}>
              {Translate('description', language)}
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
            ><Link href={"/about"}>{Translate("get to know TheraBonnies", language)}</Link></button>
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
                { src: '/carousel/erotic-massage-2.png', caption: 'TheraBonnies ' },
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
          <h2>{Translate('services', language)}</h2>
          <p style={{ color: 'rgb(87 145 94)' }}>
            {Translate('sub-heading', language)}
          </p>
          <hr
            style={{
              borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
              margin: '0.5rem 0 1rem 0'
            }}
          />
          <DivTag gap={"1rem"}>
            <DivTag>
              <DivTag
                width={"max-content"}
              >
                <h3 style={{ color: '#57915e' }}>{Translate('Individual Massage', language)}:</h3>
                <hr
                  style={{
                    borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
                    margin: '0.5rem 0 1rem 0'
                  }}
                />
              </DivTag>
              <Carousel
                slides={individualMassage}
                language={language}
                options={OPTIONS}
                handleClick={serviceClicked}
              />
            </DivTag>
            <DivTag>
              <DivTag
                width={"max-content"}
              >
                <h3 style={{ color: '#57915e' }}>{Translate("Erotic/Nuru Massage", language)}:</h3>
                <hr
                  style={{
                    borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
                    margin: '0.5rem 0 1rem 0'
                  }}
                />
              </DivTag>
              <Carousel
                slides={eroticMassage}
                language={language}
                options={OPTIONS}
                handleClick={serviceClicked}
              />
            </DivTag>
            <DivTag>
              <DivTag
                width={"max-content"}
              >
                <h3 style={{ color: '#57915e' }}>{Translate("Deluxe Massage", language)}:</h3>
                <hr
                  style={{
                    borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
                    margin: '0.5rem 0 1rem 0'
                  }}
                />
              </DivTag>
              <Carousel
                slides={deluxeMassage}
                language={language}
                options={OPTIONS}
                handleClick={serviceClicked}
              />
            </DivTag>
            <DivTag>
              <DivTag
                width={"max-content"}
              >
                <h3 style={{ color: '#57915e' }}>{Translate("Couple's Massage", language)}</h3>
                <hr
                  style={{
                    borderImage: 'linear-gradient(to right, rgb(36 92 43 / 40%) 20%, rgb(24 26 30 / 80%) 55%) 1',
                    margin: '0.5rem 0 1rem 0'
                  }}
                />
              </DivTag>
              <Carousel
                slides={coupleMassage}
                language={language}
                options={OPTIONS}
                handleClick={serviceClicked}
              />
            </DivTag>
          </DivTag>
          <DivTag
            margin={'20px 0 0 0'}
            justify={'start'}
            gap={'10px'}
          >
            <DivTag>
              <p style={{ color: 'white' }}>In case you have negotiated an additional fee beyond our service cost, please use the button bellow:</p>
            </DivTag>
            <Link
              href={"/extra"}
              style={{
                backgroundColor: "#417e38",
                padding: "5px 10px",
                textAlign: 'center',
                color: 'white',
                borderRadius: 20,
                marginBottom: 5
              }}
            >{Translate("Additional payment", language)}</Link>
          </DivTag>
        </DivTag>
        <DivTag>
          <Footer />
        </DivTag>
      </DivTag>
      : ""
  );
}