// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { UserProfile } from './';
import avatar from '../data/avatar.jpg'
import { useSelector } from 'react-redux';
const NavButton = ({ title, customFunc, icon, color }) => (
  <Tooltip title={title} placement="bottom">
    <button 
      type='button'
      onClick={() => customFunc()}
      style={{ color }}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const handleActiveMenu = () => {
    // handle active menu logic
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'> 
      <NavButton 
        title="Menu"
        customFunc={handleActiveMenu}
        color='blue'
        icon={<AiOutlineMenu />}
      />

      <div className='flex'>
        <div 
          className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
          onClick={handleProfileClick}
        >
          <img src={avatar} className='rounded-full w-8 h-8' alt='user-profile'/>
          <p>
             <span className='text-gray-400 text-20'>{user.NOM}</span> {' '}
             
            </p>
          <MdKeyboardArrowDown className='text-gray-400 text-14'/>
        </div>
        <UserProfile anchorEl={anchorEl} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default Navbar;

        // <TooltipComponent content='Profile' position='BottomCenter'>
        //   <div 
        //     className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
        //     onClick={() => handleClick('userProfile')}
        //   >
        //     <img src={avatar} className='rounded-full w-8 h-8' alt='user-profile'/>
        //     <p>
        //       <span className='text-gray-400 text-14'>Hi,</span> {' '}
        //       <span className='text-gray-400 font-bold ml-1 text-14'>Admin</span>
        //     </p>
        //     <MdKeyboardArrowDown className='text-gray-400 text-14'/>
        //   </div>
        // </TooltipComponent>
        // import avatar from '../data/avatar.jpg'