import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import useResolution from '../customHooks/useResolution';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = ({ onLayout }) => {
  const [domready, setdomready] = useState(false)
  const element = useRef();
  const router = useRouter();
  const path = usePathname()
  const [deviceWidth, setdeviceWidth] = useState(0)

  useEffect(() => {
    setdeviceWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    router.prefetch(`/`);
    router.prefetch(`/about`);
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
      <ol>
        <li
          className={path.split("/").includes('services') ? 'active' : ''}
        >
          <Link href={"/services"}
            className={``}
          >Services</Link>
        </li>
        {/* <li
          className={path.split("/").includes('contact') ? 'active' : ''}
        >
          <Link href={"/contact"}
            className={``}
          >Contact</Link>
        </li> */}
        <li className={path.split("/").includes('about') ? 'active' : ''}
        >
          <Link href={"/about"}
            className={``}
          >About Us</Link>
        </li>
      </ol>
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
    padding: 10px;
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