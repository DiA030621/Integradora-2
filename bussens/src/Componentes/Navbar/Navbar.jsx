import React, {useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink
} from './NavbarElements';
import { AiFillHome } from "react-icons/ai";
import { GrWaypoint } from "react-icons/gr";
import { FaBusSimple, FaPerson  } from "react-icons/fa6";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { MdMonitorHeart } from "react-icons/md";



const Navbar = (props) => {
    const [isopen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isopen);
    };

    const logOut = () => {
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
          <NavLink to='/rutas'><GrWaypoint /> Rutas
          </NavLink>
          <NavLink to='/paradas'><FaBusSimple /> Paradas
          </NavLink>
          <NavLink to='/vehiculos'><FaCarSide /> Vehículos
          </NavLink>
          <NavLink to='/empleados'><FaPerson /> Empleados
          </NavLink>
          <NavLink to='/usuarios'><HiOutlineUsers /> Usuarios
          </NavLink>
          <NavLink to='/graficas'><MdMonitorHeart /> Monitoreo
          </NavLink>
          <NavBtnLink onClick={logOut}>Cerrar sesión</NavBtnLink>
        </NavMenu>
      </Nav>
    );
  };

export default Navbar;