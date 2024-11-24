import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useResolution from '../customHooks/useResolution';
/**
 * Return a react node
 * @param {number} top - for top nav, it is the height of the the top navigation bar
 * @param {number} bottom - for bottom nav, it is the height of the the bottom navigation bar
 * 
 */
const NavBarMobile = ({ top, bottom, children }) => {
    const [toggle, setToggle] = useState("");
    const [iconHeight, setIconHeight] = useState("");
    const [toggleableWidth, setToggleableWidth] = useState("");
    //
    const toggleable = React.createRef();
    const toggleIconCont = React.createRef();
    const { windowWidth, windowHeight } = useResolution()

    useEffect(() => {
        const toggleIcon = toggleIconCont.current;
        if (toggleIcon) {
            if (iconHeight != toggleIcon.clientHeight) {
                getIconHeight(toggleIcon);
            }
        }
        return () => { };
    });

    useEffect(() => {
        document.addEventListener("click", closeMainMenu, true);
        return () => {
            document.removeEventListener("click", closeMainMenu, true);
        };
    }, []);
    const getIconHeight = (element) => {
        setIconHeight(element.clientHeight);
    };

    const handleToggleMainMenu = () => {
        setToggle(!toggle);
        setToggleableWidth(toggleable.current.offsetWidth);
    };
    const closeMainMenu = (e) => {
        if (!e.target.closest(`.menuIcon`)) {
            setToggle(false);
        }
    };
    const updateToggleableWidth = () => {
        setToggleableWidth(toggleable.current.offsetWidth);
    };
    return (
        <Nav
            $iconHeight={iconHeight}
            $top={`${top}px`} //top navbar height
            $bottom={`${bottom}px`} //bottom navbar height
            $toggleableWidth={toggleableWidth}
        >
            <div className="menuIcon" ref={toggleIconCont}>
                <div
                    onClick={handleToggleMainMenu}
                    className={`main-menu`}
                >
                    {toggle ?
                        <CloseIcon fontSize="large" color="inherit" sx={{ p: "0px", fontSize: '1rem' }} />
                        :
                        <MenuIcon fontSize="large" color="inherit" sx={{ p: "0px", fontSize: '1rem' }} />
                    }
                </div>
                <div
                    className={`toggleable ${toggle ? "toggle" : ""}`}
                    ref={toggleable}
                >
                    {children}
                </div>
            </div>
        </Nav>
    );
};

export default NavBarMobile;
export const Nav = styled.nav`
    .menuIcon {
        color: white;
        font-size: 16px;
        .main-menu{
            cursor: pointer;
        }
        .toggleable{ 
            position: fixed;
            font-size: ${props => props.$windowWidth < 400 ? "smaller"
        : props.$windowWidth < 680 ? "medium"
            : ""};
            top: ${props => props.$top};
            bottom: ${props => props.$bottom};
            left: -${props => props.$toggleableWidth > 20 ? props.$toggleableWidth : 150}px;
            max-width: 150px;
            /* border-radius: 0px 7px 7px 0px; */
            transition:all 0.3s linear;
            z-index: 10;
            overflow-y: auto;
            overflow-x: hidden;
            &.toggle{
                left: 0px;
            }
        }
    }
`;
