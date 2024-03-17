import React, {useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements';
import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
    const [isopen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isopen);
    };
  
    return (
      <Nav>
        <NavLink to='/home'>
          <img src={require('../../logo_bussens.png')} style={{ width: '90px', height: 'auto' }} alt='Logo' />
        </NavLink>
        <Bars onClick={toggleMenu} />
        <NavMenu isopen={isopen.toString()}>
          <NavLink to='/home'><AiFillHome /> Home
          </NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/services'>Services</NavLink>
          <NavLink to='/contact'>Contact</NavLink>
        </NavMenu>
      </Nav>
    );
  };

export default Navbar;