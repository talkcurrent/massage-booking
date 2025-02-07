import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import Link from "next/link";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CommonContext } from '../context/CommonContext';

const Footer = () => {
  const { deviceHeight, deviceWidth } = useContext(CommonContext);

  return (
    <footer
      style={{
        marginTop: 30
      }}
    >
      <Nav
        style={{
          background: '#0a0f15',
          color: 'white',
          padding: `20px ${((5 / 100) * deviceWidth)}px`,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          alignItems: 'center',

        }}
      >
        <div style={{ color: 'silver' }}>© 2025 tPurse.com</div>
        {/* <ol>
                    <li style={{ color: 'silver' }}>Follow us:</li>
                    <li><Link href={"/#"}>
                        <FacebookIcon fontSize="large" color="action" sx={{ p: "0px", color: 'blue' }} />
                    </Link></li>
                    <li><Link href={"/#"}><XIcon fontSize="medium" color="action" sx={{ p: "0px", color: 'silver' }} /></Link></li>
                    <li><Link href={"/#"}><LinkedInIcon fontSize="large" color="action" sx={{ p: "0px", color: 'silver' }} /></Link></li>
                </ol> */}
      </Nav>
    </footer>
  )
}

export default Footer;

const Nav = styled.nav`
  border-top: 1px solid gray;
  ol{
    list-style-type: none;
    gap: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    li{
      padding: 2rem 0;
    }
    a{
      color: inherit
    }
    .about{
      border-right: 1px solid white;
      padding-right: 5px; 
    }
  }
`;