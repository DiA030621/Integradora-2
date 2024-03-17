import React, {useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink
} from './NavbarElements';
import { AiFillHome } from "react-icons/ai";

const Navbar = (props) => {
    const [isopen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isopen);
    };

    const logOut = () => {
      localStorage.removeItem('token');
      props.onLogout();
    };

    return (
      <Nav>
        <NavLink to='/home'>
          <img src={require('../../logo_bussens.png')} style={{ width: '90px', height: 'auto' }} alt='Logo' />
        </NavLink>
        <Bars onClick={toggleMenu} />
        <NavMenu isopen={isopen}>
          <NavLink to='/home'><AiFillHome /> Home
          </NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/services'>Services</NavLink>
          <NavLink to='/contact'>Contact</NavLink>
          <NavBtnLink onClick={logOut}>Cerrar sesión</NavBtnLink>
        </NavMenu>
      </Nav>
    );
  };

export default Navbar;