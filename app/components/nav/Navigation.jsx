'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Translate from '../Translate';
import InputSelect from '../form/InputSelect';
import Image from 'next/image';
import { CommonContext } from '../context/CommonContext';
import DivTag from '../DivTag';

const Navigation = ({ onLayout }) => {
  const { deviceHeight, deviceWidth, language, setlanguage } = useContext(CommonContext);

  const [domready, setdomready] = useState(false);

  const element = useRef();
  const router = useRouter();
  const path = usePathname()

  useEffect(() => {
    router.prefetch(`/`);
    router.prefetch(`/about`);
    router.prefetch(`/services`);
    router.prefetch(`/contact`);
    setdomready(true)
    if (domready) {
      handleLayout();
    }
  }, [domready]);



  const handleLayout = () => {
    if (onLayout) {
      onLayout(element.current.getBoundingClientRect());
    }
  };

  return (
    <Nav
      style={{
        background: 'rgba(0,0,0,0.3)',
        color: 'white',
        padding: `0 ${((5 / 100) * deviceWidth)}px`,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',

      }}
      ref={element}
    >

      <Link href={"/"}>
        <img
          src="/therabonnie.png"
          alt=""
          style={{
            width: 40,
            height: 30,
            objectFit: "contain",
            cursor: 'pointer'
          }}
        />
      </Link>
      <DivTag>
        <DivTag
          justifySelf={"end"}
        >
          <InputSelect
            padding={0}
            valueColor={"#417e38"}
            id={"language"}
            name={"language"}
            value={language}
            // width={300}
            lineIndicator={false}
            onChange={(e) => {
              setlanguage(e.target.value);
            }}

            iconLeft={
              language == "en" ?
                <Image
                  src={"/usa.png"}
                  height={15}
                  width={20}
                  alt='usa'
                />
                :
                <Image
                  src={"/arab.jpg"}
                  height={15}
                  width={20}
                  alt='arab'
                />

            }
          // iconRight={<KeyboardArrowDownIcon fontSize={"small"} color="action" sx={{ padding: "0px" }} />}
          >
            <option value={"en"}>English</option>
            <option value={"ar"}>Arabic</option>
          </InputSelect>
        </DivTag>
        <ol>
          <li
            className={path.split("/").includes('services') ? 'active' : ''}
          >
            <Link href={"/services"}
              className={``}
            >{Translate('services', language)}</Link>
          </li>
          <li
            className={path.split("/").includes('contact') ? 'active' : ''}
          >
            <Link href={"/contact"}
              className={``}
            >{Translate('contact', language)}</Link>
          </li>
          <li className={path.split("/").includes('about') ? 'active' : ''}
          >
            <Link href={"/about"}
              className={``}
            >{Translate('about us', language)}</Link>
          </li>
        </ol>

      </DivTag>
    </Nav>
  )
}

export default Navigation;

const Nav = styled.nav`
  ol{
    list-style-type: none;
    gap: 10px;
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0px;
    align-items: center;
    li{
      padding: 8px 5px;
      color: white;
      border-radius: 7px;
      &.active{
        background-color: #417e38;
        color: white;
        font-weight: 600;
      }
    }
    a{
      color: inherit;
    }
    .about{
      border-right: 1px solid white;
      padding-right: 5px; 
    }
  }
`;