import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

import avatar from '../data/avatar.jpg';
import logo from '../data/IcallLogo.png';
import UserProfile from './UserProfile';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between p-2  relative bg-gray-100 text-white">
      {/* Logo and Title */}
      <div>
      <img src={logo} className="w-25 h-10" alt="logo" /> 
      </div>

      <div className="flex items-center space-x-4">
        <h1><Link to="/Rendez-vous" className="text-black hover:text-gray-300"> RDVs </Link></h1>
        {(user.ROLE === "admin" || user.ROLE === "superviseur") && (

          <h1><Link to="/Utilisateurs" className="text-black hover:text-gray-300"> Utilisateurs </Link></h1>
        )}
      </div>


      {/* User Profile */}
      <div className="flex items-center">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-700 rounded-lg"
          onClick={handleProfileClick}
        >
          <img src={avatar} className="rounded-full w-8 h-8" alt="user-profile" />
          <p className="text-gray-400 text-sm">{user.NOM}</p>
          <MdKeyboardArrowDown className="text-gray-400 text-sm" />
        </div>
        <UserProfile anchorEl={anchorEl} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Navbar;
