import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMenuSharp  } from 'react-icons/io5';
import { IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Avatar, Divider, Button } from '@mui/material';
import { Home, Event, People, Settings } from '@mui/icons-material';
import { useAuth } from '../contexts/authContext';
import UserProfile from './UserProfile';
import { MdKeyboardArrowDown, MdOutlineCancel } from 'react-icons/md';

import avatar from '../data/avatar.jpg';
import logo from '../data/IcallLogo.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

const Navbar = () => {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Rendez-Vous',
          path: '/Rendez-vous',
          icon: <IoMdContacts />,
        },
        // Only show this link if the user is an admin
        user.ROLE && {
          name: 'Utilisateurs',
          path: '/Utilisateurs',
          icon: <RiContactsLine />,
        },
      ].filter(Boolean), // Filter out false values
    },
  ];

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div className="w-64 mt-5" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <>
        <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span>IcallManager<sub>{user?.ROLE}</sub></span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink 
                    to={link.path}
                    key={link.name}
                    className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
               </>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 flex p-2 h-20 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div>
        <div className='flex items-center'>

      <IconButton className="sm:hidden" onClick={toggleDrawer(true)}>
        <IoMenuSharp className="h-5 w-5" />
      </IconButton>
      <div>
          <img src={logo} className="w-25 h-10" alt="logo" /> 
      </div>
        </div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
      
      </div>
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
      
    </header>
  );
};



export default Navbar;
